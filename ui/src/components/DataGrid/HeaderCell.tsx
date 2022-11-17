const OAlignment = {
  left: 'left',
  center: 'center',
  right: 'right'
} as const

export type Alignment = typeof OAlignment[keyof typeof OAlignment]

const alignMap = new Map<Alignment, string>([
  ['left', 'text-left'],
  ['center', 'text-center'],
  ['right', 'text-right']
])

export interface IProps {
  name: string
  align?: Alignment
}

export default function HeaderCell ({ name, align = 'left' }: IProps) {
  const alignClass = alignMap.get(align)
  return (
    <div className={`
      ${alignClass === undefined ? '' : alignClass}
      outline
      outline-1
      outline-gray-300
      text-sm
      px-2
      py-3
      font-bold
      text-gray-500 
      dark:text-gray-400
      uppercase
      bg-gray-50
      dark:bg-gray-700`}>
      { name }
    </div>)
}
