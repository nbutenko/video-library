import supertest from 'supertest'
import { appMock } from '../../test-utils/express-app-mock'
import pool from '../../db'
import videoRouter from '.'
import { mockVideos } from '../../test-utils/video-mocks'

require('dotenv').config()
appMock.use('/videos', videoRouter)
const apiRoute = '/videos'

const mockNewVideo = {
  name: mockVideos[0].name,
  artist: mockVideos[0].artist,
  url: mockVideos[0].url,
  poster: mockVideos[0].poster
}

describe('post-video', () => {
  it('returns 500 when some internal server error happens', async () => {
    ;(pool.execute as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    )
    const result = await supertest(appMock).post(apiRoute).send(mockNewVideo)

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual({ error: 'Internal Server Error' })
  })

  it('returns 404 with correct request body, but wrong request parameter', async () => {
    const result = await supertest(appMock)
      .post(`${apiRoute}/wrong`)
      .send(mockNewVideo)

    expect(result.statusCode).toBe(404)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with empty request body', async () => {
    const result = await supertest(appMock).post(apiRoute).send({})

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with wrong request body', async () => {
    const result = await supertest(appMock)
      .post(apiRoute)
      .send({ wrong: 'wrong' })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with correct request body with extra field', async () => {
    const result = await supertest(appMock)
      .post(apiRoute)
      .send({ ...mockNewVideo, extraField: 'field' })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 201 with correct request body', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([{ insertId: 11 }])
    const result = await supertest(appMock).post(apiRoute).send(mockNewVideo)
    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual({
      id: 11,
      message: 'Video has been successfully created'
    })
  })
})
