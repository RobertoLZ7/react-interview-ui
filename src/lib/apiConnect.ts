import axios from 'axios'

const BASE_URL = 'http://localhost:9000'

export interface Widget {
  description: string
  name: string
  price: number
}

export const fetchAllWidgets = (): Promise<Widget[]> => axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data)
export const fetchWidgetByName = (name: string): Promise<Widget> => axios.get(`${BASE_URL}/v1/widgets?name=${name}`).then((response) => response.data)
export const createWidget = (widget: Widget): Promise<Widget> => axios.post(`${BASE_URL}/v1/widgets`, widget).then((response) => response.data)
export const updateWidget = (widget: Widget): Promise<Widget> => axios.put(`${BASE_URL}/v1/widgets`, widget).then((response) => response.data)
export const deleteWidget = (name: string): Promise<Widget> => axios.delete(`${BASE_URL}/v1/widgets?name=${name}`).then((response) => response.data)
