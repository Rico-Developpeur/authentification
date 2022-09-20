const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/usersControllers");
const authMiddlewares = require("./middlewares/auth");

router.post("/signup", authMiddlewares.hashPassword, userControllers.signUp);

const getMovies = (req, res) => {
  res
    .status(200)
    .json({ movies: [{ name: "Kung Fu Panda" }, { name: "Superman" }] });
};

router.use(authMiddlewares.verifyToken);

router.get("/movies", getMovies);

module.exports = router;
