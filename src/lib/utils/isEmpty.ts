import isNullOrUndefined from './isNullOrUndefined';

export default (value: unknown) =>
  isNullOrUndefined(value) ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'string' && value.length === 0);
