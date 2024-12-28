require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const log = require("./util/log");

const usersRouter = require("./routes/user-route");
const {
  init: initServices,
  shutdown: shutdownServices,
} = require("./services");
initServices();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const basePath = "/api";
app.use(basePath + "/users", usersRouter);

const server = app.listen(process.env.PORT, () => {
  log.info(`App listening on port ${process.env.PORT}`);
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

async function shutDown() {
  log.info("Received kill signal, shutting down gracefully");

  await shutdownServices();

  server.close(() => {
    log.info("Closing App");
    process.exit(0);
  });

  setTimeout(() => {
    log.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
}
