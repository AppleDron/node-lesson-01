const express = require("express");
const router = require("./routes");
const assignRequestId = require("./middlewares/assignRequestId");
const getLogger = require("./middlewares/logger");
const handleError = require("./middlewares/handleError");
const setupMongoConnection = require("../modules/common/utils/setupMongoConnections");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(assignRequestId);

app.use(getLogger());

app.use("api/v1", router);

app.get("/health", (req, res) => {
  res.json({ status: 200, message: "Server is running" });
});

app.use(handleError);

const PORT = 5000;

setupMongoConnection().then(() => {
  app.listen(PORT, async () => {
    await setupMongoConnection();
    console.log(`Server is running on port ${PORT}`);
  });
});
