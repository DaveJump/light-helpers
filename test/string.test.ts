import { capitalize, genUID } from '../src/string'

describe('capitalize', () => {
  test("'cat' => 'Cat'", () => {
    expect(capitalize('cat')).toBe('Cat')
  })
  test("'a cat play with dog' => 'A Cat Play With Dog'", () => {
    expect(capitalize('a cat play with dog')).toBe('A Cat Play With Dog')
  })
})

describe('genUID', () => {
  test("genUID(10) => length:10", () => {
    expect(genUID(10)).toHaveLength(10)
  })
})
