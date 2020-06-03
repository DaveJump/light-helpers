import { isArray } from './Lang'

/**
 * Transfrom an array to an object with index-number-key deeply
 * @param arr source array
 * @returns transformed object
 */
export function array2Object(arr?: any[]): Record<number, any> {
  let i, l
  const obj: Record<number, any> = {}
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
