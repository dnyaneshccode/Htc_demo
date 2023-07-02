const express = require('express');
express.Router();
const userController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const checkRole = require('../middlewares/checkRole');
function initRoutes(router) {
  router.post('/api/user/register/', userController().register);
  router.post('/api/user/login/', userController().signIn);
  router.get(
    '/api/user/testingroles/',
    userAuth,
    checkRole([1]),
    userController().testingroles,
  );
  router.post(
    '/api/user/generateNewAccessToken/',
    userController().generateNewAccessToken,
  );
  router.post('/api/user/logout/', userAuth, userController().logout);
}
module.exports = initRoutes;
