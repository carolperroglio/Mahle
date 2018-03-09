<template>
  <div>
        <nav class="fixed-top nav-status">
            <h1 class="title-page-status"><b>Visualização de Status de MES</b></h1>
            <ul class="nav d-flex align-items-center">
                 <li class="nav-item-stat">
                </li>
            </ul>
        </nav>
        <div class="row conteudo-status">
              <div class="container-fluid">
                <div id="load" v-show="carregando">
                    <stretch background="#4d4d4d"></stretch>
                </div> 
                  <div class="status">
                    <div class="row">
                        <div v-for="(s, index) in status" v-bind:key="index" id="constat" class="">
                            <div class="tile-bg">
                                <h4 class="ls ls22">
                                    {{s.thingName}}
                               </h4>
                                <label>
                                    <b>Código: </b>{{s.thingId}}
                                </label>
                                <br>
                                <button class="btn btn-outline-info btn-sm pull-right"
                                @click.stop.prevent="onEnable('cont'+ s.thingId);" 
                                :aria-controls="'cont'+ s.thingId">
                                    <b>Listar Alarmes</b>
                                </button>
                                <br>
                                <br>
                                <b-collapse :id="'cont'+s.thingId" >
                                    <div v-for="(st, index) in s.alarms" v-bind:key="index" :style="'background-color:'+st.alarmColor">
                                       <b>Nome: </b>{{st.alarmName}}
                                    <br>
                                    <b>Status: </b>{{st.alarmDescription}}
                                    <!-- <hr class="style13"> -->
                                </div>
                                </b-collapse>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
            </div>
        </div>
</template>

<script src="./js/status.js">
</script>

<style>
@import url("./css/status.css");
</style>
