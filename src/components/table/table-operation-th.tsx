import type {TableOperationColumn} from './interface'
import { Checkbox } from '@arco-design/web-vue'

const prefixCls = 'l-table'
export default defineComponent({
  name: 'OperationTh',
  components: { Checkbox },
  props: {
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true
    }
  },
  setup() {
    const cls = computed(() => [
      `${prefixCls}-th`,
      `${prefixCls}-operation`
    ])
    return {
      cls
    }
  },
  render () {
    const {cls} = this
    return (
      <th class={cls}>
        <span class={`${prefixCls}-cell`}><Checkbox /></span>
      </th>
    )
  }
})