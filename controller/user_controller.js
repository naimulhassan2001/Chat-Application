const express = require("express");

const user = express();

user.getUser = (req, res) => {
  res.json({
    Status: true,
    Message: "User rectrive successfully",
  });
};

module.exports = user;
