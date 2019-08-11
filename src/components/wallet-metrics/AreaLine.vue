<template>
  <div class="chart-warp">
    <div :id="canvasId"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Ant from "ant-design-vue";
import G2 from "@antv/g2";

const DataSet = require("@antv/data-set");

import Colors from "@/utils/colors.ts";

const _C = new Colors();

@Component({
  components: {
    AIcon: Ant.Icon
  }
})
export default class FdBar extends Vue {
  @Prop({ default: `area_${new Date().getTime()}` }) readonly canvasId!: String;

  chart: any = null;
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
      padding: [30, "auto", "auto", "auto"]
    });
    this.chart = chart;
    this.initChart(chart);
  }

  initChart(chart: G2.Chart): void {
    var data: any = [];

    for (let i = 0; i < this.yAsix.length; i++) {
      let item = this.yAsix[i];
      for (let j = 0; j < item.length; j++) {
        data.push({
          type: i.toString(),
          value: item[j],
          year: this.xAsix[j]
        });
      }
    }

    var _DataSet = DataSet,
      DataView = _DataSet.DataView;
    var dv = new DataView().source(data);
    dv.transform({
      type: "percent",
      field: "value",
      dimension: "type",
      groupBy: ["year"],
      as: "percent"
    });
    chart.source(dv, {
      year: {
        type: "cat"
      },
      percent: {
        formatter: function formatter(value: any) {
          value = value || 0;
          value = value * 100;
          return parseInt(value);
        },
        alias: "percent(%)"
      }
    });
    chart.axis("year", {
      grid: {
        type: "line",
        lineStyle: {
          stroke: "#D2D4D4",
          lineWidth: 1,
          lineDash: [4, 4]
        }
      }
    });
    chart.legend(false);
    chart.tooltip(false);
    // chart.tooltip({
    //   crosshairs: {
    //     type: "line"
    //   }
    // });
    chart
      .areaStack()
      .position("year*percent")
      .color("type", (val: any) => _C.inColor[val * 1]);

    chart
      .lineStack()
      .position("year*percent")
      .color("type", (val: any) => _C.inColor[val * 1])
      .size(2);
    chart.render();
  }
  buildData(item: any) {
    var realData: Array<Object> = [];
    var chartData: Array<Array<any>> = [];
    var self = this;

    return [];

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
          name: self.xAsix[k],
          type: _item.type,
          entity: _item.entity,
          value: y[k]
        });
      }
    }
    return chartData;
  }
  updateChart(item: any): void {
    var data = this.buildData(item);
    if (data.length <= 0) {
      this.initChart(this.chart);
    } else {
      var _DataSet = DataSet,
        DataView = _DataSet.DataView;
      var dv = new DataView().source(data);
      dv.transform({
        type: "percent",
        field: "value",
        dimension: "type",
        groupBy: ["year"],
        as: "percent"
      });
      this.chart.source(dv, {
        year: {
          type: "linear",
          tickInterval: 50
        },
        percent: {
          formatter: function formatter(value) {
            value = value || 0;
            value = value * 100;
            return parseInt(value);
          },
          alias: "percent(%)"
        }
      });
      this.chart.legend(false);
      this.chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      this.chart
        .areaStack()
        .position("year*percent")
        .color("type", (val: any) => _C.inColor[val * 1]);
      this.chart
        .lineStack()
        .position("year*percent")
        .color("type", (val: any) => _C.inColor[val * 1])
        .size(2);
      this.chart.repaint();
    }
  }
}
</script>
