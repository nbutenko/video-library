import { render, screen } from '@testing-library/react'
import App from './App'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getApiUrl } from './test-utils/get-api-url'


const server = setupServer(
  rest.get(getApiUrl(`/videos`), (_req, res, ctx) => {
    return res(ctx.json([]))
  })
)

describe('App component', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  it('header should exist', async () => {
    render(<App />)
    const header = await screen.findByText('Recently Added')
    expect(header).toBeInTheDocument()
  })
})
