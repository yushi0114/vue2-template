import { getCurrentInstance } from 'vue';
// import store from '@/store';
export function useStore() {
	let currentInstance = getCurrentInstance();
  console.log('currentInstance: ', currentInstance);
	return !!currentInstance ? currentInstance.proxy.$store : store;
}
