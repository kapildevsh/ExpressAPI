const { Users } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { initializingPassport, jwtOptions } = require("../passport");
const passport = require("passport");

const register = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send("user already exist");
  }
  const newUser = await Users.create(req.body);

  res.status(200).send(newUser);
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "User Not Found" });
      }

      if (user.password !== password) {
        return res.status(400).json({ password: "Incorrect Password" });
      }

      const payload = {
        email: user.email,
      };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        email: user.email,
        success: true,
        token: "Bearer " + token,
      });
    })
    .catch((err) => console.error(err));
};



const profile =   (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        email: req.user.email,
      },
    });
  };

module.exports = { register, login ,profile };
