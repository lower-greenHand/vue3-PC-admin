<template>
  <div class="container">
    <span class="text">admin 开箱即用后台系统</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.container {
  margin-bottom: 25px;
  text-align: center;
  z-index: 10;
  // filter: contrast(30);
}
.text {
  font-size: 40px;
  font-weight: 600;
  letter-spacing: -5px;
  color: #fff;
  animation: move-letter 2s linear forwards; //forwards当动画完成后，保持最后一帧的状态
}
@keyframes move-letter {
  0% {
    opacity: 0;
    letter-spacing: -10px;
    filter: blur(5px);
  }
  25% {
    opacity: 1;
  }
  50% {
    filter: blur(5px);
  }
  100% {
    letter-spacing: 5px;
    filter: blur(0);
  }
}
</style>
