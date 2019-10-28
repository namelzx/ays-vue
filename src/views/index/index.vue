<template>
  <div>
    <div class="maincard">
      <card v-for="(item,key) in 4 " :key="key"></card>
    </div>
    <home-tabbar></home-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";

import HomeTabbar from "@/components/tabbar";
import card from "./components/card";

import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["info"])
  },
  components: {
    HomeTabbar,
    card
  },
  created() {
    Toast.loading({
      mask: true,
      duration: 300,
      message: "加载中..."
    });
  },
  methods: {}
};
</script>

<style lang='stylus' scoped>
.maincard 
  display: flex;
  flex-direction row;
  flex-wrap:wrap;
  justify-content: space-around;
  .card
    width 47%;

</style>
