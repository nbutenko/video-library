import supertest from 'supertest'
import { appMock } from '../../test-utils/express-app-mock'
import pool from '../../db'
import videoRouter from '.'
import { mockVideos } from '../../test-utils/video-mocks'

require('dotenv').config()
appMock.use('/videos', videoRouter)
const apiRoute = '/videos'

describe('get-videos', () => {
  it('returns 500 when some internal server error happens', async () => {
    ;(pool.execute as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    )
    const result = await supertest(appMock).get(apiRoute)

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 when search param is wrong', async () => {
    const result = await supertest(appMock)
      .get(apiRoute)
      .query({ search: null })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 200 with body when there are no videos', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([])
    const result = await supertest(appMock).get(apiRoute)
    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual('')
  })

  it('returns 200 with list of all video', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([mockVideos])
    const result = await supertest(appMock).get(apiRoute)
    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(mockVideos)
  })
})
