const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    status: { type: String, enum: ["Active", "Pending"], default: "Pending" },
    date: String,
    city: String,
    token: String,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
