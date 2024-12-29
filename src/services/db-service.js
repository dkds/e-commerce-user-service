const { MongoClient } = require('mongodb');
const { log } = require('../util/log');

let client = null;
let instance = null;

/**
 * Initializes the database connection.
 * @returns {Promise<void>} A promise that resolves when the connection is initialized.
 */
const init = async () => {
  client = new MongoClient(
    process.env.MONGO_URL + '/' + process.env.MONGO_DB_USER_SERVICE,
  );
  instance = client.db(process.env.MONGO_DB_USER_SERVICE);
  log.info('DB connection initialized');
};

/**
 * Retrieves a collection by name.
 * @param {string} name - The name of the collection to retrieve.
 * @returns {import('mongodb').Collection} The MongoDB collection instance.
 */
const collection = (name) => {
  if (!instance) {
    throw new Error('DB instance not initialized. Call init() first.');
  }
  return instance.collection(name);
};

/**
 * Shuts down the database connection.
 * @returns {Promise<void>} A promise that resolves when the connection is closed.
 */
const shutdown = async () => {
  if (client) {
    await client.close();
    log.info('DB connection closed');
  }
};

const toDto = (document) => {
  if (!document) return null;
  const { _id, ...rest } = document;
  return { id: _id, ...rest };
};

const toDtoBulk = (documents) => {
  if (!documents) return [];
  return documents.map(toDto);
};

const toEntity = (document) => {
  const { id, ...rest } = document;
  return { _id: id, ...rest };
};

module.exports = {
  init,
  shutdown,
  collection,
  toDto,
  toDtoBulk,
  toEntity,
};
