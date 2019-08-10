<template>
  <div class="chart-warp">
    <div :id="canvasId"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import G2 from '@antv/g2';

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
        item: '事例一',
        count: 40,
        percent: 0.4,
      },
      {
        item: '事例二',
        count: 21,
        percent: 0.21,
      },
      {
        item: '事例三',
        count: 17,
        percent: 0.17,
      },
      {
        item: '事例四',
        count: 13,
        percent: 0.13,
      },
      {
        item: '事例五',
        count: 9,
        percent: 0.09,
      },
    ];

    chart.legend(false);
    chart.source(data, {
      percent: {
        formatter: function formatter(val: number) {
          const str = `${val * 100}%`;
          return str;
        },
      },
    });
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
      .position('percent')
      .color('item')
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
