const express = require("express");

const notFoundMiddler = require("./middler/not_found_middler");
const gobalErrorMiddler = require("./middler/gobal_error_middler");
const mainRouter = require("./router/main_router");

const app = express();

app.use(express.json());

app.use(mainRouter);

app.use(notFoundMiddler);
app.use(gobalErrorMiddler);

app.listen(4000, () => {
  console.log("server listening in 4000 port");
});

module.exports = app;
