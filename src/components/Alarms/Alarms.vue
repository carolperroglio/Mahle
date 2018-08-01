<template>
    <div> 
        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->
        <div class="fixed-top nav-cinza">            
            <ul class="nav d-flex">
                <li class="nav-items-alarms col-md-12">
                    <h1 style="margin: 1.5% 0 1.5% 2%; " class="title-page-gp"><b>Relatório de Alarmes</b></h1>
                </li>
                <li class="nav-item-alarms col-md-2">
                <button type="button" class="btn btn-info btn-lg"  @click.prevent="showModal('filterSearch')">
                    Filtrar Busca
                </button>
                </li>    
                <!-- <li class="nav-item-alarms col-md-2">
                    <button class="btn btn-primary" @click="getReport()">Texto</button> 
                </li>                      -->
            </ul>
        </div>
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>            
        <!-- GRÁFICO DOS ALARMES -->
        <div id="chartAlarm" style="width: 100%; height: 400px;margin-top: 15%;"></div>                           
        
        <!-- Botão para escolher o grupo a ser exibido -->
        <div class="row">
        <div class="col-md-2" style="margin-left:3%">
        <select class="form-control" v-model="groupselected" @change.prevent="makeGraph(groupselected)">    
            <option v-for="(g,index) in groups" :value="g" v-bind:key="index" >{{g}}</option>
        </select>
        </div>
        <div class="col-md-2  offset-4 pull-right">
            <button type="button" class="btn btn-danger btn-sm pull-right" @click.prevent="toPdf()">
               <i class="fa fa-file-pdf-o"></i> Exportar para PDF
            </button>
        </div>
        <div class="col-md-2 pull-right">
        <download-excel
            class   = "btn btn-success btn-sm pull-right"
            :data   = dataProvider
            :fields = jsonfields
            name = 'alarmsreport.xls'><i class="fa fa-file-excel-o"></i> Exportar para Excel
        </download-excel>    
        </div>
        </div>             
        <!-- TABELA DOS ALARMES -->
        <div class="cabecalho-table-alarms"  v-show="!carregando" v-if="tableAlarms.length > 0">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(produtos, 'product',0):organizar(produtos, 'product',0);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">Parâmetro
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(produtos, 'minValue',1):organizar(produtos, 'minValue',1);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Equipamento
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Tipo
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Data
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Hora Início
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Hora Fim
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>                
        </div>                                             

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Listagem dos produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->                            
        <div v-show="!carregando" class="alarms-produtos">
            <div v-for="(t, index) in tableAlarms" v-bind:class="{cinza: index%2==0}" :key="index">                                    
                <label class="ls2 col-md-2">
                    {{t.groupTag}}</label>
                <label class="ls2 col-md-2">
                    {{thingNameInTable}}</label>
                <label class="ls2 col-md-1">
                    {{t.type}}</label>
                <label class="ls2 col-md-2">
                    {{t.dateIni}}</label>
                <label class="ls2 col-md-2">
                    {{t.hourIni}}</label>
                <label class="ls2 col-md-2">
                    {{t.dateEnd}}</label>
            </div>                       
        </div> 
        
    <b-modal ref="filterSearch" no-close-on-backdrop hide-footer title="Filtrar Busca">
        <div class="modal-body">
        <div class="form-row">
        <div class="form-group  col-md-6">
        <label><b>Filtrar por</b></label>
        <select class="form-control" v-model="filterSelected">   
            <option value="" selected disabled>Buscar por:</option>
            <option value="op" key="op">OP</option> 
            <option value="date" key="date">Data</option> 
        </select>
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-9">
        <label><b>Equipamento </b></label>
            <select class="form-control" v-model="thingId">    
                <option v-for="(t,index) in things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}
                </option>
            </select>
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-6" v-if="filterSelected == 'op'">
        <label><b>OP </b></label>                         
            <input placeholder="Número da OP" class="form-control" 
            v-model="opName" @keyup="prosFim=getResults(urlGatewayOP,opName, prosFim); OP={}" >                                                                                 
            <b-dropdown-item @click.stop.prevent="opName=op.productionOrderNumber;OP=op.productionOrderId;prosFim=[]" 
            v-for="(op,index) in prosFim" :key="index" style="cursor:pointer">{{ op.productionOrderNumber }}</b-dropdown-item>
        </div>
        </div>
        
        <div v-show="filterSelected != 'op'">
        <label><b>Início </b></label>  
        <div class="form-row">
            <div class="form-group col-md-4">
                <date-picker v-model="date" :config="config"></date-picker>
            </div>
            <div class="form-group col-md-3">
                <vue-timepicker format="HH:mm" v-model="timeIni"></vue-timepicker>
            </div>
        </div>
        <br>
        <label><b>Fim </b></label>  
        <div class="form-row">
            <div class="form-group col-md-4">
                <date-picker v-model="datef" :config="config2"></date-picker>
            </div>
            <div class="form-group col-md-3">
                <vue-timepicker format="HH:mm" v-model="timeFim"></vue-timepicker>
            </div>
        </div>
        </div>
        </div>
        <div class="modal-footer">
            <div class="btn-group" role="group">
                <button class="btn btn-success" @click.stop.prevent="getReportByDate();" 
                :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingId" v-if="filterSelected != 'op' && filterSelected != 'code'">
                    <i class="fa fa-check-square"></i> Confirmar
                </button>
                <button class="btn btn-success" @click.stop.prevent="getReportByOP();" 
                :disabled="!thingId || !OP" v-if="filterSelected == 'op'">
                    <i class="fa fa-check-square"></i> Confirmar
                </button>
            </div>
        </div>
    </b-modal>
    <!-- MODAL PARA EXIBIR ERRO  -->
    <b-modal no-close-on-backdrop ref="modalInfo" title="Mensagem" hide-footer>
    <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
    </b-modal>
    </div>
</template>
<script src="./js/alarms.js">
</script>
<style>
@import url("./css/alarms.css");
</style> 


<!-- -->