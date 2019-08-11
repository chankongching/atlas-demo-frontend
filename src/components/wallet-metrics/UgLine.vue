<template>
  <div class="chart-warp">
    <div :id="canvasId"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import G2 from '@antv/g2';
import Colors from '@/utils/colors';

const _C = new Colors();

@Component({
  components: {
    AIcon: Ant.Icon,
  },
})
export default class FdBar extends Vue {
  @Prop({ default: `line_${new Date().getTime()}` }) readonly canvasId!: String;

  chart: any = null;

  color: any = _C;

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
      padding: [30, 10, 'auto', 40],
    });
    this.updateChart(chart);
  }

  updateChart(chart: G2.Chart): void {
    const data = [
      {
        time: 'Jan 2014',
        score: 5,
        type: '0',
      },
      {
        time: 'Jun 2014',
        score: 4,
        type: '0',
      },
      {
        time: 'Jan 2015',
        score: 18,
        type: '0',
      },
      {
        time: 'Jun 2015',
        score: 23,
        type: '0',
      },
      {
        time: 'Jan 2016',
        score: 54,
        type: '0',
      },
      {
        time: 'Jun 2016',
        score: 35,
        type: '0',
      },
      {
        time: 'Jan 2017',
        score: 51,
        type: '0',
      },
      {
        time: 'Jun 2017',
        score: 91,
        type: '0',
      },
      {
        time: 'Jan 2018',
        score: 36,
        type: '0',
      },
      {
        time: 'Jun 2018',
        score: 29,
        type: '0',
      },
      {
        time: 'Jan 2019',
        score: 40,
        type: '0',
      },
      {
        time: 'Jun 2019',
        score: 91,
        type: '0',
      },
      {
        time: 'Jan 2014',
        score: 25,
        type: '1',
      },
      {
        time: 'Jun 2014',
        score: 45,
        type: '1',
      },
      {
        time: 'Jan 2015',
        score: 11,
        type: '1',
      },
      {
        time: 'Jun 2015',
        score: 31,
        type: '1',
      },
      {
        time: 'Jan 2016',
        score: 75,
        type: '1',
      },
      {
        time: 'Jun 2016',
        score: 43,
        type: '1',
      },
      {
        time: 'Jan 2017',
        score: 35,
        type: '1',
      },
      {
        time: 'Jun 2017',
        score: 81,
        type: '1',
      },
      {
        time: 'Jan 2018',
        score: 63,
        type: '1',
      },
      {
        time: 'Jun 2018',
        score: 52,
        type: '1',
      },
      {
        time: 'Jan 2019',
        score: 73,
        type: '1',
      },
      {
        time: 'Jun 2019',
        score: 49,
        type: '1',
      },
      {
        time: 'Jan 2014',
        score: 15,
        type: '2',
      },
      {
        time: 'Jun 2014',
        score: 74,
        type: '2',
      },
      {
        time: 'Jan 2015',
        score: 64,
        type: '2',
      },
      {
        time: 'Jun 2015',
        score: 53,
        type: '2',
      },
      {
        time: 'Jan 2016',
        score: 97,
        type: '2',
      },
      {
        time: 'Jun 2016',
        score: 33,
        type: '2',
      },
      {
        time: 'Jan 2017',
        score: 75,
        type: '2',
      },
      {
        time: 'Jun 2017',
        score: 31,
        type: '2',
      },
      {
        time: 'Jan 2018',
        score: 43,
        type: '2',
      },
      {
        time: 'Jun 2018',
        score: 62,
        type: '2',
      },
      {
        time: 'Jan 2019',
        score: 13,
        type: '2',
      },
      {
        time: 'Jun 2019',
        score: 29,
        type: '2',
      },
    ];

    chart.legend(false);
    chart.source(data);
    chart.axis('time', {
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
      .position('time*score')
      .color('type', (val: any) => _C.selectColor[val]);
    chart
      .point()
      .position('time*score')
      .color('type', (val: any) => _C.selectColor[val * 1])
      .size(5)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    chart.render();
  }
}
</script>
