const log = require('../util/log');
const { db, createCollection } = require('./db-service');

let instance = null;
const init = async () => {
  if (instance) {
    return instance;
  }
  const dbClient = db();
  const test = null;
  await createCollection('users');

  const createUser = async (user) => {
    const createdUser = await dbClient.insertOne(user);
    return createdUser;
  };

  const listUsers = async () => {
    const users = await dbClient.find();
    return users;
  };

  instance = {
    createUser,
    listUsers,
  };
  log.info('User service initialized');
  return instance;
};
const shutdown = async () => {
  instance = null;
};

module.exports = {
  init,
  shutdown,
  userService: instance,
};
