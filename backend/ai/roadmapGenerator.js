exports.generateRoadmap = (subject, weeks) => {

  const roadmap = [];

  for (let i = 1; i <= weeks; i++) {

    roadmap.push({
      week: i,

      topics: [
        `${subject} Basics`,
        `${subject} Practice`,
        `${subject} Advanced Concepts`
      ],

      tasks: [
        "Watch tutorial videos",
        "Solve practice questions",
        "Complete mini quiz"
      ]

    });

  }

  return roadmap;
};