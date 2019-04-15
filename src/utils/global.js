import { MessageBox } from "element-ui";
/* eslint-disable */
/**
 * 自定义插件，可以在vue中定义全局方法
 * @Vue Vue的实例对象
 * @opt 设置选项
 * */

export default {
  install(Vue) {
    /**
     * 通用的警告窗
     * */
    Vue.prototype.commonAlart = function(msg) {
      MessageBox.confirm(msg, this.$t("mes_title.title"), {
        type: "warning",
        confirmButtonText: this.$t("button.ensure"),
        showCancelButton: false
      })
        .then(() => {
          //确认逻辑
          console.info("commonAlart success");
        })
        .catch(err => {
          //取消逻辑
          console.info("commonAlart err", err);
        });
    };
    /**
     * 生成唯一uuid 标识
     * */
    Vue.prototype.generatorOnlyId = function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    /**
     * 获取echarts生成的图表base64信息
     * @param chart 图表实例
     * @param cb 回掉函数
     * 延迟1s获取chart的img的base64，因为动画的原因，如果不延迟得到的img是空的
     * */
    Vue.prototype.getchartImg = function(chart, cb) {
      try {
        setTimeout(function() {
          let img64 = chart.getConnectedDataURL();
          cb(img64);
        }, 1000);
      } catch (e) {
        console.info("getchartImg error", e);
      }
    };

    /**
     * 函数截流，直到函数请求停止并超过时间间隔才会执行。执行环境如果不定义则为window
     * **/
    Vue.prototype.throttle = function(method, context) {
      clearTimeout(method.tId);
      method.tId = setTimeout(function() {
        method.call(context);
      }, 300);
    };

    /**
     * 数组扁平化处理函数
     * */
    Vue.prototype.arrayToFlat = function(arr) {
      if (!Array.isArray) {
        //Polyfill
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
      }
      let self = this;
      return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? self.arrayToFlat(next) : next);
      }, []);
    };

    /**
     * 多级社区结构，扁平化社区信息
     * */
    Vue.prototype.orgToFlat = function(arrayOrg) {
      let orgs = [];
      (function loopGetData(arrayOrg) {
        arrayOrg.forEach(item => {
          if (item.subOrg && item.subOrg.length > 0) {
            //如果有子社区
            let obj = {};
            obj.orgname = item.orgname;
            obj.orgid = item.orgid;
            orgs.push(obj);
            loopGetData(item.subOrg);
          } else {
            //没有子社区
            orgs.push(item);
          }
        });
      })(arrayOrg);
      return orgs;
    };

    /**
     * 判断鼠标滑动的方向，返回结果0-表示向下，1-表示向上
     * param : e 事件
     * */
    Vue.prototype.mouseWheelDirection = function(e) {
      e = e || window.event;
      let direction = 0;
      if (e.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          //向上滑动
          direction = 1;
        } else {
          //向下滑动
          direction = 0;
        }
      } else if (e.detail) {
        //Firefox滑轮事件
        if (e.detail > 0) {
          //向上
          direction = 1;
        } else {
          //向下
          direction = 0;
        }
      }
      return direction;
    };

    /**
     * 获取源数据，深拷贝数据，父组件传子组件，且子组件对数据有操作的场景需要
     * */
    Vue.prototype.getOriginData = data => {
      return JSON.parse(JSON.stringify(data));
    };

    /**
     * 数组去重，不能针对数组对象
     * */
    Vue.prototype.unique = function(arr) {
      if (arr) {
        if (Array.isArray(arr)) {
          //兼容ie9+
          return Array.from(new Set(arr));
        } else {
          throw new Error("要去重的变量不是数组格式");
        }
      } else {
        return [];
      }
    };

    /**
     * 获取两个数之间的随机数
     * */
    Vue.prototype.RandNumber = function(Min, Max) {
      let range = Max - Min;
      let rand = Math.random();
      return Min + range * rand;
    };

    /**
     * 判断数组对象中是否存在某个对象
     * @param arr 数组对象
     * @param origin(String)要匹配的某个字段
     * @param value 要匹配的字段值
     * @return 匹配的对象和下标，找不到则返回null
     * */
    Vue.prototype.hasValueFromArray = function(arr, origin, value) {
      if (!Array.isArray) {
        //Polyfill
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
      }
      if (!Array.isArray(arr)) {
        throw new Error("arr 不是一个数组");
      } else {
        let flag = false; //没有匹配
        let temp = {};
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][origin] === value) {
            flag = true;
            temp = arr[i];
            index = i;
            break;
          }
        }
        if (!flag) {
          temp = null;
        }
        return { index: index, value: temp };
      }
    };

    /**
     * 数组对象之前取差集
     * @param allArr 全集数组对象
     * @param subArr 子集数字对象
     * @param origin(String) 针对某个字段进行匹配
     * @return 差集数组对象
     * */
    Vue.prototype.getDifferenceFromArray = function(allArr, subArr, origin) {
      if (!Array.isArray) {
        //Polyfill
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
      }
      if (!Array.isArray(allArr) || !Array.isArray(subArr)) {
        throw new Error("比较数组中有参数不是数组");
      } else {
        let temp = [];
        for (let i = 0; i < allArr.length; i++) {
          let flag = true;
          for (let j = 0; j < subArr.length; j++) {
            if (allArr[i][origin] === subArr[j][origin]) {
              flag = false;
            }
          }
          if (flag) {
            temp.push(allArr[i]);
          }
        }
        return temp;
      }
    };

    /**
     * 把 canvas 转为图片
     * @param canvas ,要转换的canvas对象
     * @param path ,默认图片地址
     * @return img
     * */
    Vue.prototype.CanvasToImage = function(canvas, path) {
      let img = new Image();
      try {
        img.src = canvas.toDataURL("image/png");
      } catch (e) {
        img.src = path;
      }
      return img;
    };

    /**
     * 数组对象去重。第一个参数为数组，第二个参数为key
     * **/
    Vue.prototype.objectArrNorepeat = function(arr, name) {
      let hash = {};
      return arr.reduce((preVal, curVal) => {
        hash[curVal[name]]
          ? ""
          : (hash[curVal[name]] = true && preVal.push(curVal));
        return preVal;
      }, []);
    };
  }
};
