const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/category", require("./category.routes"));
router.use("/specification", require("./specification.routes"));
router.use("/product", require("./product.routes"));
router.use("/characteristic", require("./characteristic.routes"));

module.exports = router;
