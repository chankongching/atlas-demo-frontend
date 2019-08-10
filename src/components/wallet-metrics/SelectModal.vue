<template>
  <a-modal :visible="visible" width="70%" :destroyOnClose="true" @cancel.stop="handleCancel">
    <div class="modal-container">
      <div class="modal-search-panel flex-bt">
        <div class="table-search">
          <a-input-search placeholder="Search for entity" class="my-search" />
        </div>
        <div class="table-select">
          <div class="select-label">Sort by</div>
          <a-select defalutValue="Relative" class="my-select">
            <a-select-option value="Relative">Relative</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="modal-table-panel">
        <modal-wm-table />
      </div>
    </div>
    <template slot="footer">
      <div class="modal-select-footer">
        <a-button key="submit" type="primary" class="bi-submit-buttom">
          Add Selected Wallets
          <a-icon type="plus" class="plus-icon" />
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import infiniteScroll from 'vue-infinite-scroll';
import ModalWmTable from "@/components/wallet-metrics/ModalWmTable.vue";
import DataUtils from '@/utils/dataUtils.ts';

const DU = new DataUtils();

@Component({
  components: {
    ASelect: Ant.Select,
    ASelectOption: Ant.Select.Option,
    AInputSearch: Ant.Input.Search,
    AButton: Ant.Button,
    AList: Ant.List,
    AListItem: Ant.List.Item,
    ASpin: Ant.Spin,
    ABadge: Ant.Badge,
    AModal: Ant.Modal,
    AIcon: Ant.Icon,
    ACheckbox: Ant.Checkbox,
    ARadio: Ant.Radio,
    ModalWmTable
  },
  directives: {
    infiniteScroll,
  },
})
export default class SelectModal extends Vue {
  @Prop({ default: true })
  visibleModal!: Boolean;

  @Watch('visibleModal')
  onVisibleModal(val: Boolean, old: Boolean) {
    this.visible = val;
  }

  visible: Boolean = this.visibleModal;

  handleCancel() {
    this.visible = false;
    console.log(this.visible);
  }
}
</script>
<style lang="scss" scoped>
.modal-container {
  padding-top: 40px;
  .ant-modal-footer {
    border-top: 0;
  }
}
.flex-bt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  .table-search {
    width: 40%;
    min-width: 200px;
  }
  .table-select {
    width: 20%;
    min-width: 160px;
    .my-select {
      width: 100%;
    }
  }
}
.modal-table-panel {
  padding-top: 30px;
  .card-container {
    padding: 0;
  }
  .infinite-list-container {
    padding: 0 10px;
  }
  .ant-list-split .ant-list-item {
    border: 0;
  }
}
</style>
