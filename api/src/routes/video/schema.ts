import joi from 'joi'

export const idSchemaKey = {
  id: joi.number().required()
}

const videoSchemaKeys = {
  name: joi.string().required(),
  artist: joi.string().required(),
  url: joi.string().uri().required(),
  poster: joi.string().uri().required()
}

export const idSchema = joi.object().keys(idSchemaKey)

export const videoRequestSchema = joi.object({
  ...videoSchemaKeys
})

export const videoResponseSchema = joi.object({
  ...idSchemaKey,
  ...videoSchemaKeys
})

export const allVideosResponseSchema = joi.array().items(videoResponseSchema)

export const searchRequestSchema = joi.object({
  search: joi.string().optional()
})
