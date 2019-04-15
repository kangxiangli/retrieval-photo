<template>
  <div class="stylus-demo">
    ww222
    <div class="head-title">
      span
    </div>

    <input type="button" class="inputbutton" value="按钮" style="width: 80px;height: 60px"/>
  </div>

</template>

<script>
export default {
  name: "stylus"
};
</script>

<style scoped lang="stylus">
  .stylus-demo
    height 200px
    background red
    position relative

  .head-title
    font-size: 40px
    font-weight: 900
    color: yellow
    position: absolute
    top 50%
    left 50%
    display inline-block
    //属性查找
    width 150px
    height 80px
    margin-left -(@width / 2)
    margin-top -(@height / 2);

  border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

  .inputbutton
    border-radius(50px)
</style>
