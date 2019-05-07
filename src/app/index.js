import app from "./app.js";
import store from "./store.js";

Vue.config.devtools = true;

export function init(el) {
  return new Vue({
    el,
    components: { app },
    template: "<app></app>",
    store,
  });
}
