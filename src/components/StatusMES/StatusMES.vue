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
                    <div class="status row">

                        <div v-for="(s, index) in status" v-bind:key="index">

                            <div class="col-sm-6">
                           <div class="card-header card-header-stat">
                                <b>Status da thing </b>{{s.thingId}}
                            </div>
                            <div class="card-body card-s">
                                <label class="ls ls22">
                                    <b>Nome: </b>{{s.thing.thingName}}
                               </label>
                                <label class="ls ls22">
                                    <b>Código: </b>{{s.thing.thingCode}}
                                </label>
                                <button type="button" class="btn btn-outline-primary btn-sm btn-sm" v-b-toggle.cont>
                                Contextos
                                </button>
                            
                           <hr class="style3">

                            <b-collapse v-for="(c, index) in s.statusContexts" v-bind:key="index" id="cont">

                                <label class="ls ls22">
                                    <b>Contexto: </b>{{c.context}}
                               </label>
                                <label class="ls ls23">
                                    <b>Status: </b>{{c.statusName}}
                                </label>
                                <label class="ls ls24">
                                    <b>Valor: </b>{{c.value}}
                                </label>
                                
                        </b-collapse>
                            </div>
                        <hr class="style13">
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
