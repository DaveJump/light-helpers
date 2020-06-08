import { isArray } from './Lang'
import { ListOfRecursiveArraysOrValues, RecursiveDictionary } from './Types'

/**
 * Transfrom an array to an object with index-number-key deeply
 * @param arr source array
 * @returns transformed object
 */
export function array2Object<T>(array: ListOfRecursiveArraysOrValues<T>): RecursiveDictionary<T> {
  let i, l
  const obj: RecursiveDictionary<T> = {}
  if (!isArray(array)) return obj
  for (i = 0, l = array.length; i < l; i++) {
    if (isArray(array[i])) {
      obj[i] = array2Object<T>(array[i])
    } else {
      obj[i] = array[i]
    }
  }
  return obj
}
