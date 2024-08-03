import type {TableOperationColumn} from './interface'
import { Checkbox } from '@arco-design/web-vue'
import {tableInjectionKey} from './context'
import type {TableContext} from './context'
const prefixCls = 'l-table'
export default defineComponent({
  name: 'OperationTh',
  components: { Checkbox },
  props: {
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true
    },
    showSelectAll: {
      type: Boolean as PropType<boolean>
    }
  },
  setup() {
    const tableCtx = inject<TableContext>(tableInjectionKey) as TableContext
    const cls = computed(() => [
      `${prefixCls}-th`,
      `${prefixCls}-operation`
    ])
    const checkboxStatus = computed(() => {
      let checked = false
      let indeterminate = false
      
      // 当前所有可选行的key
      const currentAllEnabledRowKeys = tableCtx.currentAllEnabledRowKeys
      const currentAllSelectedEnableRowKeys = tableCtx.currentSelectedRowKeys?.filter(key => currentAllEnabledRowKeys.includes(key)) 

      const selectedNumber = currentAllSelectedEnableRowKeys.length
      const totalEnabledNumber = tableCtx.currentAllEnabledRowKeys.length
      if (selectedNumber > 0) {
        if (selectedNumber >= totalEnabledNumber) {
          checked = true
        } else {
          indeterminate = true
        }
      }
      return {
        checked,
        indeterminate
      }
    })
    return {
      cls,
      checkboxStatus,
      onSelectAll: tableCtx.onSelectAll
    }
  },
  render () {
    const {cls, checkboxStatus, showSelectAll} = this
    return (
      <th class={cls}>
        <span class={`${prefixCls}-cell`}>
          {
            showSelectAll && <Checkbox
            modelValue={checkboxStatus.checked}
            indeterminate={checkboxStatus.indeterminate}
            onChange={checked => this.onSelectAll(checked as boolean)}
            />
          }
        </span>
      </th>
    )
  }
})