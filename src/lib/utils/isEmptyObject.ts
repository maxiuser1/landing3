import isObject from './isObject';

export default (value: unknown) =>
  isObject(value) && !Object.keys(value).length;
