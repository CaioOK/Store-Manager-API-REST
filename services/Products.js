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

const updateOne = async (id, name, quantity) => {
  const productExists = await ProductsModel.findById(id);

  if (!productExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return ProductsModel.updateOne(id, name, quantity);
};

const getAll = async () => (
  ProductsModel.getAll()
);

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  if (!product) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

module.exports = {
  insertOne,
  getAll,
  findById,
  updateOne,
};
