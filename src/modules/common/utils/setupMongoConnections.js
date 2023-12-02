const { mongoose } = require("mongoose");
const { DB_MONGO_USER, DB_MONGO_PASSWORD } = require("../constants/env");

const setupMongoConnection = async () => {
  try {
    const status = await mongoose.connect(
      `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@test.fvqfcjv.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Mongo service is established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = setupMongoConnection;
