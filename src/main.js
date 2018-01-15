// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Bootstrap from 'bootstrap-vue'
import App from './App'
import router from './router'

Vue.use({
    install: function(Vue, options){
        Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
    }
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import popper from '.././node_modules/popper.js/dist/umd/popper.js'
import icones from '.././node_modules/font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})