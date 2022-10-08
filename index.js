const app = require("express")({
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  },
});
const Mongoose = require("mongoose");
require("dotenv/config");

Mongoose.connect(process.env.DB_ACCESS, () => {
  console.log("DB Connected...");
});
app.get("/", (req, res) => {
  res.send("Server running...");
});
const user_r = require("./routes/user");
app.use("/user", user_r);

app.listen(process.env.PORT || 8080, () => {
  console.log("server running...");
});
