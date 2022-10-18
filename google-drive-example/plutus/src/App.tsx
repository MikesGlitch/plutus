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
          <h1 className='text-xl text-red-500'>Plan is to base most of this off of <a href="https://flowbite.com">https://flowbite.com</a> for basic components</h1>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
