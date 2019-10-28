<template>
  <div>
    <van-row type="flex" class="tuan-top" justify="center">
      <van-col span="6">
        <label>入住</label>
        <!-- <a class="input-width"  @click="handelDateClick(1)" ><p>{{temp.start_time}}</p></a> -->
        <input
          :readonly="true"
          class="input-width"
          @click="handelDateClick(1)"
          v-model="temp.start_time"
          placeholder
        >
      </van-col>
      <van-col span="6">
        <span class="dadge">共{{temp.day}}晚</span>
      </van-col>
      <van-col span="6">
        <label>离店</label>
        <!-- <a class="input-width"  @click="handelDateClick(2)" ><p>{{temp.end_time}}</p></a> -->
        <input
          :readonly="true"
          class="input-width"
          v-model="temp.end_time"
          @click="handelDateClick(2)"
          placeholder="离店时间"
        >
      </van-col>
    </van-row>
    <van-cell-group>
      <van-field v-model="temp.title" placeholder="关键词/品牌/位置/酒店名"/>

      <van-field
        :readonly="true"
        @click="cityshow=true"
        v-model="temp.city"
        required
        clearable
        label="区域"
        placeholder="选择城市"
      />
      <van-row>
        <van-col span="12">
          <van-field
            @click="handelstarClick()"
            v-model="temp.star"
            required
            clearable
            label="星级"
            placeholder="请选择"
          />
        </van-col>

        <!-- <van-col span="12">

        </van-col>-->
      </van-row>
      <van-row>
        <van-col span="12">
          <van-field v-model="temp.low_price" required clearable label="最低价" placeholder="输入价格"/>
        </van-col>
        <van-col span="12">
          <van-field v-model="temp.max_price" required clearable label="最高价" placeholder="输入价格"/>
        </van-col>
      </van-row>
      <van-row v-for="(list,index) in temp.roomlist" :key="index">
        <van-col span="12">
          <van-field
            @click="handelroomClick(index)"
            :readonly="true"
            v-model="list.room_name"
            required
            clearable
            label="房型"
            placeholder="请选择"
          />
        </van-col>
        <van-col span="12">
          <van-field v-model="list.number" required clearable label="数量" placeholder="请输入"/>
        </van-col>
      </van-row>
      <van-row>
        <div
          style="    text-align: center;     margin-top: 10px;    height: 50px;
    line-height: 50px;"
          @click="add"
        >
          <a>添加房型</a>
        </div>
      </van-row>
      <van-field
        type="textarea"
        placeholder="备注:(如到店时间、可否停大巴、安排婴儿床、特殊护理房、高楼层等)"
        rows="2"
        v-model="temp.desc"
        autosize
      />
      <van-button @click="handelcreateClick()" size="large">发布</van-button>
    </van-cell-group>
    <div>
      <van-popup v-model="startshow" position="bottom" :overlay="true">
        <van-datetime-picker @confirm="getColumnValue" v-model="currentDate" type="date"/>
      </van-popup>

      <van-popup v-model="endshow" position="bottom" :overlay="true">
        <van-datetime-picker @confirm="getendColumnValue" v-model="currentDate" type="date"/>
      </van-popup>

      <!-- 房型 -->
      <van-popup v-model="starshow" position="bottom" :overlay="true">
        <van-picker :columns="stardata" @change="onChange"/>
      </van-popup>

      <!-- 房型 -->
      <van-popup v-model="roomshow" position="bottom" :overlay="true">
        <van-picker :columns="roomdata" @change="roomChange"/>
      </van-popup>

      <!-- 房型 -->
      <van-popup v-model="bedshow" position="bottom" :overlay="true">
        <van-picker :columns="beddata" @change="bedChange"/>
      </van-popup>

      <!--城市选择-->
      <div class="ncity">
        <van-popup overlay-class="ncity" v-model="cityshow" position="bottom" :overlay="true">
          <!-- <van-area :area-list="areaList" /> -->
          <van-area ref="area" :area-list="areaList" @confirm="handelarea"/>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { Area } from "vant";
import { Toast } from "vant";
import { Popup } from "vant";
import { getBasetype, postHotelDemandByData } from "@/api/hotel";
import VDistpicker from "v-distpicker";
import AreaList from "@/static/mock/area";

