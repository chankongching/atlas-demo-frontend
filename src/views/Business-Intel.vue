<template>
  <div class="card-container">
    <div class="flex-between" style="padding: 20px;">
      <h1>Metrics Comparison</h1>
      <a-icon type="edit" />
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">selected</h3>
      <div class="selected-container">
        <div class="selected-item">
          <div class="selected-item-top">
            <h3 class="selected-item-name">Binance</h3>
            <h5 class="selected-item-type">eXCHANGE</h5>
            <p class="selected-item-source">User uploaded wallet</p>
          </div>
          <div class="selected-item-bottom">
            <h2 class="selected-item-balance">1,434,394</h2>
            <h6 class="selected-item-wallet">wallets</h6>
          </div>
        </div>
        <div class="selected-item">
          <div class="selected-item-top">
            <h3 class="selected-item-name">Binance</h3>
            <h5 class="selected-item-type">eXCHANGE</h5>
            <p class="selected-item-source">User uploaded wallet</p>
          </div>
          <div class="selected-item-bottom">
            <h2 class="selected-item-balance">1,434,394</h2>
            <h6 class="selected-item-wallet">wallets</h6>
          </div>
        </div>
        <div class="selected-item add-selected-item">
          <a-icon type="plus" />
        </div>
      </div>
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">Exposure</h3>
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">IN</h3>
      <div class="exposure-chart-container">
        <exposure-chart :data="exposureChartData"/>
        <exposure-chart :data="exposureChartData"/>
        <exposure-chart :data="exposureChartData"/>
        <exposure-chart :data="[]"/>
      </div>
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">OUT</h3>
      <div class="exposure-chart-container">
        <exposure-chart :data="exposureChartData"/>
        <exposure-chart :data="exposureChartData"/>
        <exposure-chart :data="exposureChartData"/>
        <exposure-chart :data="[]"/>
      </div>
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">Fund distrubution</h3>
      <div>
        <v-chart :options="fundDistrubution" autoresize/>
      </div>
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">User growth</h3>
    </div>
    <div style="padding: 0 20px;">
      <h3 class="item-title">Active Users Over time</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import ExposureChart from '@/components/ExposureChart.vue'
import 'echarts/lib/chart/bar'

@Component({
  components: {
    ExposureChart,
    AIcon: Ant.Icon,
  },
})
export default class BusinessInterPage extends Vue {
  private exposureChartData = [
    {name: 'a1', value: 20},
    {name: 'a2', value: 14},
    {name: 'a3', value: 50},
    {name: 'a4', value: 30},
    {name: 'a5', value: 5}
  ];
  private fundDistrubution = {
      tooltip: {},
      dataset: {
          source: [
              ['product', '2015', '2016', '2017'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
  };
}
</script>
<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
.item-title {
  color: #1F262A;
  font-size: 28px;
  font-weight: 200;
}
.selected-container {
  display: flex;
  & .selected-item:last-child  {
    margin-right: 0;
  }
  .selected-item {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 20px 2px #0000000a;
    padding: 10px;
    border-bottom: 10px solid #256BCE;
    margin-right: 20px;
    & * {
      margin: 0;
      padding: 0;
    }
    &.add-selected-item {
      box-shadow: none;
      border: 1px dashed #A6A8AA;
      display: flex;
      justify-content: center;
      align-items: center;
      .anticon {
        font-size: 30px;
        font-weight: 200;
      }
    }
    .selected-item-top {
      .selected-item-name {
        color: #256BCE;
        font-weight: 600;
        font-size: 30px;
      }
      .selected-item-type {
        color: #A6A8AA;
        font-size: 18px;
        font-weight: 400;
      }
      .selected-item-source {
        font-size: 16px;
        color: #1F262A;
        font-weight: 200;
      }
    }
    .selected-item-bottom {
      .selected-item-balance {
        font-size: 32px;
        color: #256BCE;
        font-weight: 600;
        text-align: right;
      }
      .selected-item-wallet {
        font-weight: 400;
        font-size: 16px;
        color: #1F262A;
        text-align: right;
      }
    }
  }
}
.exposure-chart-container {
  display: flex;
  .exposure-chart-item {
    margin-right: 20px;
  }
  & .exposure-chart-item:last-child  {
    margin-right: 0;
  }
}
</style>

