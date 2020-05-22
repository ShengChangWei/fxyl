<template>
  <div class="forecast-rainfall">
    <div class="title">预报降雨</div>
    <div class="content">
      <e-vue-esrimapjs :mapType="'tdt'"
                       :mapUrl="[]"
                       :enableNavigation="false"
                       :submapUrl="[['vec','cva'], ['ter','cta']]"
                       :initExtent="initExtent"
                       @mapReady="onMapReady($event)">
      </e-vue-esrimapjs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initExtent: {
        xmax: 116.39029888900006,
        xmin: 116.04209077900009,
        ymax: 40.161018230000025,
        ymin: 39.885287565000056
      },
      map: null,
      mapComponent: null,
      areaLayer: null,
      areaSymbol: null
    };
  },
  created() {},
  mounted() {},
  methods: {
    onMapReady(evt) {
      this.mapComponent = evt;
      this.map = this.mapComponent.map;

      this.initLayers();
      this.initSymbols();
      this.queryBoundaryLine();
    },
    initLayers() {
      this.areaLayer = new this.mapComponent.GraphicsLayer();

      // 初始化图层后将这个图层添加到地图上
      this.map.addLayers([this.areaLayer]);
    },
    initSymbols() {
      this.areaSymbol = new this.mapComponent.SimpleFillSymbol({
        type: 'esriSFS',
        style: 'esriSFSSolid',
        color: [20, 247, 251, 80],
        outline: {
          type: 'esriSLS',
          style: 'esriSLSSolid',
          color: [20, 247, 251, 255],
          width: 2
        }
      });
    },
    queryBoundaryLine() {
      const query = new this.mapComponent.Query();
      query.where = '2 > 1';
      query.outSpatialReference = this.map.spatialReference;
      query.returnGeometry = true;
      query.outFields = ['*'];
      const areaQueryTask = new this.mapComponent.QueryTask(
        'http://124.205.32.213:6080/arcgis/rest/services/HDSW/BASE_MAP/MapServer/5'
      );
      areaQueryTask.execute(query, areas => {
        areas.features.forEach(area => {
          area.symbol = this.areaSymbol;
          this.areaLayer.add(area);
        });
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.forecast-rainfall {
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
    padding: 32px 2px 0px 5px;
  }
}
</style>
