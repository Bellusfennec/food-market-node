const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    priceSale: { type: Number },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productsSpecifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductSpecification",
        required: true,
      },
    ],
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", schema);
