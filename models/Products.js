const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'products';

const insertOne = async (name, quantity) => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ name, quantity }))
    .then((data) => ({ _id: data.insertedId, name, quantity }))
);

const findByName = async (name) => {
  const product = connection()
    .then((db) => db.collection(collectionName).findOne({ name }));

  if (!product) return null;

  return product;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection(collectionName).findOne(new ObjectId(id)));

  if (!product) return null;

  return product;
};

const getAll = async () => (
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
);

module.exports = {
  insertOne,
  findByName,
  getAll,
  findById,
};
