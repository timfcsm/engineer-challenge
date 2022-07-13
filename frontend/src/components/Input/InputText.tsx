import React, { ChangeEventHandler } from 'react';

type Props = {
  type: 'text' | 'search' | 'number' | 'email' | 'text' | 'url'
  value: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onInput?: ChangeEventHandler<HTMLInputElement>
}

const InputText: React.FC<Props> = ({ value, type, placeholder, onChange, onInput }) => {
  return (
    <div>
      <input 
        className="border rounded p-2 leading-6"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onInput={onInput}
      />
    </div>
  )
}

export default InputText
