import type { PropType } from "vue"
import type { TableOperationColumn } from './interface'
export default defineComponent({
  name: 'TableColGroup',
  props: {
    dataColumns: {
      type: Array as PropType<any[]>,
      required: true
    },
    columnWidth: {
      type: Object as PropType<Record<string, number>>
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true
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
          props.operations.map((operation) => {
            return <col key={`l-col-${operation.name}`} class={`l-table-${operation.name}-col`} style={fixedWidth(operation.width)} />
          })
        }
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