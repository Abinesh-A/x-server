const express = require("express");
const router = express.Router();

router.get('/',(req,res) => {
    res.send("add user route")
})

module.exports = router