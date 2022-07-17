import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'
import { unique } from '../../utils/array'
import { keys } from '../../utils/object'

const selectSelf = (state: RootState) => state

export const selectPolicies = createSelector(selectSelf, (state: RootState) => {
  return state.policies.items
})

export const selectPolicieFilters = createSelector(selectSelf, state => state.policies.filters)

export const selectProviders = createSelector(selectPolicies, policies => unique(policies.map(({ provider }) => provider)))

export const selectTotal = createSelector(selectPolicies, policies => policies.length)

export const selectActivePolicies = createSelector(selectPolicies, policies => {
  return policies.filter(({ status }) => status !== 'CANCELLED' && status !== 'DROPPED_OUT')
})

export const selectTotalActive = createSelector(selectActivePolicies, policies => policies.length)

export const selectPoliciesByFilters = createSelector(
  [selectPolicieFilters, selectActivePolicies],
  (filters, policies) => {
    const filterKeys = keys(filters).filter(key => filters[key])

    return policies.filter((entry) => {
      return filterKeys.map((filterKey) => {
        if (filterKey === 'name') {
          return `${entry.customer.firstName} ${entry.customer.lastName}`.includes(filters[filterKey] || '')
        }
        return filters[filterKey] === entry[filterKey]
      }).every(Boolean)
    }).map((entry, i) => ({ ...entry, index: i + 1 }))
  }
)

export const selectTotalFiltered = createSelector(selectPoliciesByFilters, policies => policies.length)
