import TheNav from '@/components/Nav/TheNav'
import { Outlet } from 'react-router-dom'

function App () {
  return (
    <div className="h-full bg-white dark:bg-gray-900 font-light text-gray-500 dark:text-gray-400">
      <div className='flex w-full h-full'>
        <TheNav />
        <main className='w-full h-full ml-72 py-4 px-3'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
