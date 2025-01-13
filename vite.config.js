import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import VitePluginCertificate from 'vite-plugin-mkcert';
import { viteMockServe } from 'vite-plugin-mock';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import path, { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig((mode, command) => {
  const env = loadEnv(mode.mode, process.cwd(), '');
  const { VITE_PUBLIC_PATH, VITE_PORT } = env;
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [
          resolve(process.cwd(), 'src/assets/svgs'),
          resolve(process.cwd(), 'src/assets/icon'),
        ],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // 签名 // 可以使用https访问，
      VitePluginCertificate({
        source: 'coding',
      }),
      viteMockServe({
        supportTs: false,
        logger: false,
        localEnabled: true, //设置是否启用本地mock文件
        prodEnabled: false, //设置打包是否启用 mock 功能
        mockPath: './mock/', // 注意：此时的 mockPath 地址是真正安装的 mock 文件夹的地址;
      }),
      viteCompression({
        verbose: true, // 默认即可
        disable: false, // 开启压缩(不禁用)，默认即可
        deleteOriginFile: false, // 删除源文件
        threshold: 10240, // 压缩前最小文件大小
        filter: /\.(js|css|json|html|ico|svg)(\?.*)?$/i, // 匹配要压缩的文件的正则表达式，默认为匹配.js、.css、.json、.html、.ico和.svg文件
        algorithm: 'gzip', // 压缩算法
        compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
        ext: '.gz', // 文件类型
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      visualizer({
        open: false, // 在默认用户代理中打开生成的文件
        gzipSize: true, // 收集 gzip 大小并将其显示
        brotliSize: true, // 收集 brotli 大小并将其显示
        // filename: 'stats.html', // 分析图生成的文件名
        filename: './node_modules/.cache/visualizer/stats.html',
      }),
    ],
    root: process.cwd(),
    base: VITE_PUBLIC_PATH,
    build: {
      drop_debugger: true,
      //drop_console: true, // 删除所有 console
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
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
      https: true,
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
      postcss: {
        plugins: [tailwindcss, autoprefixer()],
      },
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
