const express = require("express");
const router = express.Router({ mergeParams: true });
const Characteristic = require("../models/Characteristic");

router.post("/allByProduct", async (req, res) => {
  try {
    const characteristics = req.body;
    const list = [];
    for (let i = 0; i < characteristics.length; i++) {
      const _id = characteristics[i];
      const item = await Characteristic.findById(_id);
      if (item === null) continue;
      list.push(item);
    }

    res.status(200).send(list);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
