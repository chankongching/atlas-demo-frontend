<template>
  <div class="chart-warp">
    <div :id="canvasId"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import G2 from '@antv/g2';
import Colors from '@/utils/colors.ts';

const _C = new Colors();

@Component({
  components: {
    AIcon: Ant.Icon,
  },
})
export default class FdBar extends Vue {
  @Prop({ default: `pie_${new Date().getTime()}` }) readonly canvasId!: String;

  chart: any = null;

  mounted() {
    const self = this;
    const w = 160;

    const cvs = document.getElementById(`${this.canvasId}`);
    const _w = cvs != null
      ? cvs.parentElement != null
        ? cvs.parentElement.offsetWidth
        : w
      : w;

    const chart = new G2.Chart({
      container: `${self.canvasId}`,
      forceFit: true,
      height: _w,
    });
    this.updateChart(chart);
  }

  updateChart(chart: G2.Chart): void {
    const data = [
      {
        item: 'mining pool',
        count: 40,
        type: 0,
      },
      {
        item: 'high risk exchange',
        count: 21,
        type: 1,
      },
      {
        item: 'darknet marker',
        count: 17,
        type: 2,
      },
      {
        item: 'exchange',
        count: 13,
        type: 3,
      },
      {
        item: 'mixing',
        count: 9,
        type: 4,
      },
    ];

    chart.legend(false);
    chart.source(data);
    chart.coord('theta', {
      radius: 0.75,
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    chart
      .intervalStack()
      .position('item')
      .color('type', (val: number) => _C.inColor[val] || '#FFF')
      .label('percent', {
        formatter: function formatter(val: any, item: any) {
          return `${item.point.item}: ${val}`;
        },
      })
      .tooltip('item*percent', (item: any, percent: any) => {
        percent = `${percent * 100}%`;
        return {
          name: item,
          value: percent,
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    chart.render();
  }
}
</script>
<style lang="scss" scoped>
.chart-warp {
  padding-top: 20px;
}
</style>
