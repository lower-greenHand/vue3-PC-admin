<template>
  <div>
    <div class="edit-teatarea">
      <div
        ref="editableDiv"
        class="edit-input"
        contenteditable="true"
        :style="{ height: defaultHeight + 'px' }"
        @input="onInput"
        @keydown.enter.prevent
      ></div>
      <svg-icon
        name="quark-tuo-zhuai"
        class="draggable"
        size="12"
        @mousedown="onMouseDown"
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="error-tips">
        {{ characterNum > 400 ? '输入的内容长度超出400' : '' }}
      </div>
      <div class="chart-num">{{ characterNum }}/400</div>
    </div>
    <!-- 动态变量 -->
    <div>可插入动态变量</div>
    <div class="flex items-center flex-wrap mt-2 gap-3">
      <!-- <Tag
        :checked="false"
        :disabled="getIsDisabled('项目数量')"
        @click="onClickItem('项目数量')"
      >
        项目数量
      </Tag>
      <Tag
        :checked="false"
        :disabled="getIsDisabled('线索数量')"
        @click="onClickItem('线索数量')"
      >
        线索数量
      </Tag>
      <Tag
        :checked="false"
        :disabled="getIsDisabled('设备数量')"
        @click="onClickItem('设备数量')"
      >
        设备数量
      </Tag>
      <Tag
        :checked="false"
        :disabled="getIsDisabled('《失败文件》点击下载')"
        @click="onClickItem('《失败文件》')"
      >
        《失败文件》<span class="tag-btn">点击下载</span>
      </Tag>
      <Tag
        :checked="false"
        :disabled="getIsDisabled('动态密码点击复制')"
        @click="onClickItem('动态密码')"
      >
        动态密码 <span class="tag-btn">点击复制</span>
      </Tag> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { Tag } from 'ant-design-vue';
import SvgIcon from '/@/components/SvgIcon/index';

