import React from 'react';

type TableHeadColumn = {
  title: React.ReactNode
  key: React.Key
}

type Props = {
  columns: TableHeadColumn[] 
}

const TableHead: React.FC<Props> = ({ columns }) => (
  <thead className="border-b bg-gray-100">
    <tr>
      {columns.map(column => (
        <th 
          scope="col" key={column.key}
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          {column.title}
        </th>
      ))}
    </tr>
  </thead>
)

export default TableHead
