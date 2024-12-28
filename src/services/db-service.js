const { MongoClient } = require('mongodb');
const log = require('../util/log');

let client = null;

const init = async () => {
  client = new MongoClient(
    process.env.MONGO_URL + '/' + process.env.MONGO_DB_USER_SERVICE,
  );
  await client.connect();
  log.info('DB connection initialized');
};
const createCollection = async (name) => {
  const db = await client.db(process.env.MONGO_DB_USER_SERVICE);
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);

  if (!collectionNames.includes(name)) {
    await db.createCollection(name);
    log.info(`Collection '${name}' created`);
  }
};
const db = () => {
  if (!client) {
    throw new Error('DB client not initialized');
  }
  return client;
};
const shutdown = async () => {
  await client.close();
  log.info('DB connection closed');
};

module.exports = {
  init,
  shutdown,
  db,
  createCollection,
};
