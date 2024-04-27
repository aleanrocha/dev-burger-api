import * as Yup from 'yup'

import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store(req, res) {
    const categorySchema = Yup.object({
      name: Yup.string().required(),
    })

    try {
      categorySchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { admin: isAdmin } = await User.findByPk(req.userId)

    if (!isAdmin) {
      return res.status(401).json()
    }

    const { filename: path } = req.file
    const { name } = req.body

    const categoryExists = await Category.findOne({ where: { name } })

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists!' })
    }

    const category = await Category.create({ name, path })

    return res.status(201).json({ id: category.id, name })
  }

  async index(_, res) {
    const categories = await Category.findAll()
    return res.status(200).json(categories)
  }
}

export default new CategoryController()
