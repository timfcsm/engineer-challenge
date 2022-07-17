import React from 'react'
import { shallow, mount } from 'enzyme'

import Table, { TableColumn } from './Table'

const testData = [
  {
    id: 1,
    name: 'John Gold',
    age: 24,
    salary: 10000,
  },
  {
    id: 2,
    name: 'No Name',
    age: 35,
    salary: 35000,
  },
  {
    id: 3,
    name: 'Third Person',
    age: 44,
    salary: 21000,
  },
]

const testColumns: TableColumn<typeof testData[number]>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
  },
  {
    key: 'salary',
    title: 'Salary',
    dataIndex: 'salary',
  },
]

describe('Table', () => {
  it('should render table with right amount of rows and columns', () => {
    const table = shallow(<Table rowKey="id" data={testData} columns={testColumns} />)

    expect(table.find('tbody tr')).toHaveLength(testData.length)
    expect(table.find('tbody tr').first().find('td')).toHaveLength(testColumns.length)
  })

  it("should render header with titles", () => {
    const table = shallow(<Table rowKey="id" data={testData} columns={testColumns} />)
    
    expect(table.find('TableHead').prop('columns')).toEqual(testColumns.map(({ key, title }) => ({ key, title })))
  })

  it('should render every entry in respect to provided colums settings', () => {
    const table = shallow(<Table rowKey="id" data={testData} columns={testColumns} />)

    testColumns.forEach((column, columnIndex) => {
      testData.forEach((entry, entryIndex) => {
        expect(table.find('tbody tr').at(entryIndex).find('td').at(columnIndex).text())
          .toEqual(String(entry[column.dataIndex!]))
      })
    })
  })

  it('should use render function for column if provided', () => {
    const table = mount(<Table rowKey="id" data={testData} columns={testColumns.map(column => ({
      ...column,
      render: (text) => `from render function ${text}`
    }))} />)

    testData.forEach(({ name }) => {
      expect(table.text().includes(`from render function ${name}`)).toBe(true)
    })
  })
})
