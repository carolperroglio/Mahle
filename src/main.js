// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Bootstrap from 'bootstrap-vue'
import App from './App'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import AmCharts from 'amcharts3'
import router from './router'
import Router from 'vue-router'
import es6promisse from 'es6-promise'
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

// import 'amcharts3/amcharts/plugins/export/libs/jszip/jszip.js'
// import 'amcharts3/amcharts/plugins/export/libs/fabric/fabric.js'
// import 'amcharts3/amcharts/plugins/export/libs/xlsx/xlsx.js'


// import 'amcharts3/plugins/export/libs/export.css'

import popper from '.././node_modules/popper.js/dist/umd/popper.js'
import icones from '.././node_modules/font-awesome/css/font-awesome.min.css'
import '.././node_modules/amcharts3/amcharts/plugins/export/export.min.js'
import '.././node_modules/amcharts3/amcharts/plugins/export/export.js'
import 'amcharts3/amcharts/amcharts'
import Login from './components/Login/Login'


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