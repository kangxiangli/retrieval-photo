import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * 模块路由
 * */
import Home from "@/views/home/home.router";

/**
 *  Note:
 *  hidden: whether show this page.
 *  route level code-splitting
 *  this generates a separate chunk (about.[hash].js) for this route
 *  which is lazy-loaded when the route is visited.
 **/

export const constantRoute = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index"),
    name: "login",
    hidden: true
  },
  {
    path: "/stylus",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/home/stylus.vue"),
    name: "stylus",
    hidden: true
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/errorPage/page-404"),
    name: "404",
    hidden: true
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/views/layout/Layout"),
    children: [
      //不同模块路由
      ...Home
    ]
  },
  {
    path: "*", //当访问路径不存在时，重定向登陆页面
    redirect: "/404"
  }
];

export default new Router({
  mode: "hash",
  scrollBehavior: (to, from, savePosition) => {
    //设置滚动行为
    if (savePosition) {
      return savePosition;
    } else {
      return { y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoute
});
