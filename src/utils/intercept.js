import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { getToken, setToken, removeToken } from "@/utils/auth";
axios.defaults.timeout = 20000; //接口超时时间20s

/**
 * 请求头部过滤 ，添加时间戳，避免缓存,如果需要头部添加token验证，可以在此统一添加
 * 如果带token请求，则需要设置content-type为application/x-www-form-urlencoded格式
 * */
function _setHeader(config) {
  let timestamp = "timestamp=" + new Date().getTime();
  let url = config.url;
  config.url = url + (url.indexOf("?") === -1 ? "?" : "&") + timestamp;
  // config.headers.Authorization = 'Bearer ' + getToken();
  if (config.url.indexOf("token") > -1) {
    config.headers["Content-Type"] =
      "application/x-www-form-urlencoded charset=UTF-8";
  }
}

/**
 * 对返回的请求过滤code,如果是session失效，则跳转登录页面
 * */
function _filterCode(data) {
  try {
    let code = data.code;
    if (code === "1100") {
      // location.href = location.origin + "/#/login";
    }
  } catch (e) {
    console.info("catch_filterCode响应出错:" + e);
  }
}

function _intercept() {
  /**
   * 请求过滤
   * */
  axios.interceptors.request.use(
    config => {
      _setHeader(config);
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  /**
   * 返回过滤
   * */
  axios.interceptors.response.use(
    response => {
      _filterCode(response.data);
      if (!response.status) {
        Message({
          message: response.data.msg || "没有返回msg",
          type: "error",
          duration: 2 * 1000
        });
      }
      return response;
    },
    error => {
      if (error.response) {
        Message({
          message: `${error.response.data.msg}`,
          type: "error",
          duration: 2 * 1000
        });
        if (error.response.status === 401) {
          MessageBox.confirm("你已被登出，请重新登录", "确定", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            location.href = location.origin + "/#/login";
          });
        }
      } else {
        Message({
          message: `${error.message}, 稍后重试...`,
          type: "error",
          duration: 2 * 1000
        });
      }
      return Promise.reject(error);
    }
  );
}

export default {
  intercept: _intercept
};
