<template>
  <div class="progress">
    <div
      class="sys-progress"
      ref="progressR"
      :style="{ width: `${props.width + 20}px` }"
    >
      <div
        class="sys-progress-bg"
        :class="props.disabled ? 'disable-progress' : ''"
      >
        <div
          class="sys-progress-bg-center"
          :style="{ width: `${props.width}px` }"
        >
          <div
            :style="{ width: `${percent}%` }"
            class="progress-render-area"
          ></div>
        </div>
      </div>
      <div
        :style="{ left: `${elLeft}px` }"
        class="sys-move-round"
        :class="props.disabled ? 'disable-move' : ''"
        @mousedown="handleEleMove"
      ></div>
    </div>
    <div class="percent">{{ percent }}%</div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'Progress',
  props: {
    width: {
      default: 200,
    },
    percent: {
      default: 0,
    },
    disabled: {
      default: false,
    },
  },
  emits: ['change-progress'],
  setup(props, { emit }) {
    const progressR = ref(null);
    const elLeft = ref();
    const percent = ref();

    watch(
      () => props.percent,
      () => {
        elLeft.value = (props.percent / 100) * props.width;
        percent.value = props.percent;
      },
      {
        immediate: true,
      }
    );

    // 元素移动
    const handleEleMove = (e) => {
      let odiv = e.target;
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        let { offsetHeight: pondModelHeight, offsetWidth: pondModelWidth } =
          progressR.value;
        let { offsetHeight: sonNodeHeight, offsetWidth: sonNodeWidth } = odiv;

        // 左上角(left)
        if (left < 54) {
          left = 54;
        } else if (left > props.width) {
          left = props.width;
        }
        if (top < 0) {
          top = 0;
        }
        // 左下角
        if (top > pondModelHeight - sonNodeHeight) {
          top = pondModelHeight - sonNodeHeight;
        }
        if (left > pondModelWidth - sonNodeWidth) {
          left = pondModelWidth - sonNodeWidth;
        }
        elLeft.value = left;
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
        odiv.style.zIndex = 999;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        odiv.style.zIndex = 1;
        odiv = null;
      };
    };
    watch(
      () => elLeft.value,
      () => {
        percent.value = ((elLeft.value / props.width) * 100).toFixed(0);
        emit('change-progress', percent.value);
      }
    );
    return { props, progressR, elLeft, handleEleMove, percent };
  },
});
</script>

<style lang="less" scoped>
.progress {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .sys-progress {
    height: 18px;
    display: flex;
    align-items: center;
    position: relative;

    &-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      &-center {
        background: #cfcfcf;
        border-radius: 16px;
        width: 200px;
        height: 10px;
        .progress-render-area {
          // background: linear-gradient(90deg, #108ee9 0%, #87d068 100%);
          background: #fff;
          height: 100%;
          border-radius: 16px;
        }
      }
    }
    .sys-move-round {
      position: absolute;
      width: 18px;
      height: 18px;
      top: 0;
      left: 0;
      cursor: move;
      background: #fff;
      border-radius: 100%;
      border: 0.5px solid #cfcfcf;
      box-shadow: 0 0 1px 0.5px #cfcfcf;
    }

    .disable-move {
      pointer-events: none;
    }
  }

  .disable-progress {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .percent {
    margin-left: 20px;
  }
}
</style>
