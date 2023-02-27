import { getCurrentInstance } from 'vue';
export function useStore() {
	let currentInstance = getCurrentInstance();
	return currentInstance?.proxy?.$store;
}
