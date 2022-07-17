import React, { PropsWithChildren } from 'react';
import TableHead from './TableHead'

export type TableColumn<T> = {
  title?: React.ReactNode
  key: React.Key
  dataIndex?: keyof T
  render?: (text: any, record: T, index: number) => React.ReactNode
  className?: string;
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: keyof T
}

const Table: <T>(props: PropsWithChildren<TableProps<T>>) => React.ReactElement = ({
  columns,
  data,
  rowKey,
}) => (
  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg shadow-sm">
          <table className="min-w-full">
            <TableHead columns={columns.map(({ title, key }) => ({ title, key }))}/>
            <tbody>
              { data.map((record, i) => (
                <tr key={`${record[rowKey]}`} className="border-b">
                  {columns.map((column) => {
                    const text = column.dataIndex ? record[column.dataIndex] : ''
                    return (
                      <td key={column.key} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''}`}>
                        {column.render ? column.render(text, record, i) : text}
                      </td>
                    )
                  })}
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

export default Table;
