<template>
  <div class="export-pdf">
    <div class="export-pdf-btn">
      <Button type="primary" @click="exportPDf" :loading="loading"
        >导出pdf</Button
      >
    </div>
    <div class="export-pdf-module">
      <div id="pdfDom" style="border: 1px solid red">
        <div v-for="(item, index) in list" :key="index">
          <div
            class="pdfRef"
            :style="{ color: item.color }"
            style="margin-bottom: 15px"
          >
            {{ `${item.label}__${index}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import HomeVue from '../../dashboard/index.vue';
import { Button, message } from 'ant-design-vue';
import { htmlPdf } from '/@/utils/exportPdf';
// import { convertPdf } from '/@/utils/exportPdf1';

import { list } from './data';
export default defineComponent({
  components: {
    HomeVue,
    Button,
  },
  setup() {
    const loading = ref(false);
    const exportPDf = () => {
      loading.value = true;
      // 调用htmlToPdf工具函数
      var fileName = '投资评审报告';
      const fileList = document.getElementsByClassName('pdfRef'); // 很重要
      const target = document.getElementById('pdfDom');
      console.log('target', target.scrollWidth);
      htmlPdf(fileName, document.querySelector('#pdfDom'));
      // convertPdf(false);
      // 定时器模拟按钮loading动画的时间
      setTimeout(() => {
        loading.value = false;
        message.success('打印成功!');
      }, 1000);
    };
    return { exportPDf, list, loading };
  },
});
</script>

<style lang="less" scoped>
.export-pdf {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-btn {
    padding-bottom: 5px;
  }
  &-module {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    border: 1px solid blue;
  }
}
</style>
