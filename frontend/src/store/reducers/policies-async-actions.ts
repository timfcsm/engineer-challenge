import { createAsyncThunk } from '@reduxjs/toolkit'
import { PolicieFilters } from './policies-reducer'
import * as api from '../../api'

export const fetchPolicies = createAsyncThunk(
  'policies/fetchPolicies',
  async (filters: PolicieFilters) => {
    const data = await api.fetchPolicies()
    return data
  },
)
