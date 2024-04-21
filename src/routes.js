import { Router } from 'express'

const routes = new Router()

routes.get('/', (_, res) => {
  return res.status(200).json({ message: 'OK' })
})

export default routes
