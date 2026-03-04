const express = require("express");
const router = express.Router();

const { createRoadmap } = require("../controllers/roadmapController");

router.post("/create", createRoadmap);

module.exports = router;