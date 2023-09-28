<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  >
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
// import svgIcons from 'virtual:svg-icons-names'; // 获取所有svg名称
export default defineComponent({
  props: {
    prefix: {
      default: 'icon',
    },
    name: {
      required: false,
      default: 'fixPwd',
    },
    size: {
      default: '20',
    },
    color: {
      default: () => '',
    },
  },
  setup(props) {
    const symbolId = computed(() => {
      return `#${props.prefix}-${props.name}`;
    });
    onMounted(() => {
      // console.log('symbolId', svgIcons);
    });

    return { props, symbolId };
  },
});
</script>

<style lang="less" scoped>
.svg-icon {
  vertical-align: -5px;
  overflow: hidden;
  fill: currentColor;
  margin-right: 2px;
}
</style>
