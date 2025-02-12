export type VirtualItemKey = string | number

export type ScrollOptions =
  | number
  | { index?: number; key?: VirtualItemKey; align?: 'auto' | 'top' | 'bottom' }