export default defineComponent({
  components: {
    SvgIcon,
    Tag,
  },
  setup() {
    const editableDiv = ref(null);
    const defaultHeight = ref(68);
    const initTop = ref(168);
    const isDragging = ref(false);
    const characterNum = ref(0); // 字符长度
    const extractList = ref([]); // 重组的数据

    const idList = ref < any > [];
    const patterns = [
      '项目数量✕',
      '线索数量✕',
      '设备数量✕',
      '《失败文件》点击下载✕',
      '动态密码点击复制✕',
    ];

    const handleString = (str) => {
      return patterns.reduce((acc, pattern) => {
        const regex = new RegExp(pattern, 'g'); // 创建全局匹配的正则表达式
        return acc.replace(regex, ''); // 替换匹配的内容为空字符串
      }, str);
    };

    const onInput = () => {
      idList.value.forEach((id) => {
        const closeTag = editableDiv.value.querySelector(`#${id}`);
        if (!closeTag) {
          idList.value = idList.value.filter((item) => item !== id);
        }
      });
      if (editableDiv.value) {
        if (editableDiv.value.innerHTML === '<br>') {
          editableDiv.value.innerHTML = '';
          idList.value = [];
        }
        extractData(editableDiv.value.innerText);
        const lengthContent = handleString(editableDiv.value.innerText);
        characterNum.value = lengthContent.length;
      }
    };

    // 提取数据
    const extractData = (content) => {
      extractList.value = [];
      // 定义模块的正则表达式
      const regex =
        /(项目数量✕|线索数量✕|设备数量✕|《失败文件》点击下载✕|动态密码点击复制✕)/g;
      // 使用 split 进行拆分
      const parts = content.split(regex);
      const listR = parts.filter((part) => part !== '');
      listR.forEach((item) => {
        const tagType = ['项目数量', '线索数量', '设备数量'].includes(
          item.split('✕')[0]
        )
          ? 'common'
          : item.split('✕')[0] === '《失败文件》点击下载'
          ? 'download'
          : item.split('✕')[0] === '动态密码点击复制'
          ? 'copy'
          : 'text';
        // 将匹配的内容添加到结果数组中
        extractList.value.push({
          id: extractList.value.length + 1,
          content: item.split('✕')[0],
          type: tagType,
          defaultContent:
            tagType === 'common'
              ? '5'
              : tagType === 'download'
              ? '《失败文件》'
              : tagType === 'copy'
              ? '111111'
              : '',
        });
      });
    };

    const returnConfigData = () => {
      return extractList.value;
    };

    onMounted(() => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      window.addEventListener('keydown', handleKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    });

    // 监听键盘删除
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        if (
          editableDiv.value.innerHTML.trim() &&
          editableDiv.value.innerHTML.trim().startsWith('<span') &&
          idList.value.length === 1 &&
          editableDiv.value.innerHTML.trim().endsWith('</span>')
        ) {
          editableDiv.value.innerHTML = editableDiv.value.innerHTML.trim();
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          range.setStartAfter(
            editableDiv.value.getElementsByTagName('span')[0]
          );
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    };

    // 按下鼠标
    const onMouseDown = (e) => {
      e.preventDefault();
      isDragging.value = true;
    };

    // 移动中
    const onMouseMove = (e) => {
      if (isDragging.value) {
        e.preventDefault();
        const moveWidth = e.clientY - initTop.value;
        if (moveWidth >= 68 && moveWidth < 200) {
          defaultHeight.value = moveWidth;
        }
      }
    };

    // 移动结束
    const onMouseUp = () => {
      isDragging.value = false;
    };

    // 根据类型创建tag ['项目数量', '线索数量', '设备数量'] 、 失败文件 、动态密码
    // <span style="font-weight:400">✕</span>  display:flex;justify-content: center;align-items: center;
    // <span style="padding-left:6px;color:transparent;">|</span>
    const creatDomTag = (type) => {
      const uniqueId = `tag-${Math.random().toString(36).substring(2, 9)}`; // 生成一个唯一的id
      idList.value.push(uniqueId);
      if (['项目数量', '线索数量', '设备数量'].includes(type)) {
        return `<span contenteditable="false" style="display:inline-block;background:#F1F1F1;border:1px solid #D0D0D0; font-size:12px;height:24px;line-height:22.5px;border-radius: 3px;white-space:nowrap;padding:0 8px;">
            ${type}<span contenteditable="false" id="${uniqueId}" style="font-weight:400;padding:0 4px 0 8px;cursor: pointer;" >✕</span>
          </span>`;
      }
      if (type === '《失败文件》') {
        return `<span contenteditable="false" style="display:inline-block;background:#F1F1F1;border:1px solid #D0D0D0; font-size:12px;height:24px;line-height:22.5px;border-radius: 3px;white-space:nowrap;padding:0 4px;">
            ${type}<span style="color:#1450f5;padding-left:5px;font-size:12px">点击下载</span><span contenteditable="false" id="${uniqueId}" style="font-weight:400;padding: 0 4px 0 8px ;cursor: pointer;">✕</span>
          </span>`;
      }
      return `<span contenteditable="false" style="display:inline-block;background:#F1F1F1;border:1px solid #D0D0D0; font-size:12px;height:24px;line-height:22.5px;border-radius: 3px;white-space:nowrap;padding:0 8px;">
            ${type}<span style="color:#1450f5;padding-left:5px;font-size:12px">点击复制</span><span contenteditable="false" id="${uniqueId}" style="font-weight:400;padding:0 4px 0 8px;cursor: pointer;">✕</span>
          </span>`;
    };

    const onClickItem = (type) => {
      if (['项目数量', '线索数量', '设备数量'].includes(type)) {
        editableDiv.value.innerHTML = `${
          editableDiv.value.innerHTML
        }${creatDomTag(type)}`;
      } else if (type === '《失败文件》') {
        editableDiv.value.innerHTML = `${
          editableDiv.value.innerHTML
        }${creatDomTag(type)}`;
      } else {
        editableDiv.value.innerHTML = `${
          editableDiv.value.innerHTML
        }${creatDomTag(type)}`;
      }
      nextTick(() => {
        idList.value.forEach((id) => {
          const closeTag = editableDiv.value.querySelector(`#${id}`);
          if (closeTag) {
            closeTag.addEventListener('click', () => {
              const tag = closeTag.parentElement;
              if (tag) {
                tag.remove();
                idList.value = idList.value.filter(
                  (item) => item !== closeTag.getAttribute('id')
                );
                extractData(editableDiv.value.innerText);
              }
            });
          }
        });
      });
      extractData(editableDiv.value.innerText);
    };

    const getIsDisabled = (text) => {
      return !!extractList.value.find((item) => item.content === text);
    };

    return {
      editableDiv,
      defaultHeight,
      extractList,
      characterNum,
      onInput,
      onClickItem,
      onMouseDown,
      getIsDisabled,
      returnConfigData,
    };
  },
});
</script>

<style lang="less" scoped>
.edit-teatarea {
  position: relative;
  div {
    min-height: 68px !important;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .edit-input {
    border-radius: 4px;
    line-height: 2;
    width: 100%;
    overflow-y: scroll;
    div {
      display: inline-block !important;
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }
  }
  .draggable {
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin-right: 0;
    cursor: ns-resize;
  }
}

.error-tips {
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-error-error-color);
}
.chart-num {
  text-align: right;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  color: #959595;
}
.tag-btn {
  color: #1450f5;
}
</style>
