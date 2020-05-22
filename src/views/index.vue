<template>
  <div class="index-container">
    <div class="title">
      <div class="title-change">
        <span v-for="item in titleType"
              :key="item + 's'"
              :class="{'active': curTitleType === item}"
              @click="changeTitleType(item)"></span>
      </div>
    </div>

    <div class="text-content"
         :class="{'active':curType === 2 }">
      <div class="btn">
        <span v-for="item in type"
              :key="item"
              :class="{'active': curType === item}"
              @click="changeType(item)"></span>
      </div>

      <div class="hide-content">
        <p v-if="curType !== 2"
           class="animate">
          气象局发布<span style="color: red;">暴雨红色预警</span> <span v-if="curType === 1">，南沙河流域启动IV级相应</span>
        </p>
      </div>

    </div>
    <div class="left">
      <div class="item">
        <sate-radar :curStatus="curTitleType"></sate-radar>
      </div>
      <div class="item">
        <realtime-rain :curStatus="curTitleType"></realtime-rain>
      </div>
      <div class="item">
        <forecast-rainfall></forecast-rainfall>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <realtime-water :curStatus="curTitleType"></realtime-water>
      </div>
      <div class="item">
        <framework-pic></framework-pic>
      </div>
      <div class="item">
        <emergency-event @locationPoint="locationPoint"></emergency-event>
      </div>
    </div>
    <!-- <e-vue-cesium @ready="mapReady"></e-vue-cesium> -->
    <div ref="toopTip"
         class="essence-map-tip">
      <el-link type="primary">视频一</el-link>
      <el-link type="primary">视频二</el-link>
    </div>
    <el-dialog title="五七水库实时信息"
               :visible.sync="dialogVisible"
               :modal="false"
               center
               :fullscreen="true"
               top="4vh">
      <div class="dialog-content">
        <div class="dialog-left">
          <label>实时水位</label>
          <div class="dialog-main">
            <table class="table"
                   cellspacing="0">
              <tbody>
                <tr>
                  <td>当前水位</td>
                  <td>182m(08-23 14:35)</td>
                  <td>校核洪水位</td>
                  <td>186.62m</td>
                </tr>
                <tr>
                  <td>设计洪水位</td>
                  <td>186m</td>
                  <td>正常蓄水位</td>
                  <td>185.03m</td>
                </tr>
              </tbody>

            </table>
            <e-vue-echartsjs style="width: 100%; height: 800px;"
                             :options="options"></e-vue-echartsjs>
          </div>

        </div>
        <div class="dialog-right">
          <label>现场视频</label>
          <div class="dialog-main">
            <video :src="require('./videos/radar/sate0.mp4')"
                   autoplay
                   loop></video>
          </div>
        </div>

      </div>

    </el-dialog>
    <el-dialog :title="videoTitle"
               :visible.sync="videoAndImgVisible"
               :modal="false"
               center
               :fullscreen="true">
      <div v-if="videoAndImgVisible"
           class="video-content">
        <!-- <img v-if="showList[videoTitle] === 1"
             :src="require(`./videos/map/${videoTitle}.jpg`)"
             alt="">
        <video v-else-if="showList[videoTitle] === 0"
               :src="require(`./videos/map/${videoTitle}.mp4`)"
               autoplay
               loop></video> -->
        <div>
          <e-vue-echartsjs style="width: 100%; height: 900px;"
                           :options="otherOptions"></e-vue-echartsjs>
        </div>
      </div>

    </el-dialog>
    <el-dialog title="视频连接中……"
               :visible.sync="linkVisible"
               :modal="false"
               center
               :fullscreen="true">
      <div class="video-content">
        <img class="link-img"
             :src="require(`@/assets/images/link.gif`)"
             alt="">
      </div>

    </el-dialog>
  </div>
</template>

