import { Request, Response } from 'express'
import pool from '../../db'
import { Video } from '../types/video'

const getVideoById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const [rows] = await pool.execute('SELECT id, name, artist, url, poster FROM video WHERE id = ?', [id])
    const videos: Video[] = rows as Video[]

    if (!videos.length) {
      return res.status(404).json({ error: 'Video not found' })
    }

    return res.status(200).json(videos[0])
  } catch (error) {
    console.error('get-video-by-id', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getVideoById
