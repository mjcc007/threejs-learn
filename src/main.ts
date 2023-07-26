import { createApp } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui";
async function setupApp() {
  const app = createApp(App);

  setupStore(app);
  setupRouter(app);
  app.use(naive);
  app.mount("#app");
}
setupApp();

