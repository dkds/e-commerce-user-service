const router = require('express').Router();
const { status, response, listResponse } = require('../dto/response');
const { userRegisterSchema, userListSchema } = require('../dto/user');
const { createUser, listUsers } = require('../services/user-service');
const { validateBody, validateQuery } = require('../util/request-validator');

/* POST create user. */
router.post('/', validateBody(userRegisterSchema), async (req, res) => {
  const user = req.body;
  const createdUser = await createUser(user);
  res.status(status.CREATED).json(response(createdUser));
});

/* GET users listing. */
router.get('/', validateQuery(userListSchema), async (req, res) => {
  const { filter, sort_by, sort_order, offset, limit } = req.query || {};
  const users = await listUsers(filter, sort_by, sort_order, offset, limit);
  res
    .status(status.OK)
    .json(listResponse(users, { filter, sort_by, sort_order, offset, limit }));
});

module.exports = router;
