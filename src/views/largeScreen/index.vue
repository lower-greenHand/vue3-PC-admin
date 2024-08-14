<template>
  <FullScreenContainer class="large-screen" ref="fullScreenRef">
    <div class="large-screen-header">
      <div class="full-screen" @click="toggleFullscreen">
        <SvgIcon name="full_screen" size="24" v-if="!isShowScreen" />
        <SvgIcon name="close_full_screen" size="24" v-show="isShowScreen" />
      </div>
      <div class="user_name">
        <SvgIcon name="screen_user" />
        <div class="name">admin</div>
      </div>
    </div>
    <BorderBox11 title="admin可视化大屏" :title-width="400" :animate="false">
      <div class="screen-container">
        <div class="left-screen">
          <div class="common-w">
            <LeftTopArea />
          </div>
          <div class="common-f common-m">
            <LeftMidArea />
          </div>
          <div class="common-w">
            <LeftBottomArea />
          </div>
        </div>
        <div class="mid-screen">
          <div class="common-h-f">
            <MidTopArea />
          </div>
          <div class="common-h">
            <MidBottomArea />
          </div>
        </div>
        <div class="right-screen">
          <div class="common-w">
            <RightTopArea />
          </div>
          <div class="common-f common-m">
            <RightMidArea />
          </div>
          <div class="common-w">
            <RightBottomArea />
          </div>
        </div>
      </div>
    </BorderBox11>
  </FullScreenContainer>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { FullScreenContainer, BorderBox11 } from '@kjgl77/datav-vue3';
import { useFullscreen } from '@vueuse/core';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import {
  LeftTopArea,
  LeftMidArea,
  LeftBottomArea,
} from './components/left/index';
import { MidTopArea, MidBottomArea } from './components/mid/index';
import {
  RightTopArea,
  RightMidArea,
  RightBottomArea,
} from './components/right/index';
export default defineComponent({
  components: {
    FullScreenContainer,
    BorderBox11,
    SvgIcon,
    LeftTopArea,
    LeftMidArea,
    LeftBottomArea,
    MidTopArea,
    MidBottomArea,
    RightTopArea,
    RightMidArea,
    RightBottomArea,
  },
  setup() {
    const fullScreenRef = ref(null);
    const isShowScreen = ref(false);
    const { isFullscreen, enter, exit, toggle } = useFullscreen(fullScreenRef);
    watch(
      () => isFullscreen.value,
      () => {
        isShowScreen.value = isFullscreen.value;
      }
    );
    // 是否全屏
    const toggleFullscreen = () => {
      toggle();
    };
    return { isShowScreen, isFullscreen, fullScreenRef, toggleFullscreen };
  },
});
</script>

<style lang="less" scoped>
.large-screen {
  width: 100vw;
  height: 100vh;
  background: #030a34;
  position: relative;
  &-header {
    color: #fff;
    position: absolute;
    right: 30px;
    top: 2px;
    display: flex;
    align-items: center;
    z-index: 9999;
    .full-screen {
      margin-right: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .user_name {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 6px;
      .name {
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }
  ::v-deep(.dv-border-box-11-title[fill]) {
    font-size: 26px;
    letter-spacing: 5px;
    font-weight: 600;
    // animation: stroke 6s linear infinite;
  }
  // @keyframes stroke {
  //   0% {
  //     fill: rgb(230, 235, 227);
  //     opacity: 0.2;
  //   }
  //   50% {
  //     fill: rgb(194, 139, 28);
  //     opacity: 0.6;
  //   }
  //   100% {
  //     fill: #ba21e4;
  //     opacity: 1;
  //   }
  // }

  .screen-container {
    position: absolute;
    top: 32px;
    bottom: 9px;
    left: 12px;
    right: 12px;
    display: flex;
    .left-screen {
      color: #fff;
      font-weight: 500;
      width: 30%;
      display: flex;
      flex-direction: column;
    }
    .mid-screen {
      flex: 1;
      display: flex;
      color: #fff;
      font-size: 32px;
      flex-direction: column;
    }
    .right-screen {
      width: 30%;
      display: flex;
      flex-direction: column;
      color: #fff;
      font-size: 32px;
    }
    .common-w {
      height: 25%;
      width: 100%;
    }
    .common-f {
      flex: 1;
      width: 100%;
    }
    .common-m {
      margin: 12px 0;
    }
    .common-h-f {
      margin-top: 30px;
      flex: 1;
      width: 100%;
    }
    .common-h {
      height: 35%;
      width: 100%;
    }
  }
}
</style>
