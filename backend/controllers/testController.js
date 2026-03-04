const { generateQuestions } = require("../ai/questionGenerator");

exports.generateTest = async (req, res) => {
  try {

    const { subject, difficulty, count } = req.body;

    const questions = generateQuestions(subject, difficulty, count);

    res.json({
      success: true,
      questions
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};