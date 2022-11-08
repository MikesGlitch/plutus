import { useCurrency } from '@/hooks/useCurrency'
import React, { useEffect, useRef, useState } from 'react'

export interface IProps {
  value?: number // pennies
  onChange?: (newValue: number) => void
  readonly?: boolean
}

export default function InputCurrency ({ value, onChange, readonly }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fromPenniesToCurrency, toPennies } = useCurrency()
  const [renderValue, setRenderValue] = useState('')

  function handleOnBlur (event: React.FocusEvent<HTMLInputElement>) {
    if (onChange !== undefined) {
      onChange(toPennies(event.target.value))
    }
  }

  function handleOnChange (event: React.ChangeEvent<HTMLInputElement>) {
    setRenderValue(event.target.value)
  }

  function handleOnFocus (event: React.FocusEvent<HTMLInputElement>) {
    event.currentTarget.select()
  }

  useEffect(() => {
    if (inputRef?.current !== null) {
      if (value !== undefined) {
        setRenderValue(fromPenniesToCurrency(value))
      }
    }
  }, [inputRef, value])

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        inputMode="decimal"
        value={renderValue}
        placeholder="0.00"
        readOnly={readonly}
        className={'w-full border px-4 py-2 border-gray-500'}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        />
    </>)
}
