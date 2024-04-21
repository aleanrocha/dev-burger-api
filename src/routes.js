const { Router } = require('express')

const routes = new Router()

routes.get('/', (_, res) => {
  return res.status(200).json({ message: 'OK' })
})

module.exports = routes
