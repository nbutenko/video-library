import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import corsOptions from './cors'
import apiRoutes from './routes'

dotenv.config()

const app: Application = express()

app.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(cors(corsOptions))
.use(apiRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
