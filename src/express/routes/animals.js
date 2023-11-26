const express = require("express");
const animalController = require("../../modules/animals/controllers");
const createAnimalSchema = require("../../modules/animals/validationSchemas/createAnimal");
const validate = require("../middlewares/validate");
const router = express.Router();

router.get("/", animalController.getAnimal);

router.get("/:animalId", animalController.getAnimalById);

router.post("/", validate(createAnimalSchema), animalController.createAnimal);

router.put("/:animalId", animalController.updateAnimal);

module.exports = router;
