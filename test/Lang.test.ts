import * as lang from '../src/Lang'

describe('isString', () => {
  test("'str' => string", () => {
    expect(lang.isString('str')).toBe(true)
  })
  test('10 => !string', () => {
    expect(lang.isString(10)).not.toBe(true)
  })
})

describe('isObject', () => {
  test('{a: 1} => object', () => {
    expect(lang.isObject({a: 1})).toBe(true)
  })
  test('[1, 2] => !object', () => {
    expect(lang.isObject([1, 2])).not.toBe(true)
  })
})

describe('isArray', () => {
  test('[1, 2, 3] => array', () => {
    expect(lang.isArray([1, 2, 3])).toBe(true)
  })
  test('"str" => !array', () => {
    expect(lang.isArray('str')).not.toBe(true)
  })
})
