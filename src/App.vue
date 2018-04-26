

<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <nav-bar :username="getUsername()"></nav-bar>

    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/Headers&Footers/NavBar.vue";
import Vue from "vue";
import axios from "axios";
import Router from 'vue-router'
import VueCookies from "vue-cookies";
Vue.use("vue-cookies");
Vue.use("vue-router");

export default {
  name: "app",
  data() {
    return {};
  },
  components: { NavBar,Router },
  methods: {
    getUsername() {
      var username = VueCookies.get("username");
      return username;
    },
    redirectToLogin() {
      this.$router.push({ name: "Login" });
    }
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
