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
      </van-row>
      <van-row>
        <van-col span="12">
          <van-field v-model="temp.number" required clearable label="人数" placeholder="人数"/>
        </van-col>
      </van-row>
      <van-row>
        <div class="radio">
          <van-col span="4">人次</van-col>
          <van-col span="20">
            <el-radio v-model="temp.person_time" label="一次性抵达">一次性抵达</el-radio>
            <el-radio v-model="temp.person_time" label="分批抵达">分批抵达</el-radio>
          </van-col>
        </div>
      </van-row>
      <van-row>
        <div class="radio">
          <van-col span="5">会场时间</van-col>
          <van-col span="19">
            <div class="venue">
              <div class="time" @click="handelDateClick(3)">{{start_meeting_time}}</div>
              <div class="day">
                <el-radio v-model="start_meeting_radio" label="早上">早上</el-radio>
                <el-radio v-model="start_meeting_radio" label="下午">下午</el-radio>
              </div>
            </div>
            <div>至</div>
            <div class="venue">
              <div class="time" @click="handelDateClick(4)">{{end_meeting_time}}</div>
              <div class="day">
                <el-radio v-model="end_meeting_radio" label="早上">早上</el-radio>
                <el-radio v-model="end_meeting_radio" label="下午">下午</el-radio>
              </div>
            </div>
            <div></div>
          </van-col>
        </div>
        <div class="radio">
          <van-col span="5">会场桌型</van-col>
          <van-col span="19">
            <el-checkbox-group v-model="table">
              <el-checkbox
                v-for="(items,index) in meetingtable"
                :key="index"
                :label="items.info_name"
              ></el-checkbox>
            </el-checkbox-group>
            <div></div>
          </van-col>
        </div>
        <div class="radio">
          <van-col span="5">设备</van-col>
          <van-col span="19">
            <el-checkbox-group v-model="equipmentlist">
              <el-checkbox v-for="(items,index) in equipment" :key="index" :label="items.info_name"></el-checkbox>
            </el-checkbox-group>
            <div></div>
          </van-col>
        </div>
        <div class="radio">
          <van-col span="5">餐饮</van-col>
          <van-col span="19">
            <div class="beac-list" v-for="(items,index) in beverage" :key="index">
              <el-checkbox-group v-model="beveragelist">
                <el-checkbox :label="items.info_name"></el-checkbox>
              </el-checkbox-group>
              <div class="data">
                <div
                  class="time"
                  v-if="items.info_name=='中式餐'"
                  @click="handelDateClick(5)"
                >{{chinese.time}}</div>
                <div
                  class="time"
                  v-if="items.info_name=='自助餐'"
                  @click="handelDateClick(6)"
                >{{buffet.time}}</div>
                <div
                  class="time"
                  v-if="items.info_name=='BBQ'"
                  @click="handelDateClick(7)"
                >{{BBQ.time}}</div>
                <div class="day">
                  <el-checkbox-group v-if="items.info_name=='中式餐'" v-model="chinese.list">
                    <el-checkbox label="早上"></el-checkbox>
                    <el-checkbox label="晚上"></el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-if="items.info_name=='自助餐'" v-model="buffet.list">
                    <el-checkbox label="早上"></el-checkbox>
                    <el-checkbox label="晚上"></el-checkbox>
                  </el-checkbox-group>

                  <el-checkbox-group v-if="items.info_name=='BBQ'" v-model="BBQ.list">
                    <el-checkbox label="早上"></el-checkbox>
                    <el-checkbox label="晚上"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="people">
                  <input
                    v-if="items.info_name=='BBQ'"
                    type="text"
                    style="width: .4rem;"
                    placeholder="x"
                    v-model="BBQ.number"
                  >
                  <input
                    v-if="items.info_name=='自助餐'"
                    type="text"
                    style="width: .4rem;"
                    placeholder="x"
                    v-model="buffet.number"
                  >
                  <input
                    v-if="items.info_name=='中式餐'"
                    type="text"
                    style="width: .4rem;"
                    placeholder="x"
                    v-model="chinese.number"
                  >
                  人
                </div>
              </div>
              <div class="clear"></div>
            </div>

            <div></div>
          </van-col>
        </div>
        <van-field required clearable v-model="temp.budget" label="预算" placeholder="填写预算"/>

        <van-field required clearable v-model="temp.contact" label="联系人" placeholder="输入联系人"/>
      </van-row>

      <van-panel title="其他">
        <van-field
          type="textarea"
          placeholder="备注:(如到店时间、可否停大巴、安排婴儿床、特殊护理房、高楼层等)"
          rows="2"
          v-model="temp.desc"
          autosize
        />
      </van-panel>
      <van-button @click="handelcreateClick()" size="large">发布</van-button>
    </van-cell-group>
    <div>
      <van-popup v-model="startshow" position="bottom" :overlay="true">
        <van-datetime-picker @confirm="getColumnValue" v-model="currentDate" type="date"/>
      </van-popup>

      <van-popup v-model="endshow" position="bottom" :overlay="true">
        <van-datetime-picker @confirm="getendColumnValue" v-model="currentDate" type="date"/>
      </van-popup>
      <van-popup v-model="commonshow" position="bottom" :overlay="true">
        <van-datetime-picker @confirm="commonColumnValue" v-model="currentDate" type="date"/>
      </van-popup>
      <!-- 房型 -->
      <van-popup v-model="starshow" position="bottom" :overlay="true">
        <van-picker :columns="stardata" @change="onChange"/>
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
import { Area, Toast, Popup } from "vant";
import { getBasetype } from "@/api/hotel";
import { postMeetingDemandByData } from "@/api/meeting";

