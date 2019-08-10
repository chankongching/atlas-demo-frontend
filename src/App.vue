<template>
  <div id="app">
    <a-layout style="min-height: 100vh">
      <a-layout-header>
        <atlas-header></atlas-header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider theme="light">
          <atlas-navigation></atlas-navigation>
        </a-layout-sider>
        <a-layout-content>
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import AtlasHeader from '@/components/Header.vue';
import AtlasNavigation from '@/components/Navigation.vue';

@Component({
  components: {
    AtlasHeader,
    AtlasNavigation,
    ALayout: Ant.Layout,
    ALayoutHeader: Ant.Layout.Header,
    ALayoutSider: Ant.Layout.Sider,
    ALayoutContent: Ant.Layout.Content,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.ant-layout, .ant-layout-header, .ant-layout-sider {
  background-color: #F7F7F7;
}
.ant-layout-content {
  padding: 30px 50px 30px 20px;
}
.ant-layout-header {
  position: fixed;
  width: 100%;
  z-index: 1;
}
.ant-layout-has-sider {
  margin-top: 65px;
  background-color: #F7F7F7;
}
.ant-layout-sider {
  position: fixed;
}
.ant-layout-content {
  margin-left: 200px;
}
</style>
