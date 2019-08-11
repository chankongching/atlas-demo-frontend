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
  "0": "Binance",
  "1": "Huobi",
  "2": "Binance South East Asia"
};

@Component({
  components: {
    AIcon: Ant.Icon
  }
})
export default class FdBar extends Vue {
  @Prop({ default: `bar_${new Date().getTime()}` }) readonly canvasId!: String;

  chart: any = null;

  colors: Array<String> = _C.selectColor;

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
    this.updateChart(chart);
  }

  updateChart(chart: G2.Chart): void {
    let self = this;
    const data = [
      {
        name: "1-10",
        type: "0",
        entity: "Binance",
        value: 23
      },
      {
        name: "10-100",
        type: "0",
        entity: "Binance",
        value: 55
      },
      {
        name: "100-1k",
        type: "0",
        entity: "Binance",
        value: 32
      },
      {
        name: "1k-10k",
        type: "0",
        entity: "Binance",
        value: 20
      },
      {
        name: "10k-100k",
        type: "0",
        entity: "Binance",
        value: 18
      },
      {
        name: "100k-1M",
        type: "0",
        entity: "Binance",
        value: 37
      },
      {
        name: "1M+",
        type: "0",
        entity: "Binance",
        value: 80
      },
      {
        name: "1-10",
        type: "1",
        entity: "Huobi",
        value: 50
      },
      {
        name: "10-100",
        type: "1",
        entity: "Huobi",
        value: 20
      },
      {
        name: "100-1k",
        type: "1",
        entity: "Huobi",
        value: 22
      },
      {
        name: "1k-10k",
        type: "1",
        entity: "Huobi",
        value: 20
      },
      {
        name: "10k-100k",
        type: "1",
        entity: "Huobi",
        value: 36
      },
      {
        name: "100k-1M",
        type: "1",
        entity: "Huobi",
        value: 75
      },
      {
        name: "1M+",
        type: "1",
        entity: "Huobi",
        value: 9
      },
      {
        name: "1-10",
        type: "2",
        entity: "Binance South East Asia",
        value: 39
      },
      {
        name: "10-100",
        type: "2",
        entity: "Binance South East Asia",
        value: 80
      },
      {
        name: "100-1k",
        type: "2",
        entity: "Binance South East Asia",
        value: 5
      },
      {
        name: "1k-10k",
        type: "2",
        entity: "Binance South East Asia",
        value: 8
      },
      {
        name: "10k-100k",
        type: "2",
        entity: "Binance South East Asia",
        value: 57
      },
      {
        name: "100k-1M",
        type: "2",
        entity: "Binance South East Asia",
        value: 50
      },
      {
        name: "1M+",
        type: "2",
        entity: "Binance South East Asia",
        value: 18
      }
    ];

    chart.legend(false);
    chart.source(data);

    chart.axis("name", {
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
    chart.tooltip({
      useHtml: true,
      htmlContent: function(title, items) {
        var arr = [];
        for (var i = 0; i < items.length; i++) {
           var name = items[i].name.toString();

          arr.push(
            `<li><span style="font-weight: bolder;padding-right:10px;">${types[name]}：</span>${items[i].value}</li>`
          );
        }
        return `<div class="g2-tooltip g2-tooltip-modal">
          <div class="g2-tooltip-title" style="margin-bottom: 4px;">${title}</div>
          <ul class="g2-tooltip-list">
            ${arr.join('')}
          </ul>
          </div>`;
      }
    });
    chart
      .interval()
      .position("name*value")
      .color("type", function(val: any) {
        return _C.selectColor[val * 1];
      })
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
}
</script>
