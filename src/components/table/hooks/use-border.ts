import { isObject } from 'lodash-es'
import type { TableBorder } from '../interface'
const DEFAULT_BORDERED = {
  wrapper: true,
  cell: false,
  headerCell: false,
  bodyCell: false
}
const prefixCls = 'l-table'
export function useBordered (_bordered: TableBorder| boolean) {
  const bordered = computed(() => {
    if (isObject(_bordered)) {
      return  {...DEFAULT_BORDERED, ..._bordered}
    }
  
    return {...DEFAULT_BORDERED, wrapper: _bordered} as TableBorder
  })
  

  return {
    bordered,
    borderCls: {
      [`${prefixCls}-border`]: bordered.value.wrapper,
      [`${prefixCls}-border-cell`]: bordered.value.cell,
      [`${prefixCls}-border-header-cell`]:
        !bordered.value.cell && bordered.value.headerCell,
      [`${prefixCls}-border-body-cell`]:
        !bordered.value.cell && bordered.value.bodyCell,
    }
  }
}