<script>
import eVueCesium from './components/e-vue-cesium.vue';
import sateRadar from './components/sate-radar.vue';
import realtimeRain from './components/realtime-rain.vue';
import forecastRainfall from './components/forecast-rainfall.vue';
import realtimeWater from './components/realtime-water.vue';
import frameworkPic from './components/framework-pic.vue';
import emergencyEvent from './components/emergency-event.vue';
import configService from '@/services/config.service.js';
import indexApi from '@/api/index/index.api.js';
import waterLevel from './data/water-level.js';
import { dateFormatUtils } from '@/utils/tools.utils.js';
import echarts from 'echarts';
let Cesium = null;
let viewer = null;
export default {
  components: {
    eVueCesium,
    sateRadar,
    realtimeRain,
    forecastRainfall,
    realtimeWater,
    frameworkPic,
    emergencyEvent
  },
  data() {
    return {
      type: [0, 1, 2],
      titleType: [0, 1],
      curTitleType: 0,
      curType: 0,
      dialogVisible: false,
      primitives: null,
      videoAndImgVisible: true,
      videoTitle: '',
      linkVisible: false,
      dataList: [
        {
          id: '1',
          name: '玉河橡胶坝',
          type: 'xiangjiaoba',
          lgtd: '116.246',
          lttd: '40.105'
        },
        {
          id: '2',
          name: '东玉河闸',
          type: 'shuizha',
          lgtd: '116.251',
          lttd: '40.097'
        },
        {
          id: '3',
          name: '崔家窑闸',
          type: 'shuizha',
          lgtd: '116.226',
          lttd: '40.096'
        },
        {
          id: '4',
          name: '宏丰渠香严寺闸',
          type: 'shuizha',
          lgtd: '116.227',
          lttd: '40.063'
        },
        {
          id: '5',
          name: '团结渠闸',
          type: 'shuizha',
          lgtd: '116.211',
          lttd: '40.078'
        },
        {
          id: '6',
          name: '温泉闸',
          type: 'shuizha',
          lgtd: '116.162',
          lttd: '40.061'
        },
        {
          id: '7',
          name: '上庄后河分洪闸',
          type: 'shuizha',
          lgtd: '116.222',
          lttd: '40.1'
        },
        {
          id: '8',
          name: '上庄新闸',
          type: 'shuizha',
          lgtd: '116.209',
          lttd: '40.101'
        },
        {
          id: '9',
          name: '五七水库',
          type: 'shuiku',
          lgtd: '116.085',
          lttd: '40.084'
        },
        {
          id: '10',
          name: '上庄水库',
          type: 'shuiku',
          lgtd: '116.203',
          lttd: '40.1'
        },
        {
          id: '11',
          name: '苏家坨抢险队',
          type: 'qiangxianduiwu',
          lgtd: '116.119',
          lttd: '40.084'
        },
        {
          id: '12',
          name: '温泉抢险队',
          type: 'qiangxianduiwu',
          lgtd: '116.178',
          lttd: '40.042'
        },
        {
          id: '13',
          name: '上庄抢险队',
          type: 'qiangxianduiwu',
          lgtd: '116.204',
          lttd: '40.12'
        },
        {
          id: '14',
          name: '西北旺抢险队',
          type: 'qiangxianduiwu',
          lgtd: '116.242',
          lttd: '40.076'
        },
        {
          id: '15',
          name: '河道所',
          type: 'qiangxianduiwu',
          lgtd: '116.209',
          lttd: '40.1'
        },
        {
          id: '16',
          name: '排水所',
          type: 'qiangxianduiwu',
          lgtd: '116.193',
          lttd: '40.086'
        },
        // { id: '17', name: '排水集团', type: 'qiangxianduiwu', lgtd: '', lttd: '' },
        // {
        //   id: '18',
        //   name: '崔家窑出现险情',
        //   type: 'tufashijian',
        //   lgtd: '116.226',
        //   lttd: '40.095'
        // },
        // {
        //   id: '19',
        //   name: '西北旺冷泉路段积水',
        //   type: 'tufashijian',
        //   lgtd: '116.217',
        //   lttd: '40.036'
        // },
        {
          id: '20',
          name: '翠湖水厂水位',
          type: 'shuiweizhan',
          lgtd: '116.155',
          lttd: '40.095'
        }
      ],
      showList: {
        //  0 是视频，1,是图片, 2echarts
        玉河橡胶坝: 0,
        东玉河闸: 0,
        崔家窑闸: 1,
        宏丰渠香严寺闸: 1,
        团结渠闸: 1,
        温泉闸: 1,
        上庄后河分洪闸: 0,
        上庄新闸: 0,
        苏家坨抢险队: 0,
        温泉抢险队: 0,
        上庄抢险队: 0,
        西北旺抢险队: 0,
        河道所: 0,
        排水所: 0,
        崔家窑出现险情: 0,
        翠湖水厂水位: 2
      },
      curMapName: '',
      options: {
        // title: {
        //   text: '上庄水库库容曲线',
        //   left: 'center',
        //   textStyle: {
        //     color: 'rgb(90,202,255)'
        //   }
        // },
        tooltip: {
          trigger: 'axis'
        },
        color: 'rgb(20, 247,251)',
        xAxis: {
          name: 'v(万m³)',
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
          min: 180,
          max: 187,
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
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: 'rgba(20, 247,251, 1)'
            //     },
            //     {
            //       offset: 1,
            //       color: 'rgba(20, 247,251, 0.2)'
            //     }
            //   ])
            // },
            data: [
              181,
              182.1,
              180,
              182.6,
              182.7,
              182.8,
              182.9,
              183,
              181,
              182.1
            ],
            type: 'line',
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: 185.03,
                  lineStyle: {
                    color: 'rgb(0, 194, 255)',
                    type: 'solid'
                  }
                },
                {
                  yAxis: 186,
                  lineStyle: {
                    color: 'rgb(255, 212, 0)',
                    type: 'solid'
                  }
                },
                {
                  yAxis: 186.62,
                  lineStyle: {
                    color: 'rgb(255, 52, 70)',
                    type: 'solid'
                  }
                }
              ]
            },
            smooth: true
          }
        ]
      },
      otherOptions: {
        title: {
          text: '翠湖水厂水位',
          left: 'center',
          textStyle: {
            color: 'rgb(90,202,255)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        color: 'rgb(20, 247,251)',
        xAxis: {
          name: '时间',
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
          name: '水位（㎜）',
          type: 'value',
          min: 180,
          max: 187,
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
            data: [
              181,
              182.1,
              180,
              182.6,
              182.7,
              182.8,
              182.9,
              183,
              181,
              182.1
            ],
            type: 'line'
          }
        ]
      }
    };
  },
  created() {
    const xData = [];
    waterLevel.forEach(item => {
      if (new Date(item.tm).getHours() <= new Date().getHours()) {
        xData.push(dateFormatUtils(item.tm, 'hh:mm'));
      }
    });
    console.log(xData);
  },
  mounted() {},
  methods: {
    changeType(item) {
      this.curType = item;
    },
    changeTitleType(item) {
      this.curTitleType = item;
    },
    mapReady(view, cesium) {
      viewer = view;
      Cesium = cesium;
      viewer.scene.globe.imageryLayers.removeAll();
      viewer.cesiumWidget.creditContainer['style'].display = 'none';
      viewer.scene.globe.enableLighting = true;
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.scene.logarithmicDepthBuffer = false;
      this.initMap();
      this.showStationOnMap();
      this.setInputAction();
    },

    initMap() {
      var backgroundRectangle = Cesium.Rectangle.fromDegrees(
        115.025,
        39.616,
        117.599,
        40.35
      );
      const backgroundImage = viewer.imageryLayers.addImageryProvider(
        new Cesium.SingleTileImageryProvider({
          url: require('@/assets/images/background.png'),
          rectangle: backgroundRectangle
        }),
        1
      );
      // 海淀街道Tileset
      var hdjdTileset = new Cesium.Cesium3DTileset({
        url: `${configService.domain}/mock/tilesets/hdjd/tileset.json`
      });
      hdjdTileset.readyPromise
        .then(function(hdjdTileset) {
          viewer.scene.primitives.add(hdjdTileset);
          viewer.zoomTo(
            hdjdTileset,
            new Cesium.HeadingPitchRange(
              0.0,
              -1.0,
              hdjdTileset.boundingSphere.radius * 3
            )
          );
        })
        .otherwise(() => {});
      // 水系坐标范围
      var hydPositions = [
        Cesium.Cartesian3.fromDegrees(115.868496327, 40.18374636),
        Cesium.Cartesian3.fromDegrees(116.588972758, 40.18374636),
        Cesium.Cartesian3.fromDegrees(116.588972758, 39.864259685),
        Cesium.Cartesian3.fromDegrees(115.868496327, 39.864259685)
      ];
      // 水系图片
      var hydImage = viewer.entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(hydPositions),
          material: require('@/assets/images/HYD.png')
        }
      });
      // 地形坐标范围
      var terrainPositions = [
        Cesium.Cartesian3.fromDegrees(115.962690753, 40.182498253),
        Cesium.Cartesian3.fromDegrees(116.526129917, 40.182498253),
        Cesium.Cartesian3.fromDegrees(116.526129917, 39.862165953),
        Cesium.Cartesian3.fromDegrees(115.962690753, 39.862165953)
      ];
      // 地形图片
      var terrainImage = viewer.entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(terrainPositions),
          material: require('@/assets/images/terrain.png')
        }
      });
    },
    showStationOnMap() {
      this.dataList.forEach(item => {
        const position = Cesium.Cartesian3.fromDegrees(
          Number(item.lgtd),
          Number(item.lttd),
          2000
        );
        var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(90),
            Cesium.Math.toRadians(0),
            Cesium.Math.toRadians(0)
          )
        );
        viewer.scene.primitives.add(
          Cesium.Model.fromGltf({
            id: item.name,
            url: `${configService.domain}/mock/gltfs/${item.type}.gltf`,
            modelMatrix: modelMatrix,
            scale: 500 // 放大倍数
          })
        );
      });
    },
    setInputAction() {
      var scene = viewer.scene;
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      // 鼠标移入labelEntity提示框
      handler.setInputAction(movement => {
        var pickedObject = scene.pick(movement.endPosition);
        var cartesian = viewer.scene.pickPosition(movement.endPosition);
        const div = this.$refs.toopTip;
        if (
          scene.pickPositionSupported &&
          Cesium.defined(pickedObject) &&
          pickedObject.id !== '' &&
          pickedObject.id !== undefined &&
          pickedObject.id !== null
        ) {
          if (pickedObject.id === '五七水库') {
            const position = movement.endPosition;
            div.style.display = 'block';
            div.style.left = position.x + 150 + 'px';
            div.style.top = position.y + 'px';
          } else {
            div.style.display = 'none';
          }
        } else {
          div.style.display = 'none';
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      viewer.screenSpaceEventHandler.setInputAction(movement => {
        var pickedObject = viewer.scene.pick(movement.position);
        if (
          scene.pickPositionSupported &&
          Cesium.defined(pickedObject) &&
          pickedObject.id !== '' &&
          pickedObject.id !== undefined &&
          pickedObject.id !== null
        ) {
          if (
            pickedObject.id !== '五七水库' &&
            pickedObject.id !== '上庄水库' &&
            pickedObject.id !== '西北旺冷泉路段积水'
          ) {
            this.videoTitle = pickedObject.id;
            this.videoAndImgVisible = true;
            // this.curMapName = pickedObject.id;
          }
          console.log(pickedObject.id);
          if (pickedObject.id === '西北旺冷泉路段积水') {
            this.linkVisible = true;
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    showMapTip(row) {
      const mapTip = this.$refs.mapTip;
      var setPosition = function() {
        // 世界坐标
        var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          viewer.scene,
          Cesium.Cartesian3.fromDegrees(row.x, row.y, 0)
        );
        if (changedC) {
          var x = changedC.x;
          var y = changedC.y;
          mapTip.style.left = x + 'px';
          mapTip.style.top = y + 'px';
        }
      };
      viewer.cesiumWidget.container.appendChild(mapTip);
      viewer.scene.postRender.addEventListener(setPosition);
    },
    locationPoint(item) {
      if (this.primitives) {
        // this.primitives.destroy();
      }
      const position = Cesium.Cartesian3.fromDegrees(
        Number(item.lgtd),
        Number(item.lttd),
        2000
      );
      var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        position,
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(90),
          Cesium.Math.toRadians(0),
          Cesium.Math.toRadians(0)
        )
      );
      Cesium.Matrix4.multiplyByUniformScale(modelMatrix, 10, modelMatrix);
      viewer.scene.primitives.add(
        Cesium.Model.fromGltf({
          id: item.name,
          url: `${configService.domain}/mock/gltfs/tufashijian.gltf`,
          modelMatrix: modelMatrix,
          scale: 30 // 放大倍数
        })
      );
    }
  }
};
</script>
<style lang='scss' scoped>
.index-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  //   background: url(~@/assets/images/background.png) center no-repeat;
  //   background-size: 100% 100%;
  .text-content {
    position: absolute;
    top: 65px;
    left: 30%;
    background: url(~@/assets/images/11.png) center no-repeat;
    background-size: 100% 100%;
    height: 55px;
    color: #fff;
    width: 522px;
    z-index: 10;
    &.active {
      background: none;
    }
    .btn {
      position: absolute;
      left: 80px;
      top: -2px;
      span {
        display: inline-block;
        width: 16px;
        height: 10px;
        background-color: #a7ffa9;
        cursor: pointer;

        &:nth-child(2) {
          background-color: #25f22f;
        }
        &:nth-child(3) {
          background-color: #3cb500;
        }
        &.active {
          border: 1px solid #ff8700;
        }
      }
    }

    .hide-content {
      width: calc(100% - 66px);
      margin-left: 66px;
      //   border-left: 1px solid red;
      height: 100%;
      overflow: hidden;
    }
    .animate {
      padding-top: 9px;
      font-size: 16px;
      color: #fff;
      display: inline-block;
      white-space: nowrap;
      animation: 8s wordsLoop linear infinite normal;
    }
    @keyframes wordsLoop {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  }

  .title {
    position: absolute;
    top: 0;
    background: url(~@/assets/images/title.png) center no-repeat;
    height: 65px;
    z-index: 10;
    width: 100%;
    .title-change {
      position: absolute;
      left: 29.5%;
      top: 26px;
      span {
        display: inline-block;
        width: 16px;
        height: 10px;
        background-color: #a7ffa9;
        cursor: pointer;

        &:nth-child(2) {
          background-color: #25f22f;
        }
        &:nth-child(3) {
          background-color: #3cb500;
        }
        &.active {
          border: 1px solid #ff8700;
        }
      }
    }
  }
  .left,
  .right {
    position: absolute;
    top: 0px;
    height: 100%;
    width: 629px;
    z-index: 10;
    .item {
      height: calc(100% / 3 - 10px);
      width: 100%;
      margin-top: 10px;
    }
  }
  .left {
    left: 0;
    box-shadow: inset 690px 0px 626px -151px rgba(0, 0, 0, 0.6);
    // border-right: 1px solid #000;
  }

  .right {
    right: 0;
    box-shadow: inset -690px 0px 626px -151px rgba(0, 0, 0, 0.6);
  }

  .dialog-content {
    display: flex;
    color: #fff;
    height: 100%;
    .dialog-left {
      width: 40%;
      > label {
        font-size: 18px;
      }
      .dialog-main {
        padding: 20px;
        background-color: rgb(6, 21, 49);
        margin-top: 10px;
        table {
          width: 100%;
          border-left: 1px solid rgb(20, 247, 251);
          tr {
            &:first-of-type {
              td {
                border-bottom: 0;
              }
            }
          }
          td {
            padding: 16px;
            border: 1px solid rgb(20, 247, 251);
            border-left: 0;
            text-align: center;
            &:nth-child(odd) {
              background-color: rgba(5, 49, 78, 1);
            }
          }
        }
      }
    }
    .dialog-right {
      flex: 1;
      height: 100%;
      > label {
        font-size: 18px;
      }
      .dialog-main {
        padding: 20px;
        background-color: rgb(6, 21, 49);
        margin-top: 10px;
        height: 938.82px;
        video {
          object-fit: cover;
          object-position: center center;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .video-content {
    position: relative;
    video {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      height: 980px;
    }
    img {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      height: 980px;
      &.link-img {
        height: 300px;
        transform: translate(-50%, 98%);
      }
    }
  }
}
/deep/ {
  .essence-map-tip {
    position: absolute;
    top: 100px;
    padding: 2px 10px;
    background-color: #fff;
    color: #fff;
    transform: translate(-50%, -40px);
    background-color: rgba(4, 44, 88, 0.8);
    border: 1px solid #27bcff;
    border-radius: 2px;
    white-space: nowrap;
    display: none;
    z-index: 10;
    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-top: 1px solid #27bcff;
      border-left: 1px solid #27bcff;
      background-color: rgba(4, 44, 88, 1);
      left: 50%;
      transform: translate(-50%, 18px) rotate(-135deg);
      // transform: translate(-50%);
    }
  }
}
</style>
