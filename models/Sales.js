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

const updateOne = async (id, itensSold) => (
  connection()
    .then((db) => db.collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: { itensSold } }))
    .then(() => ({ _id: id, itensSold }))
);

module.exports = {
  insertOne,
  getAll,
  findById,
  updateOne,
};

// const data = [
//   {
//     productId: '6175f0003b1dba66f97544ca',
//     quantity: 99,
//   },
// ];

// const test = async () => {
//   const result = await updateOne('6175fcbcb7271f73c1fb2549', data);

//   console.log(result);
// };

// test();
