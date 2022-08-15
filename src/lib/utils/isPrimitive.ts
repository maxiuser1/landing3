import isNullOrUndefined from './isNullOrUndefined';

export default (value: unknown): value is Primitive =>
  isNullOrUndefined(value) || typeof value !== 'object';
