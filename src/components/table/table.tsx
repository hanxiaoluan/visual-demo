import TableBody from './table-tbody'
import Tr from './table-tr'
import Td from './table-td'
import TableColGroup from './table-col-group'
import Thead from './table-thead'
import Th from './table.th'
import './style/index.less'
const prefixCls = `l-table`

export default defineComponent({
  name: 'Table',
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props) {
    const {data, columns} = toRefs(props)
    const render = () => {
      return (
        <div class='l-table l-table-border'>
          <table class={`${prefixCls}-element`} cellpadding={0} cellspacing={0}>
            <TableColGroup dataColumns={props.columns} />
            <Thead>
              <Tr>
                {
                  columns.value.map((column, index) => {
                    return <Th column={column} />
                  })
                }
              </Tr>
            </Thead>
            <TableBody>
              {
                data.value.map((record, index) => {
                  return <Tr>
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