import { defineStore } from "pinia";
import { questionSections } from "../data/questions"; // Adjust path
import { toRaw } from "vue";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    questionSections: [],
    currentSectionIndex: 0,
    timeLeft: 60, // Time per section
    countdownDuration: 60,
    showResultPage: false,
    timer: null,
  }),

  getters: {
    currentSection(state) {
      return state.questionSections[state.currentSectionIndex] || {};
    },
    isResetDisabled(state) {
      return (
        state.timeLeft === 0 ||
        state.currentSection?.questions?.every((q) => q.matchedAnswer === "")
      );
    },
    isDragDisabled(state) {
      return state.timeLeft === 0;
    },
    formattedTime(state) {
      const minutes = Math.floor(state.timeLeft / 60);
      const seconds = state.timeLeft % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
    totalCorrectAnswers(state) {
      return state.questionSections.reduce(
        (total, section) =>
          total + (section?.questions?.filter((q) => q.isCorrect).length || 0),
        0
      );
    },
  },

  actions: {
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },

    onDrop(event, questionIndex) {
      const answerText = event.dataTransfer.getData("text/plain");
      const droppedAnswer = this.currentSection.answers.find(
        (ans) => ans.text === answerText
      );
      const question = this.currentSection.questions[questionIndex];

      if (!droppedAnswer || !question) return;

      question.matchedAnswer = answerText;
      question.isCorrect = question.correctAnswer === answerText;
      question.isIncorrect = !question.isCorrect;
      droppedAnswer.disabled = true;

      this.saveProgress();
    },

    startTimer() {
      if (this.timer) clearInterval(this.timer);
      this.timeLeft = this.countdownDuration; // Reset time for new section
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.saveProgress();
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

    enableDragAndDrop() {
      this.currentSection.answers.forEach((answer) => {
        answer.disabled = false;
      });
    },

    resetAnswers() {
      this.questionSections.forEach((section) => {
        section.questions.forEach((question) => {
          question.matchedAnswer = null;
          question.isCorrect = false;
          question.isIncorrect = false;
        });
        section.answers.forEach((answer) => {
          answer.disabled = false;
        });
      });
      this.saveProgress();
    },

    handleNextOrSeeResult() {
      if (this.currentSectionIndex < this.questionSections.length - 1) {
        this.nextSection();
      } else {
        this.showResultPage = true;
        this.saveProgress();
      }
    },

    nextSection() {
      if (this.currentSectionIndex < this.questionSections.length - 1) {
        this.currentSectionIndex++;
        this.enableDragAndDrop();
        this.startTimer();
        this.saveProgress();
      }
    },

    prevSection() {
      if (this.currentSectionIndex > 0) {
        this.currentSectionIndex--;
        this.enableDragAndDrop();
        this.startTimer();
        this.saveProgress();
      }
    },

    saveProgress() {
      const quizData = {
        questionSections: toRaw(this.questionSections),
        currentSectionIndex: this.currentSectionIndex,
        timeLeft: this.timeLeft,
        showResultPage: this.showResultPage,
      };
      localStorage.setItem("quizProgress", JSON.stringify(quizData));
    },

    loadProgress() {
      const savedData = localStorage.getItem("quizProgress");

      if (savedData) {
        const { questionSections, currentSectionIndex, timeLeft, showResultPage } = JSON.parse(savedData);

        this.questionSections = questionSections;
        this.currentSectionIndex = currentSectionIndex;
        this.timeLeft = timeLeft;
        this.showResultPage = showResultPage;

        if (this.timeLeft > 0) {
          this.startTimer(); // Resume timer if timeLeft > 0
        }
      } else {
        // If no saved progress, initialize normally
        this.questionSections = questionSections.map((section) => ({
          title: section.title,
          questions: section.questions.map((q) => ({
            text: q.text,
            correctAnswer: q.correctAnswer,
            matchedAnswer: "",
            isCorrect: false,
            isIncorrect: false,
            isHovered: false,
          })),
          answers: section.answers.map((answer) => ({
            text: answer,
            disabled: false,
          })),
        }));
      }
    },
  },
});