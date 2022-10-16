import './App.css'
// import UserRegistrationForm from '@/features/users/UserRegistrationForm'
// import UserList from '@/features/users/UserList'
import Accounts from '@/features/accounts/Accounts'

function App () {
  return (
    <div className="App">
      <h1 className='text-4xl text-red-500'>Maybe I should rewrite some of this in WebComponents. I think there`s better options that React.  Vue is better IMO, and React seems messy</h1>
      {/* <UserRegistrationForm /> <UserList /> */}
      <Accounts />
    </div>
  )
}

export default App
