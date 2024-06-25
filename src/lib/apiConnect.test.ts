import axios from 'axios'
import { mocked } from 'jest-mock'

import { createWidget, deleteWidget, fetchAllWidgets, fetchWidgetByName, updateWidget, Widget } from './apiConnect'

jest.mock('axios')

describe('fetchAllWidgets', () => {
  it('returns response data', async () => {
    const widgetList: Widget[] = [{ description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }]
    mocked(axios).get.mockResolvedValueOnce({ data: widgetList })

    const result = await fetchAllWidgets()

    expect(result).toEqual(widgetList)
  })

  it('errors on reject', async () => {
    mocked(axios).get.mockRejectedValueOnce({})

    expect(fetchAllWidgets()).rejects.toBeTruthy()
  })
})

describe('fetchWidgetByName', () => {
  it('returns response data', async () => {
    const widget: Widget = { description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }
    mocked(axios).get.mockResolvedValueOnce({ data: widget })

    const result = await fetchWidgetByName(widget.name)

    expect(result).toEqual(widget)
  })

  it('errors on reject', async () => {
    mocked(axios).get.mockRejectedValueOnce({})

    expect(fetchWidgetByName('test')).rejects.toBeTruthy()
  })
})

describe('createWidget', () => {
  it('returns response data', async () => {
    const widget: Widget = { description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }
    mocked(axios).post.mockResolvedValueOnce({ data: widget })

    const result = await createWidget(widget)

    expect(result).toEqual(widget)
  })

  it('errors on reject', async () => {
    const widget: Widget = { description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }
    mocked(axios).post.mockRejectedValueOnce({})

    expect(createWidget(widget)).rejects.toBeTruthy()
  })
})

describe('updateWidget', () => {
  it('returns response data', async () => {
    const widget: Widget = { description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }
    mocked(axios).put.mockResolvedValueOnce({ data: widget })

    const result = await updateWidget(widget)

    expect(result).toEqual(widget)
  })

  it('errors on reject', async () => {
    const widget: Widget = { description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }
    mocked(axios).put.mockRejectedValueOnce({})

    expect(updateWidget(widget)).rejects.toBeTruthy()
  })
})

describe('deleteWidget', () => {
  it('returns response data', async () => {
    const widget: Widget = { description: 'Keeps a diary',  name: 'Widget Jones', price: 9.95 }
    mocked(axios).delete.mockResolvedValueOnce({ data: widget })

    const result = await deleteWidget(widget.name)

    expect(result).toEqual(widget)
  })

  it('errors on reject', async () => {
    mocked(axios).delete.mockRejectedValueOnce({})

    expect(deleteWidget('test name')).rejects.toBeTruthy()
  })
})
