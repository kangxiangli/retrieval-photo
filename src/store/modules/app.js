import Cookies from "js-cookie";

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get("sidebarStatus"),//菜单是否折叠
      withoutAnimation: false //折叠是否动画
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    }
  }
};

export default app;
