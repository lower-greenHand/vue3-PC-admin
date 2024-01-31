<template>
  <div class="preview-pdf">
    <iframe
      src="static/pdfjs-3.3.122-dist/web/viewer.html?file=compressed.tracemonkey-pldi-09.pdf#page=1"
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.preview-pdf {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
