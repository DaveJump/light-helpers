import { Types } from './Lang'

/**
 * Inspect an value as plain-object-type
 * @param value value to be inspected
 * @returns if value is plain-object-type
 */
export function isObject(value: any): value is Types.AnyObject {
  return Object.prototype.toString.call((value as Types.AnyObject)) === '[object Object]'
}
