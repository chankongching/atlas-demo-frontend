<template>
  <div class="exposure-panel-warp">
    <div class="flex-row">
      <div class="flex-item">
        <div class="exposure-panel__arrow"></div>
      </div>
      <div class="flex-item">
        <div class="exposure-panel__arrow"></div>
      </div>
      <div class="flex-item">
        <div class="exposure-panel__arrow"></div>
      </div>
      <div class="flex-item">
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
        <div class="card-container infinite-list">
          <div class="infinite-list-header">
            <a-row>
              <a-col :span="4">SOURCE</a-col>
              <a-col :span="14">FROM</a-col>
              <a-col class="tc" :span="3">AMOUNT</a-col>
              <a-col class="tc" :span="3">SCORE</a-col>
            </a-row>
          </div>
          <div class="infinite-list-container">
            <a-list
              :dataSource="listData"
              v-infinite-scroll="handleInfiniteOnLoad"
              :infinite-scroll-disabled="busy"
              :infinite-scroll-distance="10"
            >
              <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                <a-row>
                  <a-col class="pl25" :span="4">
                    <span class="tag-cricle"></span>
                  </a-col>
                  <a-col :span="14">{{ item }}</a-col>
                  <a-col class="tc" :span="3">col-6</a-col>
                  <a-col class="tc" :span="3">col-6</a-col>
                </a-row>
              </a-list-item>
              <div v-if="loading && !busy" class="loading-container">
                <a-spin />
              </div>
            </a-list>
          </div>
        </div>
      </div>
    </div>
    <div class="exposure-panel-row mt20">
      <div class="card-item-warp">
        <div class="card-item__header">
          <h2>HISTORY OF PROVIDENCE OF FUNDS</h2>
        </div>
        <div class="card-item__cont">
          <ug-line canvas-id="active-users-over-time" />
          <div class="cahrt-title">Time</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Ant from "ant-design-vue";
import ExPie from "@/components/wallet-metrics/ExPie.vue";
import infiniteScroll from "vue-infinite-scroll";
import UgLine from "@/components/wallet-metrics/UgLine.vue";

@Component({
  components: {
    AInputSearch: Ant.Input.Search,
    AIcon: Ant.Icon,
    ASelect: Ant.Select,
    ASelectOption: Ant.Select.Option,
    ARow: Ant.Row,
    ACol: Ant.Col,
    AList: Ant.List,
    AListItem: Ant.List.Item,
    ExPie,
    UgLine
  },
  directives: {
    infiniteScroll
  }
})
export default class InOutPanel extends Vue {
  private listData = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires."
  ];
  private loading: boolean = false;
  private busy: boolean = false;

  handleInfiniteOnLoad() {
    const data = this.listData;
    this.loading = true;
    if (data.length > 14) {
      // this.$message.warning('Infinite List loaded all');
      this.busy = true;
      this.loading = false;
      return;
    }
    this.fetchData((res: any) => {
      this.listData = data.concat(res);
      this.loading = false;
    });
  }
  fetchData(callback: any) {
    callback(["add befor", "add befor1", "add befor2"]);
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
//@at-root
.card-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  .infinite-list {
    padding: 0;
  }
  .infinite-list-container {
    height: 300px;
    overflow: auto;
    position: relative;
    padding: 0 20px 20px;
  }
  .infinite-list-header {
    height: 60px;
    padding: 20px;
    box-shadow: 0 0 10px 2px #0000000a;
  }
  .loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
  .ant-list-item .ant-list-item-content {
    display: block !important;
    .ant-row {
      width: 100%;
    }
  }
}
.tag-cricle {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #256bce;
}
.exposure-panel-row {
  h2.card-item__header {
    font-size: 14px;
    font-weight: 400;
    color: rgba(31, 38, 42, 1);
  }
}
.mt20 {
  margin-top: 20px;
}
</style>

