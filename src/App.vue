
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
import router from "./router";
import Bootstrap from "bootstrap-vue";
import es6promisse from "es6-promise";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import bModal from "bootstrap-vue/es/components/modal/modal";
import popper from ".././node_modules/popper.js/dist/umd/popper.js";
import icones from ".././node_modules/font-awesome/css/font-awesome.min.css";
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
var Login = require("./components/Login/Login");
window.Vue = Vue;
es6promisse.polyfill();
Vue.use("vue-cookies");
Vue.use("vue-router");

Vue.use({
  install: function(Vue, options) {
    Vue.prototype.$jQuery = require("jquery");
    Vue.prototype.$cookies = require("vue-cookies");
  }
});
Vue.use(Router);
Vue.use(bModal);
Vue.use(Datetime);

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
    return secValue;
  }
}

axios.interceptors.request.use(
  function(config) {
    //Do something before request is sent
    // var sec = getCookies("security");
    var sec = VueCookies.get("security");
    console.log("sec: " + sec);
    //ver isso depois
    var x = config["url"];
    console.log("x: " + x);
    if (
      x.includes("/login") ||
      x.includes("/fontawesome") ||
      x.includes("/export") ||
      x.includes("/api/things/") ||
      x.includes("/api/alarm/")
    ) {
      console.log("é login ou things ou fontawesome ou alarms");
    } else {
      if (sec == null) {
        console.log("sec" + sec);
        VueCookies.set("status", "no-security");
        console.log("no-security");
        // window.location = "/login";
      }
    }

    config.headers.common["security"] = sec;
    config.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers.common["Accept"] = "application/json";
    config.headers.common["Cache-Control"] = "no-cache";

    return config;
  },
  function(error) {
    //Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((response) => {
    // intercept the global error
    // if (reponse!=undefined && reponse.status!=undefined && reponse.status==404) {
    //   router.push({ name: "Login" });
    //   console.log( response);      
    // }
    return response;
  },
  function(error) {
    var statuscode = VueCookies.get("status");
    if (statuscode == "401") {
      router.push({ name: "Login" });
      console.log("status code: " + statuscode);      
    } else if (statuscode == "no-security") {
      router.push({ name: "Login" });
      console.log("status code: " + statuscode);    
    } else if (error.message == "No Security Header in the request") {
      VueCookies.set("status", "No Security Header in the request");
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
      //VueCookies.set("status", "500");
      console.log("status code: " + error.response.status);
    } else if (statuscode == "Cannot read property 'status' of undefined") {            
      console.log("status code: " + statuscode);    
      VueCookies.remove('security');
      VueCookies.set('username', null);
      VueCookies.set('status', 'logoff');                  
      //redireciona para a tela principal STATUS DO MES            
      router.push( { name: "Login" } );      
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
    }
  },
  created() {
    if (process.env.USER_TRUE) {
      VueCookies.set("security", "credential.security", Infinity);
      VueCookies.set("username", "spi", Infinity);
      VueCookies.set("status", "ok");
    }
  },
  beforeMount() {
    // Login.default.methods.showModal('modaInfo')
    // this.showModal("modaInfo");
  }
};
</script>

<style>
/* .progress {
  top: 38% !important;
  left: 15% !important;
  z-index: 1000;
} */
</style>
