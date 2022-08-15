/**
 * pascalize converts strings to UpperCamelCase also removing underscores
 */
export default (value: string) =>
  value.trim().replace(/(?:^|_| +)(.)/g, (_, x) => x.toUpperCase());
