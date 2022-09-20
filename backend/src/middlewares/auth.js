const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  argon2
    .hash(password)
    .then((hashedPassword) => {
      req.body.hashPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.warn(`ERROR IN hashPassword ${err}`);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization Headers missing");
    }
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.warn(err);
    res.sendStatus(400);
  }
};
module.exports = {
  hashPassword,
  verifyToken,
};
