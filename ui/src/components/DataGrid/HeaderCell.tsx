export interface IProps {
  name: string
}

export default function HeaderCell ({ name }: IProps) {
  return (<div className="outline outline-1 outline-gray-300 px-2 font-bold">{ name }</div>)
}
