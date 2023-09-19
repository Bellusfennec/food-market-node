const express = require("express");
const router = express.Router({ mergeParams: true });
const Category = require("../models/Category");
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");

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

      const newCategory = await Category.create(req.body);

      res.status(201).send(newCategory);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);

router.delete("/:categoryId", auth, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    await Category.deleteOne(category._id);

    res.status(201).send(null);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.patch("/:categoryId", auth, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const updated = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });

    res.status(201).send(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
