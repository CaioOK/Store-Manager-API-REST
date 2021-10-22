const Joi = require('joi');
const rescue = require('express-rescue');
const ProductsService = require('../services/Products');

const CREATED_201 = 201;
const OK_200 = 200;

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

  res.status(CREATED_201).json(newProduct);
});

const updateOne = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(5)
      .required(),
    quantity: Joi.number().options({ convert: false }).integer().min(1)
      .required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;
  const { id } = req.params;

  const edditedProduct = await ProductsService.updateOne(id, name, quantity);

  if (edditedProduct.error) return next(edditedProduct.error);

  res.status(OK_200).json(edditedProduct);
});

const getAll = rescue(async (_req, res) => {
  const products = await ProductsService.getAll();

  res.status(OK_200).json({ products });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductsService.findById(id);

  if (product.error) return next(product.error);

  res.status(OK_200).json(product);
});

module.exports = {
  insertOne,
  getAll,
  findById,
  updateOne,
};
