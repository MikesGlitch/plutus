import HeaderCell from './HeaderCell'

export interface IDataGridColumn {
  key: string
  name: string
  align?: 'left' | 'center' | 'right'
}

export interface IProps<TColumn, TRow> {
  rows: TRow[]
  columns: TColumn[]
  onRowsChange: (rows: TRow[]) => void
  rowRenderer: (key: React.Key, props: TRow, onRowsChange: (rows: TRow[]) => void) => React.ReactNode
}

export default function DataGrid<TRow> ({ columns, rows, onRowsChange, rowRenderer }: IProps<IDataGridColumn, TRow>) {
  const hasRows = rows.length > 0
  return (
    <div className='grid text-right border' style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)` }}>
      <div className='contents'>
        { columns.map((column) => {
          return (<HeaderCell key={column.key} align={column.align} name={column.name}></HeaderCell>)
        }) }
      </div>
      <div className='contents'>
        { hasRows && rows.map((row, rowIndex) => {
          return (<div className='contents' key={rowIndex}>
            {rowRenderer(rowIndex, row, onRowsChange)}
          </div>)
        }) }
        { !hasRows && <>
          <div className='text-center italic' style={{ gridColumn: `span ${columns.length}` }}>No rows found</div>
        </>}
      </div>
    </div>
  )
}
