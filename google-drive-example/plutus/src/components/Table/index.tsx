interface IProps {
    headers: React.ReactNode
    rows: React.ReactNode
}

export default function Index({ rows, headers }: IProps) {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    { headers }
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
