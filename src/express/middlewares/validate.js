const validate = (schema) => async (req, res, naxr) => {
  try {
    const value = await schema.validateAsync(req);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;
