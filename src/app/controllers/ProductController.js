import * as Yup from 'yup'

class ProductController {
  async store(req, res) {
    const productSchema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      productSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    console.log(req.body)

    return res.status(201).json({ message: 'OK' })
  }
}

export default new ProductController()
