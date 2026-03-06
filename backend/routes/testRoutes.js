
const express = require("express");
const router = express.Router();

const generateQuestions = require("../ai/aiGenerator");
const TestResult = require("../models/TestResult")
router.post("/generate", async (req, res) => {

  try {

    const { subject, difficulty, count } = req.body;

    const questions = await generateQuestions(subject, difficulty, count);

    res.json({ questions });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "AI question generation failed"
    });

  }

});

module.exports = router;