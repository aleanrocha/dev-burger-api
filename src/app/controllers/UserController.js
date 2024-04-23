import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  async store(req, res) {
    const userSchema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    })

    try {
      userSchema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { name, email, password_hash, admin } = req.body

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    })
    return res.status(201).json({ id: user.id, name, email, admin })
  }
}

export default new UserController()
