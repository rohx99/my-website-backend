const jwt = require("jsonwebtoken");

const generateToken = (userId, userName) => {
  const payload = {
    userId,
    userName,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = generateToken;
