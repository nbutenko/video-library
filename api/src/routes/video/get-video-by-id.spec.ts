import supertest from 'supertest'
import { appMock } from '../../test-utils/express-app-mock'
import pool from '../../db'
import videoRouter from '.'
import { mockVideos } from '../../test-utils/video-mocks'

require('dotenv').config()
appMock.use('/videos', videoRouter)
const apiRoute = '/videos'

describe('get-video-by-id', () => {
  it('returns 500 when some internal server error happens', async () => {
    ;(pool.execute as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    )
    const result = await supertest(appMock).get(`${apiRoute}/1`)

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with wrong ID parameter', async () => {
    const result = await supertest(appMock).get(`${apiRoute}/wrong`)

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 404 when video is not found', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([[]])
    const result = await supertest(appMock).get(`${apiRoute}/1`)

    expect(result.statusCode).toBe(404)
  })

  it('returns 200 with video data', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([[mockVideos[0]]])
    const result = await supertest(appMock).get(`${apiRoute}/1`)
    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(mockVideos[0])
  })
})
