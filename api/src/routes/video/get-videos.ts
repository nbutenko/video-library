import { Request, Response } from 'express'
import pool from '../../db'

const getVideos = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string

    let query = 'SELECT id, name, artist, url, poster FROM video'
    let params: string[] = []

    if (search) {
      query += ' WHERE LOWER(name) LIKE ? OR LOWER(artist) LIKE ?'
      const searchTerm = `%${search.trim().toLowerCase()}%`
      params = [searchTerm, searchTerm]
    }

    const [rows] = await pool.execute(query, params)
    return res.status(200).json(rows)
  } catch (error) {
    console.error('get-videos', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getVideos
