<template>
  <div class="demo" :style="{ width: containerW, height: containerH }">
    <canvas
      v-for="item in totalNum"
      :key="item"
      :id="`the-canvas_${item}`"
      style="border: 1px solid black; display: block position: absolute;
        top: 0;
        left: 0;
        right: 0;"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import pdfjsLib from 'pdfjs-dist/build/pdf';
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import 'pdfjs-dist/web/pdf_viewer.css';
export default defineComponent({
  setup() {
    const totalNum = ref(0);
    let pdfDoc = null;
    const containerW = ref(0);
    const containerH = ref(0);
    onMounted(() => {
      initGetPdfUrl();
    });

    const initGetPdfUrl = async () => {
      const loadingTask = pdfjsLib.getDocument(
        'compressed.tracemonkey-pldi-09.pdf'
      );
      pdfDoc = await loadingTask.promise;
      totalNum.value = pdfDoc.numPages;
      renderPdfCanvas(1);
    };

    const renderPdfCanvas = async (pageSize) => {
      pdfDoc.getPage(pageSize).then(async (page) => {
        const scale = 4.0;
        const viewport = page.getViewport({ scale, rotation: 180 });
        const canvas = document.getElementById(`the-canvas_${pageSize}`);
        const context = canvas.getContext('2d');
        // console.log('viewport', viewport);
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.viewBox[2] * outputScale * scale);
        canvas.height = Math.floor(viewport.viewBox[3] * outputScale * scale);
        canvas.style.width = Math.floor(viewport.viewBox[2] * scale) + 'px';
        canvas.style.height = Math.floor(viewport.viewBox[3] * scale) + 'px';
        containerW.value = Math.floor(viewport.viewBox[2] * scale) + 'px';
        containerH.value = Math.floor(viewport.viewBox[3] * scale) + 'px';
        canvas.style.transform = `rotateY(180deg) rotate(180deg)`;
        const transform =
          outputScale !== 1
            ? [outputScale * scale, 0, 0, outputScale * scale, 0, 0]
            : null;

        //
        // Render PDF page into canvas context
        //
        const renderContext = {
          canvasContext: context,
          transform,
          viewport,
        };
        page.render(renderContext);
        if (totalNum.value > pageSize) {
          renderPdfCanvas(pageSize + 1);
        }
      });
    };

    return { containerW, containerH, totalNum };
  },
});
</script>

<style lang="less" scoped>
.demo {
  height: 100%;
  border: 1px solid red;
  min-width: 100%;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
