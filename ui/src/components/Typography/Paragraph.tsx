import { PropsWithChildren } from 'react'

export default function Paragraph (props: PropsWithChildren) {
  return (
    <p className="mb-3">{props.children}</p>
  )
}
