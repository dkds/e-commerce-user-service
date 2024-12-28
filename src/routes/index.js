const userRoutes = require('./user-routes');

const basePath = '/api';
const init = async (app) => {
  app.use(basePath + '/users', userRoutes);
};
const shutdown = async () => {};

module.exports = { init, shutdown };
