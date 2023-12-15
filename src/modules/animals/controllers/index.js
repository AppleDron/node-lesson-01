// const animalsService = require("../services/animalServices");
const animalsService = require("../services/animalServices");

class AnimalController {
  constructor(animalsService) {
    this.animalService = animalsService;
  }

  getAnimal = async (req, res) => {
    const {
      limit = 5,
      page = 1,
      isVaccinated,
      sortBy,
      order = "asc",
      minAge,
    } = req.query;

    const config = {
      limit: parseInt(limit),
      page: parseInt(page),
    };

    if (isVaccinated) {
      config.isVaccinated = Boolean(parseInt(isVaccinated));
    }

    if (sortBy) {
      config.sortBy = sortBy;
      config.order = order;
    }
    if (minAge) {
      config.minAge = parseInt(minAge);
    }

    const { animals, count } = await this.animalService.getAll(config);
    res.json({
      message: "Success",
      data: { animals, count, limit: parseInt(limit), page: parseInt(page) },
      status: 200,
    });
  };

  getAnimalById = async (req, res, next) => {
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

module.exports = { animalController, AnimalController };
