const HttpError = require("../../modules/common/models/HttpErrors");

const checkRole = (roles) => (req, res, next) => {
  const userRole = req.user.role;

  const canActivate = roles.includes(userRole);
  if (canActivate) {
    next();
  } else {
    next(new HttpError(403, "Forbidden"));
  }
};

module.exports = checkRole;
