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
  const sales = await SalesModel.insertOne(itensSold);
  const allValid = await productValidation(itensSold);

  if (!allValid) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return sales;
};

module.exports = {
  insertOne,
};
