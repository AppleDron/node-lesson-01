// const { nanoid } = require("nanoid");

class Animal {
  constructor(payload) {
    // this.id = nanoid();
    this.createdAt = new Date().toISOString;
    this.UpdatedAt = new Date().toISOString;
    this.name = payload.name;
    this.age = payload.age;
    this.isVaccinated = payload.isVaccinated;
    this.gender = payload.gender;
    this.suspicious = payload.suspicious;
  }
}

module.exports = Animal;
