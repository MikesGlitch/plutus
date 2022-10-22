import { useEffect, useState } from 'react'
import { db, IUser } from '../../db'

function UserList () {
  const [users, setUsers] = useState<IUser[]>([])
  const [searchFilter, setSearchFilter] = useState<string>('')

  useEffect(() => {
    async function getUsers () {
      try {
        const dbUsers = await db.users.filter((user) => (`${user.firstName} ${user.lastName}`).includes(searchFilter)).toArray()
        setUsers(dbUsers)
      } catch (error) {
        alert('something bad happened')
      }
    }

    getUsers()
  }, [searchFilter])

  return (
      <>
        <h1>Users</h1>
        <div>
          Name search:
          <input
            type="text"
            value={searchFilter}
            onChange={ev => setSearchFilter(ev.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {users.map((user) => {
          return (<pre key={user.id}>{JSON.stringify(user)}</pre>)
        })}
        </div>
      </>
  )
}

export default UserList
