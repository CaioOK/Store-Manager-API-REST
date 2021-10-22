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

module.exports = {
  insertOne,
  findByName,
};
