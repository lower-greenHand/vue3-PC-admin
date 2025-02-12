<template>
  <div class="custom-input">
    <div class="edit-teatarea">
      <div
        ref="editableDiv"
        class="edit-input"
        contenteditable="true"
        :style="{ height: defaultHeight + 'px' }"
        @input="onInput"
        @keydown.enter.prevent
        @click="getMouseRange"
      />
      <SvgIcon
        name="quark-tuo-zhuai"
        class="draggable"
        size="12"
        @mousedown.stop="onMouseDown"
      />
      <span
        v-if="extractList.length === 0"
        class="place-holder"
        @click="onClickPlaceholder"
        >请输入内容</span
      >
    </div>
    <!-- tips -->
    <div class="flex items-center justify-between">
      <div class="error-tips">
        {{ characterNum > maxLength ? `输入的内容长度超出${maxLength}` : '' }}
      </div>
      <div class="chart-num">{{ characterNum }}/{{ maxLength }}</div>
    </div>
    <!-- 可插入标签 -->
    <div>可插入标签</div>
    <div class="flex items-center flex-wrap mt-2 gap-3">
      <template v-for="tag in tagsList">
        <Tag @click="onClickItem(tag)"
          >{{ tag.label
          }}<span v-if="tag.btnTitle" class="tag-btn">{{
            tag.btnTitle
          }}</span></Tag
        >
      </template>
    </div>
    <div class="mt-5 mb-3">默认回显数据</div>
    <Button @click="handleDefaultSet">设置</Button>
    <Button @click="handleDefaultSet" class="ml-2">效果预览</Button>
    <!-- {{ extractList }} -->
    <div class="preview-content">
      <div class="preview-content--text">
        <div v-html="getRenderContent()" class="content-preview"></div>
      </div>
      <div class="preview-content--icons">
        <SvgIcon name="star" size="22" class="mt-2" />
      </div>
    </div>
    <div
      class="edit-input"
      contenteditable="true"
      :style="{ height: defaultHeight + 'px' }"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, nextTick, onUnmounted, ref } from 'vue';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { Tag, Button } from 'ant-design-vue';
