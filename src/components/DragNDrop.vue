<template>
  <div
    v-if="!showResultPage"
    class="max-w-md mx-auto text-center overflow-hidden bg-bg1 rounded-[2rem]"
  >
    <section class="flex justify-between items-center px-[2rem] py-[1rem]">
      <div class="border p-2 rounded-lg cursor-pointer">
        <i class="fas fa-home"></i>
      </div>

      <div class="text-[1.1rem] font-bold text-gray-700">Course Preview</div>
      <div></div>
    </section>

    <div class="flex items-center justify-between px-[2rem]">
      <div class="flex justify-center gap-1 mt-2">
        <div
          v-for="(section, index) in questionSections"
          :key="index"
          class="w-[25px] h-[8px] rounded-md transition"
          :class="{
            'bg-secondary2': index <= currentSectionIndex,
            'bg-gray-300': index > currentSectionIndex,
          }"
        ></div>
      </div>

      <div
        class="text-[.8rem] font-bold mt-2 text-secondary px-2 py-1 rounded-lg flex items-center bg-primary"
      >
        <i class="fas fa-clock mr-1 text-secondary"></i>
        {{ formattedTime }}
      </div>
    </div>

    <h2 class="text-[.9rem] font-bold text-gray-700 mb-4 pt-2">
      Match the {{ currentSection.title }} Terms!
    </h2>

    <!-- Questions Column -->
    <div class="flex flex-wrap justify-center gap-2 px-3 py-2">
      <div
        v-for="(question, index) in currentSection.questions"
        :key="index"
        class="w-[45%] h-[60px] p-1 border border-border rounded-lg text-[.7rem] text-gray-600 flex justify-center items-center text-center transition"
        :class="{
          'bg-green-300': question.isCorrect,
          'bg-red-300': question.isIncorrect,
          'bg-primary': !question.isCorrect && !question.isIncorrect,
          'border-2 border-blue-300 shadow-md': question.isHovered,
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
    <div class="mt-3 space-y-2 bg-white px-3 py-[1rem] rounded-[2rem]">
      <p class="text-[.8rem] px-[2rem] pb-3 text-gray-500">
        Drag and match the term below to its definition above
      </p>

      <draggable
        class="flex flex-wrap justify-center items-center gap-2"
        v-model="currentSection.answers"
        group="answers"
        item-key="text"
      >
        <template #item="{ element }">
          <div
            class="p-3 rounded-lg text-center h-[50px] flex justify-center items-center cursor-grab transition w-[45%]"
            :class="{
              'bg-black1 text-white': !element.disabled,
              'bg-gray-300 text-gray-500 cursor-not-allowed': element.disabled,
            }"
            :draggable="!element.disabled && !isDragDisabled"
            @dragstart="onDragStart($event, element.text)"
          >
            {{ element.text }}
          </div>
        </template>
      </draggable>

      <div class="pt-4 flex justify-between px-[1.5rem]">
        <!-- Previous Section Button -->
        <button
          v-if="currentSectionIndex > 0"
          class="w-[13%] border py-2 rounded-[.8rem] flex justify-center items-center transition"
          @click="prevSection"
        >
          <i class="fas fa-arrow-left"></i>
        </button>

        <!-- Reset Button -->
        <button
          class="w-[13%] border py-2 rounded-[.8rem] flex justify-center items-center transition"
          @click="resetAnswers"
          :disabled="isResetDisabled"
          :class="{
            'bg-gray-300 text-gray-400 cursor-not-allowed border-gray-200':
              isResetDisabled,
            'bg-white text-black cursor-pointer hover:bg-gray-100':
              !isResetDisabled,
          }"
        >
          <i class="fas fa-sync-alt"></i>
        </button>

        <!-- Next Section Button -->
        <button
          class="w-[70%] bg-secondary py-2 text-white rounded-[.8rem] flex justify-center items-center gap-2"
          @click="handleNextOrSeeResult"
        >
          <span v-if="currentSectionIndex < questionSections.length - 1">
            Continue <i class="fas fa-arrow-right"></i>
          </span>
          <span v-else> See Result <i class="fas fa-check"></i> </span>
        </button>
      </div>
    </div>
  </div>

  <div
    class="max-w-md w-full min-h-screen mx-auto text-center overflow-hidden bg-bg1 rounded-[2rem]"
    v-if="showResultPage"
  >
    <section class="flex justify-between items-center px-[2rem] py-[1rem]">
      <div class="border p-2 rounded-lg cursor-pointer">
        <i class="fas fa-home"></i>
      </div>

      <div class="text-[1.1rem] font-bold text-gray-700">Course Preview</div>
      <div></div>
    </section>

    hello result is
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { questionSections } from "../data/questions"; // Adjust path as needed

