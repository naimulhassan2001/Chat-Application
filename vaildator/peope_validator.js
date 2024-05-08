const { check, validationResult } = require("express-validator");
const User = require("../model/people");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

const peopleValidator = [
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        console.log(user);
        if (user) {
          throw createError("Email already is exit");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be least 8 characters")
    .trim(),
];

const peopleValidatorHandler = (req, res, next) => {
  const err = validationResult(req);
  const errors = err.mapped();
  if (Object.keys(errors).length === 0) {
    next();
  } else {
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(__dirname, `../uploads/users/${filename}`), (err) =>
        console.log(err)
      );
    }

    res.status(500).json({
      Status: false,
      Message: "error",
      errors: errors,
    });
  }
};

module.exports = {
  peopleValidator,
  peopleValidatorHandler,
};
