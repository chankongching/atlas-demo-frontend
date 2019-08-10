<template>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import infiniteScroll from 'vue-infinite-scroll';

@Component({
  components: {
    ARow: Ant.Row,
    ACol: Ant.Col,
    AList: Ant.List,
    AListItem: Ant.List.Item,
  },
  directives: {
    infiniteScroll,
  },
})
export default class WmTable extends Vue {
  private listData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
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
    callback(['add befor', 'add befor1', 'add befor2']);
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
</style>
