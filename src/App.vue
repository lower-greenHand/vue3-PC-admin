<template>
  <ConfigProvider :locale="locale">
    <router-view />
  </ConfigProvider>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import en_US from 'ant-design-vue/es/locale/en_US';
import { getLanguage } from './lang';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
dayjs.locale('zh-cn');
export default defineComponent({
  components: {
    ConfigProvider,
  },
  setup() {
    const locale = ref(getLanguage() == 'zh_CN' ? zh_CN : en_US);
    watch(locale, (val) => {
      dayjs.locale(val == 'zh_CN' ? 'zh-cn' : 'en');
    });
    return { locale };
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
button {
  outline: none;
}
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  overflow-y: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
}
/* #nprogress .bar { */
/*自定义进度条颜色*/
/* background: #d9393b !important; */
/* } */
#app {
  height: 100%;
  background-color: #f0f2f5;
}
</style>
