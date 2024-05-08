const express = require("express");
const { imageUpload } = require("../multer/file_upload");

const { getUser, createUser } = require("../controller/user_controller");
const {
  peopleValidator,
  peopleValidatorHandler,
} = require("../vaildator/peope_validator");

const router = express.Router();

router.get("/", getUser);
router.post(
  "/",
  imageUpload,
  peopleValidator,
  peopleValidatorHandler,
  createUser
);

module.exports = router;
