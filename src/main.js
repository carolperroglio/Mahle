// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Bootstrap from 'bootstrap-vue'
import App from './App'
import router from './router'
Vue.use({
    install: function(Vue, options) {
        Vue.prototype.$jQuery = require('jquery');
    }
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'amcharts3/amcharts/plugins/export/export.css'
import 'amcharts3/amcharts/plugins/export/export.min.js'
import 'amcharts3/amcharts/plugins/export/libs/pdfmake/pdfmake.js'


// import 'amcharts3/plugins/export/libs/export.css'

import popper from '.././node_modules/popper.js/dist/umd/popper.js'
import icones from '.././node_modules/font-awesome/css/font-awesome.min.css'
// import '.././node_modules/amcharts3/amcharts/plugins/export/export.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})