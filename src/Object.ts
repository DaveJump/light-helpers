import { isObject } from './Lang'
import { ListOfRecursiveArraysOrValues, RecursiveDictionary } from './Types'

/**
 * Transfrom and index-number-key object to an array deeply
 * @param obj source object
 * @returns transformed array
 */
export function object2Array<T>(obj: RecursiveDictionary<T>): ListOfRecursiveArraysOrValues<T> {
  let nums: any[] = []

  if (!obj) return nums

  const keys = Object.keys(obj)

  keys.forEach(function(key) {
    key = key.trim()
    if (/^\d+$/.test(key)) {
      if (+key >= 0) {
        nums.push(key)
      }
    }
  })
  nums = Array.from(new Set(nums))

  if (!nums.length) return []

  const len = Math.max(...nums)
  const arr = new Array(len)
  nums.forEach(function(key) {
    const _value = obj[key]
    arr[key] = isObject(_value) ? object2Array<T>(_value as RecursiveDictionary<T>) : _value
  })

  return arr
}
