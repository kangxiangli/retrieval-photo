<template>
  <section>
    <!--<breadcrumb class="breadcrumb-container"></breadcrumb>-->
    <transition name="fade-transform" mode="out-in">
        <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
// import Breadcrumb from "@/components/Breadcrumb"; //语法糖组件
export default {
  name: "AppMain",
  components: {
    // Breadcrumb
  },
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>
<style scoped>
.breadcrumb-container {
  float: left;
}
</style>
