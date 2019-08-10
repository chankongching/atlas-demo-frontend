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
        type: 0,
        value: 23
      },
      {
        name: "10-100",
        type: 0,
        value: 55
      },
      {
        name: "100-1k",
        type: 0,
        value: 32
      },
      {
        name: "1k-10k",
        type: 0,
        value: 20
      },
      {
        name: "10k-100k",
        type: 0,
        value: 18
      },
      {
        name: "100k-1M",
        type: 0,
        value: 37
      },
      {
        name: "1M+",
        type: 0,
        value: 80
      },
      {
        name: "1-10",
        type: 1,
        value: 50
      },
      {
        name: "10-100",
        type: 1,
        value: 20
      },
      {
        name: "100-1k",
        type: 1,
        value: 22
      },
      {
        name: "1k-10k",
        type: 1,
        value: 20
      },
      {
        name: "10k-100k",
        type: 1,
        value: 36
      },
      {
        name: "100k-1M",
        type: 1,
        value: 75
      },
      {
        name: "1M+",
        type: 1,
        value: 9
      },
      {
        name: "1-10",
        type: 2,
        value: 39
      },
      {
        name: "10-100",
        type: 2,
        value: 80
      },
      {
        name: "100-1k",
        type: 2,
        value: 5
      },
      {
        name: "1k-10k",
        type: 2,
        value: 8
      },
      {
        name: "10k-100k",
        type: 2,
        value: 57
      },
      {
        name: "100k-1M",
        type: 2,
        value: 50
      },
      {
        name: "1M+",
        type: 2,
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
    chart
      .interval()
      .position("name*value")
      .color("type", function(val: any) {
        return self.colors[val];
      })
      .adjust([
        {
          type: "dodge",
          marginRatio: 1 / 64
        }
      ]);
    chart.render();
    // chart.repaint();
  }
}
</script>
