import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      },
    )
  }
}

export default Product
