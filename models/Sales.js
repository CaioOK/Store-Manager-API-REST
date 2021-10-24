// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'sales';

const insertOne = async (itensSold) => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ itensSold }))
    .then((data) => ({ _id: data.insertedId, itensSold }))
);

module.exports = {
  insertOne,
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
