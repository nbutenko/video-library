import supertest from 'supertest'
import { appMock } from '../../test-utils/express-app-mock'
import pool from '../../db'
import videoRouter from '.'
import { mockVideos } from '../../test-utils/video-mocks'

require('dotenv').config()
appMock.use('/videos', videoRouter)
const apiRoute = '/videos'

describe('delete-video-by-id', () => {
  it('returns 500 when some internal server error happens', async () => {
    ;(pool.execute as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    )
    const result = await supertest(appMock).delete(`${apiRoute}/1`)

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual({ error: 'Internal Server Error' })
  })

  it('returns 400 with wrong id parameter', async () => {
    const result = await supertest(appMock).delete(`${apiRoute}/wrong`)

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 404 without videoId in query param', async () => {
    const result = await supertest(appMock).delete(apiRoute)

    expect(result.statusCode).toBe(404)
    expect(result.body).toStrictEqual({})
  })

  it('returns 404 with correct query, but requested video not found', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([{ affectedRows: 0 }])
    const result = await supertest(appMock).delete(`${apiRoute}/1`)

    expect(result.statusCode).toBe(404)
    expect(result.body).toStrictEqual({ error: 'Video not found' })
  })

  it('returns 200 and successfully deletes the video', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([{ affectedRows: 1 }])
    const result = await supertest(appMock).delete(`${apiRoute}/1`)

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual({
      message: 'Video has been successfully deleted'
    })
  })
})
