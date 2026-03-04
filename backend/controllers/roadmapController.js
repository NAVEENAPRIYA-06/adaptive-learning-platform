const Roadmap = require("../models/Roadmap");
const { generateRoadmap } = require("../ai/roadmapGenerator");

exports.createRoadmap = async (req, res) => {

  try {

    const { userId, subject, weeks } = req.body;

    const roadmapData = generateRoadmap(subject, weeks);

    const roadmap = new Roadmap({
      userId,
      subject,
      weeks: roadmapData
    });

    await roadmap.save();

    res.json({
      success: true,
      roadmap
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};