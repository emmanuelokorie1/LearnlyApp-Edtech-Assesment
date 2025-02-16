<template>
  <div
    class="max-w-md mx-auto text-center overflow-hidden bg-bg1 rounded-[2rem]"
  >
    <h2 class="text-[1rem] font-bold text-gray-700 mb-4 pt-2">
      Match the algebraic Terms!
    </h2>

    <!-- Questions Column -->
    <div class="flex flex-wrap justify-center gap-2 p-3">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="w-[45%] h-[60px] p-1 border border-border rounded-lg text-[.7rem] text-gray-600 flex justify-center items-center text-center transition"
        :class="{
          'bg-green-300': question.isCorrect,
          'bg-red-300': question.isIncorrect,
          'bg-primary': !question.isCorrect && !question.isIncorrect,
          'border-2 border-blue-300 shadow-md': question.isHovered, // Highlight effect
        }"
        @drop="onDrop($event, index)"
        @dragover.prevent
        @dragenter="onDragEnter(index)"
        @dragleave="onDragLeave(index)"
      >
        {{ question.matchedAnswer || question.text }}
      </div>
    </div>

    <!-- Draggable Answers Column -->
    <div class="mt-6 space-y-2 bg-white px-3 py-[2rem] rounded-[2rem]">
      <p class="text-[.8rem] px-[2rem] pb-5 text-gray-500">
        Drag and correct the algebraic term below to match its definition above
      </p>
      <draggable
        class="flex flex-wrap justify-center items-center gap-2"
        v-model="answers"
        group="answers"
        item-key="text"
      >
        <template class="" #item="{ element }">
          <div
            class="p-3 rounded-lg text-center h-[50px] flex justify-center items-center cursor-grab transition w-[45%]"
            :class="{
              'bg-black1 text-white': !element.disabled,
              'bg-gray-300 text-gray-500 cursor-not-allowed': element.disabled,
            }"
            :draggable="!element.disabled"
            @dragstart="onDragStart($event, element.text)"
          >
            {{ element.text }}
          </div>
        </template>
      </draggable>

      <div class="pt-4 flex justify-between px-[1.5rem]">
        <button class="w-[13%] border py-2 rounded-[.8rem]">R</button>

        <button class="w-[85%] bg-secondary py-2 text-white rounded-[.8rem]">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  data() {
    return {
      questions: [
        {
          id: 1,
          text: "What is 2 + 2?",
          correctAnswer: "4",
          matchedAnswer: "",
          isCorrect: false,
          isIncorrect: false,
          isHovered: false, // New property for hover effect
        },
        {
          id: 2,
          text: "Capital of France?",
          correctAnswer: "Paris",
          matchedAnswer: "",
          isCorrect: false,
          isIncorrect: false,
          isHovered: false,
        },
        {
          id: 3,
          text: "Fastest land animal?",
          correctAnswer: "Cheetah",
          matchedAnswer: "",
          isCorrect: false,
          isIncorrect: false,
          isHovered: false,
        },
        {
          id: 4,
          text: "What is the boiling point of water (°C)?",
          correctAnswer: "100",
          matchedAnswer: "",
          isCorrect: false,
          isIncorrect: false,
          isHovered: false,
        },
        {
          id: 5,
          text: "Which planet is known as the Red Planet?",
          correctAnswer: "Mars",
          matchedAnswer: "",
          isCorrect: false,
          isIncorrect: false,
          isHovered: false,
        },
      ],
      answers: [
        { text: "4", disabled: false },
        { text: "Paris", disabled: false },
        { text: "Cheetah", disabled: false },
        { text: "100", disabled: false },
        { text: "Mars", disabled: false },
      ],
    };
  },
  methods: {
    onDragStart(event, answer) {
      event.dataTransfer.setData("text", answer);
    },
    onDrop(event, questionIndex) {
      const draggedAnswer = event.dataTransfer.getData("text");
      const question = this.questions[questionIndex];

      if (!draggedAnswer || question.matchedAnswer) return; // Prevent overwriting existing answer

      question.matchedAnswer = draggedAnswer;
      question.isCorrect = draggedAnswer === question.correctAnswer;
      question.isIncorrect = !question.isCorrect;
      question.isHovered = false; // Remove highlight after drop

      // Disable the used answer and gray it out
      const answer = this.answers.find((a) => a.text === draggedAnswer);
      if (answer) answer.disabled = true;
    },
    onDragEnter(index) {
      if (!this.questions[index].matchedAnswer) {
        this.questions[index].isHovered = true; // Add hover effect only if empty
      }
    },

    onDragLeave(index) {
      this.questions[index].isHovered = false; // Remove hover effect
    },
  },
};
</script>
