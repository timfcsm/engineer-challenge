import React, { FormEventHandler, useEffect, useState } from 'react';
import { InsuranceType, PolicieStatus } from '../../api/models/policies';
import InputText from '../Input/InputText'
import Select, { SelectOption } from '../Input/Select'

export type FilterValues = {
  name: string
  provider: string
  insuranceType: InsuranceType
  status: PolicieStatus
}

type DropdownFilters = Omit<FilterValues, 'name'>

type Props = {
  values: Partial<FilterValues>
  onChange: (values: Partial<FilterValues>) => void
  lists: {
    [key in keyof DropdownFilters]?: SelectOption<DropdownFilters[key]>[]
  }
}

const PoliciesFilter: React.FC<Props> = ({ values, onChange, lists }) => {
  const [innerValues, setInnerValues] = useState(values)

  useEffect(() => {
    setInnerValues(values)
  }, [values])

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(innerValues)
    onChange(innerValues)
  }

  return (
    <form onSubmit={onFormSubmit} className="flex gap-2">
      <InputText 
        value={innerValues.name || ''}
        type="text"
        onChange={event => {
          setInnerValues({ ...innerValues, name: event.target.value })
        }}
      />
      <Select
        value={innerValues.insuranceType || ''}
        placeholder="Select insurance type"
        options={[
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
        ]}
        onChange={event => onChange({ ...innerValues, insuranceType: event.target.value as InsuranceType || undefined })}
      />
      <Select
        value={innerValues.provider || ''}
        placeholder="Select provider"
        options={lists.provider || []}
        onChange={event => onChange({ ...innerValues, provider: event.target.value || undefined })}
      />
      <Select
        value={innerValues.status || ''}
        placeholder="Select status"
        options={lists.status || []}
        onChange={event => onChange({ ...innerValues, status: event.target.value as PolicieStatus || undefined })}
      />
      <button onClick={() => onChange({})}>Clear filter</button>
    </form>
  )
}

export default PoliciesFilter
