<template>
  <div class="realtime-water">
    <div class="title">实时水情</div>
    <div class="content">
      <table class="table"
             cellspacing="0">
        <thead>
          <tr>
            <th>测站编码</th>
            <th>水位站</th>
            <th>实时水位（m）</th>

          </tr>
        </thead>
        <tbody>
          <template v-for="item in tableData">
            <tr :key="item.name">
              <td>{{ item.stcd }}</td>
              <td>{{ item.stnm }}</td>
              <td>{{ item.z }}</td>
            </tr>
          </template>
        </tbody>
      </table>
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
    return {
      tableData: [
        {
          stnm: '上庄后河水位',
          stcd: '11010822',
          tm: '2016/7/20 22:00',
          z: '0.39'
        },
        {
          stnm: '玉河橡胶坝水位',
          stcd: '11010821',
          tm: '2016/6/29 9:00',
          z: '4.93'
        },
        {
          stnm: '稻香湖水位',
          stcd: '11010824',
          tm: '2016/6/29 9:04',
          z: '0.19'
        },
        {
          stnm: '风格渠水位',
          stcd: '11010820',
          tm: '2016/7/16 7:00',
          z: '0.01'
        },
        {
          stnm: '翠湖水厂水位',
          stcd: '11010826',
          tm: '2016/7/20 22:00',
          z: '1.63'
        },
        {
          stnm: '纪检学院水位',
          stcd: '11010825',
          tm: '2016/7/20 22:00',
          z: '1.16'
        },
        {
          stnm: '上庄水库水位',
          stcd: '11010818',
          tm: '2016/7/19 18:00',
          z: '0.94'
        },
        {
          stnm: '前章村沟水位',
          stcd: '11010823',
          tm: '2016/7/20 18:05',
          z: '4.05'
        }
      ],
      curTime: 0
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.realtime-water {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/2.png) no-repeat;
  background-size: 100% 100%;
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 6px;
    right: 120px;
  }
  .content {
    height: 100%;

    padding: 32px 2px 0px 0px;

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
        font-weight: bold;
      }
      thead {
        background: rgba(0, 93, 156, 0.3);
        th {
          font-size: 15px;
        }
      }
      tbody {
        tr {
          &:nth-child(even) {
            background: rgba(4, 31, 63, 0.71);
          }
          &:hover {
            // background: ;
            box-shadow: inset 0px 0px 60px rgba(255, 0, 30, 0.5);
          }
          td {
            &:nth-child(3) {
              color: #00ddff;
            }
          }
        }
      }
    }
  }
}
</style>