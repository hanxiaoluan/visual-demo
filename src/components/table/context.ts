import type { InjectionKey } from 'vue'
import type { TableDataWithRaw } from './interface'

export interface TableContext {
  onSelect: (checked: boolean, record: TableDataWithRaw) => void
}
export const tableInjectionKey: InjectionKey<TableContext> = Symbol('LTable')
