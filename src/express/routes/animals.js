const express = require("express");
const animalController = require("../../modules/animals/controllers");
const createAnimalSchema = require("../../modules/animals/validationSchemas/createAnimal");
const validate = require("../middlewares/validate");
const errorWrapper = require("../../modules/common/utils/errorWrapper");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const router = express.Router();

router.get(
  "/",
  auth,
  checkRole(["guest"]),
  errorWrapper(animalController.getAnimal)
);

router.get("/:animalId", auth, errorWrapper(animalController.getAnimalById));

router.post(
  "/",
  auth,
  checkRole(["admin"]),
  validate(createAnimalSchema),
  errorWrapper(animalController.createAnimal)
);

router.put(
  "/:animalId",
  auth,
  checkRole(["admin"]),
  errorWrapper(animalController.updateAnimal)
);

module.exports = router;
