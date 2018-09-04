// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import axios from 'axios';
import echarts from 'echarts';

import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import api from "./api";

Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(require('vue-moment')); 

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts

//localStorage.debug = 'ali-oss'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
