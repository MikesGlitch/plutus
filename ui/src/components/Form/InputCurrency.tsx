import { useCurrency } from '@/hooks/useCurrency'
import React, { useEffect, useRef, useState } from 'react'

export interface IProps {
  value?: number // pennies
  onChange?: (newValue?: number) => void
  readonly?: boolean
}

export default function InputCurrency ({ value, onChange, readonly }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fromPenniesToCurrency, fromPenniesToCurrencyWithoutSymbol, toPennies } = useCurrency()
  const [renderValue, setRenderValue] = useState('')
  const [focused, setFocused] = useState(false)

  function setRenderedValueWithCurrencySymbol (value: number) {
    setRenderValue(fromPenniesToCurrency(value))
  }

  function setRenderedValueWithoutCurrencySymbol (value: number) {
    setRenderValue(fromPenniesToCurrencyWithoutSymbol(value))
  }

  function handleOnBlur (event: React.FocusEvent<HTMLInputElement>) {
    if (readonly === true) {
      return
    }

    if (onChange !== undefined) {
      const isEmptyValue = event.target.value === ''
      const noValueGivenOrChanged = isEmptyValue && value === undefined
      if (noValueGivenOrChanged) {
        // Nothing has been entered (empty string) and there was never a value, so just escape
        return
      }

      const clearTheValue = isEmptyValue && value !== undefined
      if (clearTheValue) {
        // clear the value when input is empty and not already cleared
        onChange(undefined)
      } else if (toPennies(event.target.value) !== value) {
        // if the amount in pennies is different to the current amount, change it
        onChange(toPennies(event.target.value))
      } else {
        // value hasn't changed - don't fire a change event, just set the render value
        setRenderedValueWithCurrencySymbol(value)
      }
    }
  }

  function handleOnChange (event: React.ChangeEvent<HTMLInputElement>) {
    setRenderValue(event.target.value)
  }

  function handleOnFocus (event: React.FocusEvent<HTMLInputElement>) {
    if (readonly === true) {
      return
    }

    if (value !== undefined) {
      setFocused(true)
      setRenderedValueWithoutCurrencySymbol(value)
    }
  }

  useEffect(() => {
    if (inputRef?.current !== null) {
      if (focused) {
        inputRef.current?.select()
        setFocused(false)
      }
    }
  }, [renderValue])

  useEffect(() => {
    if (inputRef?.current !== null) {
      if (value !== undefined) {
        setRenderedValueWithCurrencySymbol(value)
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
