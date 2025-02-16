import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../src/components/LandingPage.vue";
import DragDropGame from "../src/components/DragNDrop.vue";
import MultiChoiceGame from "../src/components/MultiChoices.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/drag-drop-game", component: DragDropGame },
  { path: "/multi-choice-game", component: MultiChoiceGame },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
