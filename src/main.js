import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
import "./directives";
import { i18n } from "./utils/i18n";
import global from "./utils/global";
import "@/styles/index.scss"; // global css
import "@/icons"; // icon comp
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);
Vue.config.productionTip = false;
Vue.use(global);
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

// 引入mockjs
require("./mock.js");

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
