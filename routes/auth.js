const express = require("express");
const routes = express.Router();
const usersmodule = require("../models/users_module");
const bcrypt = require("bcrypt");

routes.post("/", async (req, res) => {
  const { userName, password } = req.body;
  await usersmodule
    .findOne({ userName: userName })
    .then((user) => {
      if (user) throw "USER ALREADY EXIST";
      bcrypt.hash(password, 7).then((hash) => {
        const User = new usersmodule({
          userName: userName,
          password: hash,
        });
        User.save().then((data) => {
          res.json({ DATA: data });
        });
      });
    })
    .catch((err) => {
      res.json({ ERROR: err });
    });
});

routes.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  await usersmodule
    .findOne({ userName: userName })
    .then((user) => {
      if (!user) throw "USER NOT FOUND";
      bcrypt.compare(password, user.password).then((ok) => {
        res.json({ AUTH: ok ? true : false });
      });
    })
    .catch((err) => {
      res.json({ ERROR: err });
    });
});

routes.post("/rename", async (req, res) => {
  try {
    const { userName, newName, password } = req.body;
    if (userName === null || userName === "") throw "EMPTY";
    await usersmodule.findOne({ userName: userName }).then((user) => {
      if (!user) throw "USER NOT FOUND";
      bcrypt.compare(password, user.password).then((ok) => {
        if (ok) {
          usersmodule
            .findOneAndUpdate({ userName: "" }, { userName: newName })
            .then(() => {
              res.json({ DATA: "RENAMED" });
            });
        }
      });
    });
  } catch (err) {
    res.json({ ERROR: err });
  }
});
module.exports = routes;