import { tagsList, patterns, regexPatterns, defaultSetList } from './data';
export default defineComponent({
  components: {
    SvgIcon,
    Tag,
    Button,
  },
  setup() {
    const editableDiv = ref();
    const defaultHeight = ref(160); // 输入框默认高度
    const extractList = ref([]); // 处理后的数据
    const characterNum = ref(0); // 非tag字符长度
    const maxLength = ref(200); // 最大长度
    const isResizer = ref(false); // 是否开启可拉伸缩小高度
    const idList = ref([]); // 存储标签的id，以便删除使用
    const startsContent = ref([]); // 0-光标中间的数据; 以便从光标位置插入标签
    const endsContent = ref([]); // 光标到末尾的数据；

    onMounted(() => {
      document.addEventListener('mousemove', onMouseMove, { passive: false });
      document.addEventListener('mouseup', onMouseUp);
    });

    onUnmounted(() => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    });

    // 输入事件
    const onInput = () => {
      // 清空多余的tag标签id
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
      setTimeout(() => {
        getMouseRange();
      }, 10);
    };

    // 实时获取当前焦点的位置，处理数据
    const getMouseRange = () => {
      startsContent.value = [];
      endsContent.value = [];
      editableDiv.value.focus();
      if (window.getSelection) {
        const selection = window.getSelection(); // 光标对象
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(editableDiv.value);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          // 0-焦点位置
          const parts = preCaretRange.toString().split(regexPatterns); // 根据定义的正则把当前字符串进行拆分
          const listR = parts
            .filter((part) => part.trim() !== '')
            .map((item) => {
              item = item.replace(/\n {10,12}/g, ''); // 把tag上空格用空字符串替换
              return item;
            });
          listR.forEach((item) => {
            const sourceObj = tagsList.find(
              (target) =>
                `${target.label}${target.btnTitle}` === item.split('✕')[0]
            );
            // 将匹配的内容添加到结果数组中
            if (sourceObj) {
              startsContent.value.push(sourceObj);
            } else {
              startsContent.value.push({
                label: '',
                field: 'text',
                btnTitle: '',
                default: item.split('✕')[0],
              });
            }
          });

          // 光标位置到末尾
          const endRange = document.createRange();
          endRange.setStart(range.endContainer, range.endOffset); // 从当前光标位置开始
          endRange.setEnd(
            editableDiv.value,
            editableDiv.value.childNodes.length
          ); // 到内容的结尾
          const textFromCaretToEnd = endRange.toString(); // 提取范围内的文本
          const parts1 = textFromCaretToEnd.split(regexPatterns);
          const listR1 = parts1
            .filter((part) => part.trim() !== '')
            .map((item) => {
              item = item.replace(/\n {10,12}/g, '');
              return item;
            });

          listR1.forEach((item) => {
            const sourceObj = tagsList.find(
              (target) =>
                `${target.label}${target.btnTitle}` === item.split('✕')[0]
            );
            // 将匹配的内容添加到结果数组中
            if (sourceObj) {
              endsContent.value.push(sourceObj);
            } else {
              endsContent.value.push({
                label: '',
                field: 'text',
                btnTitle: '',
                default: item.split('✕')[0],
              });
            }
          });
        }
      }
    };

    // 把内容区中所有的tag内容用空字符串替换，然后用于统计输入的纯文本内容的长度
    const handleString = (str) => {
      return patterns.reduce((acc, pattern) => {
        const regex = new RegExp(pattern, 'g'); // 创建全局匹配的正则表达式
        return acc.replace(regex, ''); // 替换匹配的内容为空字符串
      }, str);
    };

    // // 监听键盘删除
    // const handleKeyDown = (event) => {
    //   if (event.key === 'Backspace' || event.key === 'Delete') {
    //     if (
    //       editableDiv.value.innerHTML.trim() &&
    //       editableDiv.value.innerHTML.trim().startsWith('<span') &&
    //       idList.value.length === 1 &&
    //       editableDiv.value.innerHTML.trim().endsWith('</span>')
    //     ) {
    //       editableDiv.value.innerHTML = editableDiv.value.innerHTML.trim();
    //       const selection = window.getSelection();
    //       const range = selection.getRangeAt(0);
    //       range.setStartAfter(
    //         editableDiv.value.getElementsByTagName('span')[0]
    //       );
    //       range.collapse(true);
    //       selection.removeAllRanges();
    //       selection.addRange(range);
    //     }
    //     setTimeout(() => {
    //       getMouseRange();
    //     }, 10);
    //   }
    // };

    // 点击输入框默认提示
    const onClickPlaceholder = () => {
      editableDiv.value.focus();
    };

    // <span style="font-weight:400">✕</span>  display:flex;justify-content: center;align-items: center;
    // <span style="padding-left:6px;color:transparent;">|</span>
    const creatDomTag = (targetObj) => {
      const uniqueId = `tag-${Math.random().toString(36).substring(2, 9)}`; // 生成一个唯一的id
      idList.value.push(uniqueId);
      if (targetObj.btnTitle) {
        return `<span id="span-${
          uniqueId.split('-')[1]
        }" contenteditable="false" style="display:inline-block;margin:0 4px;background:#F1F1F1;border:1px solid #D0D0D0; font-size:12px;height:24px;line-height:22.5px;border-radius: 3px;white-space:nowrap;padding:0 4px;">
            ${
              targetObj.label
            }<span style="color:#1450f5;padding-left:5px;font-size:12px">${
          targetObj.btnTitle
        }</span><span contenteditable="false" id="${uniqueId}" style="font-weight:400;padding: 0 4px 0 8px ;cursor: pointer;">✕</span>
          </span>`;
      }
      return `<span id="span-${
        uniqueId.split('-')[1]
      }" contenteditable="false" style="display:inline-block;margin:0 4px;background:#F1F1F1;border:1px solid #D0D0D0; font-size:12px;height:24px;line-height:22.5px;border-radius: 3px;white-space:nowrap;padding:0 8px;">
            ${
              targetObj.label
            }<span contenteditable="false" id="${uniqueId}" style="font-weight:400;padding:0 4px 0 8px;cursor: pointer;" >✕</span>
          </span>`;
    };

    // 点击标签
    const onClickItem = (tag) => {
      editableDiv.value.innerHTML = '';
      if (startsContent.value.length > 0) {
        startsContent.value.forEach((item) => {
          if (item.field === 'text') {
            editableDiv.value.innerHTML = `${editableDiv.value.innerHTML}${item.default}`;
          } else {
            editableDiv.value.innerHTML = `${
              editableDiv.value.innerHTML
            }${creatDomTag(item)}`;
          }
        });
      }
      editableDiv.value.innerHTML = `${
        editableDiv.value.innerHTML
      }${creatDomTag(tag)}`;
      if (endsContent.value.length > 0) {
        endsContent.value.forEach((item) => {
          if (item.field === 'text') {
            editableDiv.value.innerHTML = `${editableDiv.value.innerHTML}${item.default}`;
          } else {
            editableDiv.value.innerHTML = `${
              editableDiv.value.innerHTML
            }${creatDomTag(item)}`;
          }
        });
      }
      // 给添加的标签增加点击事件，可以在标签中点击❎号删除
      nextTick(() => {
        idList.value.forEach((id) => {
          const closeTag = editableDiv.value.querySelector(`#${id}`);
          if (closeTag) {
            closeTag.addEventListener('click', (e) => {
              e.stopPropagation();
              const tag = closeTag.parentElement;
              if (tag) {
                tag.remove();
                idList.value = idList.value.filter(
                  (item) => item !== closeTag.getAttribute('id')
                );
                extractData(editableDiv.value.innerText);
              }
              setTimeout(() => {
                startsContent.value = [];
                endsContent.value = [];
                editableDiv.value.blur();
              }, 10);
            });
          }
        });
      });
      extractData(editableDiv.value.innerText); // 用于提取数据
    };

    // 提取数据
    const extractData = (content) => {
      extractList.value = [];
      // 定义模块的正则表达式
      // const regex =
      //   /(标签1✕|标签2✕|标签3点击✕|《文件》点击下载✕|标签4自定义按钮✕)/g;
      // 使用 split 进行拆分
      const parts = content.split(regexPatterns);
      const listR = parts.filter((part) => part !== '');
      listR.forEach((item) => {
        const sourceObj = tagsList.find(
          (target) => `${target.label}${target.btnTitle}` === item.split('✕')[0]
        );
        // 将匹配的内容添加到结果数组中
        if (sourceObj) {
          extractList.value.push(sourceObj);
        } else {
          extractList.value.push({
            label: '',
            field: 'text',
            btnTitle: '',
            default: item.split('✕')[0],
          });
        }
      });
    };

    // 修改输入框高度
    const onMouseDown = () => {
      isResizer.value = true;
    };

    // 鼠标移动
    const onMouseMove = (e) => {
      if (isResizer.value) {
        e.preventDefault();
        const moveHeight = e.clientY - 60;
        if (moveHeight >= 100 && moveHeight < 350) {
          defaultHeight.value = moveHeight;
        }
      }
    };
    // 鼠标松开
    const onMouseUp = () => {
      isResizer.value = false;
    };

    // 设置默认数据
    const handleDefaultSet = () => {
      defaultSetList.forEach((item) => {
        const targetObj = tagsList.find((target) => target.field == item.field);
        if (targetObj) {
          layoutContent(targetObj);
        } else {
          editableDiv.value.innerHTML = `${editableDiv.value.innerHTML}${item.default}`;
          extractData(editableDiv.value.innerText);
        }
      });
      const lengthContent = handleString(editableDiv.value.innerText);
      characterNum.value = lengthContent.length;
    };

    // 数据处理
    const layoutContent = (obj) => {
      editableDiv.value.innerHTML = `${
        editableDiv.value.innerHTML
      }${creatDomTag(obj)}`;
      nextTick(() => {
        idList.value.forEach((id) => {
          const closeTag = editableDiv.value.querySelector(`#${id}`);
          if (closeTag) {
            closeTag.addEventListener('click', (e) => {
              e.stopPropagation();
              const tag = closeTag.parentElement;
              if (tag) {
                tag.remove();
                idList.value = idList.value.filter(
                  (item) => item !== closeTag.getAttribute('id')
                );
                extractData(editableDiv.value.innerText);
              }
              setTimeout(() => {
                startsContent.value = [];
                endsContent.value = [];
                editableDiv.value.blur();
              }, 10);
            });
          }
        });
      });
      extractData(editableDiv.value.innerText);
    };

    const getRenderContent = () => {
      let contentHtml = '';
      extractList.value.forEach((content) => {
        if (content.default) {
          contentHtml += content.default;
        } else if (content.value) {
          contentHtml += `<span style="margin: 0 3px;color: red;font-size: 14px;font-weight: 500;">${content.value}</span>`;
        }
      });
      return contentHtml;
    };

    return {
      editableDiv,
      defaultHeight,
      extractList,
      characterNum,
      maxLength,
      tagsList,
      extractList,
      onInput,
      onMouseDown,
      onClickPlaceholder,
      onClickItem,
      getMouseRange,
      handleDefaultSet,
      getRenderContent,
    };
  },
});
</script>

