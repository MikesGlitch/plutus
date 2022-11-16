export interface IProps {
  name: string
}

export default function HeaderCell ({ name }: IProps) {
  return (<div className="outline outline-1 outline-gray-300 px-2 font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">{ name }</div>)
}
