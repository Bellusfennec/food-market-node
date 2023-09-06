const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    specificationId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    value: { type: number, required: true },
  },
  { timestamps: true }
);

module.exports = model("ProductSpecification", schema);
