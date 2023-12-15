const fs = require("node:fs/promises");

const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(url);
    }
    console.log(error);
  }
};

module.exports = createDirIfNotExists;
