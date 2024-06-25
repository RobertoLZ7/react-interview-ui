import { render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'jest-mock'

import * as apiConnect from '../../lib/apiConnect'
import WidgetDisplay from '../WidgetDisplay'
import WidgetList from './index'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { ReactNode } from 'react'

jest.mock('../WidgetDisplay')
jest.mock('../../lib/apiConnect')

const Wrapper = ({ children }: {children: ReactNode}) => <Provider store={store}>{children}</Provider>;

describe('WidgetList', () => {
  it('renders WidgetDisplay for each widget', async () => {
    const widgets: apiConnect.Widget[] = [
      { description: 'German movie star', name: 'Widget von Hammersmark', price: 19.45 },
      { description: 'Danish movie star', name: 'Widgette Nielson', price: 19.95 }
    ]
    mocked(apiConnect).fetchAllWidgets.mockResolvedValue(widgets)

    render(<WidgetList />, {wrapper: Wrapper})

    await waitFor(() => {
      expect(WidgetDisplay).toHaveBeenCalledWith(expect.objectContaining({ widget: widgets[0] }), {})
      expect(WidgetDisplay).toHaveBeenCalledWith(expect.objectContaining({ widget: widgets[1] }), {})
    })
  })
  it('renders create widget modal', async () => {
    const widgets: apiConnect.Widget[] = [
      { description: 'German movie star', name: 'Widget von Hammersmark', price: 19.45 },
      { description: 'Danish movie star', name: 'Widgette Nielson', price: 19.95 }
    ]
    mocked(apiConnect).fetchAllWidgets.mockResolvedValue(widgets)

    render(<WidgetList />, {wrapper: Wrapper})

    const createButton = await screen.findByRole('button', {name: /create/i})
    createButton.click();
    expect(await screen.findByText('Create new widget')).toBeVisible();
  })
})
