import DataGrid, { IDataGridColumn } from '@/components/DataGrid'
import RowCell from '@/components/DataGrid/RowCell'
import InputCurrency from '@/components/Form/InputCurrency'
import InputText from '@/components/Form/InputText'
import Heading from '@/components/Typography/Heading'
import Paragraph from '@/components/Typography/Paragraph'
import React, { useEffect, useState } from 'react'
import { db } from '../../db'

function Budget () {
  interface IBudgetRow {
    budgeted?: number
    outflows: number
  }

  interface ICategoryRow {
    category: string
  }

  const [categoryColumns, setCategoryColumns] = useState<IDataGridColumn[]>([])
  const [categoryRows, setCategoryRows] = useState<ICategoryRow[]>([])
  const [columns, setColumns] = useState<IDataGridColumn[]>([])
  const [rows, setRows] = useState<IBudgetRow[]>([])

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
            outflows: sumOfTransactionsPennies
          }
        })

        setRows(transactionsThisMonth)
      } catch (error) {
        console.error('something bad happened', error)
      }
    }

    getBudget()
  }, [])

  function renderBudgetRow (rowIndex: React.Key, row: IBudgetRow, onRowsChange: (rows: IBudgetRow[]) => void) {
    function onRowValueChange (columnKey: keyof IBudgetRow, newValue?: number) {
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
    const balance = row.budgeted === undefined ? 0 - row.outflows : row.budgeted - row.outflows

    return (
      <>
        <RowCell>
          <InputCurrency value={row.budgeted} onChange={(newValue) => onRowValueChange('budgeted', newValue)}/>
        </RowCell>
        <RowCell>
          <InputCurrency readonly value={row.outflows} />
        </RowCell>
        <RowCell>
          <InputCurrency readonly value={balance} />
        </RowCell>
      </>
    )
  }

  function renderCategoryRow (rowIndex: React.Key, row: ICategoryRow, onRowsChange: (rows: ICategoryRow[]) => void) {
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
      <RowCell>
        <InputText value={row.category} onChange={(newValue) => onRowValueChange('category', newValue)} />
      </RowCell>
    )
  }

  return (
      <>
        <Heading>Budget</Heading>
        <Paragraph>similar to <a href="https://github.com/adazzle/react-data-grid">https://github.com/adazzle/react-data-grid</a></Paragraph>
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
