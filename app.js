const express = require("express");

const notFoundMiddler = require("./middler/not_found_middler");
const gobalErrorMiddler = require("./middler/gobal_error_middler");
const mainRouter = require("./router/main_router");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/Chat-Application")
  .then(() => console.log("mongoose connect successfully"))
  .catch((e) => console.log(e));
dotenv.config();

app.use(express.json());

app.use(mainRouter);

app.use(notFoundMiddler);
app.use(gobalErrorMiddler);

app.listen(4000, () => {
  console.log("server listening in 4000 port");
});

module.exports = app;
