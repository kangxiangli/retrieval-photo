import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    next();
    NProgress.done();
  } else {
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next();
      // next("/login");
      // NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
