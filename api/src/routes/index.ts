import { Router } from 'express'
import videoRouter from './video'

const apiRoutes = Router()

const routes = [
  {
    name: '/videos',
    controller: videoRouter
  }
]

routes.forEach(({ name, controller }) => {
  Array.isArray(controller)
    ? controller.forEach((routeController) => {
        apiRoutes.use(name, routeController)
      })
    : apiRoutes.use(name, controller)
})

export default apiRoutes
