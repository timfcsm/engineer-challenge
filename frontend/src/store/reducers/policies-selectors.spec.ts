import { Policie } from '../../api/models/policies'
import { policies } from '../../mocks/policies'
import { unique } from '../../utils/array'
import { initialState, PolicieFilters } from './policies-reducer'

import {
  selectTotal,
  selectPolicies,
  selectActivePolicies,
  selectProviders,
  selectPolicieFilters,
  selectPoliciesByFilters,
  selectTotalActive,
  selectTotalFiltered,
} from './policies-selectors'

const state = {
  policies: initialState,
}

const filterActive = ({ status }: Policie) => status !== 'DROPPED_OUT' && status !== 'CANCELLED'

describe('selectTotal', () => {
  it('should return length of policies', () => {
    expect(selectTotal(state)).toEqual(0)
    expect(selectTotal({
      ...state,
      policies: {
        ...state.policies,
        items: policies as unknown as Policie[],
      }
    })).toEqual(policies.length)
  })
})

describe('selectTotalActive', () => {
  it('should return length of active policies', () => {
    expect(selectTotalActive(state)).toEqual(0)
    expect(selectTotalActive({
      ...state,
      policies: {
        ...state.policies,
        items: policies,
      }
    })).toEqual(policies.filter(filterActive).length)
  })
})

describe('selectTotalFiltered', () => {
  it('should return length of policies with no filters', () => {
    expect(selectTotalFiltered(state)).toEqual(0)
    expect(selectTotalFiltered({
      ...state,
      policies: {
        ...state.policies,
        items: policies,
      }
    })).toEqual(policies.filter(filterActive).length)
  })

  it('should return length of filtered policies with filters', () => {
    const filters: PolicieFilters = {
      insuranceType: 'HEALTH',
      name: policies[0].customer.lastName,
      status: 'PENDING',
    }

    const expected = policies.filter(({ insuranceType, customer: { lastName }, status  }) => {
      return insuranceType === filters.insuranceType && lastName === filters.name && status === filters.status
    }).map((item, index) => {
      return  {
          ...item,
          index: index + 1,
      }
    })

    expect(selectTotalFiltered({
      ...state,
      policies: {
        ...state.policies,
        filters,
        items: policies,
      }
    })).toEqual(expected.length)
  })
})

describe('selectPolicies', () => {
  it('should return list of active policies', () => {
    expect(selectPolicies(state)).toHaveLength(0)
    expect(selectPolicies({
      ...state,
      policies: {
        ...state.policies,
        items: policies,
      }
    })).toEqual(policies)
  })
})

describe('selectActivePolicies', () => {
  it('should return list of active policies', () => {
    expect(selectActivePolicies(state)).toHaveLength(0)
    expect(selectActivePolicies({
      ...state,
      policies: {
        ...state.policies,
        items: policies,
      }
    })).toEqual(policies.filter(filterActive))
  })
})

describe('selectPolicieFilters', () => {
  it('should return filters', () => {
    expect(selectPolicieFilters(state)).toEqual({})

    const filters: PolicieFilters = {
      insuranceType: 'HEALTH',
      name: policies[0].customer.lastName,
      status: 'PENDING',
    }

    expect(selectPolicieFilters({
      ...state,
      policies: {
        ...state.policies,
        filters,
      },
    })).toEqual(filters)
  })
})

describe('selectPoliciesByFilters', () => {
  it('should return  filtered policies', () => {
    const filters: PolicieFilters = {
      insuranceType: 'HEALTH',
      name: policies[0].customer.lastName,
      status: 'PENDING',
    }

    const expected = policies.filter(({ insuranceType, customer: { lastName }, status  }) => {
      return insuranceType === filters.insuranceType && lastName === filters.name && status === filters.status
    }).map((item, index) => {
      return  {
          ...item,
          index: index + 1,
      }
    })

    expect(selectPoliciesByFilters({
      ...state,
      policies: {
        ...state.policies,
        items: policies,
        filters,
      },
    })).toEqual(expected)
  })
})

describe('selectProviders', () => {
  it('should return list of providers', () => {
    expect(selectProviders(state)).toHaveLength(0)

    const expected = unique(policies.map(({ provider }) => provider))

    expect(selectProviders({
      ...state,
      policies: {
        ...state.policies,
        items: policies,
      }
    })).toEqual(expected)
  })
})
