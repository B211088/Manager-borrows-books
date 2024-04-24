const express = require('express');
const reader = require("../controllers/readers.controller");

const router = express.Router();

router.route("/")
    .get(reader.findAll)
    .post(reader.createUnitPrice);

module.exports = router;