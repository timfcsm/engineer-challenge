import reducer, { setPolicies, setFilters, initialState, PolicieFilters } from './policies-reducer'
import { policies } from '../../mocks/policies'
import { Policie } from '../../api/models/policies'

describe('policies reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  test('should add policies to state', () => {
    expect(reducer(initialState, setPolicies(policies as unknown as Policie[]))).toEqual({
      ...initialState,
      items: policies,
    })
  })

  test('should set filters to state', () => {
    const filters: PolicieFilters = {
      insuranceType: 'HEALTH',
      status: 'PENDING',
      name: policies[0].customer.firstName,
      provider: policies[0].provider,
    }

    expect(reducer(initialState, setFilters(filters))).toEqual({
      ...initialState,
      filters,
    })
  })
})
