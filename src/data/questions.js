// Function to shuffle an array
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const questionSections = [
  {
    id: 1,
    title: "Mathematics",
    questions: [
      { id: 1, text: "What is 5 × 6?", correctAnswer: "30" },
      { id: 2, text: "What is the square root of 144?", correctAnswer: "12" },
      { id: 3, text: "What is 15% of 100?", correctAnswer: "15" },
      { id: 4, text: "What is 7 squared?", correctAnswer: "49" },
      { id: 5, text: "What is 9 + 10?", correctAnswer: "19" },
    ],
    answers: shuffleArray(["30", "12", "15", "49", "19"]),
  },
  {
    id: 2,
    title: "Science",
    questions: [
      { id: 1, text: "What planet is known as the Red Planet?", correctAnswer: "Mars" },
      { id: 2, text: "What gas do plants absorb from the atmosphere?", correctAnswer: "Carbon dioxide" },
      { id: 3, text: "What is the chemical symbol for water?", correctAnswer: "H2O" },
      { id: 4, text: "Which organ pumps blood throughout the body?", correctAnswer: "Heart" },
      { id: 5, text: "What force keeps us on the ground?", correctAnswer: "Gravity" },
    ],
    answers: shuffleArray(["Mars", "Carbon dioxide", "H2O", "Heart", "Gravity"]),
  },
  {
    id: 3,
    title: "Geography",
    questions: [
      { id: 1, text: "Which is the largest ocean on Earth?", correctAnswer: "Pacific Ocean" },
      { id: 2, text: "Which continent is the Sahara Desert in?", correctAnswer: "Africa" },
      { id: 3, text: "What is the capital of Japan?", correctAnswer: "Tokyo" },
      { id: 4, text: "What is the longest river in the world?", correctAnswer: "Nile" },
      { id: 5, text: "What country is famous for the Eiffel Tower?", correctAnswer: "France" },
    ],
    answers: shuffleArray(["Pacific Ocean", "Africa", "Tokyo", "Nile", "France"]),
  },
  {
    id: 4,
    title: "History",
    questions: [
      { id: 1, text: "Who was the first President of the United States?", correctAnswer: "George Washington" },
      { id: 2, text: "Which year did World War II end?", correctAnswer: "1945" },
      { id: 3, text: "What ancient civilization built the pyramids?", correctAnswer: "Egyptians" },
      { id: 4, text: "Who discovered gravity?", correctAnswer: "Isaac Newton" },
      { id: 5, text: "What year did Nigeria gain independence?", correctAnswer: "1960" },
    ],
    answers: shuffleArray(["George Washington", "1945", "Egyptians", "Isaac Newton", "1960"]),
  },
  {
    id: 5,
    title: "General Knowledge",
    questions: [
      { id: 1, text: "What is the national currency of Japan?", correctAnswer: "Yen" },
      { id: 2, text: "Which language is spoken in Brazil?", correctAnswer: "Portuguese" },
      { id: 3, text: "Who painted the Mona Lisa?", correctAnswer: "Leonardo da Vinci" },
      { id: 4, text: "Which is the tallest mountain in the world?", correctAnswer: "Mount Everest" },
      { id: 5, text: "What is the capital of Canada?", correctAnswer: "Ottawa" },
    ],
    answers: shuffleArray(["Yen", "Portuguese", "Leonardo da Vinci", "Mount Everest", "Ottawa"]),
  },
];
