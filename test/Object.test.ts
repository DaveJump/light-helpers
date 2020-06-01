import { isObject } from '../src/Object'

describe('isObject', () => {
  test('{a: 1} => object', () => {
    expect(isObject({a: 1})).toBe(true)
  })
  test('[1, 2] => !object', () => {
    expect(isObject([1, 2])).not.toBe(true)
  })
})
