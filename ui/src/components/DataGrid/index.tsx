import HeaderCell from './HeaderCell'

export interface IDataGridColumn {
  key: string
  name: string
}

export interface IProps<TColumn, TRow> {
  rows: TRow[]
  columns: TColumn[]
  onRowsChange: (rows: TRow[]) => void
  rowRenderer: (key: React.Key, props: TRow, onRowsChange: (rows: TRow[]) => void) => React.ReactNode
}

export default function DataGrid<TRow> ({ columns, rows, onRowsChange, rowRenderer }: IProps<IDataGridColumn, TRow>) {
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
