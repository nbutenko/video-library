import supertest from 'supertest'
import { appMock } from '../../test-utils/express-app-mock'
import pool from '../../db'
import videoRouter from '.'
import { mockVideos } from '../../test-utils/video-mocks'

require('dotenv').config()
appMock.use('/videos', videoRouter)
const apiRoute = '/videos'

const mockVideoid = mockVideos[0].id
const mockVideo = {
  name: mockVideos[0].name,
  artist: mockVideos[0].artist,
  url: mockVideos[0].url,
  poster: mockVideos[0].poster
}

describe('put-video-by-id', () => {
  it('returns 500 when some internal server error happens', async () => {
    ;(pool.execute as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    )
    const result = await supertest(appMock)
      .put(`${apiRoute}/${mockVideoid}`)
      .send(mockVideo)

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual({ error: 'Internal Server Error' })
  })

  it('returns 400 with wrong id parameter', async () => {
    const result = await supertest(appMock)
      .put(`${apiRoute}/wrong`)
      .send(mockVideo)

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with empty request body', async () => {
    const result = await supertest(appMock)
      .put(`${apiRoute}/${mockVideoid}`)
      .send({})

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with wrong request body', async () => {
    const result = await supertest(appMock)
      .put(`${apiRoute}/${mockVideoid}`)
      .send({ wrong: 'wrong' })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 400 with correct request body with extra field', async () => {
    const result = await supertest(appMock)
      .put(`${apiRoute}/${mockVideoid}`)
      .send({ ...mockVideo, extraField: 'field' })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual({})
  })

  it('returns 404 without videoId in query param', async () => {
    const result = await supertest(appMock).put(apiRoute).send(mockVideo)

    expect(result.statusCode).toBe(404)
    expect(result.body).toStrictEqual({})
  })

  it('returns 404 with correct query and body, but requested video not found', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([{ affectedRows: 0 }])
    const result = await supertest(appMock)
      .put(`${apiRoute}/${mockVideoid}`)
      .send(mockVideo)

    expect(result.statusCode).toBe(404)
    expect(result.body).toStrictEqual({ error: 'Video not found' })
  })

  it('returns 200 and successfully updates the video', async () => {
    ;(pool.execute as jest.Mock).mockResolvedValue([{ affectedRows: 1 }])
    const result = await supertest(appMock)
      .put(`${apiRoute}/${mockVideoid}`)
      .send(mockVideo)

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual({
      message: 'Video has been successfully updated'
    })
  })
})
