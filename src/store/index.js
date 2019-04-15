import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app"; //登陆后的home页
import user from "./modules/user";

import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  getters
});
