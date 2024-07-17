import { createVNode } from 'vue'

const prefixCls = 'l-table-th'
const cellPrefixCls = 'l-table-cell'

export default defineComponent({
  name: 'Th',
  props: {
    column: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup (props) {
    const {column} = toRefs(props)

    const thCls = computed(() => [
      `${prefixCls}`
    ])
    const cellCls = computed(() => [
      `${cellPrefixCls}`,
      `${cellPrefixCls}-align-${props.column.align ?? 'left'}`
    ])
    const renderCell = () => (
      <span class={cellCls.value}>
        {column.value.title}
      </span>
    )
    return {renderCell, thCls}
  },
  render () {
    const {renderCell, thCls} = this
    return (
      createVNode('th', 
      {
        class: thCls
      }, 
      {
        default: () => [
          renderCell()
        ]
      })
    )
  }
})