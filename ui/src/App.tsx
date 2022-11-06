import TheNav from '@/components/Nav/TheNav'
import { Outlet } from 'react-router-dom'

function App () {
  return (
    <div className="App h-full">
      <div className='flex w-full h-full'>
        <TheNav />
        <main className='w-full ml-60 py-4 px-3'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
