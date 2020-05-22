<template>
  <div class="emergency-event">
    <div class="title">突发事件
      <span v-for="item in type"
            :key="item"
            :class="{'active': curType === item}"
            @click="changeType(item)"></span>
    </div>
    <div class="content">
      <div v-for="item in items[curType]"
           :key="item.text"
           class="item"
           :style="{width: item.width}"
           @click="handleClick(item.code)">
        <img :src="item.icon"
             alt="">
        <span class="text">{{ item.text }}</span>
        <span class="time">{{ item.time }}</span>
        <i class="el-icon-d-arrow-right arrow"></i>
      </div>

    </div>

    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               :modal="false"
               center
               :fullscreen="true">
      <div slot="title"
           class="text-center dialog-title">
        {{ textObj[videoCode] }} <span v-for="item in titleType"
              :key="item + 's'"
              :class="{'active': curTitleType === item}"
              @click="changeTitleType(item)"></span>
      </div>
      <div class="dialog-content">
        <video :src="require( `../videos/tfsj/${videoCode}/${curTitleType}.mp4`)"
               autoplay
               loop></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      type: [0, 1, 2, 3],
      curType: 0,
      titleType: [0, 1, 2],
      curTitleType: 0,
      videoCode: 1,
      textObj: {
        1: '上庄地区停电事件',
        2: '闸门自动化操作系统现问题'
      },
      items: [
        [
          {
            icon: require('@/assets/images/js.png'),
            text: '西北旺冷泉路段积水',
            width: '100%',
            time: '现在',
            code: 0
          }
        ],
        [
          {
            icon: require('@/assets/images/td.png'),
            text: '上庄地区停电',
            width: '100%',
            time: '现在',
            code: 1
          },
          {
            icon: require('@/assets/images/js.png'),
            text: '西北旺冷泉路段积水',
            width: '90%',
            time: '几分钟前',
            code: 0
          }
        ],
        [
          {
            icon: require('@/assets/images/gz.png'),
            text: '闸门自动化操作系统现问题',
            width: '100%',
            time: '现在',
            code: 2
          },
          {
            icon: require('@/assets/images/td.png'),
            text: '上庄地区停电',
            width: '90%',
            time: '几分钟前',
            code: 1
          },
          {
            icon: require('@/assets/images/js.png'),
            text: '西北旺冷泉路段积水',
            width: '85%',
            time: '几分钟前',
            code: 0
          }
        ],
        [
          {
            icon: require('@/assets/images/xq.png'),
            text: '崔家窑出现险情',
            width: '100%',
            time: '现在',
            code: 3
          },
          {
            icon: require('@/assets/images/gz.png'),
            text: '闸门自动化操作系统现问题',
            width: '90%',
            time: '几分钟前',
            code: 2
          },
          {
            icon: require('@/assets/images/td.png'),
            text: '上庄地区停电',
            width: '85%',
            time: '几分钟前',
            code: 1
          },
          {
            icon: require('@/assets/images/js.png'),
            text: '西北旺冷泉路段积水',
            width: '75%',
            time: '几分钟前',
            code: 0
          }
        ]
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeType(item) {
      this.curType = item;
    },
    changeTitleType(item) {
      this.curTitleType = item;
    },
    handleClick(code) {
      if (code === 1 || code === 2) {
        this.videoCode = code;
        this.curTitleType = 0;
        this.dialogVisible = true;
      } else if (code === 3 || code === 0) {
        let mapObj = {};
        if (code) {
          mapObj = { name: '崔家窑出现险情', lgtd: '116.226', lttd: '40.095' };
        } else {
          mapObj = { name: '西北旺冷泉路段积水', lgtd: '116.217', lttd: '40.036' };
        }
        console.log(mapObj);
        this.$emit('locationPoint', mapObj);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.emergency-event {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/2.png) center no-repeat;
  background-size: 100% 100%;
  .flip-list-move {
    transition: transform 1s;
  }
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 8px;
    right: 100px;
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
      &:nth-child(4) {
        background-color: #158600;
      }
      &.active {
        border: 1px solid #ff8700;
      }
    }
  }
  .content {
    height: 100%;
    padding: 46px 20px 0px 20px;
    .item {
      background: url(~@/assets/images/7.png) center no-repeat;
      background-size: 100% 100%;
      height: 59px;
      margin-bottom: 20px;
      line-height: 59px;
      color: #fff;
      position: relative;
      width: 100%;
      transition: all 1s;
      opacity: 0.8;
      &.active {
        width: 80%;
      }
      i {
        position: absolute;
        right: 40px;
        top: 22px;
      }
      > span {
        display: inline-block;
      }
      img {
        vertical-align: middle;
        margin: 0 20px 0 30px;
      }
      .text {
        width: 220px;
        font-size: 18px;
      }
      &:first-of-type {
        opacity: 1;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .dialog-title {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
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
      &:nth-child(4) {
        background-color: #000;
      }
      &.active {
        border: 1px solid #ff8700;
      }
    }
  }
  .dialog-content {
    background-color: rgb(4, 21, 71);
    // height: 970px;
    // width: 100%;
    position: relative;
    video {
      position: absolute;
      left: 50%;

      transform: translate(-50%, 0);
      object-fit: cover;
      object-position: center center;
      width: 490px;
      height: 960px;
    }
  }
}
</style>
