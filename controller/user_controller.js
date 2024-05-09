const express = require("express");
const UserModel = require("../model/people");
const createError = require("http-errors");
const { hash, checkPassword } = require("../services/hash_password");
const password = require("../services/hash_password");

const user = express();

user.getUser = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json({
      Status: true,
      Message: "User rectrive successfully",
      data: users,
    });
  } catch (err) {
    res.Status(500).json({
      Status: true,
      Message: "Internal server error",
    });
  }
};

user.getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    res.json({
      Status: true,
      Message: "User rectrive successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Status: false,
      error: err,
      Message: "Internal server error",
    });
  }
};

user.createUser = async (req, res) => {
  try {
    const hashPassword = await hash(req.body.password);
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      console.log(filename);
      const newUser = new UserModel({
        ...req.body,
        password: hashPassword,
        image: filename,
      });
      await newUser.save();
    } else {
      const newUser = new UserModel(req.body);
      await newUser.save();
    }

    res.json({
      Status: true,
      Message: "User created successfully",
    });
  } catch (err) {
    throw createError("Internal server error!");
  }
};

module.exports = user;
