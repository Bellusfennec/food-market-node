const express = require("express");
const router = express.Router({ mergeParams: true });
const ProductSpecification = require("../models/ProductSpecification");

router.post("/allByProduct", async (req, res) => {
  try {
    const specifications = req.body;
    const list = [];
    for (let i = 0; i < specifications.length; i++) {
      const _id = specifications[i];
      const item = await ProductSpecification.findById(_id);
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
