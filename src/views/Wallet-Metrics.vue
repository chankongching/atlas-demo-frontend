<template>
  <div class="card-container">
    <div class="card-header">
      <div class="card-tools">
        <a class="tools-icon--pencil" href="javascript:;" @click="toggleCloseHandler()"></a>
      </div>
      <h1>Metrics Comparison</h1>
    </div>
    <div class="card-content">
      <!-- SELECTED -->
      <div class="card-item-warp">
        <div class="card-item__header">
          <h2>SELECTED</h2>
        </div>
        <div class="card-item__cont">
          <div class="selected-flex">
            <select-item :isShowClose="isShowClose" :data="selected[0]" :index="0" />
            <select-item :isShowClose="isShowClose" :data="selected[1]" :index="1" />
            <select-item :isShowClose="isShowClose" :data="selected[2]" :index="2" />
            <select-item :isShowClose="isShowClose" :data="selected[3]" :index="3" />
          </div>
        </div>
      </div>
      <!-- SELECTED end -->
      <!-- Exposure -->
      <div class="card-item-warp">
        <div class="card-item__header">
          <h2>Exposure</h2>
        </div>
        <div class="card-item__cont">
          <div class="e-bold">IN</div>
          <div class="selected-flex ptb20">
            <exposure-item :data="exposure1[0]" />
            <exposure-item :data="exposure1[1]" />
            <exposure-item :data="exposure1[2]" />
            <exposure-item :data="exposure1[3]" />
          </div>
          <in-out-panel />
          <div class="e-bold">OUT</div>
          <div class="selected-flex ptb20">
            <exposure-item :data="exposure2[0]" />
            <exposure-item :data="exposure2[1]" />
            <exposure-item :data="exposure2[2]" />
            <exposure-item :data="exposure2[3]" />
          </div>
        </div>
      </div>
      <!-- Exposure end -->
      <!-- Fund distrubution -->
      <div class="card-item-warp">
        <div class="card-item__header">
          <h2>FUND DISTRUBUTION</h2>
        </div>
        <div class="card-item__cont">
          <fd-bar canvas-id="fund-distrubution" />
          <div class="cahrt-title">Average BTC Balance</div>
        </div>
      </div>
      <!-- Fund distrubution end -->
      <!-- User growth -->
      <div class="card-item-warp">
        <div class="card-item__header">
          <div class="card-tools">
            <a-select defalutValue="Relative" class="my-select" size="small">
              <a-select-option value="Relative">Relative</a-select-option>
            </a-select>
          </div>
          <h2>USER GROWTH</h2>
        </div>
        <div class="card-item__cont">
          <ug-line canvas-id="user-growth" />
          <div class="cahrt-title">Time</div>
        </div>
      </div>
      <!-- User growth end -->
      <!-- Active Users Over time -->
      <div class="card-item-warp">
        <div class="card-item__header">
          <div class="card-tools">
            <a-select defalutValue="Relative" class="my-select" size="small">
              <a-select-option value="Relative">Relative</a-select-option>
            </a-select>
          </div>
          <h2>ACTIVE USERS OVER TIME</h2>
        </div>
        <div class="card-item__cont">
          <ug-line canvas-id="active-users-over-time" />
          <div class="cahrt-title">Time</div>
        </div>
      </div>
      <!-- Active Users Over time end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Ant from "ant-design-vue";
import SelectItem from "@/components/wallet-metrics/SelectItem.vue";
import ExposureItem from "@/components/wallet-metrics/ExposureItem.vue";
import FdBar from "@/components/wallet-metrics/FdBar.vue";
import UgLine from "@/components/wallet-metrics/UgLine.vue";
import InOutPanel from "@/components/wallet-metrics/InOutPanel.vue";

@Component({
  components: {
    AIcon: Ant.Icon,
    ASelect: Ant.Select,
    ASelectOption: Ant.Select.Option,
    AModal: Ant.Modal,
    SelectItem,
    ExposureItem,
    FdBar,
    UgLine,
    InOutPanel
  }
})
export default class WalletMetrics extends Vue {
  isShowClose: Boolean = false;

  selected: Array<Object> = [
    {
      title: "Binance",
      sub: "eXCHANGE",
      desc: "User uploaded wallet",
      value: "1,434,394",
      tag: "1,434,394"
    },
    {
      title: "Binance",
      sub: "eXCHANGE",
      desc: "User uploaded wallet",
      value: "1,434,394",
      tag: "1,434,394"
    },
    {
      title: "Binance",
      sub: "eXCHANGE",
      desc: "User uploaded wallet",
      value: "1,434,394",
      tag: "1,434,394"
    }
  ];
  exposure1: Array<Array<String>> = [
    ["#107F77", "#D6AAAA", "#ABD194", "#F4C355", "#75113E"],
    ["#f28048", "#d0a0a0", "#4ab5ac", "#c83618", "#9c9b46"],
    ["#a1cb89", "#ac2e70", "#11746c", "#6a1236", "#d0a0a1"]
  ];
  exposure2: Array<Array<String>> = [
    ["#11746c", "#c83617", "#f2bb4a", "#f38148", "#ac2e71"],
    ["#d1a0a1", "#6a1236", "#4ab5ad", "#9b9b46", "#f6d2b5"],
    ["#f3bb4b", "#6a1236", "#4ab5ad", "#c83618", "#f6d2b4"]
  ];
  toggleCloseHandler() {
    this.isShowClose = !this.isShowClose;
  }
}
</script>
<style lang="scss" scoped>
.card-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 40px;

  .card-header {
    h1 {
      margin: 0 0 5px;
      padding: 0;
      font-size: 24px;
      font-weight: bold;
      font-family: "Proxima Nova";
    }
  }
  .card-tools {
    float: right;
    padding-top: 15px;
    .tools-icon--pencil {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url("../assets/images/pencil.png") no-repeat center/contain;
    }
  }
  .card-item__header {
    h2 {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      color: rgba(31, 38, 42, 0.8);
    }
  }
  .card-item__cont {
    padding: 10px 0;
  }
  .e-bold {
    font-size: 14px;
    font-weight: bolder;
    color: rgba(166, 168, 170, 1);
    margin-bottom: 20px;
  }
}
.selected-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cahrt-title {
  font-size: 14px;
  font-weight: bolder;
  color: rgba(31, 38, 42, 1);
  text-align: right;
  margin-bottom: 30px;
}
.my-select {
  width: 120px;
}
.ptb20 {
  padding: 20px 0;
}
</style>

