import '@/utils/interfaceObject.ts';
import { __spread } from 'tslib';
import Stations from '@/utils/station.ts';

const _S = new Stations();

class DataUtils {
  /**
     * 随机 SELECTED 数据
     */
  randomSelectedObject() {

  }

  randomId() {
    return `${(new Date()).getTime()}_${Math.random() * 100}`;
  }

  randomType() {
    const len = _S.types.length;
    const index = Math.floor(Math.random() * len);
    return _S.types[index].toString();
  }

  randomExposureInObject() {
    return {
      type: this.randomType(),
      value: Math.floor(Math.random() * 5),
    };
  }

  randomSelectedModalTableData(len: Number = 10): Array<SelectedTableObject> {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push({
        id: this.randomId(), tag: this.randomType(), entity: 'Hobi', wallet: '123',
      });
    }
    return arr;
  }
}

export default DataUtils;
