const express = require('express');
const userRoutes = require('./userRoutes');
const router = express.Router();

userRoutes(router);
router.get('/', (req, res, next) => {
  res.send('Hello from the server');
});
module.exports = router;
