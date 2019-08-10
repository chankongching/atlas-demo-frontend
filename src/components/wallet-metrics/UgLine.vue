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
  @Prop({ default: `line_${new Date().getTime()}` }) readonly canvasId!: String;

  chart: any = null;

  mounted() {
    const self = this;
    const w = window.innerWidth - 240;

    const cvs = document.getElementById(`${this.canvasId}`);
    const _w = cvs != null
      ? cvs.parentElement != null
        ? cvs.parentElement.offsetWidth
        : w
      : w;

    const chart = new G2.Chart({
      container: `${self.canvasId}`,
      width: _w,
      height: 380,
      forceFit: true,
      padding: [30, 10, 10, 40],
    });
    this.updateChart(chart);
  }

  updateChart(chart: G2.Chart): void {
    const data = [
      {
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9,
      },
      {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8,
      },
      {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3,
      },
      {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4,
      },
      {
        name: 'London',
        月份: 'May',
        月均降雨量: 47,
      },
      {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3,
      },
      {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24,
      },
      {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6,
      },
      {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4,
      },
      {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2,
      },
      {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5,
      },
      {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7,
      },
      {
        name: 'Berlin',
        月份: 'May',
        月均降雨量: 52.6,
      },
      {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5,
      },
      {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4,
      },
      {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4,
      },
    ];

    chart.legend(false);
    chart.source(data);
    chart.axis('月份', {
      grid: {
        type: 'line',
        lineStyle: {
          stroke: '#D2D4D4',
          lineWidth: 1,
          lineDash: [4, 4],
        },
        align: 'center', // 网格顶点从两个刻度中间开始
      },
    });
    chart
      .line()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ]);
    chart.render();
  }
}
</script>
