import type { InjectionKey, Ref } from 'vue'
import type { TableDataWithRaw } from './interface'

export interface TableContext {
  onSelect: (checked: boolean, record: TableDataWithRaw) => void
  onSelectAll: (checked: boolean) => void
  currentSelectedRowKeys: (string | number) []
  currentAllEnabledRowKeys: BaseType[]
}
export const tableInjectionKey: InjectionKey<TableContext> = Symbol('LTable')
