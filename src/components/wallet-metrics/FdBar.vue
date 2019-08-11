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

const types: Object = {
  0: "Binance",
  1: "Huobi",
  2: "Binance South East Asia"
};

interface chartObject {
  name?: String;
  type?: String;
  entity?: String;
  value?: String | Number;
}

@Component({
  components: {
    AIcon: Ant.Icon
  }
})
export default class FdBar extends Vue {
  @Prop({ default: `bar_${new Date().getTime()}` }) readonly canvasId!: String;

  @Prop()
  barData?: Array<Array<Number>>;

  @Prop()
  barTitle?: Array<String>;

  chart: any = null;

  colors: Array<String> = _C.selectColor;

  xAsix: Array<String> = [
    "0",
    "0-10",
    "10-100",
    "100-1k",
    "1k-10k",
    "10k-100k",
    "100k-1M",
    "1M+"
  ];
  yAsix: Array<Array<Number>> = [
    [900, 600, 700, 500, 550, 500, 450, 300],
    [880, 760, 800, 750, 700, 600, 500, 400],
    [860, 800, 890, 700, 600, 500, 450, 500],
    [500, 550, 600, 560, 480, 400, 300, 200]
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
      padding: [30, 10, "auto", "auto"]
    });
    this.chart = chart;
    this.initChart(chart);
  }
  initChart(chart: G2.Chart): void {
    const self = this;
    const data = [
      {
        name: "0",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "0-10",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "10-100",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "100-1k",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "1k-10k",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "10k-100k",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "100k-1M",
        type: "0",
        entity: "Binance",
        value: 0
      },
      {
        name: "1M+",
        type: "0",
        entity: "Binance",
        value: 0
      }
    ];

    chart.legend(false);
    chart.tooltip(false);
    chart.source(data, {
      value: {
        type: "linear",
        min: 0,
        max: 1000000,
        tickCount: 5
      }
    });

    chart.axis("name", {
      label: {
        formatter(text, item, index) {
          return text + " BTC";
        }
      },
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
      .interval()
      .position("name*value")
      .color("type", (val: any) => _C.selectColor[val * 1])
      .opacity(1)
      .adjust([
        {
          type: "dodge",
          marginRatio: 1 / 32
        }
      ]);

    chart.render();
    // chart.repaint();
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
          name: self.xAsix[k],
          type: _item.type,
          entity: _item.entity,
          value: y[k]
        });
      }
    }

    return chartData;
  }
  updateChart(item: Array<Object>): void {
    var data = this.buildData(item);

    this.chart.source(data, {
      value: {
        type: "linear",
        min: 0
      }
    });
    this.chart.axis("name", {
      label: {
        formatter(text: any, item: any, index: any) {
          return text + " BTC";
        }
      },
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
    this.chart.tooltip({
      useHtml: true,
      htmlContent(title: any, items: any) {
        const arr = [];
        for (let i = 0; i < items.length; i++) {
          const name = items[i].name.toString();

          arr.push(
            `<li><span style="font-weight: bolder;padding-right:10px;">${types[name]}：</span>${items[i].value}</li>`
          );
        }
        return `<div class="g2-tooltip g2-tooltip-modal">
          <div class="g2-tooltip-title" style="margin-bottom: 4px;">${title}</div>
          <ul class="g2-tooltip-list">
            ${arr.join("")}
          </ul>
          </div>`;
      }
    });
    this.chart
      .interval()
      .position("name*value")
      .color("type", (val: any) => _C.selectColor[val * 1])
      .opacity(1)
      .adjust([
        {
          type: "dodge",
          marginRatio: 1 / 32
        }
      ]);
    this.chart.repaint();
  }
}
</script>
