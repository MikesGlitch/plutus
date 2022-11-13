import Heading from '@/components/Typography/Heading'
import Paragraph from '@/components/Typography/Paragraph'
import { useState } from 'react'
import { db, IUser } from '../../db'

function UserRegistrationForm () {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState<number>()
  const [status, setStatus] = useState('')

  async function addUser () {
    try {
      if (age === undefined) {
        // validation
        console.error('invalid entry')
        return
      }

      const newUser: IUser = {
        username,
        firstName,
        lastName,
        age
      }
      const id = await db.users.add(newUser)

      setStatus(`${newUser.username} successfully added. Got id ${id as number}`)
    } catch (error) {
      setStatus(`Failed to add ${username}`)
    }
  }

  return (
      <>
        <Heading>User Registration</Heading>
        <Paragraph>
          {status}
        </Paragraph>
        username:
        <input
          type="text"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        First name:
        <input
          type="text"
          value={firstName}
          onChange={ev => setFirstName(ev.target.value)}
        />
        Last name:
        <input
          type="text"
          value={lastName}
          onChange={ev => setLastName(ev.target.value)}
        />
        Age:
        <input
          type="number"
          value={age}
          onChange={ev => setAge(Number(ev.target.value))}
        />

        <button onClick={addUser}>
          Add
        </button>
      </>
  )
}

export default UserRegistrationForm
