const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceSale: { type: Number },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", schema);
