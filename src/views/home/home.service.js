import HttpUtils from "@/utils/http";

const urls = {
  cameraList: window.globalConfig.apiPath.v1 + "/device/camera-list", //获取所有相机信息
  searchPic: window.globalConfig.apiPath.v1 + "/group/searchbymobile" //图片检索
};

let HomeSrv = {
  //图片检索;
  search: function(params) {
    console.log("url", urls.searchPic);
    return HttpUtils.post(urls.searchPic, params);
  },
  getCameraList: params => {
    return HttpUtils.get(urls.cameraList, params);
  }
};

export { HomeSrv };
