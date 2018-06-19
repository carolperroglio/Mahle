

<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <nav-bar :username="getUsername()"></nav-bar>
  </div>
</template>

<script>
import Vue from "vue";
import NavBar from "./components/Headers&Footers/NavBar.vue";
import axios from "axios";
import Router from "vue-router";
import AmCharts from "amcharts3";
import AmSerial from "amcharts3/amcharts/serial";
// import  ".././node_modules/amcharts3/amcharts/plugins/export/libs/fabric.js/fabric.js";
// require.resolve( ".././node_modules/amcharts3/amcharts/plugins/export/libs/FileSaver.js/FileSaver.js");
// require.resolve( ".././node_modules/amcharts3/amcharts/plugins/export/libs/jszip/jszip.js");
// require.resolve( ".././node_modules/amcharts3/amcharts/plugins/export/libs/pdfmake/pdfmake.js");
// require.resolve("amcharts3/amcharts/plugins/export/export.js");
// require.resolve("amcharts3/amcharts/plugins/export/export.css");
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

function getCookies(keyToFind) {
  var cookies = JSON.parse(JSON.stringify(document.cookie.split("; ")));
  var cookieNewArray = [];
  var secValue = "";

  for (var x = 0; x < cookies.length; x++) {
    var security = cookies[x].split("=")[0];

    if (security == keyToFind) {
      secValue = cookies[x].split("=")[1];
      console.log("secvalue: " + secValue);
      return secValue;
    }
    secValue = ""
    return secValue;
  }
}

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    var sec = getCookies("security");
    // ver isso depois
    var x = config["url"];
    console.log("x: " + x);
    if (
      x.includes("/login") ||
      x.includes("/fontawesome") ||
      x.includes("/export") ||
      x.includes("/api/things/")
    ) {
      console.log("é login ou things ou fontawesome");
    } else {
      if (sec.length == 0) {
        console.log("sec" + sec);
        VueCookies.set("status", "no-security");
        window.location = "/login";
      }
    }

    // console.log(sec);
    config.headers.common["security"] = sec;
    config.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers.common["Accept"] = "application/json";
    config.headers.common["Cache-Control"] = "no-cache";

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
    if (statuscode == "401") {
      router.push({ name: "Login" });
      console.log("status code: " + statuscode);
    } else if (error.message == "Network Error") {
      VueCookies.set("status", "Network Error");
      router.push({ name: "Login" });
      console.log("error.message: " + error.message);
      // Login.showModal('modaInfo');
      // showModal("modaInfo");
    } else if (
      error.response.status != undefined &&
      error.response.status == "404"
    ) {
      VueCookies.set("status", "404");
      console.log("status code: " + error.response.status);
      // showModal("modaInfo");
    } else if (
      error.response.status != undefined &&
      error.response.status == "400"
    ) {
      VueCookies.set("status", "400");
      console.log("status code: " + error.response.status);
    } else if (
      error.response.status != undefined &&
      error.response.status == "500"
    ) {
      VueCookies.set("status", "500");
      console.log("status code: " + error.response.status);
    } else {
      VueCookies.set("status", "ok");
      console.log("status code: " + statuscode);
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
    Login: Login
  },
  methods: {
    getUsername() {
      var username = VueCookies.get("username");
      return username;
    },
    redirectToLogin() {
      this.$router.push({ name: "Login" });
    }
    // showModal(id) {
    //   this.$refs[id].show();
    // }
  },
  beforeMount() {
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
