const path = require("node:path");
const fs = require("node:fs/promises");

class AnimalRepository {
  dbPath = path.join(process.cwd(), "db.json");

  async readDB() {
    const content = await fs.readFile(this.dbPath);
    const entries = JSON.parse(content.toString());
    return entries;
  }

  async writeDB(db) {
    const content = JSON.stringify(db);
    await fs.writeFile(this.dbPath, content);
  }

  async findAll() {
    const db = await this.readDB();
    return db.animals;
  }

  async findOneById(animalID) {
    const db = await this.readDB();
    const animal = db.animals.find(({ id }) => id === animalID);
    return animal;
  }

  async create(animal) {
    const db = await this.readDB();
    db.animals.push(animal);
    await this.writeDB(db);
    return animal;
  }
}

const animalRepository = new AnimalRepository();

module.exports = animalRepository;
