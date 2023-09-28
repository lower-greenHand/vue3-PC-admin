import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default defineConfig((mode, command) => {
  const env = loadEnv(mode.mode, process.cwd(), '');
  const { VITE_PUBLIC_PATH, VITE_PORT } = env;
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        supportTs: false,
        logger: false,
        localEnabled: true, //设置是否启用本地mock文件
        prodEnabled: false, //设置打包是否启用 mock 功能
        mockPath: './mock/', // 注意：此时的 mockPath 地址是真正安装的 mock 文件夹的地址;
      }),
    ],
    root: process.cwd(),
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: '/@',
          replacement: resolve(__dirname, '/src'),
        },
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
      ],
    },
    define: {
      'process.env': env,
      __INTLIFY_PROD_DEVTOOLS__: false,
      FEATURE_FLAG: true,
    },
    server: {
      host: '0.0.0.0', //  Listening on all local IPs
      port: VITE_PORT, // 将端口号替换为你希望使用的端口号
      proxy: {
        '/auth': {
          target: 'https://particles.js.org', //接口域名
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(/^\/auth/, ''),
          // secure: false, //  secure 为 false 时，代理将会在使用 HTTP 进行请求时忽略 SSL 证书的验证
        },
        // '/api': {
        //   target: 'http://172.31.83.121:8088', //接口域名
        //   changeOrigin: true, //是否跨域
        //   rewrite: (path) => path.replace(/^\/api/, '/api'),
        //   // secure: false, //  secure 为 false 时，代理将会在使用 HTTP 进行请求时忽略 SSL 证书的验证
        // },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
          @import "${resolve(__dirname, '/@/assets/css/index.less')}";
          @import "${resolve(__dirname, '/@/design/index.less')}";
          `,
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'dayjs/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'dayjs/locale/en',
      ],
      // exclude: ['vue-demi', 'consolidate'],
    },
  };
});
