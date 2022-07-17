import React, { ChangeEventHandler } from 'react';

type Props = {
  type: 'text' | 'search' | 'number' | 'email' | 'text' | 'url'
  value: string
  placeholder?: string
  name?: string
  label?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onInput?: ChangeEventHandler<HTMLInputElement>
}

const InputText: React.FC<Props> = ({ value, type, placeholder, onChange, onInput, name, label }) => {
  return (
    <label>
      { label && <div>{ label }</div>}
      <input 
        className="border rounded p-2 leading-6"
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onInput={onInput}
      />
    </label>
  )
}

export default InputText
