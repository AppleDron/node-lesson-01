// const animalsService = require("../services/animalServices");
const animalsService = require("../services/animalServices");

class AnimalController {
  constructor(animalsService) {
    this.animalService = animalsService;
  }

  getAnimal = async (req, res) => {
    const animals = await this.animalService.getAll();
    res.json({ message: "Success", data: animals, status: 200 });
  };

  getAnimalById = async (req, res) => {
    const { animalId } = req.params;

    const animal = await animalsService.getAnimalById(animalId);
    res.json({ message: "Success", data: animal, status: 200 });
  };

  createAnimal = async (req, res) => {
    const animal = await animalsService.create(req.body);
    res.json({ message: "Success", data: animal, status: 200 });
  };

  updateAnimal = (req, res) => {
    const { animalId } = req.params;
    res.json({ message: `Update animal with id ${animalId}` });
  };
}

const animalController = new AnimalController(animalsService);

module.exports = animalController;
