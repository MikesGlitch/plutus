import { PropsWithChildren } from 'react'

export default function Card (props: PropsWithChildren) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      {props.children}
    </div>
  )
}
