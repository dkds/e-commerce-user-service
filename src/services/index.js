const init = async () => {
  await Promise.all([
    require("./db-service").init(),
    require("./user-service").init(),
  ]);
};
const shutdown = async () => {
  await Promise.all([
    require("./user-service").shutdown(),
    require("./db-service").shutdown(),
  ]);
};

module.exports = { init, shutdown };
