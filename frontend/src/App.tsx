import Navbar from "./Navbar";
import Header from "./Header";
import Table from "./components/Table/Table";

import "./index.css";
import { useEffect, useMemo, useState } from 'react'
import { fetchPolicies } from './api'
import { Policie } from './api/models/policies'
import Badge from './Badge'
import Pagination from './components/Pagination/Pagination'
import PoliciesFilter, { FilterValues } from './components/PoliciesFilter/PoliciesFilter'
import { unique } from './helpers/array'

const App = () => {
  const [data, setData] = useState([] as Policie[])
  const [page, setPage] = useState(1)
  const [entryPerPage, setEntryPerPage] = useState(10)
  const [filters, setFilters] = useState({} as Partial<FilterValues>)
  const providers = useMemo(() => {
    console.log('memo')
    return unique(data.map(({ provider }) => provider))
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      const policies = await fetchPolicies()
      setData(policies)
    }
    fetchData()
  }, [])

  const filteredData = data.filter((entry) => {
    const { status } = entry
    if (status === 'CANCELLED' || status === 'DROPPED_OUT') {
      return false
    }

    const filterKeys = Object.keys(filters) as (keyof FilterValues)[] 
    return filterKeys.map((filterKey) => {
        if (filters[filterKey] === undefined) return true
        if (filterKey === 'name') {
          return `${entry.customer.firstName} ${entry.customer.lastName}`.includes(filters[filterKey] || '')
        }
        return filters[filterKey] === entry[filterKey]
    }).every(t => t)
  }).map((entry, i) => ({...entry, index: i + 1}))

  return (
    <div>
      <Navbar />
      <div className="w-full p-8">
        <Header />
        <PoliciesFilter 
          values={filters}
          onChange={setFilters}
          lists={{
            insuranceType: [
              {
                value: 'HEALTH',
                label: 'HEALTH',
              },
              {
                value: 'HOUSEHOLD',
                label: 'HOUSEHOLD',
              },
              {
                value: 'LIABILITY',
                label: 'LIABILITY',
              },
            ],
            provider: providers.map(p => ({
              value: p,
              label: p,
            })),
            status: [
              {
                value: 'ACTIVE',
                label: 'ACTIVE',
              },
              {
                value: 'PENDING',
                label: 'PENDING',
              },
            ],
          }}
        />
        <Table rowKey="id" data={filteredData.slice((page - 1) * entryPerPage, page * entryPerPage)} columns={[
          {
            title: '#',
            key: 'index',
            dataIndex: 'index',
            className: 'font-medium',
          },
          {
            title: 'Name',
            key: 'name',
            render: (_, { customer }) => `${customer.firstName} ${customer.lastName}`,
            className: 'font-light',
          },
          {
            title: 'Provider',
            key: 'provider',
            dataIndex: 'provider',
            className: 'font-light',
          },
          {
            title: 'Type',
            key: 'type',
            dataIndex: 'insuranceType',
            className: 'font-light',
          },
          {
            title: 'Status',
            key: 'status',
            render: (_, { status }) => <Badge status={status} />,
            className: 'font-light',
          },
        ]}/>
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          pages={Math.ceil(filteredData.length / entryPerPage)}
        />
      </div>
    </div>
  )
};


export default App;
