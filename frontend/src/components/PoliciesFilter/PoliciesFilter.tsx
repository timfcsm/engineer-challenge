import React, { FormEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InsuranceType, PolicieStatus } from '../../api/models/policies'
import { PolicieFilters, setFilters } from '../../store/reducers/policies-reducer'
import { Button } from '../Button/Button'
import InputText from '../Input/InputText'
import Select, { SelectOption } from '../Input/Select'

type DropdownFilters = Omit<Required<PolicieFilters>, 'name'>

type Props = {
  values: Partial<PolicieFilters>
  onChange?: (values: PolicieFilters) => void
  lists: {
    [key in keyof DropdownFilters]: SelectOption<Required<PolicieFilters>[key]>[]
  }
}

const PoliciesFilter: React.FC<Props> = ({ values, onChange, lists }) => {
  const [innerValues, setInnerValues] = useState(values)
  const dispatch = useDispatch()

  const dispatchSetFilters = (filters: PolicieFilters) => dispatch(setFilters(filters))

  useEffect(() => {
    setInnerValues(values)
  }, [values])

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onChange?.(innerValues)
  }

  return (
    <form onSubmit={onFormSubmit} className="flex items-end gap-2">
      <InputText 
        value={innerValues.name || ''}
        type="text"
        name="customer"
        label="Customer"
        onChange={event => {
          dispatchSetFilters({ ...innerValues, name: event.target.value.trim() })
        }}
      />
      <Select
        value={innerValues.insuranceType || ''}
        placeholder="Select insurance type"
        options={lists.insuranceType}
        label="Insurance Type"
        name="insuranceType"
        onChange={event => dispatchSetFilters({ ...innerValues, insuranceType: event.target.value as InsuranceType || undefined })}
      />
      <Select
        value={innerValues.provider || ''}
        placeholder="Select provider"
        options={lists.provider}
        name="provider"
        label="Provider"
        onChange={event => dispatchSetFilters({ ...innerValues, provider: event.target.value || undefined })}
      />
      <Select
        value={innerValues.status || ''}
        placeholder="Select status"
        options={lists.status}
        name="status"
        label="Status"
        onChange={event => dispatchSetFilters({ ...innerValues, status: event.target.value as PolicieStatus || undefined })}
      />
      <Button onClick={() => dispatchSetFilters({})}>Clear filter</Button>
    </form>
  )
}

export default PoliciesFilter
