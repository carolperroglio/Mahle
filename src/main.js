// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Bootstrap from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import router from './router'
import Router from 'vue-router'
import es6promisse from 'es6-promise'
import popper from '.././node_modules/popper.js/dist/umd/popper.js'
import icones from '.././node_modules/font-awesome/css/font-awesome.min.css'
import Login from './components/Login/Login'
// import AmCharts from 'amcharts3'
// import AmSerial from 'amcharts3/amcharts/serial'
es6promisse.polyfill();

Vue.use({
    install: function(Vue, options) {
        Vue.prototype.$jQuery = require('jquery');
        Vue.prototype.$cookies = require('vue-cookies');
    }
})
Vue.use(VueCookies);
Vue.use(Router);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App,
        Router,
        Login
    }
})