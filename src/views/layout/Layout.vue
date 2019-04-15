<template>
  <div class="app-wrapper" :class="classObj">
    <!--<navbar></navbar>-->
    <!--<div class="main-container">-->
      <!--<sidebar class="sidebar-container"></sidebar>-->
      <app-main></app-main>
    <!--</div>-->
  </div>
</template>

<script>
// import { Navbar, Sidebar } from "./components";
import { AppMain } from "./components";

export default {
  name: "layout",
  components: {
    // Navbar,
    // Sidebar,
    AppMain
  },
  data() {
    return {
      temp: ""
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>
