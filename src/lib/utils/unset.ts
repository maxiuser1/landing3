import unset from 'lodash/unset.js';
import get from './get';
import isObject from './isObject';
import isUndefined from './isUndefined';
import set from './set';
import stringToPath from './stringToPath';

export default <T>(obj: T, path: string) => {
	if (!isObject(obj)) {
		return obj;
	}

	unset(obj, path);

	let sliceEnd = 0;
	const pathArray = stringToPath(path);

	while (sliceEnd + pathArray.length > 0) {
		const currentPath = pathArray.slice(0, --sliceEnd);
		const parent = get(obj, currentPath.join('.'));

		if (Array.isArray(parent)) {
			set(
				obj,
				currentPath,
				parent.filter((item) => !isUndefined(item))
			);
		}
	}

	return obj;
};
