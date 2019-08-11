<template>
  <div>
    <div>
      <a-menu
        v-model="current"
        @click="handleClick"
        mode="horizontal"
        style="display: inline-block;"
        v-for="(item  , index) in dataList"
        :key="index"
      >
        <a-menu-item :key="item.name">{{item.name}}</a-menu-item>
      </a-menu>
      <a-button icon="plus" @click="addTabButton"></a-button>
    </div>
    <!-- <div>
      <a-tabs defaultActiveKey="Binance" @change="tabsCallback">
        <a-tab-pane tab="Binance" key="Binance">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane tab="HUOBI" key="HUOBI">Content of Tab Pane 1</a-tab-pane>
        <a-button slot="tabBarExtraContent">Extra Action</a-button>
      </a-tabs>
    </div>-->
    <div class="body-content">
      <div class="currency-info">
        <a-row :gutter="50">
          <a-col :span="18">
            <h1 class="currency-info-name">{{datas.description}}</h1>
            <h2 class="currency-info-full-name">{{datas.address}}</h2>
            <h3 class="currency-info-description">{{datas.addresses}} WALLETS</h3>
            <a-row :gutter="20">
              <a-col :span="12">
                <ul class="currency-info-list">
                  <li>
                    <h5>Balance</h5>
                    <span>{{datas.balance}}</span>
                  </li>
                  <li>
                    <h5>Sent</h5>
                    <span>{{datas.sent}}</span>
                  </li>
                  <li>
                    <h5>Received</h5>
                    <span>{{datas.received}}</span>
                  </li>
                  <li>
                    <h5>Total Fees</h5>
                    <span>{{datas.totalfees}}</span>
                  </li>
                </ul>
              </a-col>
              <a-col :span="12">
                <ul class="currency-info-list">
                  <li>
                    <h5>Transfers</h5>
                    <span>{{datas.transfers}}</span>
                  </li>
                  <li>
                    <h5>Withdrawals</h5>
                    <span>{{datas.withdraws}}</span>
                  </li>
                  <li>
                    <h5>Deposits</h5>
                    <span>{{datas.deposits}}</span>
                  </li>
                  <li>
                    <h5>Addresses</h5>
                    <span>{{datas.addresses}}</span>
                  </li>
                </ul>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <h3>Risk Scores</h3>
            <div class="currency-info-card flex-between">
              <span>IN</span>
              <strong>{{datas.risk_score_in}}</strong>
            </div>
            <div class="currency-info-card flex-between">
              <span>OUT</span>
              <strong>{{datas.risk_score_out}}</strong>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="exposure">
        <a-row :gutter="20">
          <a-col :span="8">
            <a-menu @click="exchangeSwitch" :defaultSelectedKeys="['IN']" mode="horizontal">
              <a-menu-item key="IN">IN</a-menu-item>
              <a-menu-item key="OUT">OUT</a-menu-item>
            </a-menu>
            <h3 class="item-title">exposure</h3>
            <!-- <div class="card-container">
              No section clicked
            </div>-->
            <div class="card-container flex-between" v-if="selectedPieData.value">
              <div class="section-exposure">
                <span class="dot" v-bind:style="{ backgroundColor: bgColor, }"></span>
                <div>
                  <h6>{{selectedPieData.name}}</h6>
                  <p>{{selectedPieData.percent}}%</p>
                </div>
              </div>
              <strong style="display: flex; align-items: center;">₿{{selectedPieData.value}}</strong>
            </div>
            <div v-else class="card-container">No Setion Clicked</div>
            <div class="exposure-pie-container">
              <v-chart
                :options="exposurePieData"
                @pieselectchanged="pieselectchanged"
                autoresize
                @click="pieClick"
              />
            </div>
          </a-col>
          <a-col :span="16">
            <div class="search-container">
              <p>Sort by</p>
              <a-select
                :defaultValue="exposureSort"
                style="width: 120px; margin-right: 20px;"
                v-model="exposureSort"
              >
                <a-select-option value="source">Source</a-select-option>
                <a-select-option value="from">From</a-select-option>
                <a-select-option value="amount">Amount</a-select-option>
                <a-select-option value="score">Score</a-select-option>
              </a-select>
              <a-input-search
                placeholder="input search text"
                style="width: 200px"
                @search="onSearch"
              />
            </div>
            <div class="card-container infinite-list">
              <div class="infinite-list-header">
                <a-row>
                  <a-col :span="4">SOURCE</a-col>
                  <a-col :span="12">FROM</a-col>
                  <a-col :span="4">AMOUNT</a-col>
                  <a-col :span="4">SCORE</a-col>
                </a-row>
              </div>
              <div class="infinite-list-container">
                <a-list
                  :dataSource="listData"
                  v-infinite-scroll="handleInfiniteOnLoad"
                  :infinite-scroll-disabled="busy"
                  :infinite-scroll-distance="10"
                >
                  <a-list-item slot="renderItem" slot-scope="item" v-if="item.value > 0">
                    <a-row style="display: flex; align-items: center;">
                      <a-col :span="4" style="display: flex; justify-content: center;">
                        <span class="dot" v-bind:style="{ backgroundColor: item.bgColor, }"></span>
                      </a-col>
                      <a-col :span="12">{{ item.name }}</a-col>
                      <a-col :span="4">{{ item.value }}</a-col>
                      <a-col :span="4">{{ item.score }}</a-col>
                    </a-row>
                  </a-list-item>
                  <div v-if="loading && !busy" class="loading-container">
                    <a-spin />
                  </div>
                </a-list>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="historyOfProvidenceOfFunds-container" style="margin-top: 1vh;">
        <h3 class="item-title">History of providence of funds</h3>
        <div class="historyDashbord-container">
          <v-chart :options="historyLineData" autoresize />
        </div>
      </div>
      <div class="riskScoreOverTime-container">
        <h3 class="item-title">Risk Score Over time</h3>
        <div class="riskScoreOverTimeDashbord-container">
          <v-chart :options="riskScoreOverTimeData" autoresize />
        </div>
      </div>
    </div>
    <a-modal :visible="visible" width="70%" :destroyOnClose="true" @cancel="handleCancel">
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
            <a-input-search
              placeholder="input search text"
              style="width: 200px"
              @search="onSearch"
            />
            <a-select defaultValue="jack" style="width: 120px" @change="searchSorthandleChange">
              <a-select-option value="jack">Jack</a-select-option>
            </a-select>
          </div>
          <a-row :gutter="20">
            <a-col :span="6">
              <div class="card-container" style="height: 380px; overflow: auto; padding: 0">
                <a-menu mode="vertical-right" v-for="(item  , index) in dataList" :key="index">
                  <a-menu-item :key="item.name">{{item.name}}</a-menu-item>
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
                <div class="infinite-list-container">
                  <a-list
                    :dataSource="listData"
                    v-infinite-scroll="handleInfiniteOnLoad"
                    :infinite-scroll-disabled="busy"
                    :infinite-scroll-distance="10"
                  >
                    <a-list-item slot="renderItem" slot-scope="item">
                      <a-row style="display: flex; align-items: center;">
                        <a-col
                          :span="4"
                          style="display: flex; justify-content: flex-start; padding-left: 1vw;"
                        >
                          <span class="dot" v-bind:style="{ backgroundColor: item.bgColor, }"></span>
                        </a-col>
                        <a-col :span="12">{{ item.name }}</a-col>
                        <a-col :span="4">{{item.value}}</a-col>
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
            </a-col>
          </a-row>
        </div>
        <div v-if="AMLTab === 'userSaved'">
          <div class="flex-between" style="margin: 20px 0;">
            <a-input-search
              placeholder="input search text"
              style="width: 200px"
              @search="onSearch"
            />
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
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-row style="display: flex; align-items: center;">
                    <a-col
                      :span="4"
                      style="display: flex; justify-content: flex-start; padding-left: 1vw;"
                    >
                      <span class="dot" v-bind:style="{ backgroundColor: item.bgColor, }"></span>
                    </a-col>
                    <a-col :span="12">{{ item.name }}</a-col>
                    <a-col :span="4">{{ item.value }}</a-col>
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
            <!-- <p>selected</p>
            <a-tag closable @close="log">Tag 2</a-tag>-->
          </div>
          <a-button key="submit" type="primary">Submit</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Ant from "ant-design-vue";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import infiniteScroll from "vue-infinite-scroll";
