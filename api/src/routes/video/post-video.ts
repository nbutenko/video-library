import { Request, Response } from 'express'
import pool from '../../db'

const postVideo = async (req: Request, res: Response) => {
  const { name, artist, url, poster } = req.body

  try {
    const [result] = await pool.execute(
      'INSERT INTO video (name, artist, url, poster) VALUES (?, ?, ?, ?)',
      [name, artist, url, poster]
    ) as any

    return res
      .status(201)
      .json({
        message: 'Video has been successfully created',
        id: result.insertId
      })
  } catch (error) {
    console.error('post-video', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default postVideo
