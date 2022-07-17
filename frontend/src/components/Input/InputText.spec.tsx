import React from 'react';
import { shallow, mount } from 'enzyme'

import InputText from './InputText'

describe('InputText', () => {
  it("should set input value, placeholder and type from props", () => {
    const value = 'test'
    const type = 'text'
    const placeholder = 'test placeholder'
    const input = mount(<InputText placeholder={placeholder} type={type} value={value} onChange={jest.fn()}/>)

    const el = input.find('input').getDOMNode()

    expect(el.getAttribute('value')).toEqual(value)
    expect(el.getAttribute('type')).toEqual(type)
    expect(el.getAttribute('placeholder')).toEqual(placeholder)
  })

  it("should call onChange callback when input value is changed", () => {
    const onChange = jest.fn()
    const input = mount(<InputText type="text" value="" onChange={onChange}/>)

    input.find('input').simulate('change')

    expect(onChange).toBeCalled()
  })

  it("should call onInput callback when input value is changed", () => {
    const onInput = jest.fn()
    const input = mount(<InputText type="text" value="" onInput={onInput}/>)

    input.find('input').simulate('input')

    expect(onInput).toBeCalled()
  })
})
