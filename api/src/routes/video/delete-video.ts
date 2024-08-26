import { Request, Response } from 'express'
import pool from '../../db'

const deleteVideo = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const [result] = await pool.execute('DELETE FROM video WHERE id = ?', [id])

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' })
    }

    return res.status(200).json({ message: 'Video has been successfully deleted' })
  } catch (error) {
    console.error('delete-video', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default deleteVideo
