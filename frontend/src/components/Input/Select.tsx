import React, { ChangeEventHandler } from 'react';
import { classNames } from '../../utils/jsx'

import styles from './Select.module.css'

type SelectValueLimit = string | number

export type SelectOption<T extends SelectValueLimit> = {
  label: string
  value: T
}

type Props<T extends SelectValueLimit> = {
  value?: T
  placeholder?: string
  name?: string
  label?: string
  options: SelectOption<T>[]
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

const Select = <T extends SelectValueLimit>({ value, placeholder, onChange, options, name, label }: Props<T>) => {
  return (
    <label>
      { label && <div>{ label }</div>}
      <select 
        className={classNames(['border rounded p-2 leading-6', styles.select])}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
      <option value="">{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={String(value)} value={value}>{label}</option>
      ))}
      </select>
    </label>
  )
}

export default Select
