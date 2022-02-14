import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      name: "Dashboard",
      path: "/dashboard",
      component: () => import("../views/Reports.vue"),
    },
    {
      name: "Groups",
      path: "/groups",
      component: () => import("../views/Reports.vue"),
    },
    {
      name: "Desktop",
      path: "/desktop",
      component: () => import("../views/Reports.vue"),
    },
    {
      name: "Reports",
      path: "/reports",
      component: () => import("../views/Reports.vue"),
    },
    {
      name: "Logout",
      path: "/logout",
      component: () => import("../views/Reports.vue"),
    },
  ],
});

export default router;
