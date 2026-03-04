exports.generateQuestions = (subject, difficulty, count) => {

  const sampleQuestions = [
    {
      question: `What is ${subject}?`,
      options: [
        "A programming language",
        "A database",
        "An operating system",
        "A compiler"
      ],
      answer: "A programming language",
      explanation: `${subject} is widely used in software development.`
    },

    {
      question: `Which keyword is used in ${subject}?`,
      options: [
        "class",
        "define",
        "function",
        "method"
      ],
      answer: "class",
      explanation: `Class is commonly used in object oriented programming.`
    },

    {
      question: `Which of the following is a feature of ${subject}?`,
      options: [
        "Object Oriented",
        "No syntax",
        "No variables",
        "Only HTML"
      ],
      answer: "Object Oriented",
      explanation: `${subject} supports object oriented programming.`
    }
  ];

  let questions = [];

  for (let i = 0; i < count; i++) {
    const q = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    questions.push(q);
  }

  return questions;
};