import { PropsWithChildren } from 'react'

export interface IProps {}

export default function RowCell ({ children }: PropsWithChildren<IProps>) {
  return (
    <div className="outline outline-1 outline-gray-300 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <div className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {children}
      </div>
    </div>)
}
