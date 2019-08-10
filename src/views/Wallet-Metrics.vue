<template>
  <div class="card-container">
    <div class="card-header">
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
            <select-item
              :isShowClose="isShowClose"
              :data="selected[0]"
              :index="0"
              @change-data="changeData"
              @open-modal="selectItemOpenModal"
            />
            <select-item
              :isShowClose="isShowClose"
              :data="selected[1]"
              :index="1"
              @change-data="changeData"
              @open-modal="selectItemOpenModal"
            />
            <select-item
              :isShowClose="isShowClose"
              :data="selected[2]"
              :index="2"
              @change-data="changeData"
              @open-modal="selectItemOpenModal"
            />
            <select-item
              :isShowClose="isShowClose"
              :data="selected[3]"
              :index="3"
              @change-data="changeData"
              @open-modal="selectItemOpenModal"
            />
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
            <exposure-item :data="exposure1" :selected="selected[0]" :type="'in'" :index="0" @select-exposure="exposure1Handler" />
            <exposure-item :data="exposure1" :selected="selected[1]" :type="'in'" :index="1" @select-exposure="exposure1Handler" />
            <exposure-item :data="exposure1" :selected="selected[2]" :type="'in'" :index="2" @select-exposure="exposure1Handler" />
            <exposure-item :data="exposure1" :selected="selected[3]" :type="'in'" :index="3" @select-exposure="exposure1Handler" />
          </div>
          <in-out-panel :arrowIndex="arrowIndex1" :showPanel="intoPanel1" />
          <div class="e-bold">OUT</div>
          <div class="selected-flex ptb20">
            <exposure-item :data="exposure2" :selected="selected[0]" :type="'out'" :index="0" @select-exposure="exposure2Handler" />
            <exposure-item :data="exposure2" :selected="selected[1]" :type="'out'" :index="1" @select-exposure="exposure2Handler" />
            <exposure-item :data="exposure2" :selected="selected[2]" :type="'out'" :index="2" @select-exposure="exposure2Handler" />
            <exposure-item :data="exposure2" :selected="selected[3]" :type="'out'" :index="3" @select-exposure="exposure2Handler" />
          </div>
          <in-out-panel :arrowIndex="arrowIndex2" :showPanel="intoPanel2" />
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
            <div class="switch-tools">
              <span>Absolute</span>
              <a-switch />
              <span>Relative</span>
            </div>
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
            <div class="switch-tools">
              <span>Absolute</span>
              <a-switch />
              <span>Relative</span>
            </div>
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
    <select-modal :visibleModal="modalShow" @btn-submit="saveSelected" @modal-close="closeModal" />
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
import SelectModal from "@/components/wallet-metrics/SelectModal.vue";

import "@/utils/interfaceObject";
import Colors from "../utils/colors";

const _C = new Colors();

@Component({
  components: {
    AIcon: Ant.Icon,
    ASelect: Ant.Select,
    ASelectOption: Ant.Select.Option,
    ASwitch: Ant.Switch,
    AModal: Ant.Modal,
    SelectItem,
    ExposureItem,
    FdBar,
    UgLine,
    InOutPanel,
    SelectModal
  }
})
export default class WalletMetrics extends Vue {
  isShowClose: Boolean = false;

  intoPanel1: Boolean = false;

  intoPanel2: Boolean = false;

  modalShow: Boolean = false;

  arrowIndex1: Number = 0;

  arrowIndex2: Number = 0;

  selectItemIndex: Number = 0;

  selected: Array<selectedObject> = [Object(), Object(), Object(), Object()];

  exposure1: Array<Array<String>> = [
    [],
    [],
    [],
    []
    // ["#107F77", "#D6AAAA", "#ABD194", "#F4C355", "#75113E"],
    // ["#f28048", "#d0a0a0", "#4ab5ac", "#c83618", "#9c9b46"],
    // ["#a1cb89", "#ac2e70", "#11746c", "#6a1236", "#d0a0a1"]
  ];

  exposure2: Array<Array<String>> = [
    [],
    [],
    [],
    []
    // ["#11746c", "#c83617", "#f2bb4a", "#f38148", "#ac2e71"],
    // ["#d1a0a1", "#6a1236", "#4ab5ad", "#9b9b46", "#f6d2b5"],
    // ["#f3bb4b", "#6a1236", "#4ab5ad", "#c83618", "#f6d2b4"]
  ];

  saveSelected(item: any) {
    this.selected[this.selectItemIndex] = item.item;
    this.exposure1[this.selectItemIndex] = _C.inColor;
    this.exposure2[this.selectItemIndex] = _C.outColor;

    this.updateView(this.selected);
    this.updateView(this.exposure1);
    this.updateView(this.exposure2);
  }

  updateView(item: Array<any>, num: Number = 4) {
    if (item.length > num) {
      item.unshift();
    } else {
      item.push(Object());
    }
  }

  closeModal(b: boolean) {
    this.modalShow = b;
  }

  exposure1Handler(item: any) {
    if (this.intoPanel1 && this.arrowIndex1 != item.index) {
      this.arrowIndex1 = item.index;
    } else {
      this.intoPanel1 = !this.intoPanel1;
      this.arrowIndex1 = item.index;
    }
  }

  exposure2Handler(item: any) {
    if (this.intoPanel2 && this.arrowIndex2 != item.index) {
      this.arrowIndex2 = item.index;
    } else {
      this.intoPanel2 = !this.intoPanel2;
      this.arrowIndex2 = item.index;
    }
  }

  selectItemOpenModal(item: selectClickObject) {
    if (item.show) {
      this.modalShow = item.show;
      this.selectItemIndex = item.index || 0;
    }
  }
  changeData(item: any) {
    this.selected[item.index] = {};
    this.updateView(this.selected);
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
      font-family: "proxima-nova", "sans-serif";
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
.switch-tools {
  span {
    font-size: 10px;
    font-weight: bold;
    color: #1f262a;
    padding: 0 10px;
  }
  .ant-switch-checked {
    background-color: #256bce;
  }
}
</style>
