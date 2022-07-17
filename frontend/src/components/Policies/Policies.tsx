import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { fetchPolicies } from '../../store/reducers/policies-async-actions'
import { selectPolicieFilters, selectPoliciesByFilters, selectProviders } from '../../store/reducers/policies-selectors'
import Badge from '../Badge/Badge'
import Header from '../Header/Header'
import Pagination from '../Pagination/Pagination'
import PoliciesFilter from '../PoliciesFilter/PoliciesFilter'
import Table from '../Table/Table'

export const Policies: React.FC = () => {
  const [page, setPage] = useState(1)
  const [entryPerPage] = useState(10)
  const policies = useAppSelector(selectPoliciesByFilters)
  const filters = useAppSelector(selectPolicieFilters)
  const providers = useAppSelector(selectProviders)
  const isLoading = useAppSelector(state => state.policies.isLoading)
  const dispatch = useAppDispatch()

  const fetchData = () => {
    dispatch(fetchPolicies(filters))
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  return (
    <div>
      <div className="w-full p-8">
        <Header />
        <div>
          { isLoading && 'Load data...'}
          <PoliciesFilter
            values={filters}
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
          <Table data-testid="policies-table" rowKey="id" data={policies.slice((page - 1) * entryPerPage, page * entryPerPage)} columns={[
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
          ]} />
          <Pagination
            onPageChange={setPage}
            currentPage={page}
            pages={Math.ceil(policies.length / entryPerPage)}
          />
        </div>
      </div>
    </div>
  )
}
