<template>
  <div class="framework-pic">
    <div class="title">
      海淀区 <span>南沙河</span> 水系洪水调度情况概化图
    </div>
    <div class="content">
      <div class="popover-content"
           :style="styleObj">
        <div class="popover-title">{{ curObj.title }}</div>
        <table class="table"
               cellspacing="0">
          <tbody>
            <tr>
              <td style="padding-top: 8px;">设计流量</td>
              <td style="padding-top: 8px;">{{ curObj.sj }}m³/s</td>
            </tr>
            <tr>
              <td>校核流量</td>
              <td>{{ curObj.jh }}m³/s</td>
            </tr>
            <tr>
              <td>闸前行洪水位</td>
              <td>{{ curObj.sw }}m</td>
            </tr>
            <tr>
              <td>管理人员</td>
              <td>{{ curObj.ry }}</td>
            </tr>
            <tr>
              <td>管理部门</td>
              <td>河道所</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="sk">
        <div class="popover-sk">
          <e-vue-echartsjs style="width: 100%; height: 100%;"
                           :options="options"
                           @ready="onEChartsReady($event)"></e-vue-echartsjs>
        </div>
        <div>上庄</div>
        <div>水库</div>
      </div>
      <div class="sz"
           @mouseenter="handleMouse($event, 4)"
           @mouseleave="handleMouseLeave">

        <img slot="reference"
             :src="require('@/assets/images/5.png')"
             alt="">

      </div>
      <div class="sz0"
           @mouseenter="handleMouse($event, 2)"
           @mouseleave="handleMouseLeave">

        <img slot="reference"
             :src="require('@/assets/images/sz.png')"
             alt="">

      </div>

      <div class="sz1"
           @mouseenter="handleMouse($event, 5)"
           @mouseleave="handleMouseLeave">

        <img slot="reference"
             :src="require('@/assets/images/sz.png')"
             alt="">

      </div>
      <div class="xjb0"
           @mouseenter="handleMouse($event, 1)"
           @mouseleave="handleMouseLeave">

        <img slot="reference"
             :src="require('@/assets/images/xjb.png')"
             alt="">

      </div>
      <div class="xjb1"
           @mouseenter="handleMouse($event, 3)"
           @mouseleave="handleMouseLeave">

        <img slot="reference"
             :src="require('@/assets/images/xjb.png')"
             alt="">

      </div>
      <div class="xjb2"
           @mouseenter="handleMouse($event, 6)"
           @mouseleave="handleMouseLeave">

        <img slot="reference"
             :src="require('@/assets/images/xjb.png')"
             alt="">

      </div>

      <div class="legend">
        <label>图例：</label>

        <img :src="require('@/assets/images/sz.png')"
             alt=""> 水闸
        <img :src="require('@/assets/images/xjb.png')"
             alt=""> 橡胶坝
        <img :src="require('@/assets/images/hl.png')"
             alt=""> 河流
      </div>

    </div>
    <el-dialog :visible.sync="dialogVisible"
               width="34%"
               :modal="false"
               :append-to-body="true">
      <e-vue-echartsjs style="width: 600px; height: 400px;"
                       :options="options"
                       @ready="onEChartsReady($event)"></e-vue-echartsjs>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      dialogVisible: false,
      options: {
        title: {
          text: '上庄水库库容曲线',
          left: 30,
          top: 36,
          textStyle: {
            color: 'rgb(243,241,2)',
            fontSize: 16
          }
        },
        grid: {
          left: 50,
          right: 30,
          bottom: 50,
          top: 100
        },
        tooltip: {
          trigger: 'axis'
        },
        color: 'rgb(20, 247,251)',
        xAxis: {
          //   name: 'v(万m³)',
          type: 'category',

          data: [80, 84, 90, 100, 112, 123, 165, 186, 220, 371.2],
          axisLine: {
            lineStyle: {
              color: 'rgb(90,202,255)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgb(5,27,65)'],
              width: 1,
              type: 'dashed'
            }
          }
        },
        yAxis: {
          name: 'H(m)',
          type: 'value',
          min: 40,
          max: 45,
          axisLine: {
            lineStyle: {
              color: 'rgb(90,202,255)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgb(5,27,65)'],
              width: 1,
              type: 'dashed'
            }
          }
        },
        series: [
          {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(20, 247,251, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(20, 247,251, 0.2)'
                }
              ])
            },
            data: [40.5, 40.6, 40.7, 40.85, 41.0, 41.12, 41.5, 41.7, 42, 43],
            type: 'line',
            smooth: true
          }
        ]
      },
      styleObj: {},
      objList: {
        1: {
          title: '八一橡胶坝',
          sj: '--',
          jh: 425,
          sw: 44.6,
          ry: '赵永刚'
        },
        2: {
          title: '春阳路闸',
          sj: 63,
          jh: 74,
          sw: 43.31,
          ry: '李勇'
        },
        3: {
          title: '三星庄橡胶坝',
          sj: 329,
          jh: 402,
          sw: 43.24,
          ry: '张卫东'
        },
        4: {
          title: '上庄新闸',
          sj: 560,
          jh: 900,
          sw: 41.8,
          ry: '李疆、边强'
        },
        5: {
          title: '崔家窑闸',
          sj: 53.66,
          jh: 71.92,
          sw: 39.5,
          ry: '张海涛'
        },
        6: {
          title: '玉河橡胶坝',
          sj: 340,
          jh: 450,
          sw: 38.65,
          ry: '朱军、张海涛'
        }
      },
      curObj: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    onEChartsReady() {},
    handleMouse(evt, num) {
      this.curObj = this.objList[num];
      this.styleObj = {
        display: 'block',
        left: evt.clientX - 1490 + 'px',
        top: evt.clientY - 600 + 'px'
      };
    },
    handleMouseLeave() {
      this.styleObj = {
        opacity: 0
      };
    }
  }
};
</script>
<style lang='scss' scoped>
.framework-pic {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/3.png) center no-repeat;
  background-size: 100% 100%;
  padding: 36px 20px 26px 20px;
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 8px;
    right: 110px;
    span {
      color: #00ddff;
    }
  }
  .content {
    height: 100%;
    background: url(~@/assets/images/4.png) center no-repeat;
    background-size: 100% 100%;
    position: relative;
    .popover-content {
      translate: all 1s;
      width: 290px;
      height: 192px;
      background: url(~@/assets/images/chart.png) center no-repeat;
      display: none;
      top: 0px;
      position: absolute;
      padding-top: 25px;
      padding-left: 30px;
      z-index: 11;
      .popover-title {
        color: rgb(243, 241, 2);
        font-weight: 700;
        margin-bottom: 3px;
        font-size: 16px;
      }
      table {
        width: 100%;
        color: #02f3ff;
        font-weight: 600;
        tr {
          td {
            padding-top: 6px;
          }
        }
      }
    }
    .legend {
      color: #fff;
      font-size: 14px;
      position: absolute;
      bottom: -20px;
      right: 0px;
    }
    .sk {
      color: #fff;
      font-weight: 700;
      font-size: 13px;
      position: absolute;
      left: 23%;
      top: 42%;

      cursor: pointer;
      &:hover {
        .popover-sk {
          opacity: 1;
          
        }
      }
      .popover-sk {
        width: 360px;
        height: 262px;
        background: url(~@/assets/images/chart.png) center no-repeat;
        background-size: 100% 100%;
        opacity: 0;
        top: -240px;
        left: -140px;
        position: absolute;
      }
    }
    .sz {
      position: absolute;
      left: calc(49%);
      top: 42%;
      cursor: pointer;
    }

    .xjb0 {
      position: absolute;
      left: 20%;
      bottom: 11%;
      cursor: pointer;
      transform: rotate(90deg);
      img {
        width: 18px;
      }
    }
    .sz0 {
      position: absolute;
      left: 31%;
      bottom: 11%;
      cursor: pointer;
      transform: rotate(90deg);
      img {
        width: 18px;
      }
    }
    .sz1 {
      position: absolute;
      left: 53%;
      bottom: 40%;
      cursor: pointer;

      img {
        width: 20px;
      }
    }

    .xjb1 {
      position: absolute;
      left: 37%;
      bottom: 17%;
      cursor: pointer;
      transform: rotate(90deg);
      img {
        width: 18px;
      }
    }
    .xjb2 {
      position: absolute;
      right: 16%;
      top: 43%;
      cursor: pointer;
      transform: rotate(90deg);
    }
  }
}
</style>
