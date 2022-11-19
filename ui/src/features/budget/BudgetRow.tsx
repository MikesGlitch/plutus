import { IRowRenderer } from '@/components/DataGrid'
import RowCell from '@/components/DataGrid/RowCell'
import InputCurrency from '@/components/Form/InputCurrency'

export interface IBudgetRow {
  budgeted?: number
  outflows: number
}

export default function BudgetRow (props: IRowRenderer<IBudgetRow>) {
  function onRowValueChange (columnKey: keyof IBudgetRow, newValue?: number) {
    props.onRowChange({ ...props.row, [columnKey]: newValue })
  }

  const balance = props.row.budgeted === undefined ? 0 - props.row.outflows : props.row.budgeted - props.row.outflows

  return (
      <>
        <RowCell>
          <InputCurrency value={props.row.budgeted} onChange={(newValue) => onRowValueChange('budgeted', newValue)}/>
        </RowCell>
        <RowCell>
          <InputCurrency readonly value={props.row.outflows} />
        </RowCell>
        <RowCell>
          <InputCurrency readonly value={balance} />
        </RowCell>
      </>
  )
}
