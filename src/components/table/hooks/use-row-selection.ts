import {union} from '@/utils/array'
import type { Ref } from 'vue'
import type {TableRowSelection, TableDataWithRaw} from '../interface'
interface UseRowSelectionParam {
  selectedKeys: Ref<(string|number)[] | undefined>
  defaultSelectedKeys: Ref<(string|number)[] | undefined>
  currentAllRowKeys: Ref<(string|number)[]>
  currentAllEnabledRowKeys: Ref<(string|number)[]>
  emit: (...args: any[]) => any,
  rowSelection: Ref<TableRowSelection | undefined>
}
export const useRowSelection = ({
  selectedKeys,
  defaultSelectedKeys,
  rowSelection,
  currentAllRowKeys,
  currentAllEnabledRowKeys,
  emit
}: UseRowSelectionParam) => {
  const isRadio = computed(() => rowSelection.value?.type === 'radio')
  const _selectedRowKeys = ref(defaultSelectedKeys.value ?? 
    rowSelection.value?.defaultSelectedRowKeys ?? 
    []
  )
  
  // 所有选中行的key, 可能包括禁用的行
  const selectedRowKeys = computed(() => selectedKeys.value ?? rowSelection.value?.selectedRowKeys ?? _selectedRowKeys.value)

  // 当前选中的行的key
  const currentSelectedRowKeys = computed(() => selectedRowKeys.value)

  const handleSelect = (checked: boolean, record: TableDataWithRaw) => {
    const newKeys = isRadio.value ? [record.key] : union(selectedRowKeys.value, [record.key], !checked)
    _selectedRowKeys.value = newKeys
    emit('select', newKeys, record.key, record.raw)
    emit('selectionChange', newKeys)
    emit('update:selectedKeys', newKeys)
  }

  const handleSelectAll = (checked: boolean) => {
    console.log('--------------')
    const newKeys = union(selectedRowKeys.value, currentAllEnabledRowKeys.value, !checked)
    _selectedRowKeys.value = newKeys
    emit('selectAll', checked)
    emit('selectionChange', newKeys)
    emit('update:selectedKeys', newKeys)
  }
  return {
    isRadio,
    selectedRowKeys,
    currentSelectedRowKeys,
    handleSelect,
    handleSelectAll
  }
}