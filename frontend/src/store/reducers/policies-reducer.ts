import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InsuranceType, Policie, PolicieStatus } from '../../api/models/policies'
import { fetchPolicies } from './policies-async-actions'

export type PolicieFilters = {
  name?: string
  provider?: string
  insuranceType?: InsuranceType
  status?: PolicieStatus
}

export type PoliciesState = {
  filters: PolicieFilters
  items: Policie[]
  isLoading: boolean
  errors: string[]
}

export const initialState: PoliciesState = {
  filters: {},
  items: [],
  errors: [],
  isLoading: false,
}

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    setPolicies(state, action: PayloadAction<Policie[]>) {
      state.items = action.payload
    },
    setFilters(state, action: PayloadAction<PolicieFilters>) {
      state.filters = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchPolicies.rejected, (state) => {
        state.errors.push('error while fetch policies')
        state.isLoading = false
      })
  },
})

export const { setFilters, setPolicies } = policiesSlice.actions

export default policiesSlice.reducer
