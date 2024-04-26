import { Router } from 'express'
import multer from 'multer'

import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'

import multerConfig from './config/multer'
import CategoryController from './app/controllers/CategoryController'

const routes = new Router()

const upload = multer(multerConfig)

routes.get('/', (_, res) => {
  return res.status(200).json({ message: 'OK' })
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware)

routes.get('/products', ProductController.index)
routes.post('/products', upload.single('file'), ProductController.store)

routes.get('/categories', CategoryController.index)
routes.post('/categories', CategoryController.store)

export default routes
