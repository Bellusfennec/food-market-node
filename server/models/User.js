const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userName: { type: String },
    firstName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
