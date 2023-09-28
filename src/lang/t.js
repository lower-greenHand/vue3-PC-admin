import { getLanguage } from './index';
import { useI18n } from 'vue-i18n';
export default (key) => {
  let { t } = useI18n();
  return t(key, {}, { locale: getLanguage() });
};
