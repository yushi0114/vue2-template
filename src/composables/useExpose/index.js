import { getCurrentInstance } from 'vue';
import { extend } from '../utils';

// expose public api
export function useExpose(apis) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}
