<template>
  <div class="exposure-panel-warp" v-if="showPanel">
    <div class="flex-row">
      <div class="flex-item" :class="{'visible':arrowIndex === 0}">
        <div class="exposure-panel__arrow"></div>
      </div>
      <div class="flex-item" :class="{'visible':arrowIndex === 1}">
        <div class="exposure-panel__arrow"></div>
      </div>
      <div class="flex-item" :class="{'visible':arrowIndex === 2}">
        <div class="exposure-panel__arrow"></div>
      </div>
      <div class="flex-item" :class="{'visible':arrowIndex === 3}">
        <div class="exposure-panel__arrow"></div>
      </div>
    </div>
    <div class="exposure-panel-row clearfix">
      <div class="pie-panel">
        <div class="pie-panel__title">BTC</div>
        <div class="pie-panel__tag">IN</div>
        <div class="pie-panel__sub">EXPOSURE</div>
        <div class="pie-panel__select">No Section Clicked</div>
        <ex-pie />
      </div>
      <div class="table-panel">
        <div class="table-search-panel">
          <div class="table-select">
            <div class="select-label">Sort by</div>
            <a-select defalutValue="Relative" class="my-select">
              <a-select-option value="Relative">Relative</a-select-option>
            </a-select>
          </div>
          <div class="table-search">
            <a-input-search placeholder="search" class="my-search" />
          </div>
        </div>
        <wm-table />
      </div>
    </div>
    <div class="exposure-panel-row mt20">
      <div class="card-item-warp">
        <div class="card-item__header">
          <h2>HISTORY OF PROVIDENCE OF FUNDS</h2>
        </div>
        <div class="card-item__cont">
          <area-line canvas-id="history-of-providence-of-funds" />
          <div class="cahrt-title">Time</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Ant from "ant-design-vue";
import ExPie from "@/components/wallet-metrics/ExPie.vue";
import UgLine from "@/components/wallet-metrics/UgLine.vue";
import AreaLine from "@/components/wallet-metrics/AreaLine.vue";
import WmTable from "@/components/wallet-metrics/WmTable.vue";

@Component({
  components: {
    AInputSearch: Ant.Input.Search,
    AIcon: Ant.Icon,
    ASelect: Ant.Select,
    ASelectOption: Ant.Select.Option,
    ExPie,
    UgLine,
    AreaLine,
    WmTable
  }
})
export default class InOutPanel extends Vue {
  @Prop({ default: 0 })
  arrowIndex?: Number;

  @Prop()
  showPanel: Boolean = false;

  mounted() {
    console.log(this.arrowIndex);
  }
}
</script>
<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}
.pl25 {
  padding-left: 25px;
}
.tc {
  text-align: center;
}
.exposure-panel-warp {
  position: relative;
  background-color: rgba(210, 225, 245, 0.3);
  padding: 40px 40px;
  margin: 0 -40px 20px;
}
.exposure-panel__arrow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translate(-50%, 0);
  display: inline-block;
  border-color: rgba(210, 225, 245, 0.3);
  border-style: solid;
  border-width: 20px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  .flex-item {
    width: 200px;
    background-color: #333;
    position: relative;
    opacity: 0;
    &.visible {
      opacity: 1;
    }
  }
}
.pie-panel {
  width: 250px;
  float: left;
  &__title {
    color: #256bce;
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 5px;
  }
  &__tag {
    color: #a6a8aa;
    font-size: 14px;
    font-weight: bolder;
    margin-bottom: 5px;
  }
  &__sub {
    color: #1f262a;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 8px;
  }
  &__select {
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding: 10px;
    color: #a6a8aa;
  }
}
.table-panel {
  margin-left: 270px;
  .table-select {
    display: inline-block;
    width: 160px;
    margin-right: 20px;
  }
  .table-search-panel {
    margin-bottom: 20px;
  }
  .table-search {
    display: inline-block;
    width: 300px;
  }
  .my-select {
    width: 100%;
  }
  .my-search {
    width: 100%;
    input.ant-input {
      border-width: 0 0 1px 0 !important;
      background-color: transparent;
    }
  }
  .table-cont-panel {
    height: 250px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin-bottom: 20px;
  }
}
.exposure-panel-row {
  .card-item__header {
    h2 {
      font-family: "proxima-nova", "sans-serif";
      font-size: 14px;
      font-weight: 400;
      color: rgba(31, 38, 42, 1);
    }
  }
}
.mt20 {
  margin-top: 20px;
}
.cahrt-title {
  font-size: 14px;
  font-weight: bolder;
  color: rgba(31, 38, 42, 1);
  text-align: right;
  margin-bottom: 30px;
}
</style>
