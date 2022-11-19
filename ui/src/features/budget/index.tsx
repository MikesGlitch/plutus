import DataGrid, { IDataGridColumn, IRowRenderer } from '@/components/DataGrid'
import RowCell from '@/components/DataGrid/RowCell'
import InputText from '@/components/Form/InputText'
import Heading from '@/components/Typography/Heading'
import Paragraph from '@/components/Typography/Paragraph'
import { useEffect, useState } from 'react'
import { db } from '../../db'
import BudgetRow, { IBudgetRow } from './BudgetRow'

function Budget () {
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

  function renderBudgetRow (row: IRowRenderer<IBudgetRow>) {
    return (<BudgetRow key={row.key} onRowChange={row.onRowChange} row={row.row} />)
  }

  function renderCategoryRow (props: IRowRenderer<ICategoryRow>) {
    function onRowValueChange (columnKey: string, newValue: string) {
      props.onRowChange({ ...props.row, [columnKey]: newValue })
    }

    return (
      <RowCell>
        <InputText value={props.row.category} onChange={(newValue) => onRowValueChange('category', newValue)} />
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
