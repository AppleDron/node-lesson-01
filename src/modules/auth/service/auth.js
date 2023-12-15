const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const userService = require("../../users/services/users");
const { JWT_SECRET } = require("../../common/constants/env");

class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  async register(payload) {
    const { password, ...rest } = payload;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({
      ...rest,
      password: passwordHash,
    });

    return payload;
  }

  async login(payload) {
    const { email, password } = payload;
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new HttpError(401, "Email and password does not match");
    }

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: 120 }
    );

    const refreshToken = crypto.randomBytes(5).toString("base64");
    await this.userService.updateUserById(user._id, { refreshToken });

    return { accessToken, sessionToken };
  }

  async refresheAccess(token) {
    if (!token) {
      throw new HttpError(401, "Refresh token is invalid");
    }
    const user = await userService.findUserByRefreshToken(token);

    if (!user) {
      throw new HttpError(401, "Refresh token is invalid");
    }

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: 1200 }
    );

    const refreshToken = crypto.randomBytes(5).toString("base64");
    await this.userService.updateUserById(user._id, { refreshToken });

    return { accessToken, refreshToken };
  }
}

const authService = new AuthService(userService);

module.exports = authService;
