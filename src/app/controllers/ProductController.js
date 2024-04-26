import * as Yup from 'yup'

import Product from '../models/Product'
import Category from '../models/Category'

class ProductController {
  async store(req, res) {
    const productSchema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
    })

    try {
      productSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { filename: path } = req.file
    const { name, price, category_id } = req.body

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
    })

    console.log(typeof req.body.id)

    return res
      .status(201)
      .json({ id: product.id, name, price, path, category_id })
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
