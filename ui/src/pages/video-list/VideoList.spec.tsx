import { BrowserRouter as Router } from 'react-router-dom'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import VideoList from './VideoList'
import { mockVideos } from '../../test-utils/mocks'
import { getApiUrl } from '../../test-utils/get-api-url'

const ROUTE = getApiUrl(`/videos`)
const server = setupServer(
  rest.get(ROUTE, (_req, res, ctx) => {
    return res(ctx.json(mockVideos))
  }),
  rest.delete(`${ROUTE}/${mockVideos[0].id}`, (_req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(ROUTE, (_req, res, ctx) => {
    return res(ctx.json({ id: 11 }))
  })
)

const renderVideoList = () => {
  const utils = render(
    <Router>
      <VideoList />
    </Router>
  )

  return {
    ...utils,
    waitForLoading: async () =>
      await waitForElementToBeRemoved(screen.queryByRole('progressbar')), // MUI CircularProgress
    getCreateButton: () => screen.getByRole('button', { name: 'Create' }),
    getCancelButton: () => screen.getByRole('button', { name: 'Cancel' }),
    getAllVideoCards: () => screen.getAllByTestId('video-card'),
    getDialog: () => screen.getByRole('dialog'),
    fillOutForm: async () => {
      // enter Name
      await userEvent.type(
        screen.getByRole('textbox', { name: /name/i }),
        mockVideos[0].name
      )
      expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
        mockVideos[0].name
      )
      // enter Artist
      await userEvent.type(
        screen.getByRole('textbox', { name: /artist/i }),
        mockVideos[0].artist
      )
      expect(screen.getByRole('textbox', { name: /artist/i })).toHaveValue(
        mockVideos[0].artist
      )
      // enter Video URL
      await userEvent.type(
        screen.getByRole('textbox', { name: /video url/i }),
        mockVideos[0].url
      )
      expect(screen.getByRole('textbox', { name: /video url/i })).toHaveValue(
        mockVideos[0].url
      )
      // enter Poster URL
      await userEvent.type(
        screen.getByRole('textbox', { name: /poster url/i }),
        mockVideos[0].poster
      )
      expect(screen.getByRole('textbox', { name: /poster url/i })).toHaveValue(
        mockVideos[0].poster
      )
    }
  }
}

describe('VideoList component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    jest.clearAllMocks()
  })
  afterAll(() => server.close())

  it('renders error if fetching videos fails', async () => {
    server.use(
      rest.get(ROUTE, (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const { waitForLoading } = renderVideoList()
    await waitForLoading()

    expect(
      screen.getByText('Error fetching videos - try again later.')
    ).toBeInTheDocument()
  })

  it('renders empty list if no videos returned from api', async () => {
    server.use(
      rest.get(ROUTE, (_req, res, ctx) => {
        return res(ctx.json([]))
      })
    )
    const { waitForLoading } = renderVideoList()
    await waitForLoading()

    expect(screen.queryByTestId('video-card')).not.toBeInTheDocument()
    expect(screen.getByTestId('create-video-card')).toBeInTheDocument()
  })

  it('renders content correctly', async () => {
    const { waitForLoading, getCreateButton, getAllVideoCards } =
      renderVideoList()
    await waitForLoading()

    expect(screen.getByText('Welcome to Medea!')).toBeInTheDocument()
    expect(screen.getByTestId('controls')).toBeInTheDocument()
    expect(screen.getByText('Recently Added')).toBeInTheDocument()
    expect(getAllVideoCards().length).toBe(mockVideos.length)
    mockVideos.map((video) => {
      expect(screen.getByText(video.name)).toBeInTheDocument()
      expect(screen.getByText(video.artist)).toBeInTheDocument()
    })
    expect(getCreateButton()).toBeInTheDocument()
  })

  it('Delete video functionality works correctly', async () => {
    const { waitForLoading, getAllVideoCards, getCancelButton, getDialog } =
      renderVideoList()
    await waitForLoading()

    expect(screen.queryByText('dialog')).not.toBeInTheDocument()
    const deleteIcon = screen.getAllByTestId('delete-button')[0]
    await userEvent.click(deleteIcon)
    await waitFor(() => {
      expect(getDialog()).toBeInTheDocument()
    })
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    const cancelButton = getCancelButton()
    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    // Cancel work correctly
    await userEvent.click(cancelButton)
    await waitFor(() => {
      expect(screen.queryByText('dialog')).not.toBeInTheDocument()
    })

    // Delete works correctly
    await userEvent.click(deleteIcon)
    await waitFor(() => {
      expect(getDialog()).toBeInTheDocument()
    })
    await userEvent.click(deleteButton)
    await waitFor(() => {
      expect(getAllVideoCards().length).toBe(mockVideos.length - 1)
    })
    expect(screen.queryByText('dialog')).not.toBeInTheDocument()
  })

  it('redirects to the single video page on video card click', async () => {
    const { waitForLoading, getAllVideoCards } = renderVideoList()
    await waitForLoading()

    await userEvent.click(getAllVideoCards()[0])
    await waitFor(() => {
      expect(window.location.pathname).toEqual(`/videos/${mockVideos[0].id}`)
    })
  })

  it.todo('Create video functionality works correctly')

  it.todo('Update video functionality works correctly')
})
