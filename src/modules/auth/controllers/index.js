const authService = require("../service/auth");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res) => {
    const { accessToken, refreshToken } = await this.authService.login(
      req.body
    );

    req.cookies("refreshToken", refreshToken, { secure: true, httpOnly: true });

    res.json({
      status: 200,
      message: "User logged in successfully",
      data: { token: accessToken },
    });
  };

  register = async (req, res, next) => {
    const result = await this.authService.register(req.body);
    res.json({ status: 200, message: "User created successfully", data: user });
  };

  refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.accessRefresh(refreshToken);

    req.cookies("refreshToken", newRefreshToken, {
      secure: true,
      httpOnly: true,
    });

    res.json({
      status: 200,
      message: "Token refreshed",
      data: { token: accessToken },
    });
  };

  logout = async (req, res) => {
    res.clearCookie("refreshToken");

    res.json({
      status: 200,
      message: "User  is logged out",
      data: { token: accessToken },
    });
  };
}

const authController = new AuthController(authService);

module.exports = authController;
