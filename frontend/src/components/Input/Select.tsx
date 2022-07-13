import React, { ChangeEventHandler } from 'react';
import { classNames } from '../../helpers/jsx'

import styles from './Select.module.css'

type SelectValueLimit = string | number

export type SelectOption<T extends SelectValueLimit> = {
  label: string
  value: T
}

type Props<T extends SelectValueLimit> = {
  value?: T
  placeholder?: string
  options: SelectOption<T>[]
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

const Select = <T extends SelectValueLimit>({ value, placeholder, onChange, options }: Props<T>) => {
  return (
    <div>
      <select 
        className={classNames(['border rounded p-2 leading-6', styles.select])}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
      <option value="">{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={String(value)} value={value}>{label}</option>
      ))}
      </select>
    </div>
  )
}

export default Select
