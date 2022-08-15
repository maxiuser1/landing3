import isEqual from 'lodash/isEqual.js';

export default (value: unknown, otherValue: unknown): boolean => {
	return isEqual(value, otherValue);
};
