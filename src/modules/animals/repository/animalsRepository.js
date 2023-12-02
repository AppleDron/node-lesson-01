const path = require("node:path");
const fs = require("node:fs/promises");
const Animal = require("../models/animal");

class AnimalRepository {
  async findAll(config) {
    const { page, limit, isVaccinated, sortBy, order } = config;
    const skip = (page - 1) * limit;

    const animalQuery = Animal.find()
      .where("deletedAt")
      .equals(null)
      .skip(skip)
      .limit(limit);

    const countQuery = Animal.countDocuments().where("deletedAt").equals(null);

    if (isVaccinated) {
      animalQuery.where("isVaccinated").equals(isVaccinated);
      countQuery.where("isVaccinated").equals(isVaccinated);
    }

    if (sortBy) {
      animalQuery.sort({
        [sortBy]: order,
      });
    }

    if (sortBy) {
      animalQuery.where("age").gte(minAge);
      countQuery.where("age").gte(minAge);
    }

    const animals = await animalQuery.exec();
    const count = await countQuery.exec();
    return { animals, count };
  }

  async findOneById(animalID) {
    const animal = await Animal.findById(animalID)
      .where("deletedAt")
      .equals(null);
    return animal;
  }

  async create(payload) {
    const animal = new Animal(payload);
    await animal.save();

    return animal;
  }

  async updateById(animalID, payload) {
    const animal = await Animal.findById(animalID);

    if (!animal) {
      return;
    }

    const updatedAnimal = await Animal.findOneAndUpdate(animalID, payload, {
      returnOriginal: false,
    });
    return updatedAnimal;
  }

  async deleteById(animalID) {
    const animal = Animal.findById(animalID);
    if (!animal) {
      return;
    }

    await Animal.findByIdAndUpdate(animalID, {
      $set: {
        deletedAt: new Date(),
      },
    });
  }
}

const animalRepository = new AnimalRepository();

module.exports = animalRepository;
