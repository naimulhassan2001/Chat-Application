const bcrypt = require("bcrypt");

const password = {};

password.hash = async (pass) => {
  try {
    const hashPassword = await bcrypt.hash(pass, 10);
    return hashPassword;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

password.checkPassword = async (pass, hashPass) => {
  try {
    const isValid = await bcrypt.compare(pass, hashPass);
    return isValid;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = password;
