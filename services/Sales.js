const SalesModel = require('../models/Sales');
const ProductsModel = require('../models/Products');

const productValidation = async (itensSold) => {
  let allValid = true;

  await itensSold.forEach(async ({ productId }) => {
    const product = await ProductsModel.findById(productId);
    
    if (!product) {
      allValid = false;
    }
  });

  return allValid;
};

const insertOne = async (itensSold) => {
  const sale = await SalesModel.insertOne(itensSold);
  const allValid = await productValidation(itensSold);

  if (!allValid) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return sale;
};

const getAll = async () => (
  SalesModel.getAll()
);

const findById = async (id) => {
  const sale = await SalesModel.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const updateOne = async (id, itensSold) => {
  const saleExists = await SalesModel.findById(id);
  
  if (!saleExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const updatedSale = await SalesModel.updateOne(id, itensSold);

  return updatedSale;
};

module.exports = {
  insertOne,
  getAll,
  findById,
  updateOne,
};
