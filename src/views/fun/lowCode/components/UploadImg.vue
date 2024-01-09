<template>
  <div class="upload-img">
    <Upload
      v-model:file-list="fileList"
      name="image"
      :class="`upload_${widgetUploadData.id}`"
      :show-upload-list="false"
      list-type="picture"
      accept=".JPG,.PNG,.JPEG,.jpg,.png,.jpeg,.svg,.SVG"
      :maxCount="1"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div
        v-if="!widgetUploadData.imgUrl"
        @click.stop="handleDoubleUpload(widgetUploadData)"
        :style="{ height: height + 'px', width: width + 'px' }"
        class="upload-logo"
      >
        <PlusOutlined />
      </div>
      <img
        v-else
        @click.stop="handleDoubleUpload(widgetUploadData)"
        :src="widgetUploadData.imgUrl"
        :style="{ height: height + 'px', width: width + 'px' }"
      />
    </Upload>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { Upload, message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  props: {
    height: 0,
    width: 0,
    widgetsData: {},
  },
  components: {
    Upload,
    PlusOutlined,
  },
  emits: ['click-img'],
  setup(props, { emit }) {
    const fileList = ref([]);
    const clickTime = ref(null);
    const clickCount = ref(0);
    const imageType = ['jpeg', 'png', 'jpg', 'svg', 'svg+xml'];
    const widgetUploadData = computed(() => {
      return props.widgetsData;
    });

    // 双击上传拖拽组件调用上传
    const handleDoubleUpload = (item) => {
      clickCount.value++;
      if (clickCount.value == 1) {
        clickTime.value = setTimeout(() => {
          clickCount.value = 0;
          clearTimeout(clickTime.value);
          clickTime.value = null;
        }, 300);
      } else if (clickCount.value == 2) {
        clickCount.value = 0;
        clearTimeout(clickTime.value);
        clickTime.value = null;
        let uploadClass = `.upload_${item.id}`;
        const uploadDom = document.querySelector(uploadClass);
        const inputUpload = uploadDom.querySelector(
          '.ant-upload input[type="file"]'
        );
        inputUpload.click();
      }
      emit('click-img', item);
    };
    // 上传前拦截
    const beforeUpload = (file) => {
      fileList.value = [];
      const fileType = file.type ? file.type.split('/')[1].toLowerCase() : '';
      if (!fileType || !imageType.includes(fileType)) {
        message.error('只允许上传 png、jpg、jpeg、svg 格式的文件');
        return;
      }
      let isLt50M;
      isLt50M = file.size / 1024 / 1024 < 10;
      if (!isLt50M) {
        message.warning(`文件不能大于10M`);
      }
      return isLt50M;
    };
    // 上传图片回调函数
    const handleChange = async (info) => {
      // console.log('info', info);
      if (info.file.status == 'done' || info.file.status == 'uploading') {
        const url = await handlePreview(info.file);
        if (url) {
          widgetUploadData.value.imgUrl = url;
          emit('click-img', widgetUploadData.value);
        }
      }
      // else if (info.file.status == 'error') {
      //   message.warning('上传失败!');
      // }
    };

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        return file.preview;
      }
      return file.url;
    };
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    return {
      fileList,
      widgetUploadData,
      beforeUpload,
      handleChange,
      handleDoubleUpload,
    };
  },
});
</script>

<style lang="less" scoped>
.upload-img {
  border: 1px dashed #d8d8d8;
  .upload-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep(.anticon svg) {
    color: rgb(42, 146, 246);
    font-size: 20px;
  }
  ::v-deep(.ant-upload.ant-upload-select-picture-card) {
    width: 100%;
    height: 100%;
  }
  ::v-deep(.ant-upload-list-picture-card .ant-upload-list-item-error) {
    border: none;
  }

  ::v-deep(.ant-upload-list) {
    display: none;
  }
}
</style>
