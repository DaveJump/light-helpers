import { Types } from './Lang'

/**
 * Inspect an value as array-type
 * @param value value to be inspected
 * @returns if value is array-type
 */
export function isArray(value: any): value is any[] {
  return Object.prototype.toString.call((value as any[])) === '[object Array]'
}

/**
 * Transfrom an array to an object with index-number-key deeply
 * @param arr source array
 * @returns transformed object
 */
export function array2Object(arr?: any[]): Types.AnyObject {
  let i, l
  const obj: Types.AnyObject = {}
  if (!isArray(arr)) return obj
  for (i = 0, l = arr.length; i < l; i++) {
    if (isArray(arr[i])) {
      obj[i] = array2Object(arr[i])
    } else {
      obj[i] = arr[i]
    }
  }
  return obj
}
