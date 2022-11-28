import DataGrid, { IDataGridColumn, IRowRenderer } from '@/components/DataGrid'
import RowCell from '@/components/DataGrid/RowCell'
import InputText from '@/components/Form/InputText'
import Heading from '@/components/Typography/Heading'
import Paragraph from '@/components/Typography/Paragraph'
import { useEffect, useState } from 'react'
import { db } from '../../db'
import BudgetMonth from './BudgetMonth'

function Budget () {
  interface ICategoryRow {
    category: string
  }

  const [categoryColumns, setCategoryColumns] = useState<IDataGridColumn[]>([])
  const [categoryRows, setCategoryRows] = useState<ICategoryRow[]>([])

  useEffect(() => {
    async function getBudget () {
      try {
        setCategoryColumns([{ key: 'category', name: 'Category' }])
        const dbCategories = await db.categories.toArray()
        const allCategories = dbCategories.map((category) => {
          return { category: category.name }
        })
        setCategoryRows(allCategories)
      } catch (error) {
        console.error('something bad happened', error)
      }
    }

    getBudget()
  }, [])

  function renderCategoryRow (props: IRowRenderer<ICategoryRow>) {
    function onRowValueChange (columnKey: string, newValue: string) {
      props.onRowChange({ ...props.row, [columnKey]: newValue })
    }

    return (
      <RowCell>
        <InputText value={props.row.category} onChange={(newValue) => onRowValueChange('category', newValue)} />
      </RowCell>
    )
  }

  return (
      <>
        <Heading>Budget</Heading>
        <Paragraph>similar to <a href="https://github.com/adazzle/react-data-grid">https://github.com/adazzle/react-data-grid</a></Paragraph>
        <div className='flex gap-4'>
          <div className='w-64'>
            Categories
            <DataGrid rows={categoryRows} columns={categoryColumns} onRowsChange={setCategoryRows} rowRenderer={renderCategoryRow}></DataGrid>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <BudgetMonth month="11/2022"/>
            <BudgetMonth month="12/2022"/>
            <BudgetMonth month="01/2023"/>
          </div>
        </div>
      </>
  )
}

export default Budget
