import type {
  TableRowSelection, 
  TableOperationColumn,
  TableData,
  TableDataWithRaw
} from './interface'
import TableBody from './table-tbody'
import Tr from './table-tr'
import Td from './table-td'
import ColGroup from './table-col-group'
import OperationTh from './table-operation-th'
import Thead from './table-thead'
import Th from './table.th'
import OperationTd from './table-operation-td'
import './style/index.less'
import {useRowSelection} from './hooks/use-row-selection'
import {tableInjectionKey} from './context'
const prefixCls = `l-table`

export default defineComponent({
  name: 'Table',
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<TableData[]>,
      default: () => []
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    selectedKeys: {
      type: Array as PropType<(string | number)[]>
    },
    defaultSelectedKeys: {
      type: Array as PropType<(string | number)[]>
    },
    rowSelection: {
      type: Object as PropType<TableRowSelection>
    },
    rowKey: {
      type: String,
      default: 'key',
    },
  },
  emits: {
    'update:selectedKeys': (rowKeys: (string|number)[]) => true
  },
  setup(props, {emit}) {
    const {data, columns, selectedKeys, defaultSelectedKeys, rowSelection, rowKey} = toRefs(props)

    const operations = computed(() => {
      const res: TableOperationColumn[] = []
      let selection: TableOperationColumn | undefined
      if (props.rowSelection) {
        selection = {
          name: `selection-${props.rowSelection.type}`,
          title: props.rowSelection.title!,
          width: props.rowSelection.width!
        }
        res.push(selection!)
      }
      return res
    })
    const processedData = computed(() => {
      const traverse = (data: TableData[]) => {
        const result: TableDataWithRaw[] = []
        for (const _record of data) {
          const record: TableDataWithRaw = {
            raw: _record,
            key: _record[rowKey.value],
            disabled: _record.disabled
          }
          result.push(record)
        }

        return result
      }
      return traverse(props.data ?? [])
    })

    const currentAllRowKeys = computed(() => {
      const keys: (string | number)[] = []
      const traverse = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          keys.push(record.key)
          if (record.children) {
            traverse(record.children)
          }
        }
      }
      traverse(processedData.value ?? [])
      return keys
    })

    const currentAllEnabledRowKeys = computed(() => {
      const keys: (string | number)[] = []
      const traverse = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          if (!record.disabled) {
            keys.push(record.key)
          }
          if (record.children) {
            traverse(record.children)
          }
        }
      }
      traverse(processedData.value ?? [])
      return keys
    })
    const {
      selectedRowKeys, 
      handleSelect, 
      currentSelectedRowKeys,

      handleSelectAll
    } = useRowSelection({
      selectedKeys, 
      defaultSelectedKeys, 
      currentAllRowKeys,
      currentAllEnabledRowKeys,
      rowSelection, 
      emit
    })

    provide(tableInjectionKey, reactive({
      onSelect: handleSelect,
      onSelectAll: handleSelectAll,
      currentSelectedRowKeys,
      currentAllEnabledRowKeys
    }))
    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-border`]: props.bordered,
        [`${prefixCls}-hover`]: props.hoverable
      }
    ])
    const render = () => {
      return (
        <div class={cls.value}>
          <table class={`${prefixCls}-element`} cellpadding={0} cellspacing={0}>
            <ColGroup dataColumns={props.columns} operations={operations.value} />
            <Thead>
              <Tr>
                {
                  operations.value.map((operation, index) => {
                    return <OperationTh 
                      operationColumn={operation} 
                      showSelectAll={Boolean(props.rowSelection?.showCheckedAll && operation.name === 'selection-checkbox')} />
                  })
                }
                {
                  columns.value.map((column, index) => {
                    return <Th column={column} />
                  })
                }
              </Tr>
            </Thead>
            <TableBody>
              {
                processedData.value.map((record, index) => {
                  return <Tr>
                    {
                      operations.value.map((operation, index) => {
                        return <OperationTd operationColumn={operation} selectedRowKeys={currentSelectedRowKeys.value} record={record}/>
                      })
                    }
                    {
                      columns.value.map((column) => {
                        return <Td record={record} column={column} />
                      })
                    }
                  </Tr>
                })
              }
            </TableBody>
          </table>
        </div>
        
      )
    }
    return {
      render
    }
  },
  render () {
    return this.render()
  }
})