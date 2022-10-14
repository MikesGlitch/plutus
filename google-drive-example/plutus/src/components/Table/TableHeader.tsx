import { PropsWithChildren } from "react"

interface IProps { }

export default function TableHeader(props: PropsWithChildren<IProps>) {
    return (<th>{props.children}</th>)
  }

