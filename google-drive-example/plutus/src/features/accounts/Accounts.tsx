import { useEffect, useState } from "react";
import { db, IAccount, ICategory, ITransaction, OAccountType } from "../../db";

export default function Accounts() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function importData() {
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
      { name: 'Phone' },
    ]

    
    await db.categories.bulkAdd(categories)
    setCategories(categories)

    const transactions: ITransaction[] = [
      { accountId: 1, amount: '10.23', categoryId: 1, cleared: true, date: '2022-10-09', description: 'imported', notes: '' }
    ]
    await db.transactions.bulkAdd(transactions)
    setTransactions(transactions)
  }

  useEffect(() => {
    async function getAccounts() {
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

  function accountItem(account: IAccount) {
    const transactionsForAccount = transactions.filter((transaction) => transaction.accountId === account.id)
    return (
      <div key={account.id}>
        <>
          <p><b>Transactions for account:</b> {account.name} ({transactionsForAccount.length})</p>
          {transactionsForAccount.map((transaction) => {
            const categoryForTransaction = categories.find((category) => category.id === transaction.categoryId)
            return (<>
              <span>Category: {categoryForTransaction?.name}</span>
              <pre key={transaction.id}>{JSON.stringify(transaction)}</pre>
            </>)
          })}
        </>
      </div>
    )
  }

    return (
      <>
        <h1>Accounts</h1>
        <div><button onClick={importData}>Import</button></div>
        <div style={{display: "flex", flexDirection: 'column', gap: '1rem'}}>
          <>
            <h5>Accounts</h5>
            {accounts.map((account) => accountItem(account))}
          </>
        </div>
      </>
    )
}
