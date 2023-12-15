const usersRepository = require("../repository/users");

class UserService {
  constructor(userRepository) {
    this.userRepository = usersRepository;
  }

  createUser = async (payload) => {
    return await this.userRepository.create(payload);
  };

  updateuserById = async (id, payload) => {
    return await this.userRepository.updateById(id, payload);
  };

  findByEmail = async (email) => {
    return await this.userRepository.findByEmail(email);
  };

  findById = async (Id) => {
    return await this.userRepository.findById(Id);
  };

  findUserByRefreshToken = async (token) => {
    return await this.userRepository.findByEmail(token);
  };
}

const userService = new UserService();

module.exports = userService;
