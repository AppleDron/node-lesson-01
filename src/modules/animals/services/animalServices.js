const Animal = require("../models/animal");
const animalRepository = require("../repository/animalsRepository");

class AnimalService {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

  async getAll() {
    return await this.animalRepository.findAll();
  }

  async getOneById(id) {
    return await this.animalRepository.findObeById(id);
  }

  async create(payload) {
    const animal = new Animal(payload);
    return await this.animalRepository.create(animal);
  }

  updateById(id, payload) {}
}

const animalsService = new AnimalService(animalRepository);

module.exports = animalsService;
