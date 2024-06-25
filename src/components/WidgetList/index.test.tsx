import { render, waitFor } from '@testing-library/react'
import { mocked } from 'jest-mock'

import * as apiConnect from '../../lib/apiConnect'
import WidgetDisplay from '../WidgetDisplay'
import WidgetList from './index'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

jest.mock('../WidgetDisplay')
jest.mock('../../lib/apiConnect')

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

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
  it('create new widget', async () => {
    const widgets: apiConnect.Widget[] = [
      { description: 'German movie star', name: 'Widget von Hammersmark', price: 19.45 },
      { description: 'Danish movie star', name: 'Widgette Nielson', price: 19.95 }
    ]
    const newWidget: apiConnect.Widget = {name: "new", description: "new widget", price: 1.00}
    mocked(apiConnect).fetchAllWidgets.mockResolvedValue(widgets)

    render(<WidgetList />, {wrapper: Wrapper})

    await waitFor(() => {
      expect(WidgetDisplay).toHaveBeenCalledWith(expect.objectContaining({ widget: widgets[0] }), {})
      expect(WidgetDisplay).toHaveBeenCalledWith(expect.objectContaining({ widget: widgets[1] }), {})
      expect(WidgetDisplay).not.toHaveBeenCalledWith(expect.objectContaining({widget: newWidget}))
    })

    
  })
})
