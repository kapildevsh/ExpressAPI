const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { initializingPassport, jwtOptions } = require("./auth");
const { mongooseDB } = require("./database");
const { Users } = require("./model/userModel");
const app = express();
mongooseDB();
initializingPassport(passport);
app.use(passport.initialize());
app.use(express.json());
app.listen(3000, () => {
  console.log("app is working");
}),
  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      return res.status(200).send({
        success: true,
        user: {
          email: req.user.email,
        },
      });
    }
  );
// Route for logging in a user
app.post("/login", (req, res) => {
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
});

app.post("/register", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send("user already exist");
  }
  const newUser = await Users.create(req.body);

  res.status(200).send(newUser);
});
