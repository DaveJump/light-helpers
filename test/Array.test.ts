import { array2Object } from '../src/Array'

describe('array2Object', () => {
  type TargetObject = Record<any, string | Record<any, string>>

  test("['a', 'b'] => {0: 'a', 1: 'b'}", () => {
    const originalArray: string[] = ['a', 'b']
    const targetObject: TargetObject = {
      '0': 'a',
      '1': 'b'
    }
    expect(array2Object(originalArray)).toEqual(targetObject)
  })
  test("['a', ['b']] => {0: 'a', 1: {0: 'b'}}", () => {
    const originalArray: (string | any[])[] = ['a', ['b']]
    const targetObject: TargetObject = {
      '0': 'a',
      '1': {0: 'b'}
    }
    expect(array2Object(originalArray)).toEqual(targetObject)
  })
})
