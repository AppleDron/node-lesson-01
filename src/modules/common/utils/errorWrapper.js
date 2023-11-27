const errorWrapper = (func) => async (req, res, next) => {
  try {
    awaitfunc(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = errorWrapper;
