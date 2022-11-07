import DataGrid, { IDataGridRow } from '@/components/DataGrid'
import RowCell from '@/components/DataGrid/RowCell'
import InputCurrency from '@/components/Form/InputCurrency'
import InputText from '@/components/Form/InputText'
import React, { useEffect, useState } from 'react'
import { db } from '../../db'

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
    function onRowValueChange (columnKey: string, newValue: number) {
      const allRowsWithUpdates = rows.map((row, indexTemp) => {
        if (rowIndex !== indexTemp) {
          return row // not updating this one, leave it
        }

        return {
          ...row,
          [columnKey]: newValue
        }
      })

      onRowsChange(allRowsWithUpdates)
    }

    return (
      Object.keys(row).map((columnKey) => {
        const rowValueForColumn = row[columnKey]
        return (
          <RowCell key={columnKey}>
            <InputCurrency value={rowValueForColumn} onChange={(newValue) => onRowValueChange(columnKey, newValue)}/>
          </RowCell>)
      })
    )
  }

  function renderCategoryRow (rowIndex: React.Key, row: IDataGridRow, onRowsChange: (rows: any[]) => void) {
    function onRowValueChange (columnKey: string, newValue: string) {
      const allRowsWithUpdates = categoryRows.map((row, indexTemp) => {
        if (rowIndex !== indexTemp) {
          return row // not updating this one, leave it
        }

        return {
          ...row,
          [columnKey]: newValue
        }
      })

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
