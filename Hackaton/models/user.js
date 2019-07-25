const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    status: { type: String, enum: ["Active", "Pending"], default: "Pending" },
    date: String,
    city: String,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
