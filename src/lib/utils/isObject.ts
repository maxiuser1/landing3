import isDate from './isDate';
import isNullOrUndefined from './isNullOrUndefined';

export default <T extends object>(value: unknown): value is T =>
  !isNullOrUndefined(value) &&
  !Array.isArray(value) &&
  !isDate(value) &&
  typeof value === 'object';
