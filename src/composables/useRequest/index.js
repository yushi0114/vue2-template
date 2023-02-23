import { DataType } from "@/utils";
import { ref, onBeforeUnmount, watch } from "vue";
import { useDocumentVisibility, useThrottleFn } from "@vueuse/core";

// export type UseRequestOption<K, P = any[]> = {
//     cache?: boolean | number; // 是否缓存
//     onSuccess?: (data: K, params: P) => void; // 请求成功回调
//     onError?: (error: HttpError) => void; // 请求失败回调
//     onFinally?: () => void; //请求完成后回调
//     formatter?: <U = K>(response: K) => U; // 返回数据和格式化函数
//     refreshOnWindowFocus?: boolean 当设置为 true 时，则在浏览器窗口触发 focus 和 visibilitychange 时，会重新发起请求。
// };
export function useRequest(apiFunc, option) {
  const opt = Object.assign({ cache: false }, option);
  const visibility = useDocumentVisibility();
  const {
    pollingWhenHidden = true,
    pollingErrorRetryCount,
    pollingInterval,
    initialData,
    refreshOnWindowFocus = false,
    refocusTimespan = 5 * 1000,
    refreshFun,
  } = opt || {};
  const loading = ref(false);
  const data = ref(initialData);
  const cache = ref();
  let timer;
  let queryParams = ref([]);
  let countRef = ref(0);
  let timerPolling = null;

  const throttledFn = useThrottleFn(() => {
    refresh();
  }, refocusTimespan);

  function clear() {
    cache.value = undefined;
    clearTimeout(timer);
  }

  const startPolling = () => {
    if (timerPolling) return;
    timerPolling = setInterval(() => {
      refresh();
    }, opt.pollingInterval);
  };

  const stopPolling = () => {
    clearTimeout(timerPolling);
  };
  const request = (...args) => {
    opt.onBefore?.(...args);
    queryParams.value = args;
    loading.value = true;
    const requestResponse = cache.value
      ? Promise.resolve(cache.value)
      : apiFunc(...args).then((res) => {
          const response = DataType.isFunction(opt.formatter) ? opt.formatter(res) : res;
          data.value = response;
          if (opt.cache) {
            cache.value = response;
            if (DataType.isNumber(opt.cache)) {
              timer = setTimeout(clear, Number(opt.cache));
            }
          }
          return response;
        });
    if (cache.value) {
      if (DataType.isFunction(opt.onSuccess)) {
        opt.onSuccess(cache.value, [...args]);
      } else {
        return Promise.resolve(cache.value);
      }
    }

    return requestResponse
      .then((res) => {
        countRef.value = 0;
        if (DataType.isFunction(opt.onSuccess)) {
          opt.onSuccess(res, [...args]);
        } else {
          return Promise.resolve(res);
        }
      })
      .catch((error) => {
        countRef.value += 1;
        if (DataType.isFunction(opt.onError)) {
          opt.onError(error);
        } else {
          return Promise.reject(error);
        }
      })
      .finally(() => {
        loading.value = false;
        if (
          pollingErrorRetryCount === -1 ||
          // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
          (pollingErrorRetryCount !== -1 &&
            countRef.value <= pollingErrorRetryCount)
        ) {
          startPolling();
        } else {
          countRef.value = 0;
          stopPolling();
        }
        if (DataType.isFunction(opt.onFinally)) {
          opt.onFinally();
        }
      });
  };

  const refresh = () => {
    if (DataType.isFunction(refreshFun)) {
      refreshFun();
    } else {
      request(...queryParams.value);
    }
  };

  watch(visibility, () => {
    if (
      visibility.value === "hidden" &&
      pollingWhenHidden &&
      !DataType.isNullOrUnDef(pollingInterval)
    ) {
      stopPolling();
    } else if (
      visibility.value === "visible" &&
      pollingWhenHidden &&
      !DataType.isNullOrUnDef(pollingInterval)
    ) {
      startPolling();
    }
    if (refreshOnWindowFocus && visibility.value === "visible") {
      throttledFn();
    }
  });

  onBeforeUnmount(() => {
    clear();
    stopPolling();
  });
  return { loading, request, clear, data, refresh };
}
