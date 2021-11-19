import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { firebase } from "./functions/firebase";

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) =>
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app")

);

