const express = require('express');
const User = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", (req, res) => res.send("USER ROUTER"))

router.route("/register")
    .get(User.findAll)
    .post(User.registerUser);



module.exports = router