import HttpUtils from "@/utils/http";

const urls = {
  login: window.globalConfig.apiPath.v1 + "/login/loginIn"
};

let storeServe = {
  login: function(params) {
    return HttpUtils.post(urls.login, params);
  }
};

export { storeServe };
