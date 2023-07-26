import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";
import { App } from "vue";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App<Element>) {
  app.use(router);
}
