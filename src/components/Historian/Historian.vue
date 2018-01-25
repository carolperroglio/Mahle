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
                  <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                  </div>
                  <div class="history">
                    <div class="row">
                       <button type="button" class="btn btn-outline-primary btn-sm btn-sm" @click.prevent="showModal()">
                      Editar Período
                    </button>
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
