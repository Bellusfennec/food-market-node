const express = require("express");
const router = express.Router({ mergeParams: true });
const Specification = require("../models/Specification");

router.get("/", async (req, res) => {
  try {
    const list = await Specification.find();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
