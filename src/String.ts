/**
 * Inspect an value as string-type
 * @param value value to be inspected
 * @returns if value is string-type
 */
export function isString(value: any): value is string {
  return Object.prototype.toString.call((value as string)) === '[object String]'
}

/**
 * Capitalize every words in a string-sentence
 * @param str source string
 * @returns capitalized string
 */
export function capitalize(str: string): string {
  return str.replace(/\b(\w)|\s(\w)/g, m => m.toUpperCase())
}

/**
 * Generate a unique-string that can be used as a 'key' or 'id'
 * @param length length of final string
 * @returns a string specified length
 */
export function genUID(length = 13): string {
  if (length === 1) {
    return (~~(Math.random() * 36)).toString(36)
  }
  return (~~(Math.random() * 36)).toString(36) + genUID(length - 1)
}