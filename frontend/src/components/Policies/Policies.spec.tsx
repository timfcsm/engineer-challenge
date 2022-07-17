import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import { policies } from '../../mocks/policies'
import { Policie } from '../../api/models/policies'

import { Policies } from './Policies'

const activePolicies = (policies as unknown as Policie[]).filter(({ status }) => status !== 'DROPPED_OUT' && status !== 'CANCELLED')

export const handlers = [
  rest.get(`${process.env.API_URL}/policies`, (req, res, ctx) => {
    return res(ctx.json(policies), ctx.delay(200))
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Policies', () => {
  it('should fetch and render policies after mount', async () => {
    renderWithProviders(<Policies />)

    expect(screen.getByText('Load data...')).toBeInTheDocument()

    const testPolicie = activePolicies[0]
    const customer = testPolicie.customer
    const name = `${customer.firstName} ${customer.lastName}`
    const { getByText, getAllByText } = within(screen.getByRole('table'))

    await waitFor(() => {
      expect(getByText(new RegExp(name, 'g'))).toBeInTheDocument()
      expect(getAllByText(new RegExp(testPolicie.provider, 'ig')).at(0)).toBeInTheDocument()
      expect(getAllByText(new RegExp(testPolicie.status, 'ig')).at(0)).toBeInTheDocument()
    })
  })

  it('should display filtered results if user applies filter', async () => {
    renderWithProviders(<Policies />)
    await waitForElementToBeRemoved(() => screen.queryByText('Load data...'))

    const testPolicie = activePolicies[0]
    const otherPolicie = activePolicies[1]
    const customer = testPolicie.customer
    const name = `${customer.firstName} ${customer.lastName}`


    const { queryByText } = within(screen.getByRole('table'))

    fireEvent.change(screen.getByRole('combobox', { name: 'Insurance Type' }), {
      target: {
        value: 'HEALTH'
      },
    })
    fireEvent.input(screen.getByRole('textbox', { name: 'Customer' }), {
      target: {
        value: customer.firstName,
      },
    })

    expect(queryByText('HOUSEHOLD')).toBeNull()
    expect(queryByText(otherPolicie.customer.firstName)).toBeNull()
    expect(queryByText('HEALTH')).toBeInTheDocument()
    expect(queryByText(name)).toBeInTheDocument()
  })

  it('should display all entries when user resets filter', async () => {
    renderWithProviders(<Policies />)
    await waitForElementToBeRemoved(() => screen.queryByText('Load data...'))

    const testPolicie = activePolicies[0]
    const otherPolicie = activePolicies[1]
    const customer = testPolicie.customer
    const name = `${customer.firstName} ${customer.lastName}`
    const otherName = `${otherPolicie.customer.firstName} ${otherPolicie.customer.lastName}`


    const { queryAllByText } = within(screen.getByRole('table'))

    fireEvent.change(screen.getByRole('combobox', { name: 'Insurance Type' }), {
      target: {
        value: 'HEALTH'
      },
    })
    fireEvent.input(screen.getByRole('textbox', { name: 'Customer' }), {
      target: {
        value: customer.firstName,
      },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Clear filter' }))

    expect(queryAllByText('HOUSEHOLD').at(0)).toBeInTheDocument()
    expect(queryAllByText('HEALTH').at(0)).toBeInTheDocument()
    expect(queryAllByText(otherName).at(0)).toBeInTheDocument()
    expect(queryAllByText(name).at(0)).toBeInTheDocument()
  })
})
