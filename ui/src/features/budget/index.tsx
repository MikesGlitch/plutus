import InputCurrency from '@/components/Form/InputCurrency'
import InputText from '@/components/Form/InputText'
import React, { useEffect, useState } from 'react'
import { db } from '../../db'

function HeaderCell ({ name }: { name: string }) {
  return (<div className="outline outline-1 outline-gray-300 px-2 font-bold">{ name }</div>)
}

function Cell ({ value, onChangeValue }: { value: number, onChangeValue: (newValue: number) => void }) {
  return (
    <div className="outline outline-1 outline-gray-300">
      <InputCurrency value={value} onChange={onChangeValue} />
    </div>)
}

function DataGrid ({ columns, rows, onRowsChange, rowRenderer }: { rows: any[], columns: any[], onRowsChange: (rows: any[]) => void, rowRenderer: (key: React.Key, props: IDataGridRow, onRowsChange: (rows: any[]) => void) => React.ReactNode }) {
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

export interface IDataGridRow {
  [key: string]: any
}

function Budget () {
  const [categoryColumns, setCategoryColumns] = useState<any[]>([])
  const [categoryRows, setCategoryRows] = useState<IDataGridRow[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [rows, setRows] = useState<IDataGridRow[]>([])

  useEffect(() => {
    async function getBudget () {
      try {
        setCategoryColumns([{ key: 'category', name: 'Category' }])
        const dbCategories = await db.categories.toArray()
        const allCategories = dbCategories.map((category) => {
          return { category: category.name }
        })
        setCategoryRows(allCategories)

        // For this month
        setColumns([{ key: 'budgeted', name: 'Budgeted' }, { key: 'outflows', name: 'Outflows' }, { key: 'balance', name: 'Balance' }])

        const dbTransactions = await db.transactions.toArray()
        const transactionsThisMonth = dbCategories.map((category) => {
          const transactionsForCategory = dbTransactions.filter((transaction) => transaction.categoryId === category.id)
          const sumOfTransactionsPennies = transactionsForCategory.reduce((prevValue, currentValue) => {
            return prevValue + currentValue.amountPennies
          }, 0)

          const budgeted: number | undefined = undefined

          return {
            budgeted,
            outflows: sumOfTransactionsPennies,
            balance: budgeted === undefined ? 0 - sumOfTransactionsPennies : budgeted - sumOfTransactionsPennies
          }
        })

        setRows(transactionsThisMonth)
      } catch (error) {
        console.error('something bad happened', error)
      }
    }

    getBudget()
  }, [])

  function renderBudgetRow (rowIndex: React.Key, row: IDataGridRow, onRowsChange: (rows: any[]) => void) {
    // Move the onrows change logic out and into datagrid and use Provider https://reactjs.org/docs/context.html#when-to-use-context
    // function myRowRenderer(key: React.Key, props: RowRendererProps<Row>) {
    //   return (
    //     <MyContext.Provider key={key} value={123}>
    //       <Row {...props} />
    //     </MyContext.Provider>
    //   );
    // }

    function onRowValueChange (columnKey: string, newValue: number) {
      // Can this be split out into a util so I don't repeat it?
      const allRowsWithUpdates = rows.map((row, indexTemp) => {
        if (rowIndex !== indexTemp) {
          return row // not updating this one, leave it
        }

        console.log('found the row update', row, row[columnKey])
        return {
          ...row,
          [columnKey]: newValue
        }
      })
      onRowsChange(allRowsWithUpdates)
    }

    return (
      Object.keys(row).map((columnKey, rowIndex) => {
        const rowValueForColumn = row[columnKey]
        return (<Cell key={columnKey} value={rowValueForColumn} onChangeValue={(newValue) => onRowValueChange(columnKey, newValue)}></Cell>)
      })
    )
  }

  function renderCategoryRow (rowIndex: React.Key, row: IDataGridRow, onRowsChange: (rows: any[]) => void) {
    function onRowValueChange (columnKey: string, newValue: string) {
      // Can this be split out into a util so I don't repeat it?
      const allRowsWithUpdates = categoryRows.map((row, indexTemp) => {
        if (rowIndex !== indexTemp) {
          return row // not updating this one, leave it
        }

        console.log('found the category row update', row, row[columnKey], newValue)
        return {
          ...row,
          [columnKey]: newValue
        }
      })

      console.log(allRowsWithUpdates)

      onRowsChange(allRowsWithUpdates)
    }

    return (
      <div key={rowIndex} className="outline outline-1 outline-gray-300">
        <InputText value={row.category} onChange={(newValue) => onRowValueChange('category', newValue)} />
      </div>
    )
  }

  return (
      <>
        <h1>Budget - similar to <a href="https://github.com/adazzle/react-data-grid">https://github.com/adazzle/react-data-grid</a></h1>
        <pre>Categories: { JSON.stringify(categoryRows) }</pre>
        <div className='flex gap-4'>
          <div className='w-64'>
            <DataGrid rows={categoryRows} columns={categoryColumns} onRowsChange={setCategoryRows} rowRenderer={renderCategoryRow}></DataGrid>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <DataGrid rows={rows} columns={columns} onRowsChange={setRows} rowRenderer={renderBudgetRow}></DataGrid>
          </div>
        </div>
      </>
  )
}

export default Budget
