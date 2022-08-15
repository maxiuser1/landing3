import get from 'lodash/get.js';

export default (obj: unknown, path: string, defaultValue?: unknown) => get(obj, path, defaultValue);
