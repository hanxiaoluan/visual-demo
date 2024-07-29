export interface TableRowSelection {
  type?: 'checkbox' | 'radio'
  selectedRowKeys?: (string | number)[]
  defaultSelectedRowKeys?: (string | number)[]
  showCheckedAll?: boolean
  title?: string
  width?: number
}

export interface TableOperationColumn {
  name: string
  title: string
  width: number
  fixed?: boolean
  render?: (...args: any[]) => any
  isLastLeftFixed?: boolean
}

export interface TableData {
  key?: string
  [name: string]: any
}

export interface TableDataWithRaw {
  raw: TableData
  key: string
  disabled?: boolean
  children?: TableDataWithRaw[]
}