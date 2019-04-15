<template>
    <div class="home-page">
      <!--开始的时候布局star-->
      <div class="first_row_btn" v-if="firstPage">
        <el-row type="flex"  justify="center">
          <el-col :span="22">
            <mt-button class="photograph_btn"  type="primary" size="large">
              拍照<input type="file"   accept="image/*" ref="upload-file" @change="getStream('0')"/>
            </mt-button>
          </el-col>
        </el-row>
        <el-row type="flex" class="row_btn"  justify="center">
          <el-col :span="22">
            <mt-button  type="primary" size="large" click.native="searchPic()">图像检索 </mt-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="!firstPage">
        <!--开始的时候布局end-->
        <el-row type="flex" class="row_btn" justify="space-around">
          <el-col :span="11">
            <mt-button type="primary" class="photograph_btn"  size="large">
              拍照<input type="file"   accept="image/*" ref="upload-file1" @change="getStream('1')"/>
            </mt-button>
          </el-col>
          <el-col :span="11">
            <mt-button type="primary"  size="large" @click.native="searchPic()">图像检索</mt-button>
          </el-col>
        </el-row>
        <!--上传的图片-->
        <el-row type="flex"   justify="center" v-show="dataURl">
          <el-col :span="18">
            <div class="card_style" :class="pictureList.length&&pictureList.length>0?'card_img_small_box jackInTheBox':'card_img_box'">
              <div  class="card_style_content" :class="pictureList.length&&pictureList.length>0?'card_img_small_content':'card_img_content'">
                <img src="" alt="" ref="pre-img" class="pre-img">
              </div>
            </div>
          </el-col>
        </el-row>
        <!--图片检索结果-->
        <div class="picture_list" v-if="pictureList.length&&pictureList.length>0">
          <ul class="pictureList_ul card_style">
            <li class="pictureList_li card_style_content" v-for="(item , index) in pictureList" v-bind:key="index">
              <div class="pictureList_img_box card_style">
                <div  class="pictureList_img_content card_style_content">
                  <img class="pre-img" v-lazy="item.path">
                </div>
              </div>
              <div class="pictureList_txt">
                <div v-if="item.score">
                  <i class="el-icon-bell pictureList_title " title="分数"></i>
                  <span class="similar_num pictureList_icon_txt">{{item.score}}</span>
                </div>
                <div>
                  <i class="el-icon-star-off  pictureList_title" title="姓名"></i>
                  <span class="pictureList_icon_txt" :title="item.subject.name">{{ item.subject.name?item.subject.name:'-'}}</span>
                </div>
                <div v-if="item.subject.group.groupName" >
                  <i class="el-icon-tickets pictureList_title" title="底库"></i>
                  <span class="pictureList_icon_txt" :title="item.subject.group.groupName">{{ item.subject.group.groupName }} </span>
                </div>
                <div v-if="item.subject.timestamp" >
                  <i class="el-icon-time pictureList_title" title="入库时间"></i>
                  <span class="pictureList_icon_txt" :title="item.subject.timestamp">{{ item.subject.timestamp }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="noFountShow" class="noFoundImg">
          {{noFoundTxt}}
        </div>
      </div>

    </div>
</template>
<script>
import { HomeSrv } from "./home.service";
import { Indicator } from "mint-ui";
export default {
  name: "home",
  data() {
    return {
      noFoundTxt: "没有找到相似图片",
      firstPage: true, //第一页面
      noFountShow: false, //是否显示暂无数据
      pictureList: [],
      dataURl: "",
      searchObj: {
        limit: "10",
        images: {}
      }
    };
  },
  components: {},
  methods: {
    /**
     * 上传图片
     * */
    getStream(flag) {
      this.firstPage = false; //是否展示第一个页面
      this.noFountShow = false; //是否展示没有查询到数据
      let windowURL = window.URL || window.webkitURL;
      if (flag === "0") {
        let file = this.selectFile.files[0];
        this.searchObj.images = this.selectFile.files[0];
        this.$nextTick(function() {
          let img = this.$refs["pre-img"];
          if (file) {
            this.dataURl = windowURL.createObjectURL(file);
            img.setAttribute("src", this.dataURl);
          }
        });
      } else {
        let file = this.selectFileTow.files[0];
        this.searchObj.images = this.selectFileTow.files[0];
        this.$nextTick(function() {
          let img = this.$refs["pre-img"];
          if (file) {
            this.dataURl = windowURL.createObjectURL(file);
            img.setAttribute("src", this.dataURl);
          }
        });
      }
    },
    /**
     * 检索图片
     * */
    searchPic() {
      Indicator.open({
        text: "Loading...",
        spinnerType: "fading-circle"
      });
      let formData = new FormData();
      formData.append("image", this.searchObj.images);
      formData.append("limit", this.searchObj.limit);
      HomeSrv.search(formData)
        .then(res => {
          if (res.code === "0") {
            if (res.code === "0" && res.data.length === 0) {
              this.noFountShow = true;
              this.noFoundTxt = res.msg;
            }
            Indicator.close();
            this.pictureList = res.data;
          } else {
            Indicator.close();
            this.$notify({
              title: "温馨提示",
              message: res.msg,
              type: "warning"
            });
            console.log("检索图片接口业务报错", res.msg);
          }
        })
        .catch(error => {
          Indicator.close();
          console.log("检索图片接口网络故障", error);
        });
    }
  },
  computed: {
    selectFile() {
      return this.$refs["upload-file"];
    },
    selectFileTow() {
      return this.$refs["upload-file1"];
    }
  },
  watch: {},
  mounted() {},
  destroyed() {}
};
</script>
<style>
.card_style_content {
  overflow: hidden;
  border: 1px solid #ebeef5;
  color: #303133;
  border-radius: 4px;
}
.card_style {
  padding: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.card_img_content {
  width: 100%;
  height: 8rem;
}
.photograph_btn input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: 0;
}

.pre-img {
  width: 100%;
  height: 100%;
}
.row_btn {
  margin: 1rem 0 1rem 0;
}
.card_img_box {
  width: 8rem;
  margin: 0 auto;
}

.pictureList_img_box {
  width: 4rem;
}
.card_img_small_content {
  width: 100%;
  height: 4rem;
}
.card_img_small_box {
  width: 4rem;
  margin: 0 auto;
}
.pictureList_img_content {
  width: 100%;
  height: 5rem;
}
.pictureList_ul {
  width: 90%;
  width: 15rem;
  margin: 0 auto;
}
.picture_list {
  width: 100%;
  padding: 0.5rem 0;
  clear: both;
}
.pictureList_li {
  display: flex;
  margin: 5px 0;
}
.similar_num {
  color: red;
  font-style: italic;
  font-family: "newFont";
}
.pictureList_txt {
  width: calc(100% - 4rem);
  font-size: 18px;
  padding: 0.2rem 0;
  vertical-align: middle;
}
.pictureList_title {
  height: 1rem;
  line-height: 1rem;
  text-align: right;
  vertical-align: top;
  padding: 0rem 0.2rem 0.2rem;
}
.pictureList_icon_txt {
  text-align: left;
  width: 9rem;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  height: 1rem;
  line-height: 1rem;
}
.noFoundImg {
  width: 90%;
  color: #eb1919;
  margin: 2rem auto;
  background-color: #f6f8fa;
  box-shadow: 0 0 1px #b8bbbf;
}
.first_row_btn {
  padding-top: 50%;
}
@keyframes bounceInUp {
  from,
  to {
    /*-webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);*/
    animation-timing-function: ease-in-out;
  }

  from {
    opacity: 0;
    /*-webkit-transform: translate3d(0, 3000px, 0);*/
    transform: translate3d(0, 0px, 0);
  }
  to {
    /*-webkit-transform: translate3d(0, 0, 0);*/
    transform: translate3d(0, 0, 0);
  }
}

.bounceInUp {
  -webkit-animation: bounceInUp 2s;
  animation: bounceInUp 2s;
}
@keyframes jackInTheBox {
  from {
    opacity: 0;
    transform: scale(0.3) rotate(15deg);
    transform-origin: center bottom;
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(360deg);
  }
}

.jackInTheBox {
  /*-webkit-animation: jackInTheBox 1s;*/
  animation: jackInTheBox 1s;
}
</style>
