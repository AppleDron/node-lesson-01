const jwt = require("jsonwebtoken");
const HttpError = require("../../modules/common/models/HttpErrors");
const { JWT_SECRET } = require("../../modules/common/constants/env");
const userService = require("../../modules/users/services/users");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [_, token] = authHeader.split(" ");

  if (!token) {
    return next(new HttpError(401, "Unauthorizated"));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new HttpError(401, "Unauthorizated"));
  }

  const user = await userService.findByEmail(payload.sub);

  req.user = user;
};

module.exports = auth;
