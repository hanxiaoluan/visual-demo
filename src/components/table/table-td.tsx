import {createVNode} from 'vue'

const prefixCls = 'l-table-td'
const cellPrefixCls = 'l-table-cell'
export default defineComponent({
  name: 'Td',
  props: {
    record: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    column: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  setup(props) {

    const style = computed(() => {
      
    })
    const cls = computed(() => [
      `${prefixCls}`,
    ])
    const cellCls = computed(() => [
      `${cellPrefixCls}`,
      `${cellPrefixCls}-align-${props.column.align ?? 'left'}`
    ])
    const renderCell = () => {
      return <span class={cellCls.value}>
        {props.record[props.column.dataIndex]}
      </span>
    }
    return {
      cls,
      renderCell
    }
  },
  render () {
    const {cls, renderCell} = this
    return createVNode('td', {class: cls}, {
      default: () => [renderCell()]
    })
  }
})