export default {
  name: "team",
  props: {
    info: Object
  },
  data() {
    return {
      areaList: AreaList,
      index: 0,
      cityshow: false,
      startshow: false,
      bedshow: false,
      endshow: false,
      starshow: false,
      roomshow: false,
      currentDate: new Date(),
      stardata: [],
      roomdata: [],
      beddata: [],
      stard: [],
      room: [],
      bed: [],
      copystar: undefined,
      copyroom: undefined,
      copybed: undefined,
      temp: {
        roomlist: [
          {
            room_id: "",
            room_name: "",
            number: ""
          }
        ],
        user_id:undefined, //用户id
        day: 0,
        start_time: "入住时间",
        end_time: "离开时间",
        title: "",
        city: " ",
        max_price: undefined,
        low_price: undefined,
        star: undefined,
        price: undefined,
        room: undefined,
        number: undefined,
        provincecode: "",
        provincevalue: "",
        citycode: "",
        cityvalue: "",
        areacode: "",
        areavalue: "",
        bed: ""
      }
    };
  },
  components: {},
  created() {
   
    this.temp.user_id=this.info.id;
    console.log(this.temp)
    this.getinfo();
  },
  methods: {
    handelarea(value) {
      this.temp.city =
        value[0].name + " | " + value[1].name + " | " + value[2].name;
      this.temp.provincecode = value[0].code;
      this.temp.provincevalue = value[0].name;
      this.temp.citycode = value[1].code;
      this.temp.cityvalue = value[1].name;
      this.temp.areacode = value[2].code;
      this.temp.areavalue = value[2].code;
      this.cityshow = false;
    },
    add: function() {
      let cope = {
        room_id: "",
        room_name: "",
        number: ""
      };
      this.temp.roomlist.push(cope);
    },
    del: function(index) {
      this.lists.splice(index, 1);
    },

    getinfo() {
      getBasetype().then(response => {
        const data = response.data.房型信息;
        this.stard = data.星级;
        this.room = data.类型;
        this.bed = data.床型信息;
        for (var i = 0; i < data.星级.length; i++) {
          this.stardata.push(data.星级[i].info_name);
        }
        for (var i = 0; i < data.类型.length; i++) {
          this.roomdata.push(data.类型[i].info_name);
        }
        for (var i = 0; i < data.床型信息.length; i++) {
          this.beddata.push(data.床型信息[i].info_name);
        }
      });
    },
    onSelected(data) {},
    //打开星级
    handelstarClick() {
      this.starshow = !this.starshow;
    },
    // 打开房型
    handelroomClick(e) {
      this.index = e;

      this.roomshow = !this.roomshow;
    },
    //打开床型
    handelbedClick() {
      this.bedshow = !this.bedshow;
    },
    onChange(picker, value, index) {
      this.copystar = this.stard[index].id;
      this.temp.star = value;
      this.starshow = !this.starshow;
    },
    roomChange(picker, value, index) {
      this.copyroom = this.room[index].id;
      this.temp.room = value;
      this.temp.roomlist[this.index].room_id = this.room[index].id;
      this.temp.roomlist[this.index].room_name = value;
      this.roomshow = !this.roomshow;
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    bedChange(picker, value, index) {
      this.copybed = this.bed[index].id;
      this.temp.bed = value;
      this.bedshow = !this.bedshow;
    },
    showfalse() {},
    handelDateClick(val) {
      if (val == 1) {
        this.startshow = !this.startshow;
      } else {
        this.endshow = !this.endshow;
      }
    },
    getColumnValue(index) {
      this.temp.start_time = formatDateTime(index);
      this.startshow = !this.startshow;
    },
    getendColumnValue(index) {
      this.temp.end_time = formatDateTime(index);
      var aDate = new Date(this.temp.start_time); // 通过日期字符串，初始化第一个日期对象
      var bDate = new Date(this.temp.end_time); // 同上，初始化第二个日期对象
      var aDay = 24 * 60 * 60 * 1000; // 完整一天有24小时，将小时换算成毫秒时间戳
      this.temp.day = (bDate - aDate) / aDay; // 计算间隔天数（注意日期隐式转换）
      this.endshow = !this.endshow;
    },
    // 提交数据
    handelcreateClick() {
      const data = this.temp;
      data.star = this.copystar;
      data.room = this.copyroom;
      data.bed = this.copybed;
      data.type = 1;
      postHotelDemandByData(data).then(response => {
        const data = response.data;
        if (data.code == 208) {
          Toast(data.msg);
        } else {
          const toast = Toast.success({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: "发布成功"
          });
          let second = 2;
          const timer = setInterval(() => {
            second--;
            if (second) {
              toast.message = `进入列表页`;
            } else {
              clearInterval(timer);
              this.$router.push({
                path: `hotel/list?key=${data.data}`
              });
              Toast.clear();
            }
          }, 1000);
        }
      });
    }
  }
};

var formatDateTime = function(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "/" + m + "/" + d;
};
</script>


<style lang='stylus' scoped>

.tuan-top {
  height: 1.4rem;

  .dadge {
    border-radius: 0.5rem;
    border: 1px solid rgba(78, 69, 69, 0.15);
    background: #eee;
    padding-right: 10px;
    padding-left: 10px;
    color: #4a4d50;
    font-weight: 30;
    font-size: 0.2rem;
  }

  span {
    line-height: 1rem;
  }

  p;
  text-align: center;

  .input-width {
    color: #333;
    width: 100%;
  }
}
</style>

