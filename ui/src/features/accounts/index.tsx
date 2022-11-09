import { useEffect, useState } from 'react'
import { db, IAccount, ICategory, ITransaction, OAccountType } from '../../db'
import InputCurrency from '@/components/Form/InputCurrency'
import DataGrid, { IDataGridColumn } from '@/components/DataGrid'
import RowCell from '@/components/DataGrid/RowCell'
import InputText from '@/components/Form/InputText'

export default function Accounts () {
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [testMoneyInput, setTestMoneyInput] = useState<number>()

  async function importData () {
    const accounts: IAccount[] = [
      { name: 'Santander Savings', type: OAccountType.Savings },
      { name: 'IWeb ISA', type: OAccountType.ISA },
      { name: 'Halifax Spending', type: OAccountType.Spending },
      { name: 'Fidelity Pension', type: OAccountType.Pension },
      { name: 'IWeb GIA', type: OAccountType.GeneralInvestment }
    ]

    await db.accounts.bulkAdd(accounts)
    setAccounts(accounts)

    const categories: ICategory[] = [
      { name: 'Spending' },
      { name: 'Gas and Electricity' },
      { name: 'Phone' }
    ]

    await db.categories.bulkAdd(categories)
    setCategories(categories)

    const transactions: ITransaction[] = [
      { accountId: 1, amountPennies: 1023, categoryId: 1, cleared: true, date: '2022-10-09', description: 'imported', notes: '' }
    ]
    await db.transactions.bulkAdd(transactions)
    setTransactions(transactions)
  }

  useEffect(() => {
    async function getAccounts () {
      try {
        const dbAccounts = await db.accounts.toArray()
        setAccounts(dbAccounts)
        const dbCategories = await db.categories.toArray()
        setCategories(dbCategories)
        const dbTransactions = await db.transactions.toArray()
        setTransactions(dbTransactions)
      } catch (error) {
        console.error('something bad happened', error)
      }
    }

    getAccounts()
  }, [])

  function accountItem (account: IAccount) {
    const transactionsForAccount = transactions.filter((transaction) => transaction.accountId === account.id)

    const columns: IDataGridColumn[] = [
      { key: 'date', name: 'Date' },
      { key: 'payee', name: 'Payee' },
      { key: 'category', name: 'Category' },
      { key: 'outflow', name: 'Outflow' },
      { key: 'inflow', name: 'Inflow' }
    ]

    function setRows (rows: ITransaction[]) {
      console.log('not implemented yet', rows)
    }

    function renderTransactionRow (rowIndex: React.Key, row: ITransaction, onRowsChange: (rows: ITransaction[]) => void) {
      const categoryForTransaction = categories.find((category) => category.id === row.categoryId)
      return (
        <>
          <RowCell>
            <InputText value={row.date} />
          </RowCell>
          <RowCell>
            <InputText value='dont have' />
          </RowCell>
          <RowCell>
            <InputText value={categoryForTransaction?.name} />
          </RowCell>
          <RowCell>
            <InputCurrency readonly value={row.amountPennies} />
          </RowCell>
          <RowCell>
            <InputText value='dont have' />
          </RowCell>
        </>
      )
    }

    return (
      <div key={account.id}>
          <p><b>Transactions for account:</b> {account.name} ({transactionsForAccount.length})</p>
          <DataGrid rows={transactionsForAccount} columns={columns} onRowsChange={setRows} rowRenderer={renderTransactionRow}></DataGrid>
      </div>
    )
  }

  return (
      <>
        <h1 className="text-xl font-bold">Accounts</h1>
        <div><button className="" onClick={importData}>Import</button></div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <InputCurrency value={testMoneyInput} onChange={(newValue) => setTestMoneyInput(newValue)} />
        </div>
        <div className="flex flex-col gap-6">
          {accounts.map((account) => accountItem(account))}
        </div>
      </>
  )
}
