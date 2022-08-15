export default (value: unknown): value is undefined =>
  typeof value === 'undefined';
