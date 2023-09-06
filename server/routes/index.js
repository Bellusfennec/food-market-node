const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/category", require("./category.routes"));
router.use("/specification", require("./specification.routes"));

module.exports = router;