<style lang="less" scoped>
.custom-input {
  .edit-teatarea {
    position: relative;
    .edit-input {
      border-radius: 4px;
      line-height: 2;
      width: 100%;
      overflow-y: scroll;
      min-height: 68px !important;
      border: 1px solid #ccc;
      padding: 8px;
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
    .place-holder {
      position: absolute;
      top: 12px;
      left: 10px;
      color: #959595;
    }
  }
  .maxLength {
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
    color: @error-color;
  }
  .chart-num {
    text-align: right;
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #959595;
  }
  .error-tips {
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
    color: @error-color;
  }

  ::v-deep(.ant-tag) {
    padding: 2px 8px;
    cursor: pointer;
  }
  .tag-btn {
    padding-left: 6px;
    color: #1450f5;
  }

  .preview-content {
    margin: 0 auto;
    width: 400px;
    min-height: 100px;
    border: 1px solid #e3e4e5;
    background: #e3e4e5;
    border-radius: 8px;
    display: flex;

    &--text {
      flex: 1;
      padding: 10px;
      display: flex;
      // flex-wrap: wrap;

      .content-preview {
        word-wrap: break-word;
        white-space: normal;
      }
      .tag-value {
        margin: 0 3px;
        color: red;
        font-size: 14px;
        font-weight: 500;
      }
    }

    &--icons {
      min-width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
