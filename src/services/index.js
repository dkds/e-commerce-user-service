const init = async () => {
  await require('./db-service').init();
  await require('./user-service').init();
};
const shutdown = async () => {
  await require('./db-service').shutdown();
  await require('./user-service').shutdown();
};

module.exports = { init, shutdown };
