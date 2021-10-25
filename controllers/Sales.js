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

  const sale = await SalesService.insertOne(itensSold);

  if (sale.error) return next(sale.error);

  res.status(OK_200).json(sale);
});

const getAll = rescue(async (_req, res) => {
  const sales = await SalesService.getAll();

  res.status(OK_200).json({ sales });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sale = await SalesService.findById(id);

  if (sale.error) return next(sale.error);

  res.status(OK_200).json(sale);
});

module.exports = {
  insertOne,
  getAll,
  findById,
};
