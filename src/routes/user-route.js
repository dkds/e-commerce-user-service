const router = require("express").Router();
const { status, body } = require("../dto/response");
const userService = require("../services/user-service");

/* POST create user. */
router.post("/", async (req, res) => {
  const user = req.body;
  const createdUser = await userService().createUser(user);
  res.status(status.CREATED).json(body(createdUser));
});

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await userService().listUsers();
  res.status(status.OK).json(body(users));
});

module.exports = router;
