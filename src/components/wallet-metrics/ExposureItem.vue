<template>
  <div
    class="exposure-box"
    :class="{'nodata': (data == undefined || data.length <=0 || data[index] == undefined || data[index].length <=0)}"
  >
    <div
      class="exposure-box__item"
      v-for="(color,index) in data[index]"
      :key="index.toString()"
      :style="{'backgroundColor': color}"
      @click="SelectExposure(data[index])"
    >
      <div class="item__tip__line"></div>
      <div class="item__tip__name">ferfer</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import Ant from 'ant-design-vue';

@Component({
  components: {
    AIcon: Ant.Icon,
  },
})
export default class ExposureItem extends Vue {
  @Prop()
  data!: Array<Array<String>>;

  @Prop({ default: 0 })
  index!: number;

  @Emit('select-exposure')
  SelectExposure(item: any) {
    return { item, index: this.index };
  }

  mounted() {
    // console.log(this.data);
  }
}
</script>
<style lang="scss" scoped>
.exposure-box {
  width: 200px;
  height: 50px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  &.nodata {
    border: 1px dashed rgba(166, 168, 170, 1);
  }
  .exposure-box__item {
    position: relative;
    .item__tip__line,
    .item__tip__name {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      color: #1f262a;
      font-size: 10px;
    }
    .item__tip__line {
      width: 1px;
      height: 7px;
      background-color: #707070;
    }
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    &:nth-child(2n) {
      .item__tip__line {
        bottom: -7px;
      }
      .item__tip__name {
        bottom: -22px;
      }
    }
    &:nth-child(2n + 1) {
      .item__tip__line {
        top: -7px;
      }
      .item__tip__name {
        top: -22px;
      }
    }
    flex: 1;
    &.f1 {
      flex: 1;
    }
    &.f2 {
      flex: 2;
    }
    &.f3 {
      flex: 3;
    }
    &.f4 {
      flex: 4;
    }
  }
}
</style>
