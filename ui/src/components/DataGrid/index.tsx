import HeaderCell from './HeaderCell'

export interface IDataGridColumn {
  key: string
  name: string
  align?: 'left' | 'center' | 'right'
}

export interface IRowRenderer<TRow> {
  key: React.Key
  row: TRow
  onRowChange: (row: TRow) => void
}

export interface IProps<TColumn, TRow> {
  rows: TRow[]
  columns: TColumn[]
  onRowsChange: (rows: TRow[]) => void
  rowRenderer: (row: IRowRenderer<TRow>) => React.ReactNode
}

export default function DataGrid<TRow> ({ columns, rows, onRowsChange, rowRenderer }: IProps<IDataGridColumn, TRow>) {
  const hasRows = rows.length > 0

  function onRowChange (rowIndex: number, newRow: TRow) {
    const allRowsWithUpdates = rows.map((row, indexTemp) => {
      if (rowIndex !== indexTemp) {
        return row // not updating this one, leave it
      }

      return newRow // return changed row
    })

    onRowsChange(allRowsWithUpdates)
  }

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
            {rowRenderer({ key: rowIndex, row, onRowChange: (newRow) => onRowChange(rowIndex, newRow) })}
          </div>)
        }) }
        { !hasRows && <>
          <div className='text-center italic' style={{ gridColumn: `span ${columns.length}` }}>No rows found</div>
        </>}
      </div>
    </div>
  )
}
