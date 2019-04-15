import Vue from "vue";
import moment from "moment";

/**
 * 高度根据不同分辨率的变化而变化
 * */
Vue.directive("height", {
  bind: function(el, binding) {
    //初始化动作,只调用一次
    function handleResize() {
      let viewHeight = window.innerHeight; //可视区域的高度
      let deleHeight = binding.value;
      el.style.height = viewHeight - deleHeight + "px";
    }

    handleResize();
    el._vueAutoHeight_ = handleResize;
    window.addEventListener("resize", handleResize);
  },
  unbind: function(el) {
    window.removeEventListener("resize", el._vueAutoHeight_);
    delete el._vueAutoHeight_;
  }
});

/**
 * 时间格式化
 * */
Vue.directive("tranTime", {
  bind(el, binding) {
    if (binding.value) {
      el.innerHTML = moment(binding.value).format("YYYY/MM/DD HH:mm:ss");
    } else {
      setInterval(function() {
        el.innerHTML = moment().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
    }
  }
});

/**
 * 图片适应，避免图片失真
 *使图片在父元素（一般为正方形）中不拉伸，当图片长比宽大时，长100%，上下居中
 * 当图片宽比长大时，宽100%，水平居中
 * */

Vue.directive("imgEasy", {
  bind(el, binding) {
    function handleImage(el, binding) {
      let baseImg = new Image();
      let position = binding.arg;
      baseImg.src = binding.value;
      baseImg.onload = function() {
        let width = baseImg.width;
        let height = baseImg.height;
        let percent = 0;
        if (position === "notScal") {
          el.style.width = "100%";
          el.style.height = "100%";
        } else {
          if (width > height) {
            percent = (height / width) * 100;
            el.style.width = "100%";
            el.style.height = percent + "%";
            el.style.margin =
              position === "bottom"
                ? 100 - percent + "% 0"
                : position === "swiper"
                  ? 85 - percent + "% 0"
                  : (100 - percent) / 2 + "% 0";
          } else if (width < height) {
            percent = (width / height) * 100;
            el.style.width = percent + "%";
            el.style.height = "100%";
            el.style.margin = "0 auto";
          } else {
            el.style.width = "100%";
            el.style.height = "100%";
            el.style.margin = "0";
          }
          el.style.visibility = "visible";
        }
      };
    }

    handleImage(el, binding);
    el._vueImageHandle_ = handleImage;
  },
  update: function(el, binding) {
    el._vueImageHandle_(el, binding);
  },
  unbind: function(el) {
    delete el._vueImageHandle_;
  }
});

/**
 * 图片防失真改写,默认居左，居上，通过传参控制居中
 * */
Vue.directive("image", {
  bind: function(el, binding) {
    function handleImg(el, binding) {
      const { right, bottom, center, isLength } = binding.modifiers;
      let img = new Image();
      img.src = binding.value;
      img.onload = function() {
        let width = img.width;
        let height = img.height;
        let wrapperRatio = 0.8;
        let position = null; //图片偏移位置
        el.style.position = "absolute";
        if (width > height) {
          let percent = height / width; //缩放比
          console.log("缩放比==", percent);
          el.style.width = "100%";
          if (percent <= 0.3) {
            percent = 0.6;
          } else if (percent > 0.3 && percent < 0.6) {
            percent = 0.8;
          } else if (percent >= 0.6 && percent < 0.89) {
            percent = 0.95;
          }
          el.style.height = percent * 100 + "%";
          el.style.left = "0";
          //高度的剩余空间
          let freeHeightSpace = (1 - percent) * 100;
          //如果给了图片位置，则按给的参数位置进行偏移
          if (bottom) {
            //底部对齐
            position = "0";
          } else if (center || right) {
            //垂直居中
            position = isLength
              ? (freeHeightSpace * wrapperRatio) / 2
              : freeHeightSpace / 2;
          }
          if (!position) {
            el.style.top = "0";
          } else {
            el.style.bottom = position + "%";
          }
        } else if (width < height) {
          let percent = width / height; //缩放比
          console.log("缩放比==", percent);
          el.style.height = "100%";
          if (percent <= 0.3) {
            percent = 0.6;
          } else if (percent > 0.3 && percent < 0.6) {
            percent = 0.8;
          } else if (percent >= 0.6 && percent < 0.89) {
            percent = 0.95;
          }
          el.style.width = percent * 100 + "%";
          el.style.top = "0";
          let freeWidthSpace = (1 - percent) * 100; //高度的剩余空间
          //如果给了图片位置，则按给的参数位置进行偏移
          if (right) {
            //右侧对齐
            position = "0";
          } else if (center || bottom) {
            //垂直居中
            position = isLength
              ? freeWidthSpace / wrapperRatio / 2
              : freeWidthSpace / 2;
          }
          if (!position) {
            el.style.right = "0";
          } else {
            el.style.left = position + "%";
          }
        } else {
          el.style.width = "100%";
          el.style.height = "100%";
        }
      };
    }

    handleImg(el, binding); //执行
    el._vueImageHandle_ = handleImg;
  },
  update: function(el, binding) {
    el._vueImageHandle_(el, binding);
  },
  unbind: function(el) {
    delete el._vueImageHandle_;
  }
});
