const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    count: { type: number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Basket", schema);
