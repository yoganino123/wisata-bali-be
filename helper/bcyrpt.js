const bcrypt = require("bcrypt");
const saltRound = 5;

const encryptPw = (password) => {
  return bcrypt.hashSync(password, saltRound);
};

const decryptPw = (password, hashPw) => {
  return bcrypt.compareSync(password, hashPw);
};

module.exports = {
  encryptPw,
  decryptPw,
};
