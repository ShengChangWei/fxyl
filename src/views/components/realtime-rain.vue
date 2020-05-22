<template>
  <div class="realtime-rain">
    <div class="title">实时雨情</div>
    <div class="content">
      <div class="left">
        <div class="left-title">
          <i class="el-icon-time"></i>
          08时 ~ 现在
        </div>
        <div class="left-content">
          <img :src="require(`../images/realtime-rain/${curStatus}/${curTime + 1}.png`)"
               alt="">
        </div>
        <div class="left-lenged">
          <!-- <table class="table"
                 cellspacing="0">
            <tbody>
              <tr v-for="(item, i) in levelList"
                  :key="item.text">
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table> -->
          <div>
            <template v-for="(item, i) in levelList">
              <div v-if="i < 5"
                   :key="item.text">
                <span :style="{'background': item.color} "></span>
                <label>{{ item.text }}</label>
              </div>
            </template>
          </div>

          <div>
            <template v-for="(item, i) in levelList">
              <div v-if="i >= 5"
                   :key="item.text">
                <span :style="{'background': item.color} "></span>
                <label>{{ item.text }}</label>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="right">
        <table class="table"
               cellspacing="0">
          <thead>
            <tr>
              <th>雨量站</th>
              <th>前1小时</th>
              <th>前3小时</th>
              <th>前6小时</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in tableData[curStatus][curTime]">
              <tr :key="item.stnm">
                <td>{{ item.stnm }}</td>
                <td>{{ item.rainfall_1 }}</td>
                <td>{{ item.rainfall_3 }}</td>
                <td>{{ item.rainfall_6 }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import rainfall from '../data/rainfall.js';
export default {
  props: {
    curStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: rainfall,
      curTime: 0,
      timer: null,
      levelList: [
        {
          text: '0~10',
          color: 'rgba(190,232,255, 100)'
        },
        {
          text: '10~20',
          color: 'rgb(190,232,255)'
        },
        {
          text: '20~30',
          color: 'rgb(0,216,241)'
        },
        {
          text: '30~40',
          color: 'rgb(0,169,230)'
        },
        {
          text: '40~50',
          color: 'rgb(0,134,239)'
        },
        {
          text: '50~60',
          color: 'rgb(129,103,190)'
        },
        {
          text: '60~70',
          color: 'rgb(129,1033,249)'
        },
        {
          text: '70~80',
          color: 'rgb(209,190,4)'
        },
        {
          text: '80~90',
          color: 'rgb(252,131,0)'
        },
        {
          text: '>90',
          color: 'rgb(254,32,0)'
        }
      ]
    };
  },
  watch: {
    curStatus: {
      immediate: true,
      handler(val) {
        //   this.curStatus = 0;
        this.curTime = 0;
        clearInterval(this.timer);
        this.timer = null;
        this.handlesetInterval();
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    handlesetInterval() {
      this.timer = setInterval(() => {
        if (this.curTime >= this.tableData[this.curStatus].length - 1) {
          this.curTime = -1;
        }
        this.curTime++;
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.realtime-rain {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/1.png) center no-repeat;
  background-size: 100% 100%;
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 8px;
    left: 120px;
  }
  .content {
    height: 100%;
    display: flex;
    padding: 32px 2px 0px 5px;
    justify-content: space-between;
    .left {
      width: 45%;
      height: 100%;
      //   padding: 0 4px;
      .left-title {
        background: url(~@/assets/images/6.png) center no-repeat;
        height: 34px;
        line-height: 34px;
        background-position: 0;
        // background-size: 70% 100%;
        margin-bottom: 10px;
        color: #02f3ff;
        font-size: 14px;
        font-weight: 700;
        padding-left: 16px;
      }
      .left-content {
        text-align: center;
        height: 48%;
      }
      .left-lenged {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        color: #fff;
        font-size: 14px;
        border-top: 1px solid rgba(1, 33, 166, 1);
        // padding: 10px;
        height: 52%;
        padding: 2px;
        overflow: hidden;
        > div {
          width: 30%;
          > div {
            padding: 3px 0;
            label {
              font-weight: 400;
              margin-left: 8px;
            }
            span {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              // border: 2px solid #000;
            }
          }
        }
        // div {
        //   width: calc(100% / 5);
        //   padding: 10px 0;
        //   label {
        //     font-weight: 400;
        //     margin-left: 2px;
        //   }
        //   span {
        //     display: inline-block;
        //     width: 10px;
        //     height: 10px;
        //     border-radius: 50%;
        //     // border: 2px solid #000;
        //   }
        // }
      }
    }
    .right {
      width: 55%;
      table {
        width: 100%;
        height: 100%;
        border-left: 1px solid rgba(1, 33, 166, 1);
        color: #fff;
        td,
        th {
          width: calc(100% / 4);
          text-align: center;
          font-size: 14px;
          padding: 4px 0;
        }
        thead {
          background: rgba(0, 93, 156, 0.3);
        }
        tbody {
          tr {
            &:hover {
              // background: ;
              box-shadow: inset 0px 0px 60px rgba(255, 0, 30, 0.5);
            }
            &:nth-child(even) {
              background: rgba(4, 31, 63, 0.71);
            }
          }
        }
      }
    }
  }
}
</style>
