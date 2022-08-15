import set from 'lodash/set.js';
import isObject from './isObject';

export default <T>(obj: T, path: string | string[], value: unknown) => {
	if (!isObject(obj)) {
		return obj;
	}

	set(obj, path, value);

	return obj;
};
