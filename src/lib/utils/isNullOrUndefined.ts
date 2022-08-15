import isUndefined from './isUndefined';

export default (value: unknown): value is null | undefined =>
  isUndefined(value) || value === null;
