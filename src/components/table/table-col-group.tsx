import type { PropType } from "vue"

export default defineComponent({
  name: 'TableColGroup',
  props: {
    dataColumns: {
      type: Array as PropType<any[]>,
      required: true
    },
    columnWidth: {
      type: Object as PropType<Record<string, number>>
    }
  },
  setup(props) {
    const fixedWidth = (width?: number) => {
      if (width) {
        return {
          width: `${width}px`,
          minWidth: `${width}px`,
          maxWidth: `${width}px`
        }
      }
      return undefined
    }
    return () => (
      <colgroup>
        {
          props.dataColumns.map(col => {
            return (
              <col key={`l-col-${col.dataIndex}`} style={fixedWidth(props.columnWidth && col.dataIndex && props.columnWidth[col.dataIndex] || col.width)} />
            )
          })
        }
      </colgroup>
    )
  }
})