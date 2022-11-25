// import UserRegistrationForm from '@/features/users/UserRegistrationForm'
// import UserList from '@/features/users/UserList'
import TheNav from '@/components/Nav/TheNav'

function TheFallback () {
  return (
    <div className="h-full">
      <div className='flex w-full h-full'>
        <TheNav />
        <main className='w-full ml-72 py-4 px-3'>
          Fallback
        </main>
      </div>
    </div>
  )
}

export default TheFallback
