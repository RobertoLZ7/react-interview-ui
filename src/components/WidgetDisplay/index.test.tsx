import { render, screen } from '@testing-library/react'

import { Widget } from '../../lib/apiConnect'
import WidgetDisplay from './index'
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('WidgetDisplay', () => {
  it('displays all widget information', async () => {
    const widget: Widget = { description: 'German movie star', name: 'Widget von Hammersmark', price: 19.45 }

    render(<WidgetDisplay widget={widget} />, {wrapper: Wrapper})

    expect(screen.queryByText(widget.description, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(widget.name, { exact: false })).toBeInTheDocument()
  })
})
