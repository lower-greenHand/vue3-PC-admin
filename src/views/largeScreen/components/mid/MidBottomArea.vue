<template>
  <div class="container">
    <BorderBox12>
      <div>中下</div>
    </BorderBox12>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { BorderBox12 } from '@kjgl77/datav-vue3';
export default defineComponent({
  name: 'MidBottomArea',
  components: {
    BorderBox12,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
