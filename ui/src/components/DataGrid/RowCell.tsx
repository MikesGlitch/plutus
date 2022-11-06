import { PropsWithChildren } from 'react'

export interface IProps {}

export default function RowCell ({ children }: PropsWithChildren<IProps>) {
  return (
    <div className="outline outline-1 outline-gray-300">
      {children}
    </div>)
}
