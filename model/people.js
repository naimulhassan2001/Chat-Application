const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type : String,
      default : ""
    },

    role: {
      type: String,
      eunm: ["User", "Admin"],
      required: true,
      default: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamp: true,
  }
);

const userModel = new mongoose.model("User", schema);

module.exports = userModel;
