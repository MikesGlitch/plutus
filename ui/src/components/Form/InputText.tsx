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
        className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
        onChange={handleOnChange}
        />
    </>)
}
