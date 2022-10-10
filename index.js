const express = require("express")
const app = express({
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  },
});
const Mongoose = require("mongoose");
require("dotenv/config");
app.use(express.json());

const auth_r = require("./routes/auth");
const usersmodule = require("./models/users_module");

app.use("/auth", auth_r);


Mongoose.connect(process.env.DB_ACCESS, () => {
  console.log("DB Connected...");
});
app.get("/", (req, res) => {
  res.send("Server running...");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running...");
});
