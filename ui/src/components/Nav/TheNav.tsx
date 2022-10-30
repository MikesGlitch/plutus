import { Link } from 'react-router-dom'

export default function TheNav () {
  return (
    <aside className="fixed top-0 bottom-0 h-full w-60" aria-label="Sidebar">
        <div className="overflow-y-auto h-full py-4 px-3 bg-gray-50 dark:bg-gray-800">
            <Link to={'/'} className="flex items-center pl-2.5 mb-5">
                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-7" alt="Flowbite Logo" /> */}
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Plutus</span>
            </Link>
            <ul className="space-y-2">
                <li>
                    <Link className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" to={'budget'}>
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span className="ml-3">Budget</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" to={'reports'}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
                        <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" to={'accounts'}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">All Accounts</span>
                        <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" to={'upcoming-features'}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Upcoming features</span>
                    </Link>
                </li>
            </ul>
        </div>
    </aside>
  )
}
