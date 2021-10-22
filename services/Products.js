const ProductsModel = require('../models/Products');

const insertOne = async (name, quantity) => {
  const productExists = await ProductsModel.findByName(name);

  if (productExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return ProductsModel.insertOne(name, quantity);
};

module.exports = {
  insertOne,
};
