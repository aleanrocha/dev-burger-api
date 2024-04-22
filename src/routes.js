import { Router } from 'express'

import { v4 } from 'uuid'

import User from './app/models/User'

const routes = new Router()

routes.get('/', async (_, res) => {
  // return res.status(200).json({ message: 'OK' })
  const user = await User.create({
    id: v4(),
    name: 'Alean',
    email: 'alean@gmail.com',
    password_hash: 'enfqnbfqkbefçcoQANQcvçoAQ',
  })
  return res.status(201).json(user)
})

export default routes
