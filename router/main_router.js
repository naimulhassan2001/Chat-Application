const express = require("express");
const UserRouter = require("./user_router");

const mainRouter = express.Router();

mainRouter.use("/user", UserRouter);

module.exports = mainRouter;
