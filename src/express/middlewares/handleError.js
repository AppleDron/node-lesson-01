const HttpError = require("../../modules/common/models/HttpErrors");

const handleError = (err, req, res, nexr) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    res.json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
    });
  } else {
    res.status(500);
    res.json({
      statusCode: 500,
      message: "Seomething went wrong",
      error: err.message,
    });
  }
};

module.exports = handleError;
