<template>
  <div class="">
    <div class="list"  v-for="(item,key) in list" :key="key" >
      <div class="list-title">
        <div class="time"><i class="iconfont">&#xe615;</i>{{item.group_no}}</div>
        <div class="status">{{item.status|statusTxt}}</div>
      </div>
      <div class="clear"></div>
      <div class="list-content">
          <div class="img"><img src="http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold2.jpg"></div>
          <div class="content">
              <div class="title">
                  <div class="name">{{item.info.qiyeming}}
                     
                      </div>
                  </div>
              <div class="desc"><span>入住时间:</span>{{item.start_time}}-{{item.end_time}}</div>
               <div class="desc"><span>会议时间:</span>{{item.start_meeting}}</div>
          </div>
           <div class="clear"></div>
      </div>
      <div class="list-desc"><span>支付押金 ：<span class="price">¥{{item.deposit}}</span></span></div>
      <div class="list-button" :v-show="item.status | show" ><a  @click="handelcancel(item)">{{item.status|onclick}}</a></div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { getmeetingOrderByData, SetmeetingOrderByStatus } from "@/api/order";
export default {
  props: {
    list: Array
  },
  data() {
    return {
      onshow: true
    };
  },
  filters: {
    statusTxt(status) {
      const statusMap = {
        0: "订单已取消",
        1: "等待确认",
        2: "待入驻",
        3: "已入住",
        4: "离店",
        5: "交易结束"
      };
      return statusMap[status];
    },
    show(status){
        if(status===1){
            return true
        }
        if(status===2){
            return true
        }
        return false
    },
    onclick(status) {
      const statusMap = {
        1: "订单取消",
        3: "离店"
      };
      return statusMap[status];
    }
  },
  created() {},
  methods: {
    handelcancel(row) {
      if (row.status == 1) {
        row.status = 0;
        Toast("取消成功~");
      }
      if (row.status == 3) {
        Toast("离店~");
        row.status = 4;
      }
      this.$emit("childByValue", 6);
      SetmeetingOrderByStatus(row).then(response => {});
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

.list {
   margin-bottom .1rem
  background: #fff;
  .list-title {
    line-height  .7rem
    .time {
      padding-left .2rem
      font-size: 12px;
      float: left;
    }
    .status {
      color red
      font-size: 12px;
      float: right
      padding-right .3rem
    }
    i{
        padding-right .1rem
    }
  }
  .list-content{
        padding .2rem
        height 1.5rem
        background: #f9f8f8;
        .img{
            margin-top .1rem
            width 30%
            float left
            img{
                width 2rem
            }
        }
        .content{
            margin-top .2rem
            width 70%
            float left
            .name{
            font-weight: 500;
            font-size: .25rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            }
            .desc{
                padding-top .2rem
                color #afaeae
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                font-size .2rem;
            }
        }
  }
   .list-desc{
           font-size: .2rem;
           text-align: right;
           border-bottom: 1px solid #efeeee;
           padding .2rem
           .price{
            font-weight: 900;
        }
    }
    .list-button{
        height 1rem
        text-align: right;
        a{
            display: inline-block;
            position: relative;
            margin: 10px;
            padding: 0 20px;
            text-align: center;
            text-decoration: none;
            font: 12px/25px Arial, sans-serif;

            text-shadow: 1px 1px 1px rgba(255,255,255, .22);
            border: 1px solid #d8d5d8;
            border-radius: .6rem;
	       

        }
        
    }
}
</style>

