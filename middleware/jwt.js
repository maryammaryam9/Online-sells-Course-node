const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("jwtToken");
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        res.status(401).json({ status: -1, message: err.message });
      } else {
        next()
      }
    });
  }
}

function jwtSign(data) {
  return jwt.sign({ _id: data._id, status: data.status }, process.env.JWT_KEY);
}

module.exports = { auth, jwtSign };