import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateTaskView from "../views/CreateTaskView.vue";
import TimeTableView from "../views/TimeTableView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/create-task",
      name: "create-task",
      component: CreateTaskView,
    },
    {
      path: "/timetable",
      name: "timetable",
      component: TimeTableView,
    },
  ],
});

export default router;
