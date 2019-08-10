<template>
  <div>
    <a-menu
      @click="handleClick"
      :defaultSelectedKeys="[menuDefault]"
      mode="inline"
    >
      <a-menu-item key="Home">
        <a-icon type="home" />
        Home
      </a-menu-item>
      <a-menu-item key="AML">
        <a-icon type="bar-chart" />
        AML
      </a-menu-item>
      <a-menu-item key="BusinessIntel">
        <a-icon type="line-chart" />
        Business Intel
      </a-menu-item>
      <!-- <a-menu-item key="WalletMetrics">
        <a-icon type="line-chart" />
        Wallet Metrics
      </a-menu-item> -->
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ant from 'ant-design-vue';

@Component({
  components: {
    AMenu: Ant.Menu,
    AMenuItem: Ant.Menu.Item,
    AIcon: Ant.Icon,
  },
})
export default class Navigation extends Vue {
  private menuDefault: string = 'Home';

  handleClick(e: object) {
    this.$router.push({
      name: (e as any).key,
    });
  }
}
</script>
<style lang="scss" scoped>
  .ant-menu.ant-menu-root {
    background-color: #F7F7F7;
    border: none;
  }
  .ant-menu-vertical .ant-menu-item:after, .ant-menu-vertical-left .ant-menu-item:after, .ant-menu-vertical-right .ant-menu-item:after, .ant-menu-inline .ant-menu-item:after {
    left: 0;
    right: 100%;
  }
  .ant-menu-item.ant-menu-item-selected {
    background-color: transparent;
  }
</style>
