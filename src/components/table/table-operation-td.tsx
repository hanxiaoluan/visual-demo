import { tableInjectionKey } from './context'
import type { TableContext } from './context'
import type { TableDataWithRaw, TableOperationColumn } from './interface'
import { Checkbox } from '@arco-design/web-vue'

const prefixCls = 'l-table'
export default defineComponent({
  name: 'OperationTd',
  props: {
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true
    },
    selectedRowKeys: {
      type: Array as PropType<(string | number)[]>
    },
    record: {
      type: Object as PropType<TableDataWithRaw>,
      required: true
    }
  },
  components: { Checkbox },
  setup(props) {
    console.log(props.selectedRowKeys)
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {})
    const cls = computed(() => [
      `${prefixCls}-td`,
      `${prefixCls}-operation`
    ])
    const selectionStatus = computed(() => {

    })
    return {
      cls,
      tableCtx
    }
  },
  render() {
    const {cls, selectedRowKeys, record, tableCtx} = this
    return (
      <td class={cls}>
        <span class={`${prefixCls}-cell`}>
          <Checkbox 
            modelValue={selectedRowKeys?.includes(record.key)}
            onChange={checked => tableCtx.onSelect?.(checked as boolean, record)}
            disabled={record.disabled}
            // @ts-ignore
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        </span>
      </td>
    )
  }
})