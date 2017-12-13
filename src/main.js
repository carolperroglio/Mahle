// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('../node_modules/ngrok/index.js')
import Vue from 'vue'
import App from './App'
import router from './router'
import popper from  '.././node_modules/popper.js/dist/umd/popper.js'
import jquery from '.././node_modules/jquery/src/jquery.js'
import Bootstrap from '.././node_modules/bootstrap/dist/css/bootstrap.min.css'
import BootstrapJs from '.././node_modules/bootstrap/dist/js/bootstrap.min.js'
import icones from '.././node_modules/font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})