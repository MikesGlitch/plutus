import DataGrid, { IDataGridColumn, IRowRenderer } from '@/components/DataGrid'
import { useEffect, useState } from 'react'
import { db } from '../../db'
import BudgetRow, { IBudgetRow } from './BudgetRow'

interface IProps {
  month: string
}

export default function BudgetMonth (props: IProps) {
  const [columns, setColumns] = useState<IDataGridColumn[]>([])
  const [rows, setRows] = useState<IBudgetRow[]>([])

  useEffect(() => {
    async function getBudget () {
      try {
        // For this month
        setColumns([{ key: 'budgeted', name: 'Budgeted' }, { key: 'outflows', name: 'Outflows' }, { key: 'balance', name: 'Balance' }])

        const dbTransactions = await db.transactions.toArray()
        const dbCategories = await db.categories.toArray()
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

  return (
      <div>
        {props.month}
        <DataGrid rows={rows} columns={columns} onRowsChange={setRows} rowRenderer={renderBudgetRow}></DataGrid>
      </div>
  )
}
