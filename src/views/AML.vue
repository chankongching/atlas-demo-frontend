<template>
  <div>
    <a-menu
      @click="handleClick"
      :defaultSelectedKeys="['Binance']"
      mode="horizontal"
    >
      <a-menu-item key="Binance">
        Binance
      </a-menu-item>
      <a-menu-item key="HUOBI">
        HUOBI
      </a-menu-item>
    </a-menu>
    <div class="body-content">
      <div class="currency-info">
        <a-row :gutter="50">
          <a-col :span="18">
            <h1 class="currency-info-name">Binance</h1>
            <h2 class="currency-info-full-name">eXCHANGE</h2>
            <h3 class="currency-info-description">1,434,394 WALLETS</h3>
            <a-row :gutter="20">
              <a-col :span="12">
                <ul class="currency-info-list">
                  <li><h5>Balance</h5><span>34</span></li>
                  <li><h5>Sent</h5><span>4344</span></li>
                  <li><h5>Received</h5><span>3435</span></li>
                  <li><h5>Total Fees</h5><span>235345</span></li>
                </ul>
              </a-col>
              <a-col :span="12">
                 <ul class="currency-info-list">
                    <li><h5>Transfers</h5><span>23423</span></li>
                    <li><h5>Withdrawals</h5><span>634623</span></li>
                    <li><h5>Deposits</h5><span>3453</span></li>
                    <li><h5>Addresses</h5><span>34634</span></li>
                  </ul>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <h3>Risk Scores</h3>
            <div class="currency-info-card flex-between">
              <span>IN</span>
              <strong>48</strong>
            </div>
            <div class="currency-info-card flex-between">
              <span>OUT</span>
              <strong>59</strong>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="exposure">
        <a-row :gutter="20">
          <a-col :span="8">
            <a-menu
              @click="exchangeSwitch"
              :defaultSelectedKeys="['IN']"
              mode="horizontal"
            >
              <a-menu-item key="IN">
                IN
              </a-menu-item>
              <a-menu-item key="OUT">
                OUT
              </a-menu-item>
            </a-menu>
            <h3 class="item-title">exposure</h3>
            <!-- <div class="card-container">
              No section clicked
            </div> -->
            <div class="card-container flex-between">
              <div class="section-exposure">
                <a-badge status="processing" style="display: flex; align-items: center;" />
                <div>
                  <h6>exchange</h6>
                  <p>15.343%</p>
                </div>
              </div>
              <strong style="display: flex; align-items: center;">$4353.445</strong>
            </div>
            <div class="exposure-pie-container">
              <v-chart :options="exposurePieData" autoresize/>
            </div>
          </a-col>
          <a-col :span="16">
            <div class="search-container">
              <p>Sort by</p>
              <a-select :defaultValue="exposureSort" style="width: 120px; margin-right: 20px;" v-model="exposureSort">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
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
                    :infinite-scroll-distance="10">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                      <a-row style="display: flex; align-items: center;">
                        <a-col :span="4" style="display: flex; justify-content: center;"><a-badge status="processing" style="display: flex; align-items: center;" /></a-col>
                        <a-col :span="12">{{ item }}</a-col>
                        <a-col :span="4">col-6</a-col>
                        <a-col :span="4">col-6</a-col>
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
      <div class="historyOfProvidenceOfFunds-container">
        <h3 class="item-title">History of providence of funds</h3>
        <div class="historyDashbord-container">
          <v-chart :options="historyLineData" autoresize/>
        </div>
      </div>
      <div class="riskScoreOverTime-container">
        <h3 class="item-title">Risk Score Over time</h3>
        <div class="riskScoreOverTimeDashbord-container">
          <v-chart :options="riskScoreOverTimeData" autoresize/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import infiniteScroll from 'vue-infinite-scroll';

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
    ABadge: Ant.Badge
  },
  directives: {
    infiniteScroll
  }
})
export default class AML extends Vue {
  private exposurePieData: object = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name:'Exposure',
        type:'pie',
        selectedMode: 'single',
        radius: [0, '50%'],
        data:[
          {value:335, name:'darknet', selected:true},
          {value:679, name:'exchange'},
          {value:876, name:'p2p'},
          {value:1548, name:'sjfkd'}
        ]
      }, 
    ]
  };
  private historyLineData ={
    title: {
      // subtext: 'History of providence of funds',
      // subtextStyle: {
      //   fontSize: 24,
      // },
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            name: 'Time',
            data : ['Jan 2014', 'Jun 2014', 'Jan 2015', 'Jun 2015', 'Jan 2016', 'Jun 2016', 'Jan 2017', 'Jun 2017']
        }
    ],
    yAxis : [
        {
          type : 'value',
          name: '%',
          boundaryGap : false,
          data : [0, 20, 40, 60, 80, 100]
        }
    ],
    series : [
        {
            name:'Exchange',
            type:'line',
            stack: 'Total',
            areaStyle: {},
            data:[24, 10, 15, 30, 50, 70, 40, 45]
        },
        {
            name:'P2P',
            type:'line',
            stack: 'Total',
            areaStyle: {},
            data:[34, 40, 65, 30, 20, 15, 30, 25]
        },
        {
            name:'transfer',
            type:'line',
            stack: 'Total',
            areaStyle: {},
            data:[60, 20, 30, 40, 60, 50, 40, 55]
        },
        {
            name:'Shopping',
            type:'line',
            stack: 'Total',
            areaStyle: {normal: {}},
            data:[40, 20, 45, 50, 40, 20, 30, 55]
        },
        {
            name:'OUT',
            type:'line',
            stack: 'Total',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[14, 40, 35, 10, 80, 30, 60, 25]
        }
    ]
  };
  private riskScoreOverTimeData = {
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['Jan 2014', 'Jun 2014', 'Jan 2015', 'Jun 2015', 'Jan 2016', 'Jun 2016', 'Jan 2017', 'Jun 2017'],
            name: 'Time'
        }
    ],
    yAxis : [
        {
            type : 'value',
            name: 'Score'
        }
    ],
    series : [
        {
            name:'Score',
            type:'line',
            stack: 'Total',
            data:[24, 10, 15, 30, 50, 70, 40, 45]
        },
    ]
  };
  private listData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  private loading: boolean = false;
  private busy: boolean = false;
  private exposureSort: string = 'jack';
  handleClick (e: object) {
    console.log((e as any).key);
  };
  exchangeSwitch (e: object) {
    console.log((e as any).key);
  };
  handleInfiniteOnLoad  () {
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
    })
  };
  fetchData (callback:any) {
    callback(['add befor','add befor1','add befor2']);
  };
  onSearch (value: any) {
    console.log(value)
  };
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
    color: #1F262A;
    font-size: 28px;
    font-weight: 200;
  }
  .currency-info {
    border-bottom: 1px solid #ddd;
    .currency-info-name {
      color: #256BCE;
      font-weight: 600;
      font-size: 48px;
      margin: 0;
      line-height: 46px;
    }
    .currency-info-full-name {
      color: #A6A8AA;
      font-size: 24px;
      font-weight: 600;
      padding: 0;
      margin: 5px 0;
      line-height: 22px;
    }
    .currency-info-description {
      color: #1F262A;
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
        color: #1F262A;
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
      color: #256BCE;
      h3, h6 {
        color: #256BCE;
        margin: 0;
      }
      p {
        color: #1F262A;
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
      display: block!important;
      .ant-row {
        width: 100%;
      }
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
</style>

