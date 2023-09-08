const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/Product");
const ProductSpecification = require("../models/ProductSpecification");
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.post("/", auth, [
  check("name", "Минимальная длинна названия 1 символ").isLength({
    min: 1,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // errors: errors.array()
          },
        });
      }
      const productsSpecificationsIds = [];
      for (let item of req.body.productsSpecifications) {
        delete item?._id;
        const newSpecification = await ProductSpecification.create(item);
        productsSpecificationsIds.push(newSpecification._id.toString());
      }

      const updProduct = {
        ...req.body,
        productsSpecifications: productsSpecificationsIds,
      };
      const newProduct = await Product.create(updProduct);

      res.status(201).send(newProduct);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);

module.exports = router;
