import xssFilters from 'xss';
export function xssFilterObj(data) {
	const returnOrigin = [0, true, false, null, undefined];
	if (returnOrigin.includes(data)) {
		return data;
	}
	if (typeof data === 'number') {
		return data;
	}

	if (Object.prototype.toString.call(data) == '[object Array]') {
		if (data.length == 0) {
			return [];
		}
		data.forEach(item => {
			return xssFilterObj(item);
		});
		return data;
	}
	if (Object.prototype.toString.call(data) == '[object Object]') {
		if (Object.keys(data).length === 0) {
			return {};
		}
		for (let key in data) {
			data[key] = xssFilterObj(data[key]);
		}
		return data;
	}
	return xssFilters(data);
}
