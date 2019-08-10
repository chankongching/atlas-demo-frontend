<template>
  <div class="exposure-chart-item" :class="newData.length > 0 ? '' : 'add-exposure-chart-item'">
    <span v-for="item of newData" :key="item.name" v-bind:style="{ backgroundColor: color16(), flex: [0, 0, 200 / item.value + '%'] }">
     <i>{{ item.name }}</i>
    </span>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Ant from 'ant-design-vue';

@Component({
  components: {

  },
})
export default class ExposureChart extends Vue {
  private newData: Array<object> = [];

  @Prop({
    required: false,
    type: Array,
    default: () => [

    ],
  })
  data ?: []

  color16() { // 十六进制颜色随机
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    return color;
  }

  @Watch('data', { immediate: true, deep: true })
  watchData(newVal: Array<object>, oldVal: Array<object>) {
    this.newData = newVal;
  }
}
</script>
<style lang="scss" scoped>
.exposure-chart-item {
  width: 200px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  & * {
    margin: 0;
    padding: 0;
  }
  span {
    height: 100%;
  }
  &.add-exposure-chart-item {
    border: 1px dashed #A6A8AA;
  }
}
</style>
