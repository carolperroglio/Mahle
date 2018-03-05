<template>
  <div>
      <nav class="fixed-top nav-history-alarm">
            <h1 class="title-page-history-alarm"><b>Histórico de Alarmes</b></h1>
            <ul class="nav d-flex align-items-center">
                <li class="nav-item-hist-alarm">
                  
                </li>
            </ul>
        </nav>

<div class="row conteudotabela">
            
            <div class="col-sm-2">
            <select class="form-control-outline-secondary" v-model="newGroup">    
                <option v-for="(g,index) in groups" :value="g" v-bind:key="index">{{g}}</option>
            </select>
            </div>
            <div class="col-sm-2">
            <button type="button" class="btn btn-info btn-sm btn-sm" @click.prevent="editGroup(newGroup)">
                Editar Grupo
            </button>
            </div>
            <div class="col-sm-2">
            <button type="button" class="btn btn-warning btn-sm btn-sm pull-left" style="color:white" @click.prevent="refreshGraph()">
                Atualizar Gráfico
            </button>
            </div>
            <div class="col-sm-2">
            <button type="button" class="btn btn-danger btn-sm btn-sm pull-left" @click.prevent="toPdf()">
               <i class="fa fa-file-pdf-o"></i> Exportar para PDF
            </button>
            </div>
            <div class="col-sm-2">
             <download-excel
                class   = "btn btn-success btn-sm btn-sm pull-left"
                :data   = provider
                :fields = jsonfields
                :name    = filename >
                 <i class="fa fa-file-excel-o"></i> Exportar para Excel
            </download-excel>
            </div>
            <br>
            <br>
            <div class="col-md-12">
                <table class="table1">
                    <thead>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </thead>
                </table>
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
                            <button class="btn btn-success" @click.stop.prevent="getAlarmHistory()">
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
<script src="./js/historianalarm.js">
</script>
<style>
@import url("./css/historianalarm.css");
</style>
