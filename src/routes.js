import { Router } from 'express'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.get('/', (_, res) => {
  return res.status(200).json({ message: 'OK' })
})

routes.post('/users', UserController.store)

export default routes
