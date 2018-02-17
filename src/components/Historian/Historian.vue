<template>
  <div>
        <nav class="fixed-top nav-history">
            <h1 class="title-page-history"><b>Relatório de Rastreamento</b></h1>
            <ul class="nav d-flex align-items-center">
                 <li class="nav-item-hist">
                  
                </li>
            </ul>
        </nav>
        <div class="row conteudo-history">
              <div class="container-fluid">
                <div id="load" v-show="carregando">
                <stretch></stretch>
                </div>    

                  <div class="history">
                    <div class="row">
                        <div class="col-sm-8">
                          <h3>Thing nº: {{thingId}} - Grupo: {{thingName}}</h3>
                        </div>
                        <div class="col-sm-4">
                       <button type="button" class="btn btn-secondary btn-sm btn-sm" @click.prevent="showModal()">
                            Editar Período
                       </button>
                        </div>
                        <br>
                        <br>
                        <div class="col-lg-11">
                            <div id="chartdiv" style="width: 100%; height: 400px;"></div>
                        </div>
              </div>
            </div>
        </div>
        </div>

        <b-modal ref="myModalEdit" hide-footer title="Selecionar Período">
                    <div class="modal-body">
                       
                    <label><b>Thing: </b></label>  
                    <div class="row">
                      <div class="col-md-9">
                       <select class="form-control-outline-secondary" v-model="thingId">    
                            <option v-for="(t,index) in things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}
                            </option>
                        </select>
                      </div>
                    </div>
                    <br>
                      <label><b>Início: </b></label>  
                    <div class="row">
                        <div class="col-md-6">
                            <date-picker v-model="date" :config="config"></date-picker>
                        </div>
                        <div class="col-md-3">
                            <vue-timepicker format="HH:mm" v-model="timeIni"></vue-timepicker>
                        </div>
                    </div>
                    <br>
                    <label><b>Fim: </b></label>  
                    <div class="row">
                        <div class="col-md-6">
                            <date-picker v-model="datef" :config="config2"></date-picker>
                        </div>
                        <div class="col-md-3">
                            <vue-timepicker format="HH:mm" v-model="timeFim"></vue-timepicker>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" @click.stop.prevent="getHistory()">
                                <i class="fa fa-check"></i>
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-remove" @click.stop.prevent="hideModal()"></i>
                            </button>
                        </div>
                    </div>
          </b-modal>
  </div>
</template>

<script src="./js/historian.js">
</script>

<style>
@import url("./css/historian.css");
</style>
