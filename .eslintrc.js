module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-duplicate-case": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent":[1,2],
    "no-inline-comments":0, //off warn error 对应 0 1 2
    "no-empty-function":0,
    "no-new-wrappers":0,
    "no-unreachable":2, //不能有无法执行的代码
    "no-unused-expressions":0, //不能有无用的表达式
    "no-unused-vars":[0,{ "args": "after-used" }], //参数
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
