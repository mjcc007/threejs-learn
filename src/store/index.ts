import { createPinia } from "pinia";
import { App } from "vue";

export function setupStore(app: App<Element>) {
  app.use(createPinia());
}

export * from "./modules";
