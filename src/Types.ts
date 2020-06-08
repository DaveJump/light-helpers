export interface ArrayLike<T> {
  readonly length: number
  readonly [n: number]: T
}

export interface Dictionary<T = any> extends Record<string, T> { }
export interface NumericDictionary<T = any> extends Record<number, T> { }

export type List<T> = ArrayLike<T>
export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> { }
export interface ListOfRecursiveArraysOrValues<T> extends List<T | RecursiveArray<T>> { }

export interface RecursiveDictionary<T> extends Dictionary<T | RecursiveDictionary<T>> { }