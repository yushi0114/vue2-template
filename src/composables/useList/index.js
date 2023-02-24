import { onMounted, ref, watch, unref, computed } from "vue";
import { Message } from "element-ui";
import { deepMerge } from "@/utils";
import { useRequest } from "../useRequest";

const DEFAULT_MESSAGE = {
  GET_DATA_IF_FAILED: "获取列表数据失败",
  EXPORT_DATA_IF_FAILED: "导出数据失败",
};

const DEFAULT_OPTIONS = {
  message: DEFAULT_MESSAGE,
  pageFields: {
    pageSize: "pageSize",
    pageIndex: "pageIndex",
  },
  formatData(data) {
    return {
      data: data.list,
      total: data.total,
    };
  },
  isLoadMore: false,
  refreshOnWindowFocus: false,
};

export function useList(listRequestFn, filterOption, exportRequestFn, options) {
  const _options = computed(() => {
    return deepMerge(DEFAULT_OPTIONS, options.value);
  });
  let {
    immediate = true,
    preRequest,
    message = DEFAULT_MESSAGE,
    pageFields,
    formatData,
    isLoadMore,
    refreshOnWindowFocus = false,
  } = unref(_options);
  const { GET_DATA_IF_FAILED, EXPORT_DATA_IF_FAILED } = message;

  // 当前页
  const curPage = ref(1);
  // 总
  let total = ref(0);
  // 分页大小
  const pageSize = ref(10);
  // 数据
  let list = ref([]);

  // 是否加载完成
  let isFinished = ref(false);

  const { request, loading } = useRequest(
    (page) =>
      listRequestFn.value({
        [pageFields.pageSize]: pageSize.value,
        [pageFields.pageIndex]: page,
        ...filterOption.value,
      }),
    {
      refreshOnWindowFocus,
      refreshFun() {
        resetList();
        loadData();
      },
      onBefore() {},
      onSuccess(data) {
        const { data: _data, total: _total } = formatData(data);
        if (isLoadMore) {
          list.value = [...list.value, ..._data];
        } else {
          list.value = _data;
        }
        total.value = _total;
        if (_total - list.value.length <= 0) {
          isFinished.value = true;
        } else {
          isFinished.value = false;
        }
        Message.closeAll();
        options?.requestSuccess?.();
      },
      onError() {
        Message.closeAll();
        GET_DATA_IF_FAILED && Message.error(GET_DATA_IF_FAILED);
        options?.requestError?.();
      },
    }
  );

  const reload = () => {
    loadData();
  };

  const onEndReached = () => {
    if (isFinished.value) {
      return;
    }
    curPage.value += 1;
  };

  const reset = () => {
    if (!filterOption.value) return;
    const keys = Reflect.ownKeys(filterOption.value);
    filterOption.value = {};
    keys.forEach((key) => {
      Reflect.set(filterOption.value, key, undefined);
    });
    resetList();
  };

  const resetList = () => {
    curPage.value = 1;
    pageSize.value = 10;
    list.value = [];
  };

  // 过滤数据
  const filter = () => {
    resetList();
    loadData();
  };

  const loadData = (page = curPage.value) => {
    preRequest?.();
    request(page);
  };

  const exportFile = async () => {
    if (!exportRequestFn.value && typeof exportRequestFn.value !== "function") {
      throw new Error("当前没有提供exportRequest函数");
    }
    try {
      const {
        data: { link },
      } = await exportRequestFn.value(filterOption.value);
      window.open(link);
      options?.exportSuccess?.();
    } catch (error) {
      EXPORT_DATA_IF_FAILED && Message.error(EXPORT_DATA_IF_FAILED);
      options?.exportError?.();
    }
  };

  // 监听分页数据改变
  watch([curPage, pageSize], () => {
    curPage.value !== 1 && loadData(curPage.value);
  });

  onMounted(() => {
    if (immediate) {
      loadData(curPage.value);
    }
  });

  return {
    loading,
    curPage,
    total,
    list,
    isFinished,
    filterOption,
    onEndReached,
    reload,
    reset,
    filter,
    pageSize,
    exportFile,
    loadData,
  };
}
