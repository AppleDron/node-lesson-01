const saveFileToCloudinary = require("../../common/utils/saveFileToCloudinary");
const saveFileToStorage = require("../../common/utils/saveFileToStorage");
const userService = require("../services/users");

class UsersController {
  constructor(userService) {
    this.userService = userService;
  }
  updateMe = async (req, res, next) => {
    const userId = req.user._id;
    const { body } = req;
    const avatarUrl = await saveFileToCloudinary(req.file);
    const user = await this.userService.updateuserById(userId, {
      ...body,
      avatarUrl,
    });
    res.json({
      status: 200,
      message: "User updated successfully",
      data: user,
    });
  };
}

const usersController = new UsersController(userService);
module.exports = usersController;
