type MaybeRef<T> = T | Ref<T>
type Arrayable<T> = T[] | T
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