import Axios from "axios";

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
    AUploadDragger: Ant.Upload.Dragger
  },
  directives: {
    infiniteScroll
  }
})
export default class AML extends Vue {
  private datas = {};

  private exposurePie = [];

  private exposurePieData: object = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name: "Exposure",
        type: "pie",
        selectedMode: "single",
        radius: [0, "50%"],
        data: []
      }
    ]
  };

  private selectedPieData = {
    name: "",
    value: null,
    percent: ""
  };

  private historyLineData = {
    title: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        name: "Time",
        data: [
          "Jan 2014",
          "Jun 2014",
          "Jan 2015",
          "Jun 2015",
          "Jan 2016",
          "Jun 2016",
          "Jan 2017",
          "Jun 2017"
        ]
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "₿",
        boundaryGap: false,
        data: [0, 20, 40, 60, 80, 100]
      }
    ],
    series: []
  };

  private riskScoreOverTimeData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    grid: {
      left: "3%",
      right: "6%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [
          "Jan 2014",
          "Jun 2014",
          "Jan 2015",
          "Jun 2015",
          "Jan 2016",
          "Jun 2016",
          "Jan 2017",
          "Jun 2017"
        ],
        name: "Time"
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "Score"
      }
    ],
    series: [
      {
        name: "Score",
        type: "line",
        stack: "Total",
        data: [24, 10, 15, 30, 50, 70, 40, 45]
      }
    ]
  };

  private listData = [];

  private loading: boolean = false;

  private busy: boolean = false;

  private exposureSort: string = "source";

  private visible: boolean = false;

  private AMLTab: string = "search";

  private defaultExchangeSelected: string = "IN";

  private colors = [
    {
      name: "DEX",
      color: "#A7C4EA"
    },
    {
      name: "scam",
      color: "#D6AAAA"
    },
    {
      name: "stolen funds",
      color: "#107F27"
    },
    {
      name: "high risk exchange",
      color: "#D96C5F"
    },
    {
      name: "darknet market",
      color: "#727580"
    },
    {
      name: "ransomware",
      color: "#54BDB6"
    },
    {
      name: "exchange",
      color: "#1e2fd7"
    },
    {
      name: "mixer",
      color: "#FFC7A7"
    },
    {
      name: "gambling",
      color: "#A5A550"
    },
    {
      name: "hosted wallet",
      color: "#F48C51"
    },
    {
      name: "merchant services",
      color: "#F4C355"
    },
    {
      name: "mining pool",
      color: "#ABD194"
    },
    {
      name: "other",
      color: "#A6A8AA"
    },
    {
      name: "unknown",
      color: "#D2D4D4"
    }
  ];
  private bgColor = "";

  private dataList = "";

  private current = ["Independent Wallet"];

  handleClick(e: object) {
    let key = (e as any).key;
    let data = {
      name: key
    };
    this.current[0] = key;
    Axios.post("http://127.0.0.1:3000/api/record", data)
      .then(res => {
        this.datas = res.data;
        // this.exposurePie = (this.datas as any).pie_data.in;
        (this.exposurePieData as any).series[0].data = (this
          .datas as any).pie_data.pieInData;
        //Map colors for categories
        this.mapColors(this.exposurePieData);
        if (this.defaultExchangeSelected === "IN") {
          this.listData = (this.datas as any).pie_data.inList;
          this.listData.forEach(record => {
            this.colors.forEach(currentColor => {
              if (
                record.color.toLowerCase() == currentColor.name.toLowerCase()
              ) {
                record.bgColor = currentColor.color;
              }
            });
          });
        } else {
          this.listData = (this.datas as any).pie_data.outList;
          this.listData = (this.datas as any).pie_data.outList;
          this.listData.forEach(record => {
            this.colors.forEach(currentColor => {
              if (
                record.color.toLowerCase() == currentColor.name.toLowerCase()
              ) {
                record.bgColor = currentColor.color;
              }
            });
          });
        }
        this.listData.sort(function(x, y) {
          return y.value - x.value;
        });
        this.riskScoreOverTimeData.xAxis[0].data = (this
          .datas as any).address_score_month;
        this.riskScoreOverTimeData.series[0].data = (this
          .datas as any).address_score_series;
        this.historyLineData.series = (this.datas as any).historyData;
      let timeList = [];
      this.datas.xAxisData.forEach(element => {
        let date = new Date(element * 1000);
        var month = date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();
        var formattedTime = month + " " + year;
        timeList.push(formattedTime);
      });
      this.historyLineData.xAxis[0].data = timeList;
      })
      .catch(err => {
        console.log(err);
      });
  }

  exchangeSwitch(e: object) {
    this.defaultExchangeSelected = (e as any).key;
    this.selectedPieData = {
      name: "",
      value: null,
      percent: ""
    };
    if (this.defaultExchangeSelected === "IN") {
      this.listData = (this.datas as any).pie_data.inList;
      this.listData.forEach(record => {
        this.colors.forEach(currentColor => {
          if (record.color.toLowerCase() == currentColor.name.toLowerCase()) {
            record.bgColor = currentColor.color;
          }
        });
      });
    } else {
      this.listData = (this.datas as any).pie_data.outList;
      this.listData.forEach(record => {
        this.colors.forEach(currentColor => {
          if (record.color.toLowerCase() == currentColor.name.toLowerCase()) {
            record.bgColor = currentColor.color;
          }
        });
      });
    }
    this.listData.sort(function(x, y) {
      return y.value - x.value;
    });
  }

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

  onSearch(value: any) {
    console.log(value);
  }

  tabsCallback(key: any) {
    console.log(key);
  }

  addTabButton() {
    this.visible = true;
  }

  handleCancel() {
    this.visible = false;
  }

  modalHandleClick(e: any) {
    this.AMLTab = e.key;
  }

  searchSorthandleChange() {}

  log(e: any) {
    console.log(e);
  }

  uploadHandleChange(info: any) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      this.$message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      this.$message.error(`${info.file.name} file upload failed.`);
    }
  }

  mapColors(data) {
    let colors = this.colors;

    function popRandomColor(name) {
      const currenTcolor = colors.find(function(color) {
        return color.name.toLowerCase() == name.toLowerCase();
      });
      if (currenTcolor) {
        return currenTcolor.color;
      }
    }
    data.series[0].data.forEach(element => {
      let bgColor = popRandomColor(element.name);
      element.itemStyle = { color: bgColor };
    });
  }
  fetchAMLDate() {
    // return Axios.get('https://www.easy-mock.com/mock/5d4e9bc64a02dc7a7d47475f/api/aml');
    return Axios.get("http://127.0.0.1:3000/api/aml");
  }

  fetchDataList() {
    return Axios.get("http://127.0.0.1:3000/api/list");
  }
  pieClick(params: any) {
    this.selectedPieData = params.data;
    this.selectedPieData.percent = params.percent;
    if (this.defaultExchangeSelected === "IN") {
      this.listData = (this.datas as any).pie_data.inCategory[params.name];
      this.listData.forEach(record => {
        this.colors.forEach(currentColor => {
          if (record.color.toLowerCase() == currentColor.name.toLowerCase()) {
            record.bgColor = currentColor.color;
            this.bgColor = currentColor.color;
          }
        });
      });
    } else {
      this.listData = (this.datas as any).pie_data.outCategory[params.name];
      this.listData.forEach(record => {
        this.colors.forEach(currentColor => {
          if (record.color.toLowerCase() == currentColor.name.toLowerCase()) {
            record.bgColor = currentColor.color;
            this.bgColor = currentColor.color;
          }
        });
      });
    }
    this.listData.sort(function(x, y) {
      return y.value - x.value;
    });
  }

  pieselectchanged(params: any) {
    // console.log(params)
    // if (params.selected[params.name]) {
    //   console.log('选中' + params.name);
    // } else {
    //   this.selectedPieData = {};
    //   console.log('未选中' + params.name);
    // }
  }

  created() {
    this.fetchDataList().then(res => {
      if (res.data.length > 0) {
        this.dataList = res.data;
        this.current[0] = res.data[0].name;
      }
    });
    this.fetchAMLDate().then(res => {
      this.datas = res.data;
      // this.exposurePie = (this.datas as any).pie_data.in;
      (this.exposurePieData as any).series[0].data = (this
        .datas as any).pie_data.pieInData;
      //Map colors for categories
      this.mapColors(this.exposurePieData);
      if (this.defaultExchangeSelected === "IN") {
        this.listData = (this.datas as any).pie_data.inList;
        this.listData.forEach(record => {
          this.colors.forEach(currentColor => {
            if (record.color.toLowerCase() == currentColor.name.toLowerCase()) {
              record.bgColor = currentColor.color;
            }
          });
        });
      } else {
        this.listData = (this.datas as any).pie_data.outList;
        this.listData = (this.datas as any).pie_data.outList;
        this.listData.forEach(record => {
          this.colors.forEach(currentColor => {
            if (record.color.toLowerCase() == currentColor.name.toLowerCase()) {
              record.bgColor = currentColor.color;
            }
          });
        });
      }
      this.listData.sort(function(x, y) {
        return y.value - x.value;
      });
      this.riskScoreOverTimeData.xAxis[0].data = (this
        .datas as any).address_score_month;
      this.riskScoreOverTimeData.series[0].data = (this
        .datas as any).address_score_series;
      // this.historyLineData.xAxis[0].data = this.datas.historyXAxis;
      this.historyLineData.series = (this.datas as any).historyData;
      let timeList = [];
      this.datas.xAxisData.forEach(element => {
        let date = new Date(element * 1000);
        var month = date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();
        var formattedTime = month + " " + year;
        timeList.push(formattedTime);
      });
      this.historyLineData.xAxis[0].data = timeList;
    });
  }
}
</script>
<style lang="scss" scoped>
.ant-menu-horizontal.ant-menu-root {
  background-color: transparent;
  border: none;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.card-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.body-content {
  @extend .card-container;
  margin-bottom: 20px;
  .echarts {
    width: 100%;
    height: 100%;
  }
  .item-title {
    color: #1f262a;
    font-size: 28px;
    font-weight: 200;
  }
  .currency-info {
    border-bottom: 1px solid #ddd;
    .currency-info-name {
      color: #256bce;
      font-weight: 600;
      font-size: 24px;
      margin: 0;
      line-height: 46px;
    }
    .currency-info-full-name {
      color: #a6a8aa;
      font-size: 24px;
      font-weight: 600;
      padding: 0;
      margin: 5px 0;
      line-height: 22px;
    }
    .currency-info-description {
      color: #1f262a;
      font-size: 28px;
      padding: 0;
      font-weight: 200;
      margin: 5px 0 10px 0;
      line-height: 26px;
    }
    .currency-info-list {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        color: #1f262a;
        font-size: 12px;
        h5 {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    .currency-info-card {
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 10px 2px #0000000a;
      border-radius: 8px;
      padding: 10px;
      margin-top: 10px;
      color: #256bce;
      h3,
      h6 {
        color: #256bce;
        margin: 0;
      }
      p {
        color: #1f262a;
        margin-bottom: 5px;
      }
    }
  }
  .exposure {
    .section-exposure {
      display: flex;
      p {
        margin: 0;
      }
    }
    .exposure-pie-container {
      width: 100%;
      height: 300px;
    }

    .search-container {
      padding: 20px 0;
    }
  }
  .historyOfProvidenceOfFunds-container {
    .historyDashbord-container {
      width: 100%;
      height: 300px;
    }
  }
  .riskScoreOverTime-container {
    .riskScoreOverTimeDashbord-container {
      width: 100%;
      height: 300px;
    }
  }
}
.infinite-list {
  padding: 0;
}
.infinite-list-container {
  height: 300px;
  overflow: auto;
  position: relative;
  padding: 0 20px;
}
.infinite-list-header {
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
.modal-container {
}
.dot {
  width: 8px;
  height: 8px;
  align-self: center;
  border-radius: 50px;
}
</style>
