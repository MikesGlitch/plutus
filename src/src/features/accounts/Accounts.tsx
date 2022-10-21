import { ChangeEvent, useEffect, useState } from 'react'
import { db, IAccount, ICategory, ITransaction, OAccountType } from '../../db'
import Table from '@/components/Table'
import TableData from '@/components/Table/TableData'
import TableHeader from '@/components/Table/TableHeader'
import { useCurrency } from '@/hooks/useCurrency'

export default function Accounts () {
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [testMoneyInput, setTestMoneyInput] = useState<string>()
  const { fromPenniesToCurrency, toPennies, isValidCurrency } = useCurrency()

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

    const transactionRows = transactionsForAccount.map((transaction) => {
      const categoryForTransaction = categories.find((category) => category.id === transaction.categoryId)
      return (
        <tr key={transaction.id}>
          <TableData>{transaction.date}</TableData>
          <TableData>dont have</TableData>
          <TableData>{categoryForTransaction?.name}</TableData>
          <TableData>{fromPenniesToCurrency(transaction.amountPennies)}</TableData>
          <TableData>dont really have</TableData>
        </tr>
      )
    })

    const headers = [
      (<TableHeader key={'date'}>Date</TableHeader>),
      (<TableHeader key={'payee'}>Payee</TableHeader>),
      (<TableHeader key={'category'}>Category</TableHeader>),
      (<TableHeader key={'outflow'}>Outflow</TableHeader>),
      (<TableHeader key={'inflow'}>Inflow</TableHeader>)
    ]

    return (
      <div key={account.id}>
          <p><b>Transactions for account:</b> {account.name} ({transactionsForAccount.length})</p>
          <Table
            headers={headers}
            rows={transactionRows}
          />
      </div>
    )
  }

  function changeMoneyInput (event: ChangeEvent<HTMLInputElement>) {
    setTestMoneyInput(event.target.value)
  }

  const testMoneyValid = testMoneyInput === undefined ? true : isValidCurrency(testMoneyInput)

  return (
      <>
        <h1 className="text-xl font-bold">Accounts</h1>
        <div><button className="" onClick={importData}>Import</button></div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <p className=" text-4xl font-bold text-red-600">Make an input currency component like this - should not allow entering invalid values - should probably lock in 2 decimal places: https://primefaces.org/primevue/inputnumber </p>
          <input
            type="number"
            step={undefined}
            className={`border w-1/2 px-4 py-2 ${testMoneyValid ? 'border-gray-500' : 'border-red-600'}`}
            placeholder='Enter human readable currency value'
            value={testMoneyInput}
            onChange={changeMoneyInput} />
          <p><span className='font-bold'>Formatted</span> {testMoneyValid && testMoneyInput !== undefined ? toPennies(testMoneyInput) : 'Invalid input' }</p>
        </div>
        <div className="flex flex-col gap-6">
          {accounts.map((account) => accountItem(account))}
        </div>
      </>
  )
}
