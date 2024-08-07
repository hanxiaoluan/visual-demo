type MaybeRef<T> = T | Ref<T>
type Arrayable<T> = T[] | T
type Recordable<T = any> = Record<string, T>
type BaseType = string | number
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
