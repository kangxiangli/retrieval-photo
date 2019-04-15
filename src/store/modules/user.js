import { getToken, setToken, removeToken } from "@/utils/auth";
import { storeServe } from "@/store/apis";

const user = {
  state: {
    token: getToken(),
    name: ""
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      const t = "1111123445fsdafaffaafd";
      const username = userInfo.username.trim();
      const passWd = userInfo.password.trim();
      let params = "userName=" + username + "&passWd=" + passWd;
      return new Promise(resolve => {
        storeServe
          .login(params)
          .then(res => {
            setToken(t);
            commit("SET_TOKEN", t);
            commit("SET_NAME", "James");
            // if (res.code === "0") {
            //   setToken(t);
            //   commit("SET_TOKEN", t);
            //   commit("SET_NAME", "James");
            // }
            resolve();
          })
          .catch(err => {
            console.log("login err", err);
          });
      });
    },

    // 获取用户信息
    //GetUserInfo({ commit, state }) {},

    // 前端 退出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
