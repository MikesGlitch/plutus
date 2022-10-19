import { PropsWithChildren } from 'react'

interface IProps { }

export default function TableData (props: PropsWithChildren<IProps>) {
  return (<td>{props.children}</td>)
}
