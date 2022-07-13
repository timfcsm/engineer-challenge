import { Customer } from './customer'

export type InsuranceType = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD'

export type PolicieStatus = 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'DROPPED_OUT'

export type Policie = {
  id: string
  customer: Customer
  insuranceType: InsuranceType
  provider: string
  startDate: Date
  endDate: Date
  status: PolicieStatus
}
