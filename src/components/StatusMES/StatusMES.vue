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
                    <div class=" col-md-4 offset-md-3" style="margin-bottom:5%">
                    <div class="card">
                        <div class="card-header">
                            Legendas
                        </div>
                        <div class="card-body">
                            Alta: <i class="fa fa-square" style="color:#ed0404" aria-hidden="true"></i> - 
                            Baixa: <i class="fa fa-square" style="color:#f5fc28" aria-hidden="true"></i> - 
                            Normal: <i class="fa fa-square" style="color:#4bff30" aria-hidden="true"></i> - 
                            Offline: <i class="fa fa-square" style="color:#b2b7b2" aria-hidden="true"></i>
                        </div>
                    </div>
                    </div>
                    <div class="row">
                        <div v-for="(s, index) in status" v-bind:key="index" id="constat" class="">
                            <div :style="getClass(s)">
                                <h4 class="ls ls22">
                                    {{s.thingName}}
                                </h4>
                                <div>
                                <label v-if="s.hasRedAlert == true">
                                    <b>Nome:</b>
                                    <span v-for="(a, index) in s.alarms" v-bind:key="index" v-if="a.priority == 2">
                                        {{a.alarmName}}, </span>
                                </label>
                                <label v-else-if="s.hasLowAlert == true">
                                    <b>Nome:</b>
                                    <span v-for="(a, index) in s.alarms" v-bind:key="index"  v-if="a.priority == 1">
                                        {{a.alarmName}}, </span>
                                </label>
                                <label v-else-if="s.hasGreenAlert == true">
                                    <b>Nome:</b>
                                    <span v-for="(a, index) in s.alarms" v-bind:key="index" v-if="a.priority == 0">
                                        {{a.alarmName}}, </span>
                                </label>
                                <br>
                                </div>
                                <!-- <button class="btn btn-outline-info btn-sm pull-right"
                                @click.stop.prevent="onEnable('cont'+ s.thingId);" 
                                :aria-controls="'cont'+ s.thingId">
                                    <b>Listar Alarmes</b>
                                </button> -->
                                <br>
                                <br>
                                <!-- <b-collapse :id="'cont'+s.thingId" > -->
                                    <!-- <div v-for="(st, index) in s.alarms" v-bind:key="index" :style="'background-color:'+st.alarmColor">
                                       <b>Nome: </b>{{st.alarmName}}
                                    <br>
                                    <b>Status: </b>{{st.alarmDescription}} -->
                                    <!-- <hr class="style13"> -->
                                <!-- </div> -->
                                <!-- </b-collapse> -->
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
