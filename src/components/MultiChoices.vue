<template>
  <div class="max-w-lg max-h-[90vh] overflow-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-bold mb-4">{{ questionSection.title }}</h2>

    <div
      v-for="(question, qIndex) in questionSection.questions"
      :key="qIndex"
      class="mb-6"
    >
      <p class="font-semibold">{{ question.text }}</p>
      <div class="mt-2 space-y-2">
        <button
          v-for="(option, oIndex) in question.options"
          :key="oIndex"
          class="w-full p-2 border rounded-lg transition duration-300"
          :class="{
            'bg-green-500 text-white':
              question.selectedAnswer === option && question.isCorrect,
            'bg-red-500 text-white':
              question.selectedAnswer === option && !question.isCorrect,
            'bg-gray-100 hover:bg-gray-200': !question.selectedAnswer,
          }"
          :disabled="!!question.selectedAnswer"
          @click="selectAnswer(qIndex, option)"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <button
      v-if="allQuestionsAnswered"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
      @click="showResultPage = true"
    >
      See Result
    </button>

    <div
      v-if="showResultPage"
      class="mt-6 p-4 bg-gray-100 rounded-lg text-center"
    >
      <h3 class="text-lg font-bold">Results</h3>
      <p class="text-gray-700">
        You got {{ correctAnswerCount }} out of
        {{ questionSection.questions.length }} correct.
      </p>
      <button
        class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        @click="restartQuiz"
      >
        Restart Quiz
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showResultPage: false,
      questionSection: {
        title: "General Knowledge Quiz",
        questions: [
          {
            text: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correctAnswer: "Paris",
            selectedAnswer: "",
            isCorrect: false,
          },
          {
            text: "Which planet is known as the Red Planet?",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
            correctAnswer: "Mars",
            selectedAnswer: "",
            isCorrect: false,
          },
          {
            text: "What is 5 + 3?",
            options: ["5", "8", "10", "7"],
            correctAnswer: "8",
            selectedAnswer: "",
            isCorrect: false,
          },
        ],
      },
    };
  },
  computed: {
    allQuestionsAnswered() {
      return this.questionSection.questions.every((q) => q.selectedAnswer);
    },
    correctAnswerCount() {
      return this.questionSection.questions.filter((q) => q.isCorrect).length;
    },
  },
  methods: {
    selectAnswer(qIndex, option) {
      const question = this.questionSection.questions[qIndex];
      if (!question.selectedAnswer) {
        question.selectedAnswer = option;
        question.isCorrect = option === question.correctAnswer;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "multiChoiceGame",
        JSON.stringify(this.questionSection)
      );
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem("multiChoiceGame");
      if (savedData) {
        this.questionSection = JSON.parse(savedData);
      }
    },
    restartQuiz() {
      localStorage.removeItem("multiChoiceGame");
      this.questionSection.questions.forEach((q) => {
        q.selectedAnswer = "";
        q.isCorrect = false;
      });
      this.showResultPage = false;
    },
  },
  mounted() {
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
