import { PropsWithChildren } from 'react'

export default function Heading (props: PropsWithChildren) {
  return (
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {props.children}
    </h1>
  )
}
