/**
 * Inspect an value as string-type
 * @param value value to be inspected
 * @returns if value is string-type
 */

export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === '[object String]'
}

/**
 * Inspect an value as plain-object-type
 * @param value value to be inspected
 * @returns if value is plain-object-type
 */
export function isObject(value: any): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * Inspect an value as array-type
 * @param value value to be inspected
 * @returns if value is array-type
 */
export function isArray(value: any): value is any[] {
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * Inspect an value as number-type
 * @param value value to be inspected
 * @returns if value is number-type
 */
export function isNumber(value: any): value is number {
  return Object.prototype.toString.call(value) === '[object Number]'
}

/**
 * Inspect an value as function-type
 * @param value value to be inspected
 * @returns if value is function-type
 */
export function isFunction(value: any): value is () => any {
  return Object.prototype.toString.call(value) === '[object Function]'
}
