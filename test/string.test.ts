import assert from 'assert'
import { isString, capitalize, genUID } from '../src/string'

describe('isString', () => {
  test("'str' => string", () => {
    assert.strictEqual(isString('str'), true)
  })
})

describe('capitalize', () => {
  test("'cat' => 'Cat'", () => {
    assert.strictEqual(capitalize('cat'), 'Cat')
  })
  test("'a cat play with dog' => 'A Cat Play With Dog'", () => {
    assert.strictEqual(capitalize('a cat play with dog'), 'A Cat Play With Dog')
  })
})

describe('genUID', () => {
  test("genUID(10) => length:10", () => {
    expect(genUID(10)).toHaveLength(10)
  })
})