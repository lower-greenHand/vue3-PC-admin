import { createI18n } from 'vue-i18n';
// 引入同级目录下文件
const moduleZH = import.meta.globEager('./zh_CN/**/*.js');
const moduleEN = import.meta.globEager('./en_US/**/*.js');
// 获取当前语言
export const getLanguage = () => {
  let lang = 'zh_CN';
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  }
  return lang;
};

export const langKeys = [
  {
    value: 'zh_CN',
    label: '简体中文',
  },
  {
    value: 'en_US',
    label: 'English',
  },
];

// 获取当前语言下所有语言配置
export function getLangAll() {
  let message = {};
  const modules = getLanguage() == 'zh_CN' ? moduleZH : moduleEN;
  message = getLangFiles(modules, message);
  return message;
}

const getLangFiles = (langList, msg) => {
  Object.keys(langList).forEach((item) => {
    const langFileModule = langList[item].default;
    let fileName = item.replace(/^\.\//, '');
    if (langFileModule) {
      const pathName = fileName
        .substring(fileName.lastIndexOf('/') + 1)
        .split('.')[0];
      if (msg[pathName]) {
        msg[pathName] = { ...msg[pathName], ...langFileModule };
      } else {
        msg[pathName] = langFileModule;
      }
    }
  });
  return msg;
};

//注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  messages: {
    [getLanguage()]: getLangAll(),
  },
  silentTranslationWarn: true,
});

export default i18n;
