const professionsMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");
const Profession = require("../models/Profession");
const Quality = require("../models/Qualitie");
const chalk = require("chalk");

module.exports = async () => {
  try {
    const professions = await Profession.find();
    if (professions.length !== professionsMock.length) {
      await createInitialEntity(Profession, professionsMock);
    }
    const qualities = await Quality.find();
    if (qualities.length !== qualitiesMock.length) {
      await createInitialEntity(Quality, qualitiesMock);
    }
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
  }
};

async function createInitialEntity(Model, mockData) {
  await Model.collection.drop();
  console.log(chalk.blue(`Init collection from mock data`));
  return Promise.all(
    mockData.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (err) {
        console.log(chalk.red(`Error: ${err.message}`));
        return err;
      }
    })
  );
}
