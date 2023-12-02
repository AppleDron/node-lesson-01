const HttpError = require("../../common/models/HttpErrors");
const animalRepository = require("../repository/animalsRepository");

class AnimalService {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

  async getAll(config) {
    return await this.animalRepository.findAll(config);
  }

  async getOneById(id) {
    const animal = await this.animalRepository.findObeById(id);
    if (!animal) {
      throw new HttpError(404, "Animal is not found");
    }
    return animal;
  }

  async create(payload) {
    return await this.animalRepository.create(payload);
  }

  updateById(id, payload) {}
}

const animalsService = new AnimalService(animalRepository);

module.exports = animalsService;
