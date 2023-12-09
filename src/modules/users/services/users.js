const usersRepository = require("../repository/users");

class UserService {
  constructor(userRepository) {
    this.userRepository = usersRepository;
  }

  async createUser(payload) {
    return await this.userRepository.create(payload);
  }

  async updateuserById(id, payload) {
    return await this.userRepository.updateById(id, payload);
  }

  async findByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(Id) {
    return await this.userRepository.findById(Id);
  }

  async findUserByRefreshToken(token) {
    return await this.userRepository.findByEmail(token);
  }
}

const userService = new UserService();

module.exports = userService;
