import { createApp } from 'vue';
import router from './router/index.js';
import App from './App.vue';
import i18n from './lang/index.js';
import store from '/@/store/index.js';
import 'virtual:svg-icons-register';
import Particles from 'vue3-particles';
import 'default-passive-events';
if (process.env.NODE_ENV) {
  import('ant-design-vue/dist/antd.css');
}

const app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(Particles);
app.mount('#app');
