<template>
  <div class="sys-pdf">
    <div class="sys-pdf-setting" ref="pdfSettingRef">
      <div class="sys-pdf-setting-left">
        <Tooltip>
          <template #title>预览</template>
          <menu-fold-outlined
            v-if="collapsed"
            class="trigger"
            @click="handleCollapsed"
          />
          <menu-unfold-outlined
            v-else
            class="trigger"
            @click="handleCollapsed"
          />
        </Tooltip>
        <div>pdf预览</div>
      </div>
      <div class="sys-pdf-setting-mid">
        <div class="hover" @click="onScaleUp">放大</div>
        <div class="hover" @click="onScaleDown">缩小</div>
        <div>
          <Input
            type="number"
            v-model:value="inputPage"
            style="width: 50px"
            :min="1"
            :max="totalNum"
            @change="handleChange"
          />
        </div>
        <div>/</div>
        <div>{{ totalNum }}</div>
        <div class="hover" @click="onAppointPage">到指定页</div>
        <div class="hover" @click="onScrolTop">返回顶部</div>
      </div>
      <div class="sys-pdf-setting-right">
        <Tooltip>
          <template #title>使用pdf-dist包预览</template>
          <div class="preview" @click="openPreview">预览2</div>
        </Tooltip>
        <Tooltip>
          <template #title>下载</template>
          <SvgIcon name="download" />
        </Tooltip>
      </div>
    </div>
    <div class="sys-pdf-canvas" ref="pdfRender">
      <div class="sys-pdf-canvas-list" ref="listRef">
        <div v-show="collapsed">
          <canvas
            v-for="item in totalNum"
            :key="item"
            :id="`pdf-directory__${item}`"
          />
        </div>
      </div>
      <div class="sys-pdf-canvas-content">
        <canvas
          v-for="item in totalNum"
          :key="item"
          :id="`pdf-canvas__${item}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, nextTick, watch } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { Input, Tooltip } from 'ant-design-vue';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import pdfjs from 'pdfjs-dist/build/pdf';
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import 'pdfjs-dist/web/pdf_viewer.css';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Input,
    SvgIcon,
    Tooltip,
  },
  setup() {
    const collapsed = ref(false);
    const inputPage = ref(1);
    let pdfDoc = null;
    const listRef = ref(null);
    const pdfSettingRef = ref(null);
    const totalNum = ref(0);
    const scaleNum = ref(1.0);
    const pdfRender = ref(null);
    const router = useRouter();
    onMounted(() => {
      getPdfDocument('first');
    });

    // 根据Url获取到pdf实例
    const getPdfDocument = (times) => {
      pdfjs
        .getDocument('compressed.tracemonkey-pldi-09.pdf')
        .promise.then((doc) => {
          pdfDoc = doc;
          totalNum.value = doc.numPages;
          nextTick(() => {
            if (times == 'first') {
              renderPage(1); // 中间内容区
              renderLeftDirectory(1); // 左侧预览目录
            } else {
              renderPage(1); // 中间内容区
            }
          });
        });
    };

    // 渲染右侧pdf
    const renderPage = (pageSize) => {
      pdfDoc.getPage(pageSize).then(async (page) => {
        const viewport = page.getViewport({
          scale: scaleNum.value,
        });
        const canvas = document.getElementById(`pdf-canvas__${pageSize}`);
        const context = canvas.getContext('2d');
        const radios = window.devicePixelRatio || 1;
        let backingStoreRatio =
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        const outputScale = radios / backingStoreRatio;
        canvas.width = Math.floor(
          viewport.viewBox[2] * outputScale * scaleNum.value
        );
        canvas.height = Math.floor(
          viewport.viewBox[3] * outputScale * scaleNum.value
        );
        canvas.style.width =
          Math.floor(viewport.viewBox[2] * scaleNum.value) + 'px';
        canvas.style.height =
          Math.floor(viewport.viewBox[3] * scaleNum.value) + 'px';
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.right = '0';
        canvas.style.margin = 'auto';
        canvas.style.top = `${
          Math.floor(viewport.viewBox[3] * scaleNum.value * (pageSize - 1)) +
          pageSize * 10
        }px`;
        canvas.style.transform = `rotateY(180deg) rotate(180deg)`;
        canvas.style.padding = '0';
        const transform =
          outputScale !== 1
            ? [
                outputScale * scaleNum.value,
                0,
                0,
                outputScale * scaleNum.value,
                0,
                0,
              ]
            : null;
        const renderContext = {
          canvasContext: context,
          transform,
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
          if (totalNum.value > pageSize) {
            renderPage(pageSize + 1);
          } else {
            setTimeout(() => {
              pdfSettingRef.value.style.height = '42px';
              pdfSettingRef.value.style.opacity = '1';
              pdfRender.value.style.height = 'calc(100% - 42px)';
            }, 200);
          }
        });
      });
    };

    // 左侧预览目录
    const renderLeftDirectory = (pageSize) => {
      pdfDoc.getPage(pageSize).then(async (page) => {
        const scale = 0.2;
        const viewport = page.getViewport({
          scale,
          rotation: 180,
        });
        const canvas = document.getElementById(`pdf-directory__${pageSize}`);
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
          Math.floor(viewport.viewBox[3] * scale * (pageSize - 1)) +
          pageSize * 26
        }px`;
        canvas.style.transform = `rotateY(180deg) rotate(180deg)`;
        canvas.style.padding = '0';
        let div = document.createElement('div');
        div.innerHTML = pageSize;
        div.style.fontSize = '0.85rem';
        div.style.color = '#fff';
        div.style.fontWeight = 'bold';
        div.style.position = 'absolute';
        div.style.left = '0';
        div.style.right = '0';
        div.style.textAlign = 'center';
        div.style.top = `${
          Math.floor(viewport.viewBox[3] * scale * (pageSize - 1)) +
          pageSize * 26 +
          viewport.viewBox[3] * scale +
          3
        }px`;
        canvas.parentNode.insertBefore(div, canvas.nextSibling);
        canvas.addEventListener('mouseover', () => {
          canvas.style.cursor = 'pointer';
          canvas.style.boxShadow = '0px 0px 2px 2px blue';
        });
        canvas.addEventListener('mouseleave', () => {
          canvas.style.cursor = '';
          canvas.style.boxShadow = '';
        });
        canvas.addEventListener('click', (event) => {
          const selectedDom =
            event.target.id && event.target.id.indexOf('__') > -1
              ? event.target.id.split('__')[1]
              : '';
          scrollToStart(selectedDom);
        });
        const transform =
          outputScale !== 1
            ? [outputScale * scale, 0, 0, outputScale * scale, 0, 0]
            : null;
        const renderContext = {
          canvasContext: context,
          transform,
          viewport: viewport,
        };
        page.render(renderContext);
        if (totalNum.value > pageSize) {
          renderLeftDirectory(pageSize + 1);
        }
      });
    };

    const handleCollapsed = () => {
      collapsed.value = !collapsed.value;
      if (collapsed.value) {
        listRef.value.style.width = '220px';
        listRef.value.style.opacity = '1';
      } else {
        listRef.value.style.width = '0';
        listRef.value.style.opacity = '0';
      }
    };

    // 处理右侧内容区域，使具体pdf页面滑动到顶部
    const scrollToStart = (id) => {
      const targetDom = document.getElementById(`pdf-canvas__${id}`);
      targetDom.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    };

    const handleChange = (e) => {
      const inputValue = e.target.value;
      if (inputValue && inputValue > 0) {
        if (inputValue.toString().indexOf('.') > -1) {
          const num = parseInt(inputValue);
          inputPage.value = num;
        } else {
          scrollToStart(
            inputValue > totalNum.value ? totalNum.value : inputValue
          );
        }
      } else {
        inputPage.value = 1;
        scrollToStart(1);
      }
    };

    // 到指定页
    const onAppointPage = () => {
      // const res = await pdfDoc.saveDocument;
      // console.log('height-------', res);
      scrollToStart(
        inputPage.value > totalNum.value ? totalNum.value : inputPage.value
      );
    };

    // 返回顶部
    const onScrolTop = () => {
      scrollToStart(1);
    };

    // 放大
    const onScaleUp = async () => {
      scaleNum.value += 0.2;
      if (scaleNum.value > 4) return;
      getPdfDocument('two');
    };

    // 缩小
    const onScaleDown = () => {
      scaleNum.value += -0.2;
      if (scaleNum.value < 0.2) return;
      getPdfDocument('two');
    };

    // 直接使用下载的pdf-dist包预览
    const openPreview = () => {
      const routeUrl = router.resolve({
        path: '/preview-pdf',
      });

      window.open(routeUrl.href, '_blank');
    };

    return {
      collapsed,
      listRef,
      pdfSettingRef,
      inputPage,
      totalNum,
      pdfRender,
      handleCollapsed,
      onScrolTop,
      onScaleUp,
      onScaleDown,
      handleChange,
      onAppointPage,
      openPreview,
    };
  },
});
</script>

<style lang="less" scoped>
.sys-pdf {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  &-setting {
    width: 100%;
    height: 0;
    transition: height 300ms ease, opacity 300ms ease;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      div {
        margin-left: 10px;
      }
      .trigger {
        font-size: 16px;
        color: #666;
        cursor: pointer;
        transition: color 0.3s;
      }
    }
    &-mid {
      display: flex;
      display: flex;
      align-items: center;
      .hover {
        &:hover {
          color: dodgerblue;
        }
      }
      div {
        margin: 0 8px;
        ::v-deep(.ant-input) {
          padding: 0 0 0 2px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    &-right {
      margin-right: 10px;
      width: 100px;
      display: flex;
      justify-content: space-around;
      &:hover {
        cursor: pointer;
      }
      .preview {
        &:hover {
          color: dodgerblue;
        }
      }
    }
  }
  &-canvas {
    width: 100%;
    height: 100%;
    transition: width 300ms ease, opacity 300ms ease;
    display: flex;
    overflow: auto;
    background: #000;
    padding-bottom: 1px;
    &-list {
      height: 100%;
      position: relative;
      overflow-y: auto;
      width: 0;
      opacity: 0;
      background: gray;
      box-sizing: border-box;
      transition: width 300ms ease, opacity 300ms ease;
    }
    &-content {
      flex: auto;
      height: 100%;
      position: relative;
      overflow-x: auto;
      box-sizing: border-box;
    }
  }
}
</style>
