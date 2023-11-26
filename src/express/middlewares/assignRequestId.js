const assignRequestId = (req, res, next) => {
  const id = "sdojvlkdfvkvknv";
  req.id = id;
  next();
};

module.exports = assignRequestId;
