import HeaderCell from './HeaderCell'

export interface IDataGridRow {
  [key: string]: any
}

export interface IProps {
  rows: any[]
  columns: any[]
  onRowsChange: (rows: any[]) => void
  rowRenderer: (key: React.Key, props: IDataGridRow, onRowsChange: (rows: any[]) => void) => React.ReactNode
}

export default function DataGrid ({ columns, rows, onRowsChange, rowRenderer }: IProps) {
  return (
    <div className='grid text-right' style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)` }}>
      <div className='contents'>
        { columns.map((column) => {
          return (<HeaderCell key={column.key} name={column.name}></HeaderCell>)
        }) }
      </div>
      <div className='contents'>
        { rows.map((row, rowIndex) => {
          return (<div className='contents' key={rowIndex}>
            {rowRenderer(rowIndex, row, onRowsChange)}
          </div>)
        }) }
      </div>
    </div>
  )
}
