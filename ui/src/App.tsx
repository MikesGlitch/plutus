// import UserRegistrationForm from '@/features/users/UserRegistrationForm'
// import UserList from '@/features/users/UserList'
import TheNav from '@/components/Nav/TheNav'
import { Outlet } from 'react-router-dom'

function App () {
  return (
    <div className="App h-full">
      <div className='flex w-full h-full'>
        <TheNav />
        {/* <UserRegistrationForm /> <UserList /> */}
        {/* Router this eventually */}
        <main className='w-full ml-60 py-4 px-3'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
