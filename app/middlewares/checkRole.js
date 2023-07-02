const { permissionUnauthorisedRequest } = require('../middlewares/response');

const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    console.log(roles);
    return permissionUnauthorisedRequest(
      req,
      res,
      'You dont have the right to perform this action.',
    );
  }
  next();
};

module.exports = checkRole;
