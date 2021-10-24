const Joi = require('joi');
const rescue = require('express-rescue');
const SalesService = require('../services/Sales');

const OK_200 = 200;

const salesValidationSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().not().empty().required(),
    quantity: Joi.number().options({ convert: false }).integer().min(1)
      .required(),
  }),
);

const insertOne = rescue(async (req, res, next) => {
  const itensSold = req.body;
  const ERROR = {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  };

  const { error } = salesValidationSchema.validate(itensSold);

  if (error) return next(ERROR);

  const sales = await SalesService.insertOne(itensSold);

  if (sales.error) return next(sales.error);

  res.status(OK_200).json(sales);
});

module.exports = {
  insertOne,
};
