const express = require("express");
const routes = express.Router();
const user = require("../models/users_module");
const bcrypt = require("bcrypt");

routes.post("/", async (req, res) => {
  const { userName, password } = req.body;
  await user
    .findOne({ userName: userName })
    .then((user) => {
      if (user) throw "USER ALREADY EXIST";
      bcrypt.hash(password, 7).then((hash) => {
        const usersschema = new user({
          userName: userName,
          password: hash,
        });
        usersschema.save().then((data) => {
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
  await user
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
module.exports = routes;
