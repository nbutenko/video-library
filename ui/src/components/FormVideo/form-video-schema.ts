import Joi from 'joi'

export const formVideoSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'This field is required',
    'string.base': 'Should be a string'
  }),
  artist: Joi.string().trim().required().messages({
    'string.empty': 'This field is required',
    'string.base': 'Should be a string'
  }),
  url: Joi.string()
    .trim()
    .uri({
      allowRelative: true,
      scheme: ['http', 'https']
    })
    .required()
    .pattern(
      // allows only Youtube video formatted links with http~, https~, www~ or none of these
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/i
    )
    .messages({
      'string.base': 'Must be a string',
      'string.empty': 'This field is required',
      'string.uri': 'Must be a URL',
      'string.pattern.base': 'Must match a Youtube URL pattern',
      'string.uriCustomScheme': 'Must be a URL'
    }),
  poster: Joi.string()
    .trim()
    .uri()
    .required()
    .messages({
      'string.base': 'Must be a string',
      'string.empty': 'This field is required',
      'string.uri': 'Must be a URL'
    })
})
