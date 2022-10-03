
import Dexie, { Table } from 'dexie';

export interface User {
  id?: number // apparently needs to be nullable for inserts???  ANNOYING!
  username: string
  firstName: string
  lastName: string
  age: number
}

export class MySubClassedDexie extends Dexie {
  // 'users' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<User>; 

  constructor() {
    super('plutus');
    this.version(1).stores({
      users: '++id, username' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
