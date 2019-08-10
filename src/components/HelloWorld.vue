<template>
  <div>
    <h1>{{ msg }}</h1>
    <a-menu
      mode="inline"
      :openKeys="openKeys"
      @openChange="onOpenChange"
      style="width: 256px"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
        <a-menu-item key="1">Option 1</a-menu-item>
        <a-menu-item key="2">Option 2</a-menu-item>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
      </a-sub-menu>
    </a-menu>
    <v-chart :options="polar"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Ant from 'ant-design-vue';

import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';

@Component({
  components: {
    AMenu: Ant.Menu,
    ASubMenu: Ant.Menu.SubMenu,
    AMenuItem: Ant.Menu.Item,
    AIcon: Ant.Icon,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private rootSubmenuKeys: Array<string> = ['sub1', 'sub2', 'sub4'];

  private openKeys: Array<string> = ['sub1'];

  private data: Array<any> = [];

  private polar = {
    title: {
      text: '极坐标双数值轴',
    },
    legend: {
      data: ['line'],
    },
    polar: {
      center: ['50%', '54%'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    angleAxis: {
      type: 'value',
      startAngle: 0,
    },
    radiusAxis: {
      min: 0,
    },
    series: [
      {
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: this.data,
      },
    ],
    animationDuration: 2000,
  };

  created() {
    this.initData();
  }

  mounted() {

  }

  initData() {
    for (let i = 0; i <= 360; i++) {
      const t = i / 180 * Math.PI;
      const r = Math.sin(2 * t) * Math.cos(2 * t);
      this.data.push([r, i]);
    }
  }

  onOpenChange(openKeys: any) {
    const latestOpenKey = openKeys.find((key: any) => this.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys;
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
