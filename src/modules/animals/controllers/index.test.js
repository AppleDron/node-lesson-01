const { getMockReq, getMockRes } = require("@jest-mock/express");
const { AnimalController } = require(".");
const animalsService = require("../services/animalServices");

describe("animalsController", () => {
  describe("getAnimalById", () => {
    it("returns animal with given id", async () => {
      const animal = {};
      const request = getMockReq({
        params: {
          animalId: "test-id",
        },
      });

      //   const animalsService = {
      //     getOneById: jest.fn().mockResolvedValue(animal),
      //   };

      const { response, next } = getMockRes();
      const animalsController = new AnimalController(animalsService);
      await animalsController.getAnimalById(req, res);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: "Success",
        data: animal,
      });
    });
  });
});
