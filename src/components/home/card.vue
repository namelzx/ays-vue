<template>
  <div class="card">
        <div class="main">
          1
        </div>
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
.card
    background: #fff;
    border-radius: 0.1rem;
    height: 156px;
    width: 156px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .main{
      width 100%;
      height 80%;
      border:1px solid #999999;
      border-radius: 10px;
      margin-top: 7%;

    }
    
</style>
