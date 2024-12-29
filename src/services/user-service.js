const { collection, toDto, toDtoBulk } = require('./db-service');
const { log } = require('../util/log');
const { DateTime } = require('luxon');

let dbClient = null;

const init = async () => {
  dbClient = collection('users');
  log.info('User service initialized');
};

const createUser = async (user) => {
  const createdAt = DateTime.now().toJSDate();
  user.createdAt = createdAt;
  const { insertedId } = await dbClient.insertOne(user);
  const createdUser = await dbClient.findOne(
    { _id: insertedId },
    { projection: { password: 0 } },
  );
  return toDto(createdUser);
};

const listUsers = async (filter, sortBy, sortOrder, offset, limit) => {
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const users = await dbClient
    .find({}, { projection: { password: 0 } })
    .sort(sort)
    .skip(offset)
    .limit(limit)
    .toArray();
  return toDtoBulk(users);
};

const shutdown = async () => {
  instance = null;
};

module.exports = {
  init,
  shutdown,
  createUser,
  listUsers,
};
