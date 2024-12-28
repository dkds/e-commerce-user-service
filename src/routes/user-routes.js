const router = require('express').Router();
const { validateBody } = require('express-joi-validations');
const { status, body } = require('../dto/response');
const { userRegisterSchema } = require('../dto/user');
const { userService } = require('../services/user-service');

/* POST create user. */
router.post('/', validateBody(userRegisterSchema), async (req, res) => {
  const user = req.body;
  const createdUser = userService.createUser(user);
  res.status(status.CREATED).json(body(createdUser));
});

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = userService.listUsers();
  res.status(status.OK).json(body(users));
});

module.exports = router;
