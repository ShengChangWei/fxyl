<template>
  <div ref="cesiumContainer"
       style="width: 100%; height: 100%">
  </div>
</template>

<script>
import 'cesium/Widgets/widgets.css';
const Cesium = require('cesium/Cesium');
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          timeline: false,
          animation: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          selectionIndicator: false,
          navigationHelpButton: false,
          sceneModePicker: false,
          fullscreenButton: false
        };
      }
    },
    accessToken: {
      type: String,
      default:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyOTgzZDc3ZS00ODQzLTQzODYtOTEzMy1lYWY4Nzk5ZjJiOWQiLCJpZCI6NzE0Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0ODM5MTU1Nn0.tFLI1-ATHpRpCPnS9qZE0Kg3AF22SXgrXNxNs6QAgK0'
    }
  },
  created() {},
  mounted() {
    Cesium.Ion.defaultAccessToken = this.accessToken;
    this.options = {
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url:
          'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
      }),
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      fullscreenButton: false
    };
    const viewer = new Cesium.Viewer(this.$refs.cesiumContainer, this.options);
    viewer.cesiumWidget.creditContainer['style'].display = 'none'; // 隐藏默认的版权信息
    this.$emit('ready', viewer, Cesium);
  }
};
</script>

<style lang="scss" scoped>
</style>
