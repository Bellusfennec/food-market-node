const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    specification: {
      type: Schema.Types.ObjectId,
      ref: "Specification",
      required: true,
    },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Characteristic", schema);
