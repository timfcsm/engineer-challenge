import React from 'react';
import { mount, render, shallow } from 'enzyme'

import Select from './Select';

describe('Select', () => {
  it("should render passed options and default option", () => {
    const options = [
      {
        label: 'opt1',
        value: 1,
      },
      {
        label: 'opt2',
        value: 2,
      },
      {
        label: 'opt3',
        value: 3,
      },
    ]

    const select = render(<Select options={options} />)

    expect(select.find('option')).toHaveLength(options.length + 1)

    options.forEach(({ value, label }) => {
      expect(select.find('option[value="' + value + '"]')).toHaveLength(1)
      expect(select.find('option[value="' + value + '"]').text()).toEqual(label)
    })
  })

  it("should call onChange callback when option is selected", () => {
    const options = [
      {
        label: 'opt1',
        value: 1,
      },
      {
        label: 'opt2',
        value: 2,
      },
      {
        label: 'opt3',
        value: 3,
      },
    ]
    const onChange = jest.fn()

    const select = mount(<Select value={options[0].value} options={options} onChange={onChange} />)

    select.simulate('change')
    select.find('option').last().simulate('change', {
      target: options[2],
    })

    expect(onChange).toBeCalled()
  })
})
