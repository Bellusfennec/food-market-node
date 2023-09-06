const Category = require("../models/Category");
const categoriesMock = require("../mock/categories.json");
const Specification = require("../models/Specification");
const specificationsMock = require("../mock/specifications.json");

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    createInitialEntity(Category, categoriesMock);
  }
  const specifications = await Specification.find();
  if (specifications.length !== specificationsMock.length) {
    createInitialEntity(Specification, specificationsMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item?._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
