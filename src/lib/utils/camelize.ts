import pascalize from './pascalize';

/**
 * Same as Pascalize except that the first character is lower case.
 */
export default (value: string) => {
  const pascalized = pascalize(value);
  return pascalized.slice(0, 1).toLowerCase() + pascalized.slice(1);
};
