import type {App} from 'vue'
import _Table from './table'

const Table = Object.assign(_Table, {
  install: (app: App) => {

    app.component('L' + _Table.name, _Table)
  },
})


export default Table