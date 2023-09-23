const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/Product");
const Characteristic = require("../models/Characteristic");
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs");

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
      const ID = nanoid();
      const image = req.files ? ID + ".jpg" : "no-pic.jpg";
      if (req.files) {
        const newImage = req.files.image;
        newImage.mv(path.resolve(__dirname, "..", "static", image));
      }

      const characteristicsIds = [];
      const characteristicsList = JSON.parse(req.body.characteristics);
      for (let item of characteristicsList) {
        delete item?._id;
        const newSpecification = await Characteristic.create(item);
        characteristicsIds.push(newSpecification._id);
      }

      const product = {
        ...req.body,
        image: image,
        characteristics: characteristicsIds,
      };
      const newProduct = await Product.create(product);

      res.status(201).send(newProduct);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);

router.patch("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const findProduct = await Product.findById(productId);
    const ID = nanoid();
    const image = req.files ? ID + ".jpg" : findProduct.image;
    if (req.files) {
      const newImage = req.files.image;
      newImage.mv(path.resolve(__dirname, "..", "static", image));
    }

    const characteristicsIds = [];
    const characteristicsList = JSON.parse(req.body.characteristics);
    for (let item of characteristicsList) {
      if (item._id <= 1000) {
        delete item?._id;
        const newSpecification = await Characteristic.create(item);
        characteristicsIds.push(newSpecification._id);
      } else {
        const updSpecification = await Characteristic.findByIdAndUpdate(
          item._id,
          item,
          { new: true }
        );
        if (updSpecification) characteristicsIds.push(updSpecification._id);
      }
    }
    for (let item of findProduct.characteristics) {
      const index = characteristicsIds.findIndex(
        (n) => n._id.toString() === item._id.toString()
      );
      if (index === -1) await Characteristic.deleteOne(item._id);
    }
    const product = {
      ...req.body,
      image: image,
      priceSale: req.body.priceSale === "null" ? null : req.body.priceSale,
      characteristics: characteristicsIds,
    };
    const updProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });

    res.status(201).send(updProduct);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    for (let item of product.characteristics) {
      await Characteristic.deleteOne(item._id);
    }
    if (product.image !== "no-pic.jpg") {
      fs.unlink(
        path.resolve(__dirname, "..", "static", product.image),
        (err) => {
          if (err) throw err;
        }
      );
    }

    await Product.deleteOne(product._id);

    res.status(201).send(null);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
