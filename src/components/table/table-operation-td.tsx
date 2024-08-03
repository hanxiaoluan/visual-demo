import { tableInjectionKey } from './context'
import type { TableContext } from './context'
import type { TableDataWithRaw, TableOperationColumn } from './interface'
import { Checkbox, Radio } from '@arco-design/web-vue'
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
  components: { Checkbox, Radio },
  setup(props) {
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {})
    const cls = computed(() => [
      `${prefixCls}-td`,
      `${prefixCls}-operation`
    ])
    const selectionStatus = computed(() => {

    })
    const renderContent = () => {
      const {operationColumn} = props
      if (operationColumn.name === 'selection-radio') {
        return (
          <Radio 
            modelValue={props.selectedRowKeys?.includes(props.record.key)}
            onChange={checked => tableCtx.onSelect?.(checked as boolean, props.record)}
            // @ts-ignore
            onClick={(ev: Event) => ev.stopPropagation()}
            disabled={props.record.disabled} />
        )}

      if (operationColumn.name === 'selection-checkbox') {
        return (
          <Checkbox 
            modelValue={props.selectedRowKeys?.includes(props.record.key)}
            onChange={checked => tableCtx.onSelect?.(checked as boolean, props.record)}
            disabled={props.record.disabled}
            // @ts-ignore
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )
      }
    }
    return {
      cls,
      tableCtx,
      renderContent
    }
  },
  render() {
    const {cls, selectedRowKeys, record, tableCtx, renderContent} = this
    return (
      <td class={cls}>
        <span class={`${prefixCls}-cell`}>
          {
            renderContent()
          }
        </span>
      </td>
    )
  }
})