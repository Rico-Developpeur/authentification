const jwt = require("jsonwebtoken");
const { sqlDB } = require("../../db");

const createUser = ({ name, email, hashPassword }) => {
  const hashedPassword = hashPassword;
  return sqlDB
    .query("INSERT INTO users (name, email, hashedPassword) values (?, ?,?)", [
      name,
      email,
      hashedPassword,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return null;
      }
      return result.insertId;
    })
    .catch((err) => {
      console.warn("Error IN createUser", err);
    });
};

const signUp = (req, res) => {
  const { name, email, hashPassword } = req.body;
  return createUser({ name, email, hashPassword })
    .then((id) => {
      const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        msg: "User created with success",
        code: 200,
        token,
        user: { name, email },
      });
    })
    .catch((err) => {
      console.warn(`ERROR IN signup: ${err}`);
      res.sendStatus(500);
    });
};

module.exports = {
  signUp,
};
