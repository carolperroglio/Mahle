

<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <nav-bar :username="getUsername()"></nav-bar>
  </div>
</template>

<script>
import Vue from "vue";
import NavBar from "./components/Headers&Footers/NavBar.vue";
// import AmCharts from 'amcharts3'
// import AmSerial from 'amcharts3/amcharts/serial'
import axios from "axios";
import Router from "vue-router";
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/plugins/export/export.js'
import 'amcharts3/amcharts/plugins/export/export.css'
import VueCookies from "vue-cookies";
import router from "./router";
import Bootstrap from "bootstrap-vue";
import es6promisse from "es6-promise";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import bModal from "bootstrap-vue/es/components/modal/modal";
import popper from ".././node_modules/popper.js/dist/umd/popper.js";
import icones from ".././node_modules/font-awesome/css/font-awesome.min.css";
var Login = require("./components/Login/Login");

es6promisse.polyfill();
Vue.use("vue-cookies");
Vue.use("vue-router");

Vue.use({
  install: function(Vue, options) {
    Vue.prototype.$jQuery = require("jquery");
    Vue.prototype.$cookies = require("vue-cookies");
  }
});
Vue.use(VueCookies);
Vue.use(Router);
Vue.use(bModal);


Vue.config.productionTip = false;

function showModal(id) {
  bModal[id].show();
  $refs[id].show();
}

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    var sec = VueCookies.get("security");
    console.log(sec);
    config.headers.common["security"] = sec;
    config.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers.common["Accept"] = "application/json";

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // intercept the global error
    return response;
  },
  function(error) {
    var statuscode = VueCookies.get("status");
    //&& errorResponse.config && !errorResponse.config.__isRetryRequest
    if (statuscode == '401') {
      router.push({ name: "Login" });
      console.log('status code: ' + statuscode);
    } else if (error.message == "Network Error") {
      router.push({ name: "Login" });
      console.log('error.message: ' + error.message);
      // Login.showModal('modaInfo');
      // showModal("modaInfo");
    } else if (error.response.status != undefined && error.response.status == "404") {
      VueCookies.set("status", "404");
      console.log('status code: ' + error.response.status);
      // showModal("modaInfo");
    } else {
      VueCookies.set("status", "ok");
      console.log('status code: ' + statuscode);
    }
    return Promise.reject(error);
  }
);

export default {
  name: "app",
  data() {
    return {
      msgErro: "Deu ruim"
    };
  },
  components: {
    NavBar,
    Router,
    "b-modal": bModal,
    Login:Login
  },
  methods: {
    getUsername() {
      var username = VueCookies.get("username");
      return username;
    },
    redirectToLogin() {
      this.$router.push({ name: "Login" });
    },
    // showModal(id) {
    //   this.$refs[id].show();
    // }
  },
  beforeMount(){
    // Login.default.methods.showModal('modaInfo')
    // this.showModal("modaInfo");
  }
};
</script>

<style>
.progress {
  top: 38% !important;
  left: 15% !important;
  z-index: 1000;
}
</style>
