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
                  <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                  </div>
                  <div class="status">
                    <div class="row">
                        <div v-for="(s, index) in status" v-bind:key="index" id="constat">
                            <content-md :class="selectedTheme[index]" >
                                <h1 class="ls ls22">
                                    {{s.thing.thingName}}
                               </h1>
                                <label>
                                    <b>Código: </b>{{s.thing.thingCode}}
                                </label>
                                <br>
                                <button v-b-toggle="'cont'+s.thingId" class="btn btn-outline-secondary btn-sm pull-right" @click.stop.prevent="onEnable(s)">
                                    Contexto
                                </button>
                                <br>
                                <br>
                                <b-collapse :id="'cont'+s.thingId" >
                                    <div v-for="(st, index) in stat.statusContexts" v-bind:key="index">
                                       <b>Status: </b>{{st.statusName}}
                                    <br>
                                    <b>Valor: </b>{{st.value}}
                                    <hr class="style13">
                                </div>
                                </b-collapse>
                            </content-md>
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
