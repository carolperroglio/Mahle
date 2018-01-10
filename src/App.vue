

<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <nav-bar></nav-bar>

    <!--<router-view/>-->
  </div>
</template>

<script>
import NavBar from './components/Headers&Footers/NavBar.vue'
// import Autocomplete from 'v-autocomplete'
import Vue from 'vue'
// import 'v-autocomplete/dist/v-autocomplete.css'
// Vue.use(Autocomplete)

export default {
  name: 'app',
  components: { NavBar }
}
</script>

<style>
.progress {
  top: 38% !important;
  left: 15% !important;
  z-index: 1000;
}
</style>
