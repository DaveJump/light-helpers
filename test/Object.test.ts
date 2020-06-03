import { object2Array } from '../src/Object'

describe('object2Array', () => {
  test(`{0: 'a', 1: 'b'} => ['a', 'b']`, () => {
    expect(object2Array({0: 'a', 1: 'b'})).toEqual(['a', 'b'])
  })
  test(`{0: 'a', 1: {0: 'b', 1: 'c'}} => ['a', ['b', 'c']]`, () => {
    expect(object2Array({0: 'a', 1: {0: 'b', 1: 'c'}})).toEqual(['a', ['b', 'c']])
  })
})
