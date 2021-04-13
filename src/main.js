import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'babel-polyfill'

import "./plugins/commoncomponents"; // 引入全局注册组件

import '../src/assets/css/reset.css'//公共重置初始化样式


import api from "./plugins/api.js";
import axios from "./plugins/axios.js"
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;

import $ from 'jquery'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$URL = 'http://fd.sctsjkj.com:5081';

Vue.config.productionTip = false

if(localStorage.getItem('userinfo')){
  let info = JSON.parse(localStorage.getItem("userinfo"));
  store.commit("setUserInfo", info);
}


console.log("location.hostname",location.hostname)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
