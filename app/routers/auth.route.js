const express = require('express');
const User = require("../controllers/auth.controller");
const router = express.Router();


router.route("/")
    .get(User.findAll);

router.route("/register")
    .get(User.findAll)
    .post(User.registerUser)

router.route("/login")
    .get(User.findAll)
    .post(User.loginUser);

router.route("/:id/update")
    .get(User.findAll)
    .put(User.updatePassword);

module.exports = router