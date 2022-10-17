interface IProps {
  headers: React.ReactNode[]
  rows: React.ReactNode[]
}

function EmptyMessage (numColumns: number) {
  return (<td colSpan={numColumns}>No records found.</td>)
}

export default function Index ({ rows, headers }: IProps) {
  const tableRows = rows.length > 0 ? rows : EmptyMessage(headers.length)
  return (
    <div className="rounded-xl border-black border-2">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-black">
            { headers }
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}
