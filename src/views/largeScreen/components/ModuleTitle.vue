<template>
  <div class="module-title">
    <div class="line"></div>
    <div class="name">{{ title }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: {
      default: '',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.module-title {
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 22px;
  .line {
    width: 5px;
    height: 22px;
    border-radius: 2px;
    background: linear-gradient(to bottom, #06ccca, #aac3f3);
    margin-right: 10px;
  }
}
</style>
