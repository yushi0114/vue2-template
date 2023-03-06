import { getCurrentInstance } from "vue";
import router from "@/router";

export function useRouter() {
  const currentInstance = getCurrentInstance();
  return currentInstance ? currentInstance.proxy.$router : router;
}

export function useRoute() {
  const currentInstance = getCurrentInstance();
  return currentInstance ? currentInstance.proxy.$route : router.currentRoute;
}
