
import Dexie, { Table } from 'dexie'

export interface IUser {
  id?: number // apparently needs to be nullable for inserts???  ANNOYING!
  username: string
  firstName: string
  lastName: string
  age: number
}

export const OAccountType = {
  Savings: 'Savings',
  Spending: 'Spending',
  CreditCard: 'CreditCard',
  ISA: 'ISA',
  GeneralInvestment: 'GIA',
  Pension: 'Pension'
} as const

export type AccountType = typeof OAccountType[keyof typeof OAccountType]

export interface IAccount {
  id?: number
  name: string
  type: AccountType
  offBudget: boolean
}

export interface ICategory {
  id?: number
  name: string
}

export interface IPayee {
  id?: number
  name: string
}

export interface ITransaction {
  id?: number
  accountId: IAccount['id']
  payeeId: IPayee['id']
  categoryId: ICategory['id']
  amountPennies: number // stored in pennied as numeric to respect precision. Formatting applied on display
  description: string
  notes: string
  date: string
  cleared: boolean
}

export class MySubClassedDexie extends Dexie {
  // 'users' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<IUser>
  categories!: Table<ICategory>
  payees!: Table<IPayee>
  accounts!: Table<IAccount>
  transactions!: Table<ITransaction>

  constructor () {
    super('plutus')
    this.version(1).stores({
      users: '++id, username', // Primary key and indexed props
      accounts: '++id, type', // Primary key and indexed props
      categories: '++id, name', // Primary key and indexed props
      payees: '++id, name', // Primary key and indexed props
      transactions: '++id, accountId, categoryId' // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()
