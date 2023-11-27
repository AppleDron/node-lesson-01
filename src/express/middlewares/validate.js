const HttpError = require("../../modules/common/models/HttpErrors");

const validate = (schema) => async (req, res, naxr) => {
  try {
    await schema.validateAsync(
      {
        query: req.query,
        body: req.body,
        params: req.params,
      },
      { abortEarly: false }
    );
    next();
  } catch (err) {
    const httpError = new HttpError(422, "ValidationError", err.details);
    next(err);
  }
};

module.exports = validate;
