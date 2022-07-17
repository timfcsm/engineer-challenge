import React from 'react';
import { shallow, mount } from 'enzyme';

import Pagination from './Pagination'

describe('Pagination', () => {
  it("should render button for every page", () => {
    const pagination = shallow(<Pagination currentPage={1} pages={5} onPageChange={jest.fn()} />)
    
    expect(pagination.find('[data-test="page"]').length).toEqual(5)
  })

  it("should call onPageChange callback when page button and next/prev is clicked", () => {
    const onPageChange = jest.fn()
    const pagination = mount(<Pagination currentPage={2} pages={5} onPageChange={onPageChange} />)

    pagination.find('[data-test="page"]').at(3).simulate('click')

    expect(onPageChange).toBeCalledWith(4)

    pagination.find('[data-test="next"]').first().simulate('click')
    pagination.find('[data-test="prev"]').first().simulate('click')

    expect(onPageChange).toBeCalledTimes(3)
  })

  it("should not call onPageChange callback when prev button is clicked being at first page", () => {
    const onPageChange = jest.fn()
    const pagination = mount(<Pagination currentPage={1} pages={5} onPageChange={onPageChange} />)

    const prevBtn = pagination.find('[data-test="prev"]')
    expect(prevBtn.getDOMNode()).toBeDisabled()

    prevBtn.first().simulate('click')

    expect(onPageChange).not.toBeCalled()
  })

  it("should not call onPageChange callback if next button is clicked being at last page", () => {
    const onPageChange = jest.fn()
    const pagination = mount(<Pagination currentPage={5} pages={5} onPageChange={onPageChange} />)

    const nextBtn = pagination.find('[data-test="next"]')

    expect(nextBtn.getDOMNode()).toBeDisabled()

    nextBtn.first().simulate('click')

    expect(onPageChange).not.toBeCalled()
  })
})