export default {
  components: { draggable },
  data() {
    return {
      questionSections: questionSections.map((section) => ({
        title: section.title,
        questions: section.questions.map((q) => ({
          text: q.text,
          correctAnswer: q.correctAnswer,
          matchedAnswer: "",
          isCorrect: false,
          isIncorrect: false,
          isHovered: false,
        })),
        answers: this.shuffleArray(
          section.answers.map((answer) => ({ text: answer, disabled: false }))
        ),
      })),
      currentSectionIndex: 0,
      timeLeft: 60, // Countdown in seconds
      timer: null, // Reference to the timer
      countdownDuration: 60, // Countdown duration (same as timeLeft)
      showResultPage: true,
    };
  },
  computed: {
    currentSection() {
      return this.questionSections[this.currentSectionIndex];
    },
    isResetDisabled() {
      return (
        this.timeLeft === 0 ||
        this.currentSection.questions.every((q) => q.matchedAnswer === "")
      );
    },
    isDragDisabled() {
      return this.timeLeft === 0;
    },
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
  },
  methods: {
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    onDragStart(event, answer) {
      if (this.isDragDisabled) return;
      event.dataTransfer.setData("text", answer);
    },
    onDrop(event, questionIndex) {
      if (this.isDragDisabled) return;

      const draggedAnswer = event.dataTransfer.getData("text");
      const question = this.currentSection.questions[questionIndex];

      if (!draggedAnswer || question.matchedAnswer) return;
      question.matchedAnswer = draggedAnswer;
      question.isCorrect = draggedAnswer === question.correctAnswer;
      question.isIncorrect = !question.isCorrect;
      question.isHovered = false;

      const answer = this.currentSection.answers.find(
        (a) => a.text === draggedAnswer
      );
      if (answer) answer.disabled = true;
    },
    startTimer() {
      if (this.timer) clearInterval(this.timer);

      const storedStartTime = localStorage.getItem(
        `timerStart_${this.currentSectionIndex}`
      );
      const now = Date.now();

      if (storedStartTime) {
        const elapsedTime = Math.floor(
          (now - parseInt(storedStartTime, 10)) / 1000
        );
        this.timeLeft = Math.max(this.countdownDuration - elapsedTime, 0);
      } else {
        this.timeLeft = this.countdownDuration;
        localStorage.setItem(
          `timerStart_${this.currentSectionIndex}`,
          now.toString()
        );
      }

      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.disableDragAndDrop();
        }
      }, 1000);
    },
    disableDragAndDrop() {
      this.currentSection.questions.forEach((q) => {
        q.matchedAnswer = q.matchedAnswer || "";
      });
      this.currentSection.answers.forEach((answer) => {
        answer.disabled = true;
      });
    },
    resetAnswers() {
      if (this.isResetDisabled) return;
      this.currentSection.questions.forEach((q) => {
        q.matchedAnswer = "";
        q.isCorrect = false;
        q.isIncorrect = false;
      });

      this.currentSection.answers.forEach(
        (answer) => (answer.disabled = false)
      );
    },
    handleNextOrSeeResult() {
      if (this.currentSectionIndex < this.questionSections.length - 1) {
        this.nextSection(); // Move to next section
      } else {
        this.showResult(); // Handle result display
      }
    },
    showResult() {
      this.showResultPage = !this.showResultPage;
      //   alert("Show the result here or navigate to the result page!");
      // You can replace this with your own logic to display results
    },
    nextSection() {
      if (this.currentSectionIndex < this.questionSections.length - 1) {
        this.currentSectionIndex++;
        this.startTimer();
      }
    },
    prevSection() {
      if (this.currentSectionIndex > 0) {
        this.currentSectionIndex--;
        this.startTimer();
      }
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
