import { useState } from "react";
import { db, IUser } from "../../db";

function UserRegistrationForm() {

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>();
  const [status, setStatus] = useState("");
  
  async function addUser() {
    try {
      if(!age) {
        // validation
        console.error('invalid entry')
        return
      }

      const newUser: IUser = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        age: age,
      }
      const id = await db.users.add(newUser);

      setStatus(`${newUser.username} successfully added. Got id ${id}`);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

    return (
      <>
        <h1>User Registration</h1>
        <p>
          {status}
        </p>
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
