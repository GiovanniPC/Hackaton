const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
