<template>
  <div class="screenshot">
    <div class="screenshot-name">截图区域：</div>
    <div
      class="screenshot-area"
      ref="screenshotRef"
      :style="{ background: `${bgColor}` }"
    >
      <div class="screenshot-area-div">
        <RadioGroup v-model:value="changeSize">
          <RadioButton value="large">Large</RadioButton>
          <RadioButton value="default">Default</RadioButton>
          <RadioButton value="small">Small</RadioButton>
        </RadioGroup>
      </div>
      <div class="screenshot-area-div">
        <Button type="primary" :size="changeSize">Primary</Button>
        <Button :size="changeSize">Normal</Button>
        <Button type="dashed" :size="changeSize">Dashed</Button>
        <Button danger :size="changeSize">Danger</Button>
        <Button type="link" :size="changeSize">Link</Button>
      </div>
      <div class="screenshot-area-div">
        <Button type="primary" :size="changeSize">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
        <Button type="primary" shape="circle" :size="changeSize">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
        <Button type="primary" shape="round" :size="changeSize">
          <template #icon>
            <DownloadOutlined />
          </template>
          Download
        </Button>
        <Button danger shape="round" :size="changeSize">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
        <Button type="primary" :size="changeSize">
          <template #icon>
            <DownloadOutlined />
          </template>
          Download
        </Button>
      </div>
      <div>
        修改背景色：<Input
          type="color"
          style="width: 100px"
          v-model:value="currentColor"
          @input="onColorChange"
        />
      </div>
    </div>
    <Button class="screenshot-btn" type="primary" @click="startScreenshot">
      截图
    </Button>
    <Image :src="screenshotUrl" :width="200" :height="200" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Button, Radio, message, Image, Input } from 'ant-design-vue';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import * as htmlToImage from 'html-to-image';
export default defineComponent({
  components: {
    Button,
    Image,
    Input,
    RadioGroup: Radio.Group,
    RadioButton: Radio.Button,
    DownloadOutlined,
    SearchOutlined,
  },
  setup() {
    const changeSize = ref('large');
    const screenshotRef = ref(null);
    const screenshotUrl = ref('');
    const currentColor = ref('#ffffff');
    const bgColor = ref('#ffffff');

    const startScreenshot = () => {
      htmlToImage
        .toPng(screenshotRef.value)
        .then(async (dataBase64) => {
          screenshotUrl.value = dataBase64;
          // uploadScreenshot(dataBase64);
        })
        .catch((error) => {
          console.log('error', error);
          message.warning('截图生成失败');
        });
    };

    // 转换成文件流上传
    const uploadScreenshot = (dataURL) => {
      const bytes = window.atob(dataURL.split(',')[1]);
      const buffer = new ArrayBuffer(bytes.length);
      const uint = new Uint8Array(buffer);
      for (let j = 0; j < bytes.length; j++) {
        uint[j] = bytes.charCodeAt(j);
      }
      const imageFile = new Blob([uint], { type: 'image/png' });
      const file = new File([imageFile], `${new Date().valueOf()}.png`, {
        type: 'image/png',
      });
      file.uid = `widgets-canvas-screen-shot-${new Date().valueOf()}`;
      const action = {
        file: file,
      };
    };

    const onColorChange = (e) => {
      bgColor.value = e.target.value;
    };
    return {
      changeSize,
      screenshotRef,
      currentColor,
      screenshotUrl,
      bgColor,
      startScreenshot,
      onColorChange,
    };
  },
});
</script>

<style lang="less" scoped>
.screenshot {
  width: 100%;
  height: 100%;
  display: flex;
  &-name {
    font-size: @font-common-size;
    font-weight: bold;
  }
  &-area {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid blue;
    &-div {
      margin-bottom: 16px;
      button {
        margin-right: 8px;
      }
    }
  }
  &-btn {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
