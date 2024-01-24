<template>
  <div class="demo">
    <!-- :style="{ width: containerW, height: containerH }" -->
    <canvas
      v-for="item in totalNum"
      :key="item"
      :id="`the-canvas_${item}`"
      style="border: 1px solid black"
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
        const scale = 1.0;
        const viewport = page.getViewport({ scale, rotation: 180 });
        const canvas = document.getElementById(`the-canvas_${pageSize}`);
        const context = canvas.getContext('2d');
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.viewBox[2] * outputScale * scale);
        canvas.height = Math.floor(viewport.viewBox[3] * outputScale * scale);
        canvas.style.width = Math.floor(viewport.viewBox[2] * scale) + 'px';
        canvas.style.height = Math.floor(viewport.viewBox[3] * scale) + 'px';
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.right = '0';
        canvas.style.margin = 'auto';
        canvas.style.top = `${
          0 +
          Math.floor(viewport.viewBox[3] * scale * (pageSize - 1)) +
          (pageSize - 1) * 10
        }px`;
        canvas.style.transform = `rotateY(180deg) rotate(180deg)`;

        canvas.style.padding = '0';
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

    return { totalNum };
  },
});
</script>

<style lang="less" scoped>
.demo {
  height: 100%;
  min-width: 100%;
  width: fit-content;
  position: relative;
  overflow-x: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #000;
}
</style>
