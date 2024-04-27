import * as Yup from 'yup'

import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'

class ProductController {
  async store(req, res) {
    const productSchema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    })

    try {
      productSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { admin: isAdmin } = await User.findByPk(req.userId)

    if (!isAdmin) {
      return res.status(401).json()
    }

    const { filename: path } = req.file
    const { name, price, category_id, offer } = req.body

    const product = await Product.create({
      name,
      price,
      offer,
      category_id,
      path,
    })

    console.log(typeof req.body.id)

    return res
      .status(201)
      .json({ id: product.id, name, price, offer, path, category_id })
  }

  async index(_, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })
    return res.status(200).json(products)
  }
}

export default new ProductController()
