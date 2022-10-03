import { useState } from "react";
import { db, User } from "../../db";

function userList() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('')
  
  async function getUsers() {
    try {
      const dbUsers = await db.users.filter((user) => (`${user.firstName} ${user.lastName}`).includes(searchFilter)).toArray();

      setUsers(dbUsers);
    } catch (error) {
      alert('something bad happened')
    }
  }

  getUsers()

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
        <div style={{display: "flex", flexDirection: 'column', gap: '1rem'}}>
        {users.map((user) => {
          return  (<pre key={user.id}>{JSON.stringify(user)}</pre>)
        })}
        </div>
      </>
    )
}

export default userList
