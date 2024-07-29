import {union} from '@/utils/array'
import type { Ref } from 'vue'
import type {TableRowSelection, TableDataWithRaw} from '../interface'
interface UseRowSelectionParam {
  selectedKeys: Ref<(string|number)[] | undefined>
  defaultSelectedKeys: Ref<(string|number)[] | undefined>
  emit: (...args: any[]) => any,
  rowSelection: Ref<TableRowSelection | undefined>
}
export const useRowSelection = ({
  selectedKeys,
  defaultSelectedKeys,
  rowSelection,
  emit
}: UseRowSelectionParam) => {
  const isRadio = computed(() => rowSelection.value?.type === 'radio')
  const _selectedRowKeys = ref(defaultSelectedKeys.value ?? 
    rowSelection.value?.defaultSelectedRowKeys ?? 
    []
  )
  
  const selectedRowKeys = computed(() => selectedKeys.value ?? rowSelection.value?.selectedRowKeys ?? _selectedRowKeys.value)

  const currentSelectedRowKeys = computed(() => selectedRowKeys.value)
  const handleSelect = (checked: boolean, record: TableDataWithRaw) => {
    const selectedAllRowKeys = isRadio.value ? [record.key] : union(selectedRowKeys.value, [record.key], !checked)
    _selectedRowKeys.value = selectedAllRowKeys
    emit('select', selectedAllRowKeys, record.key, record.raw)
    emit('selectionChange', selectedAllRowKeys)
    emit('update:selectedKeys', selectedAllRowKeys)
  }

  return {
    isRadio,
    selectedRowKeys,
    currentSelectedRowKeys,
    handleSelect
  }
}