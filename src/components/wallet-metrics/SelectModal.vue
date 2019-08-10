<template>
  <a-modal :visible="visible" width="70%" :destroyOnClose="true" @cancel.stop="handleCancel">
    <div class="modal-container">
      <!-- <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="Tab 1" key="1"><div>Content of Tab Pane 1</div></a-tab-pane>
      </a-tabs>-->
      <a-menu @click="modalHandleClick" :defaultSelectedKeys="['search']" mode="horizontal">
        <a-menu-item key="search">search</a-menu-item>
        <a-menu-item key="userSaved">User Saved</a-menu-item>
        <a-menu-item key="manualEntry">Manual Entry</a-menu-item>
        <a-menu-item key="upload">upload</a-menu-item>
      </a-menu>
      <div v-if="AMLTab === 'search'">
        <div class="flex-between" style="margin: 20px 0;">
          <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
          <a-select defaultValue="jack" style="width: 120px" @change="searchSorthandleChange">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </div>
        <a-row :gutter="20">
          <a-col :span="6">
            <div class="card-container" style="height: 380px; overflow: auto; padding: 0">
              <a-menu mode="vertical-right">
                <a-menu-item key="Binance">Binance</a-menu-item>
                <a-menu-item key="HUOBI">HUOBI</a-menu-item>
                <a-menu-item key="HUOBI1">HUOBI</a-menu-item>
                <a-menu-item key="HUOBI2">HUOBI</a-menu-item>
                <a-menu-item key="HUOBI3">HUOBI</a-menu-item>
                <a-menu-item key="HUOBI4">HUOBI</a-menu-item>
                <a-menu-item key="HUOBI5">HUOBI</a-menu-item>
              </a-menu>
            </div>
          </a-col>
          <a-col :span="18">
            <div class="card-container infinite-list">
              <div class="infinite-list-header">
                <a-row>
                  <a-col :span="4">Tag</a-col>
                  <a-col :span="12">ENTITY</a-col>
                  <a-col :span="4">NO. OF WALLET</a-col>
                  <a-col :span="4">SELECTED</a-col>
                </a-row>
              </div>
              <wm-table />
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-if="AMLTab === 'userSaved'">
        <div class="flex-between" style="margin: 20px 0;">
          <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
          <a-select defaultValue="jack" style="width: 120px" @change="searchSorthandleChange">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </div>
        <div class="card-container infinite-list">
          <div class="infinite-list-header">
            <a-row>
              <a-col :span="4">Tag</a-col>
              <a-col :span="12">ENTITY</a-col>
              <a-col :span="4">NO. OF WALLET</a-col>
              <a-col :span="4">SELECTED</a-col>
            </a-row>
          </div>
          <div class="infinite-list-container">
            <a-list
              :dataSource="listData"
              v-infinite-scroll="handleInfiniteOnLoad"
              :infinite-scroll-disabled="busy"
              :infinite-scroll-distance="10"
            >
              <a-list-item slot="renderItem" slot-scope="item, index" :key="index.toString()">
                <a-row style="display: flex; align-items: center;">
                  <a-col :span="4" style="display: flex; justify-content: center;">
                    <a-badge status="processing" style="display: flex; align-items: center;" />
                  </a-col>
                  <a-col :span="12">{{ item }}</a-col>
                  <a-col :span="4">col-6</a-col>
                  <a-col :span="4">
                    <a-checkbox></a-checkbox>
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
      <div v-if="AMLTab === 'manualEntry'">
        <a-input-search placeholder="input search text" />
      </div>
      <div v-if="AMLTab === 'upload'">
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="uploadHandleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">Drag and drop your CSV file here!</p>
        </a-upload-dragger>
      </div>
    </div>
    <template slot="footer">
      <div class="flex-between">
        <div>
          <p>selected</p>
          <!-- <a-tag closable @close="log">Tag 2</a-tag> -->
        </div>
        <a-button key="submit" type="primary">Submit</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Ant from "ant-design-vue";
import infiniteScroll from "vue-infinite-scroll";
import WmTable from "@/components/wallet-metrics/WmTable.vue";

@Component({
  components: {
    AMenu: Ant.Menu,
    AMenuItem: Ant.Menu.Item,
    ARow: Ant.Row,
    ACol: Ant.Col,
    ASelect: Ant.Select,
    ASelectOption: Ant.Select.Option,
    AInputSearch: Ant.Input.Search,
    AButton: Ant.Button,
    AList: Ant.List,
    AListItem: Ant.List.Item,
    ASpin: Ant.Spin,
    ABadge: Ant.Badge,
    ATabs: Ant.Tabs,
    ATabPane: Ant.Tabs.Pane,
    AModal: Ant.Modal,
    ACheckbox: Ant.Checkbox,
    ATag: Ant.Tag,
    AIcon: Ant.Icon,
    AUploadDragger: Ant.Upload.Dragger,
    WmTable
  },
  directives: {
    infiniteScroll
  }
})
export default class SelectModal extends Vue {
  // @PropSync("visibleModal", { type: Boolean, default: false })
  // visible!: Boolean;
  @Prop({ default: false })
  visibleModal!: Boolean;

  @Watch("visibleModal")
  onVisibleModal(val: Boolean, old: Boolean) {
    this.visible = val;
  }

  visible: Boolean = this.visibleModal;

  private AMLTab: string = "search";
  private loading: boolean = false;
  private busy: boolean = false;
  private listData = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires."
  ];

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
  handleCancel() {
    this.visible = false;
    console.log(this.visible);
  }
  modalHandleClick(e: any) {
    this.AMLTab = e.key;
  }
  onSearch(value: any) {
    // console.log(value);
  }
  searchSorthandleChange() {}
}
</script>
