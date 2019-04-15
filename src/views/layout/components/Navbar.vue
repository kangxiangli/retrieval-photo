<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item"
                     @command="changeUserInfo"
                     trigger="click">
        <div class="avatar-wrapper">
            <i class="el-icon-picture-outline"></i>
            James
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changepwd">
                <i class="el-icon-edit"></i>修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout">
                <i class="el-icon-arrow-right"></i>登出
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger"; //切换菜单组件

export default {
  name: "headBar",
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    /**
     * 头部用户密码修改，退出
     * */
    changeUserInfo(command) {
      if (command === "logout") {
        this.$store.dispatch("FedLogOut").then(() => {
          location.reload();
        });
      } else if (command === "changepwd") {
        console.log("修改密码");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
  }
}
</style>
