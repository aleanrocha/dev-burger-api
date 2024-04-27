import * as Yup from 'yup'

import Product from '../models/Product'
import Category from '../models/Category'

class OrderController {
  async store(req, res) {
    const orderSchema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    })

    try {
      orderSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { products } = req.body

    const productsIds = products.map((product) => product.id)

    const findProducts = await Product.findAll({
      where: { id: productsIds },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    })

    const formatedProducts = findProducts.map((product) => {
      const productIndex = products.findIndex((item) => item.id === product.id)

      const newProduct = {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        quantity: products[productIndex].quantity,
        url: product.url,
      }
      return newProduct
    })

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formatedProducts,
    }

    return res.status(201).json(order)
  }
}

export default new OrderController()
