module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended', // 这里设置 Vue 3 相关规则
    'prettier',
  ],
  parserOptions: {
    parser: '@javaScript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
};
