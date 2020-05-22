<template>
  <div class="sate-radar">
    <div class="title">卫星云图</div>
    <div class="title last">雷达图</div>
    <div class="content">
      <div class="left">
        <video :src="require(`../videos/radar/sate${curStatus}.mp4`)"
               autoplay
               loop></video>
      </div>
      <div class="right">
        <video :src="require(`../videos/radar/radar${curStatus}.mp4`)"
               autoplay
               loop></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    curStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  watch: {
    curStatus(val) {
      console.log(val);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.sate-radar {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/0.png) no-repeat;
  background-size: 100% 100%;
  video {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  }
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 14px;
    &:first-of-type {
      left: 120px;
    }
    &.last {
      right: 120px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 40px 5px 5px 5px;
    div {
      width: 50%;
      height: 100%;
      border: 1px solid #000;
    }
  }
}
</style>
