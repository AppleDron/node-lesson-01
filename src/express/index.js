const express = require("express");
const router = require("./routes");
const assignRequestId = require("./middlewares/assignRequestId");
const getLogger = require("./middlewares/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(assignRequestId);

app.use(getLogger());

app.use(router);

app.get("/health", (req, res) => {
  res.json({ status: 200, message: "Server is running" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    err,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
