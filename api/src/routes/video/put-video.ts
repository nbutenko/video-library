import { Request, Response } from 'express'
import pool from '../../db'

const putVideoById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, artist, url, poster } = req.body

  try {
    const [result] = await pool.execute(
      'UPDATE video SET name = ?, artist = ?, url = ?, poster = ? WHERE id = ?',
      [name, artist, url, poster, id]
    )

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' })
    }

    return res.status(200).json({ message: 'Video has been successfully updated' })
  } catch (error) {
    console.error('put-video-by-id', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default putVideoById
