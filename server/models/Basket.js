const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productCount: { type: number, required: true },
    productPrice: { type: number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Basket", schema);
