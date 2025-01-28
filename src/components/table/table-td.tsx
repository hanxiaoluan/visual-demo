import { createVNode } from 'vue'
import type { TableDataWithRaw } from './interface'
const prefixCls = 'l-table-td'
const cellPrefixCls = 'l-table-cell'
export default defineComponent({
  name: 'Td',
  props: {
    record: {
      type: Object as PropType<TableDataWithRaw>,
      default: () => ({}),
    },
    column: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
    rowSpan: {
      type: Number as PropType<number>,
      default: 1,
    },
    colSpan: {
      type: Number as PropType<number>,
      default: 1,
    },
  },
  setup(props, { slots }) {
    const style = computed(() => {})
    const cls = computed(() => [`${prefixCls}`])
    const cellCls = computed(() => [
      `${cellPrefixCls}`,
      `${cellPrefixCls}-align-${props.column.align ?? 'left'}`,
    ])

    // 渲染单元格的内容
    const renderContent = () => {
      if (slots.default) return slots.default()
      return props.record.raw[props.column.dataIndex]
    }
    // 渲染单元格
    const renderCell = () => {
      return (
        <span class={cellCls.value}>
          {props.record.raw[props.column.dataIndex]}
        </span>
      )
    }
    return {
      cls,
      renderCell,
    }
  },
  render() {
    const { cls, renderCell } = this
    return createVNode(
      'td',
      { class: cls },
      {
        default: () => [renderCell()],
      },
    )
  },
})
