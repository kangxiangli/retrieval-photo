import Vue from "vue";
import VueI18n from "vue-i18n";

// 注册多语言;
Vue.use(VueI18n);

const defaultLocale = localStorage.getItem("LANGUAGE") || navigator.language;

const i18n = new VueI18n();

/** 设置语言
 * @param {*} lang
 */
function setLocale(lang) {
  const locale = lang || defaultLocale;
  // let pageLang = window.setLocalLang(lang);
  const elementUILang = require(`element-ui/lib/locale/lang/${locale}`);
  const messages = { ...elementUILang.default };
  i18n.setLocaleMessage(locale, messages);
  i18n.locale = locale;
}

setLocale(defaultLocale);

export {
  i18n,
  setLocale
};
