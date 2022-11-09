import React from 'react'

export interface IProps {
  value?: string
  onChange?: (newValue: string) => void
}

export default function InputText ({ value, onChange }: IProps) {
  function handleOnChange (event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange !== undefined) {
      onChange(event.target.value)
    }
  }

  return (
    <>
      <input
        type="text"
        value={value}
        placeholder=""
        className={'w-full border px-4 py-2 border-gray-500'}
        onChange={handleOnChange}
        />
    </>)
}
