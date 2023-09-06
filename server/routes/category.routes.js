const express = require("express");
const router = express.Router({ mergeParams: true });
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const list = await Category.find();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