import VDistpicker from "v-distpicker";
import AreaList from "@/static/mock/area";
export default {
  name: "meeting",
   props: {
    info: Object
  },
  data() {
    return {
      checkList: [],
      radio: "1",
      areaList: AreaList,
      index: 0,
      cityshow: false,
      startshow: false,
      endshow: false,
      starshow: false,
      commonshow: false, //调用时间
      commonindex: 1, //根据这个参数判断是作用那个时间 比如1 是会议入住时间 2是会议结束时间
      currentDate: new Date(),
      stardata: [],
      stard: [], //星星
      meetingtable: [], //会议桌型
      table: [], //桌型
      equipment: [], //设备
      equipmentlist: [], //已选设备
      beverage: [], //餐饮
      beveragelist: [], //已选餐饮
      copystar: undefined,
      chinese: {
        time: "x月x日",
        list: [],
        number: ""
      },

      buffet: {
        time: "x月x日",
        list: [],
        number: ""
      },

      BBQ: {
        time: "x月x日",
        list: [],
        number: ""
      },
      start_meeting_time: "x月x日", //会议开始时间
      start_meeting_radio: "早上",
      end_meeting_time: "x月x日", //会议结束时间
      end_meeting_radio: "早上", //这些提交的时候会拼接起来
      temp: {
        contact: undefined, //联系人
        desc: undefined, //描述
        budget: undefined, //预算
        user_id:undefined, //用户id
        day: 0,
        start_time: "入住时间",
        end_time: "离开时间",
        number: undefined, //人数
        person_time: "一次性抵达", //人次
        city: "", //所在城市
        star: undefined,
        provincecode: "",
        provincevalue: "",
        citycode: "",
        cityvalue: "",
        areacode: "",
        areavalue: ""
      }
    };
  },
  components: {},
  created() {
    this.temp.user_id=this.info.id
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

    del: function(index) {
      this.lists.splice(index, 1);
      console.log(this.lists);
    },

    getinfo() {
      getBasetype().then(response => {
        const data = response.data.房型信息;
        const meeting = response.data.会议室;
        this.stard = data.星级;
        this.meetingtable = meeting.会场桌型;
        this.equipment = meeting.设备;
        this.beverage = meeting.餐饮;
        console.log(this.meetingtable);
        for (var i = 0; i < data.星级.length; i++) {
          this.stardata.push(data.星级[i].info_name);
        }
      });
    },
    onSelected(data) {},
    //打开星级
    handelstarClick() {
      this.starshow = !this.starshow;
    },
    onChange(picker, value, index) {
      this.copystar = this.stard[index].id;
      this.temp.star = value;
      this.starshow = !this.starshow;
    },

    showfalse() {},
    handelDateClick(val) {
      //入住时间
      if (val == 1) {
        this.startshow = !this.startshow;
      }
      if (val == 2) {
        this.endshow = !this.endshow;
      }
      if (val > 2) {
        this.commonindex = val;
        this.commonshow = !this.commonshow;
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
    commonColumnValue(index) {
      if (this.commonindex === 3) {
        this.start_meeting_time = forDateTime(index);
      }
      if (this.commonindex === 4) {
        this.end_meeting_time = forDateTime(index);
      }

      if (this.commonindex === 5) {
        this.chinese.time = forDateTime(index);
      }
      if (this.commonindex === 6) {
        this.buffet.time = forDateTime(index);
      }

      if (this.commonindex === 7) {
        this.BBQ.time = forDateTime(index);
      }
      this.commonshow = !this.commonshow;
    },
    // 提交数据
    handelcreateClick() {

        const data = this.temp;
        
      data.star = this.copystar;

      data.type = 1;
      if (
        data.city.length < 1 ||
        data.start_time === "入住时间" ||
        data.end_time === "离开时间" ||
        data.number < 1 ||
        data.budget < 1
      ) {
        Toast("请注意填写必选项");
        return false;
      }
      if (this.start_meeting_time === "x月x日") {
        Toast("请选择会议开始时间");
        return false;
      }
      if (this.end_meeting_time === "x月x日") {
        Toast("请选择会议结束时间");
        return false;
      }
      data.start_meeting =
        this.start_meeting_time +
        this.start_meeting_radio +
        "至" +
        this.end_meeting_time +
        this.end_meeting_radio;
      //组装桌型
      data.table = "";
      for (let i = 0; i < this.table.length; i++) {
        if (i < 1) {
          data.table = data.table + this.table[i];
        } else {
          data.table = data.table + "-" + this.table[i];
        }
      }
      data.equipment = "";
      for (let i = 0; i < this.equipmentlist.length; i++) {
        if (i < 1) {
          data.equipment = data.equipment + this.equipmentlist[i];
        } else {
          data.equipment = data.equipment + "-" + this.equipmentlist[i];
        }
      }
      data.beverage = [];
      for (let i = 0; i < this.beveragelist.length; i++) {
        if (this.beveragelist[i] === "自助餐") {
          if (this.buffet.time === "x月x日") {
            Toast("请选择自助餐时间");
            return false;
          }
          if (this.buffet.list.length < 1) {
            Toast("请使用自助餐早上/晚上");
            return false;
          }
          if (this.buffet.number < 1) {
            Toast("请填写自助餐人数");
            return false;
          }
          let dlsit = "";
          for (let i = 0; i < this.buffet.list.length; i++) {
            if (i < 1) {
              dlsit = dlsit + this.buffet.list[i];
            } else {
              dlsit = dlsit + "与" + this.buffet.list[i];
            }
          }
          data.beverage.push({
            name: "自助餐",
            time: this.buffet.time,
            list: dlsit,
            number: this.buffet.number
          });
        }
        if (this.beveragelist[i] === "BBQ") {
          if (this.BBQ.time === "x月x日") {
            Toast("请选择BBQ时间");
            return false;
          }
          if (this.BBQ.list.length < 1) {
            Toast("请使用BBQ早上/晚上");
            return false;
          }
          if (this.BBQ.number < 1) {
            Toast("请填写BBQ人数");
            return false;
          }
          let dlsit = "";
          for (let i = 0; i < this.BBQ.list.length; i++) {
            if (i < 1) {
              dlsit = dlsit + this.BBQ.list[i];
            } else {
              dlsit = dlsit + "与" + this.BBQ.list[i];
            }
          }
          data.beverage.push({
            name: "BBQ",
            time: this.BBQ.time,
            list: dlsit,
            number: this.BBQ.number
          });
        }
        if (this.beveragelist[i] === "中式餐") {
          if (this.chinese.time === "x月x日") {
            Toast("请选择中式餐时间");
            return false;
          }
          if (this.chinese.list.length < 1) {
            Toast("请使用中式餐早上/晚上");
            return false;
          }
          if (this.chinese.number < 1) {
            Toast("请填写中式餐人数");
            return false;
          }
          let dlsit = "";
          for (let i = 0; i < this.chinese.list.length; i++) {
            if (i < 1) {
              dlsit = dlsit + this.chinese.list[i];
            } else {
              dlsit = dlsit + "与" + this.chinese.list[i];
            }
          }
          data.beverage.push({
            name: "中式餐",
            time: this.chinese.time,
            list: dlsit,
            number: this.chinese.number
          });
        }
      }
      // console.log(data);
      postMeetingDemandByData(data).then(res => {

        const resd=res.data
          const toast = Toast.success({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            // loadingType: 'spinner',
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
                path: `/hotel/meeting?key=`+resd.data
              });
              Toast.clear();
            }
          }, 1000);
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
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  return y + "-" + m + "-" + d;
};
//月日
var forDateTime = function(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  return m + "月" + d + "日";
};
</script>


<style lang='stylus' scoped>
.van-panel .van-cell:not(:last-child)::after {
  border-bottom: none;
}

.el-checkbox+.el-checkbox {
  margin-left: 0px;
}

.content {
  padding: 0.5rem;
  padding-top: 4rem;

  .main {
    .van-col--4 {
      text-align: center;
    }

    .radio {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;

      .venue {
        width: 100%;
        padding: 0.1rem;
        padding-left: 0rem;

        .time {
          width: 30%;
          float: left;
        }
      }

      .data {
        .time {
          padding-top: 0.2rem;
          padding-bottom: 0.2rem;
          width: 27%;
          float: left;
          padding-left: 0.5rem;
        }

        .day {
          padding-top: 0.2rem;
          padding-bottom: 0.2rem;
          width: 30%;
          float: left;
        }

        .people {
          padding-top: 0.2rem;
          padding-bottom: 0.2rem;
          float: left;
          width: 20%;

          input {
            width: 0.4rem;
            border-bottom: 1px solid #a09595;
            text-align: center;
          }
        }
      }
    }
  }
}

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