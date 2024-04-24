const express = require('express');
const publishers = require("../controllers/publishers.controller")

const router = express.Router();

router.route('/')
        .get(publishers.findAllPublishers)
        .post(publishers.createPublishers);



module.exports = router;