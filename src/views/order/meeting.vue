<template>
  <div class="order">
     <van-tabs v-model="active" @click="onClick">
      <van-tab title="全部" >
        <orderlist v-on:childByValue="childByValue" :list="AllData"></orderlist>
      </van-tab>
      <van-tab title="待确认" >
         <orderlist v-on:childByValue="childByValue" :list="AllData"></orderlist>
      </van-tab>
      <van-tab title="待入住" >
         <orderlist v-on:childByValue="childByValue" :list="AllData"></orderlist>
      </van-tab>
      <van-tab title="已入住" >
         <orderlist v-on:childByValue="childByValue" :list="AllData"></orderlist>
      </van-tab>
      <van-tab title="已离店" >
         <orderlist v-on:childByValue="childByValue" :list="AllData"></orderlist>
      </van-tab>
        <van-tab v-on:childByValue="childByValue" title="已取消" >
         <orderlist :list="AllData"></orderlist>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Toast } from "vant";

import { getmeetingOrderByData } from "@/api/order";
import Orderlist from "./components/meeting";
import { mapState } from "vuex";
export default {
  components: {
    Orderlist
  },
  computed: {
    ...mapState(["info"])
  },
  data() {
    return {
      Query:{
         page: 1,
        limit: 20,
        user_id: undefined,
        stauts:undefined,
      },
      active: 0,
      AllData:[],
    };
  },
  created() {
    console.log(this.info)
    this.getList();
  },
  methods:{
      childByValue: function (row) {
        // childValue就是子组件传过来的值
      },
    getList(){
      this.Query.user_id=this.info.id
      getmeetingOrderByData(this.Query).then(response=>{

        const data=response.data;
        this.AllData=data.data
      })
    },
   onClick(index, title) {
       if(index > 0){
        this.Query.status=index
       }
       if(index == 5){
            this.Query.status=0
       }
      getmeetingOrderByData(this.Query).then(response=>{
           this.Query.status
      Toast.loading({
      mask: true,
      message: '加载中...',
      duration:200,
    });
      this.Query.status=undefined
        const data=response.data;
        this.AllData=data.data
      })
    }
  }
};
</script>

<style lang='stylus' scoped >

.order >>> .van-tab--active {
  color: #339ddc;
}

.order >>> .van-tabs__line {
  background-color: #339ddc;
}

.order >>> .van-tabs__content {
}
</style>

