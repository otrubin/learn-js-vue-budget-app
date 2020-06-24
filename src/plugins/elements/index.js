import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/packages/theme-chalk/lib/index.css';
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Option,
    Select,
    Alert,
    Dialog,
    RadioGroup,
    Radio,
 } from 'element-ui';

 const elements = [
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Option,
    Select,
    Alert,
    Dialog,
    RadioGroup,
    Radio,
 ];
//  console.log(elements, Vue, lang, locale);

  locale.use(lang);
  elements.forEach(el => Vue.use(el, {locale}));