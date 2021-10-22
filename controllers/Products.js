const Joi = require('joi');
const rescue = require('express-rescue');
const ProductsService = require('../services/Products');

const STATUS_CREATED_201 = 201;

const insertOne = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(5)
      .required(),
    quantity: Joi.number().options({ convert: false }).integer().min(1)
      .required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;

  const newProduct = await ProductsService.insertOne(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  res.status(STATUS_CREATED_201).json(newProduct);
});

module.exports = {
  insertOne,
};
