<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
    <van-tabbar-item to="/" icon="wap-home">工作台</van-tabbar-item>
        <van-tabbar-item to="/order" icon="contact" >订单</van-tabbar-item>

    <van-tabbar-item to="/data" icon="contact" >数据</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang='stylus' scoped>
[class*=van-hairline]::after
  border none
.van-tabbar--fixed
  background #fff
  border-top: 1px solid #e3e7ef;
  .van-tabbar-item
    color black

</style>
