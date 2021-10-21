const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
let DB = null;

const connection = () => (
  DB
  ? Promise.resolve(DB)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      DB = conn.db(DB_NAME);
      return DB;
    })
);

module.exports = connection;
