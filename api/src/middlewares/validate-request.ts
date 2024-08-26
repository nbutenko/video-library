import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

const validateRequest = (
  schema: Joi.Schema | null,
  property: 'body' | 'query' | 'params'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      if (Object.values(req[property]).length > 0) {
        console.log(
          'Request body is not expecting any data; however, request body has data; therefore, rejecting it.'
        )
        return res.status(400).send()
      }
      return next()
    }
    const { error, value } = schema.validate(req[property], {
      abortEarly: false
    })
    if (error) {
      console.log(JSON.stringify(error))
      return res.status(400).send()
    }
    req[property] = value
    next()
  }
}

export default validateRequest
