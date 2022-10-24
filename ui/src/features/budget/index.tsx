import InputCurrency from '@/components/Form/InputCurrency'
import { useEffect, useState } from 'react'

function HeaderCell ({ name }: { name: string }) {
  return (<div className="outline outline-1 outline-gray-300 px-2 font-bold">{ name }</div>)
}

function Cell ({ value, onChangeValue }: { value: number, onChangeValue: (newValue: number) => void }) {
  return (
    <div className="outline outline-1 outline-gray-300">
      <InputCurrency value={value} onChange={onChangeValue} />
    </div>)
}

function DataGrid ({ columns, rows, onRowsChange }: { rows: any[], columns: any[], onRowsChange: (rows: any[]) => void }) {
  return (
    <div className='grid text-right' style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)` }}>
      <div className='contents'>
        { columns.map((column) => {
          return (<HeaderCell key={column.key} name={column.name}></HeaderCell>)
        }) }
      </div>
      <div className='contents'>
        { rows.map((row) => {
          return (<div className='contents' key={row.id}>
            {columns.map((column) => {
              const rowValueForColumn = row[column.key]
              return (<Cell key={column.key} value={rowValueForColumn} onChangeValue={(newValue) => onRowsChange([])}></Cell>)
            })}
          </div>)
        }) }
      </div>
    </div>
  )
}

function Budget () {
  const [categoryColumns, setCategoryColumns] = useState<any[]>([])
  const [categoryRows, setCategoryRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    setCategoryColumns([{ key: 'category', name: 'Category' }])
    setCategoryRows([{ category: 'Category 1' }, { category: 'Category 2' }, { category: 'Category 3' }])

    setColumns([{ key: 'budgeted', name: 'Budgeted' }, { key: 'outflows', name: 'Outflows' }, { key: 'balance', name: 'Balance' }])
    setRows([{ budgeted: 1.22, outflows: 9, balance: -1.25 }, { budgeted: 58, outflows: 33.25, balance: -98.25 }, { budgeted: 5522.25, outflows: 12.32, balance: 21.25 }])
  }, [])

  return (
      <>
        <h1>Budget - similar to <a href="https://github.com/adazzle/react-data-grid">https://github.com/adazzle/react-data-grid</a></h1>
        <div className='flex gap-4'>
          <div className='w-64'>
            <DataGrid rows={categoryRows} columns={categoryColumns} onRowsChange={(newRows) => { return newRows } }></DataGrid>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <DataGrid rows={rows} columns={columns} onRowsChange={setRows}></DataGrid>
            <DataGrid rows={rows} columns={columns} onRowsChange={setRows}></DataGrid>
            <DataGrid rows={rows} columns={columns} onRowsChange={setRows}></DataGrid>
            <DataGrid rows={rows} columns={columns} onRowsChange={setRows}></DataGrid>
          </div>
        </div>
      </>
  )
}

export default Budget
