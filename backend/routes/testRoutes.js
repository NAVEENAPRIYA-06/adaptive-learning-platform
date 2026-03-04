const express = require("express");
const router = express.Router();

const { generateTest } = require("../controllers/testController");

router.post("/generate", generateTest);

module.exports = router;