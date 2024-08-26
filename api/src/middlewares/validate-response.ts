import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

const validateResponse = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = res.json.bind(res)
    res.json = validateJson
    next()

    function validateJson(json: any) {
      if (![500, 400, 401, 403].includes(res.statusCode)) {
        const data = schema.validate(json)
        if (data.error) {
          const { details } = data.error
          const message = details.map((i) => i.message).join(',')
          console.log(`validate-response: ${message}`)
          // for debugging only
          // console.log(`response: \n${JSON.stringify(json, null, 2)}`)
          return res.status(500).end()
        }
        return response(data.value)
      }
      return res.status(500).end()
    }
  }
}

export default validateResponse
