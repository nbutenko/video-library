import { Router } from 'express'
import validateRequest from '../../middlewares/validate-request'
import {
  allVideosResponseSchema,
  idSchema,
  searchRequestSchema,
  videoRequestSchema,
  videoResponseSchema
} from './schema'
import getVideos from './get-videos'
import postVideo from './post-video'
import validateResponse from '../../middlewares/validate-response'
import getVideoById from './get-video-by-id'
import putVideoById from './put-video-by-id'
import deleteVideo from './delete-video'

const videoRouter = Router()

videoRouter.get(
  '/',
  validateRequest(searchRequestSchema, 'query'),
  validateResponse(allVideosResponseSchema),
  getVideos
)

videoRouter.get(
  '/:id',
  validateRequest(idSchema, 'params'),
  validateResponse(videoResponseSchema),
  getVideoById
)

videoRouter.post('/', validateRequest(videoRequestSchema, 'body'), postVideo)

videoRouter.put(
  '/:id',
  validateRequest(idSchema, 'params'),
  validateRequest(videoRequestSchema, 'body'),
  putVideoById
)

videoRouter.delete('/:id', validateRequest(idSchema, 'params'), deleteVideo)

export default videoRouter
