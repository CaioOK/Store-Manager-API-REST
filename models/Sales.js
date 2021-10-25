const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'sales';

const insertOne = async (itensSold) => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ itensSold }))
    .then((data) => ({ _id: data.insertedId, itensSold }))
);

const getAll = async () => (
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection(collectionName).findOne(new ObjectId(id)));
  
  if (!sale) return null;

  return sale;
};

module.exports = {
  insertOne,
  getAll,
  findById,
};

// const data = [
//   {
//     productId: 'product_id',
//     quantity: 'product_quantity',
//   },
//   {
//     productId: 'product_id2',
//     quantity: 'product_quantity2',
//   },
//   {
//     productId: 'product_id3',
//     quantity: 'product_quantity3',
//   },
// ];

// const test = async () => {
//   const result = await insertMany(data);

//   console.log(result);
// };

// test();
