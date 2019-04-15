export default [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/home"),
    meta: { title: "首页" }
  }
];
