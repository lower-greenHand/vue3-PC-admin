<template>
  <Particles
    id="tsparticles"
    class="login-partic"
    ref="tsparticles"
    :options="options"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
  />
</template>

<script>
import { defineComponent, onUnmounted, ref } from 'vue';
import { loadFull } from 'tsparticles';
import data from './bgData';
// 多边形遮掩
// import { loadPolygonMaskPlugin } from 'tsparticles-plugin-polygon-mask';
export default defineComponent({
  components: {},
  setup() {
    const options = data;
    const tsparticles = ref(null);

    const particlesInit = async (engine) => {
      await loadFull(engine);
      // await loadPolygonMaskPlugin(engine);
    };

    const particlesLoaded = () => {};

    onUnmounted(() => {
      if (tsparticles.value) {
        tsparticles.value.destroy();
      }
    });

    return {
      options,
      tsparticles,
      particlesInit,
      particlesLoaded,
    };
  },
});
</script>

<style lang="less" scoped>
.login-partic {
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 100%;
}
</style>
