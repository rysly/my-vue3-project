import { createSSRApp } from "vue";
import App from "./App.vue";
// import * as Pinia from 'pinia';
import store from './stores'

export function createApp() {
  const app = createSSRApp(App);
  // app.use(Pinia.createPinia());
  app.use(store)
  return {
    app,
    // Pinia
  };
}