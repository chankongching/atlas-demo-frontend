<template>
  <div class="chart-warp">
    <div :id="canvasId"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Ant from "ant-design-vue";
import G2 from "@antv/g2";
import Colors from "@/utils/colors";

const _C = new Colors();

@Component({
  components: {
    AIcon: Ant.Icon
  }
})
export default class FdBar extends Vue {
  @Prop({ default: `line_${new Date().getTime()}` }) readonly canvasId!: String;

  chart: any = null;

  color: any = _C;

  xAsix: Array<String> = [
    "Jan 2014",
    "Jun 2014",
    "Jan 2015",
    "Jun 2015",
    "Jan 2016",
    "Jun 2016",
    "Jan 2017",
    "Jun 2017",
    "Jan 2018",
    "Jun 2018",
    "Jan 2019",
    "Jun 2019"
  ];
  yAsix: Array<Array<Number>> = [
    [990, 950, 900, 880, 840, 800, 770, 750, 700, 670, 630, 600],
    [450, 480, 520, 580, 600, 650, 710, 770, 890, 900, 950, 1050],
    [400, 500, 580, 660, 740, 800, 880, 840, 820, 800, 800, 790],
    [300, 330, 390, 470, 670, 870, 900, 940, 990, 1000, 1030, 1100]
  ];

  mounted() {
    const self = this;
    const w = window.innerWidth - 240;

    const cvs = document.getElementById(`${this.canvasId}`);
    const _w =
      cvs != null
        ? cvs.parentElement != null
          ? cvs.parentElement.offsetWidth
          : w
        : w;

    const chart = new G2.Chart({
      container: `${self.canvasId}`,
      width: _w,
      height: 380,
      forceFit: true,
      padding: [30, 10, "auto", 40]
    });
    this.chart = chart;
    this.initChart(chart);
  }

  initChart(chart: G2.Chart): void {
    const data = [
      {
        time: "Jan 2014",
        score: 0,
        type: "0"
      },
      {
        time: "Jun 2014",
        score: 0,
        type: "0"
      },
      {
        time: "Jan 2015",
        score: 0,
        type: "0"
      },
      {
        time: "Jun 2015",
        score: 0,
        type: "0"
      },
      {
        time: "Jan 2016",
        score: 0,
        type: "0"
      },
      {
        time: "Jun 2016",
        score: 0,
        type: "0"
      },
      {
        time: "Jan 2017",
        score: 0,
        type: "0"
      },
      {
        time: "Jun 2017",
        score: 0,
        type: "0"
      },
      {
        time: "Jan 2018",
        score: 0,
        type: "0"
      },
      {
        time: "Jun 2018",
        score: 0,
        type: "0"
      },
      {
        time: "Jan 2019",
        score: 0,
        type: "0"
      },
      {
        time: "Jun 2019",
        score: 0,
        type: "0"
      }
    ];

    chart.legend(false);
    chart.tooltip(false);
    chart.source(data);
    chart.axis("time", {
      grid: {
        type: "line",
        lineStyle: {
          stroke: "#D2D4D4",
          lineWidth: 1,
          lineDash: [4, 4]
        },
        align: "center" // 网格顶点从两个刻度中间开始
      }
    });

    chart
      .point()
      .position("time*score")
      .size(0)
      .color("type", (val: any) => _C.selectColor[val]);
    chart.render();
  }
  buildData(item: Array<any>) {
    var realData: Array<Object> = [];
    var chartData: Array<Array<any>> = [];
    var self = this;

    for (let i = 0; i < item.length; i++) {
      let _item = item[i];
      if (Object.keys(_item).length > 0) {
        realData.push({
          type: i.toString(),
          entity: _item.title
        });
      }
    }

    for (let j = 0; j < realData.length; j++) {
      let y: Array<Number> = self.yAsix[j];
      var _item: any = realData[j];

      for (let k = 0; k < y.length; k++) {
        chartData.push({
          time: self.xAsix[k],
          type: _item.type,
          entity: _item.entity,
          score: y[k]
        });
      }
    }

    return chartData;
  }
  updateChart(item: Array<Object>): void {
    var data = this.buildData(item);
    if(data.length <= 0){
      this.initChart(this.chart);
      return false;
    }

    this.chart.legend(false);
    this.chart.source(data);
    this.chart.axis("time", {
      grid: {
        type: "line",
        lineStyle: {
          stroke: "#D2D4D4",
          lineWidth: 1,
          lineDash: [4, 4]
        },
        align: "center" // 网格顶点从两个刻度中间开始
      }
    });
    this.chart.axis("value", {
      grid: {
        type: "line",
        lineStyle: {
          stroke: "#D2D4D4",
          lineWidth: 1,
          lineDash: [4, 4]
        },
        align: "center" // 网格顶点从两个刻度中间开始
      }
    });

    this.chart
      .line()
      .position("time*score")
      .color("type", (val: any) => _C.selectColor[val]).shape('smooth');
    this.chart
      .point()
      .position("time*score")
      .color("type", (val: any) => _C.selectColor[val * 1])
      .size(5)
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });
    this.chart.repaint();
  }
}
</script>
