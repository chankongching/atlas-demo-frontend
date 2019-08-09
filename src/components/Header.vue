<template>
  <div class="atlas-header">
    <div>
      <div class="header-logo">
        <img src="../assets/images/atlas_logo.svg" alt="Atlas">
      </div>
      <div class="header-search">
        <a-input-search
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
      </div>
    </div>
    <div class="header-user">
      <a-avatar style="backgroundColor:#256BCE" icon="user" />
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          John Doe <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">User Infomation</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ant from 'ant-design-vue';

@Component({
  components: {
    AInputSearch: Ant.Input.Search,
    AAvatar: Ant.Avatar,
    ADropdown: Ant.Dropdown,
    AMenu: Ant.Menu,
    AMenuItem: Ant.Menu.Item,
    AIcon: Ant.Icon
  },
})
export default class Header extends Vue {
  onSearch (value: any) {
    console.log(value)
  };
}
</script>
<style lang="scss" scoped>
  .atlas-header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .header-logo {
      width: 170px;
      overflow: hidden;
      text-align: left;
      float: left;
      img {
        width: 98px;
        height: 100px;
        margin-top: -15px;
      }
    }
    .header-search {
      float: left;
    }
  }
</style>

