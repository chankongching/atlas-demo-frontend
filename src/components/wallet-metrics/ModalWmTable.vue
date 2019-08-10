<template>
  <div class="card-container infinite-list">
    <div class="infinite-list-header">
      <a-row>
        <a-col :span="3"></a-col>
        <a-col :span="12">Entity</a-col>
        <a-col class="tc" :span="7">NO. OF WALLET</a-col>
        <a-col class="tc" :span="2">SCORE</a-col>
      </a-row>
    </div>
    <div class="infinite-list-container">
      <div class="infinite-list-container__box">
        <a-list
          :dataSource="listData"
          v-infinite-scroll="handleInfiniteOnLoad"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
        >
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-row>
              <a-col class="pl25" :span="3">
                <span class="tag-cricle"></span>
              </a-col>
              <a-col :span="12">{{ item.entity }}</a-col>
              <a-col class="tc" :span="7">{{item.wallet}}</a-col>
              <a-col class="tc" :span="2">
                <a-radio :name="'selected'" :value="item.id" />
              </a-col>
            </a-row>
          </a-list-item>
          <div v-if="loading && !busy" class="loading-container">
            <a-spin />
          </div>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Ant from "ant-design-vue";
import infiniteScroll from "vue-infinite-scroll";
import DataUtils from "@/utils/dataUtils.ts";
const DU = new DataUtils();
@Component({
  components: {
    ARow: Ant.Row,
    ACol: Ant.Col,
    AList: Ant.List,
    AListItem: Ant.List.Item,
    ARadio: Ant.Radio
  },
  directives: {
    infiniteScroll
  }
})
export default class ModalWmTable extends Vue {
  private listData: Array<
    SelectedTableObject
  > = DU.randomSelectedModalTableData(10);

  private loading: boolean = false;

  private busy: boolean = false;

  handleInfiniteOnLoad() {
    const data = this.listData;
    this.loading = true;
    if (data.length > 14) {
      this.busy = true;
      this.loading = false;
      return;
    }
    this.fetchData((res: any) => {
      this.listData = data.concat(DU.randomSelectedModalTableData(10));
      this.loading = false;
    });
  }

  fetchData(callback: any) {
    callback(["add befor", "add befor1", "add befor2"]);
  }
}
</script>
<style lang="scss" scoped>
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
    position: relative;
    padding: 0 20px 20px;
  }
  .infinite-list-container__box {
    height: 300px;
    overflow: auto;
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
.pl25 {
  padding-left: 25px;
}
</style>
