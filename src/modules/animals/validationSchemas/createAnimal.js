const Joi = require("joi");

const createAnimalSchema = Joi.object({
  //   params: Joi.object({}),
  //   query: Joi.object({}),
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    age: Joi.number().integer().min(1).max(150).required(),
    isVaccinated: Joi.bool().required(),
    gender: Joi.string()
      .valid(...["male", "female"])
      .required(),
    suspicious: Joi.string().alphanum().min(3).max(30).required(),
  }),
});

module.exports = createAnimalSchema;
