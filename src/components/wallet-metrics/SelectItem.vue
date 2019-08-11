<template>
  <div
    class="selected-box"
    :style="{'backgroundColor': data.id == undefined ? '#FFF':colors[this.index]}"
    :class="{'nodata': data.id == undefined}"
    @click.stop="openModal"
  >
    <a-icon type="plus" class="plus-icon" />
    <a-icon
      type="close-circle"
      class="close-icon"
      :style="{'backgroundColor':colors[this.index]}"
      @click.stop="deleteHandler"
    />
    <div class="selected-item" v-if="data.id != undefined">
      <div class="selected-item__cont">
        <div class="selected-item__title" :style="{'color':colors[this.index]}">{{data.title}}</div>
        <div class="selected-item__sub">{{data.sub}}</div>
        <div class="selected-item__des">{{data.desc}}</div>
        <div class="selected-item__num">
          <div class="item__num" :style="{'color':colors[this.index]}">{{data.value}}</div>
          <div class="item__num_title">{{data.value_tag}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import Ant from 'ant-design-vue';
import Colors from '@/utils/colors.ts';

import '@/utils/interfaceObject';

@Component({
  components: {
    AIcon: Ant.Icon,
  },
})
export default class SelectItem extends Vue {
  @Prop()
  data!: selectedObject;

  @Prop({ default: false })
  isShowClose!: Boolean;

  @Prop()
  index!: Number;

  colors: Array<String> = ['#256BCE', '#8806CE', '#A7C4EA', '#CF9BEB'];

  @Emit()
  openModal() {
    if (this.data.id == undefined) {
      return {
        data: this.data,
        index: this.index,
        show: true,
      };
    }
    return {
      data: this.data,
      index: this.index,
      show: false,
    };
  }

  @Emit('change-data')
  onChangeData() {
    return {
      item: {},
      index: this.index,
    };
  }

  deleteHandler() {
    this.onChangeData();
  }

  mounted() {
    // console.log(this.data);
  }
}
</script>
<style lang="scss" scoped>
.selected-box {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    .close-icon {
      display: inline-block;
    }
  }
  &.nodata {
    &:hover {
      .close-icon {
        display: none;
      }
    }
    border: 1px dashed rgba(166, 168, 170, 1);
  }
  .selected-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
    &__cont {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 10px;
      width: 100%;
      background-color: #fff;
      padding: 20px;
    }
    &__title {
      font-size: 18px;
      font-weight: bold;
      font-family: "proxima-nova", "sans-serif";
    }
    &__sub {
      font-size: 14px;
      font-weight: bold;
      font-family: "proxima-nova", "sans-serif";
      color: rgba(166, 168, 170, 1);
    }
    &__des {
      font-size: 12px;
      font-weight: 500;
      font-family: "proxima-nova", "sans-serif";
      color: rgba(31, 38, 42, 1);
    }
    &__num {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      padding: 0 30px;
    }
    .item__num {
      font-size: 24px;
      font-weight: bolder;
      color: rgba(37, 107, 206, 1);
      text-align: right;
      &_title {
        font-size: 14px;
        font-weight: bold;
        text-align: right;
      }
    }
  }
  .plus-icon {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    font-size: 40px;
    transform: translate(-50%, -50%);
    color: rgba(112, 112, 112, 1);
  }
  .close-icon {
    display: none;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    font-size: 24px;
    border-radius: 50%;
    background-color: rgba(136, 6, 206, 1);
    color: #fff;
    z-index: 9;
  }
}
</style>
