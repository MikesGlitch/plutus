import { useEffect, useState } from 'react'

function HeaderCell ({ name }: { name: string }) {
  return (<div className="outline outline-1 outline-gray-300 px-2 font-bold">{ name }</div>)
}

function Cell ({ title }: { title: string }) {
  return (<div className="outline outline-1 outline-gray-300 px-2">{ title }</div>)
}

function DataGrid ({ columns, rows }: { rows: any[], columns: any[] }) {
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
              return (<Cell key={column.key} title={rowValueForColumn}></Cell>)
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
    setRows([{ budgeted: 'budgeted 1', outflows: 'outflow 1', balance: 'balance 1' }, { budgeted: 'budgeted 2', outflows: 'outflow 2', balance: 'balance 2' }, { budgeted: 'budgeted 3', outflows: 'outflow 3', balance: 'balance 3' }])
  }, [])

  return (
      <>
        <h1>Budget - similar to <a href="https://github.com/adazzle/react-data-grid">https://github.com/adazzle/react-data-grid</a></h1>
        <div className='flex gap-4'>
          <div className='w-64'>
            <DataGrid rows={categoryRows} columns={categoryColumns}></DataGrid>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <DataGrid rows={rows} columns={columns}></DataGrid>
            <DataGrid rows={rows} columns={columns}></DataGrid>
            <DataGrid rows={rows} columns={columns}></DataGrid>
            <DataGrid rows={rows} columns={columns}></DataGrid>
          </div>
        </div>
      </>
  )
}

export default Budget
