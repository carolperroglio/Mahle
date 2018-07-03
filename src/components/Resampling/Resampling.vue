<template>
<div>
    <nav class="fixed-top nav-cinza">
        <ul class="nav d-flex align-items-center">
            <li class="nav-item-hist nav-item-gp col-md-12">
                <h1 class="title-page-gp"><b>Relatório de Análise Química</b></h1>
            </li>
            <li class="nav-item-hist nav-item-gp col-md-3 col-lg-2">
                <button type="button" class="btn btn-info btn-lg"  @click.prevent="showModal('filterSearch')">
                    Filtrar Busca
                </button>
            </li>
            <li class="nav-item-hist nav-item-gp col-md-3 col-lg-2"  v-if="tableData.length > 0">
            <button type="button" class="btn btn-danger btn-lg pull-left" @click.prevent="toPdf()">
               <i class="fa fa-file-pdf-o"></i> Exportar para PDF
            </button>
            </li>
        </ul>
    </nav>
    <div id="load" v-show="carregando">
        <stretch background="#4d4d4d"></stretch>                
    </div> 
    <div id="table-to-pdf"> 
    <div class="cabecalho-table-resampling"  v-show="!carregando" v-if="tableData.length > 0">
        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(tableData, 'product',0):organizar(tableData, 'product',0);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">Data 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(tableData, 'product',0):organizar(tableData, 'product',0);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">Hora 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(tableData, 'minValue',1):organizar(tableData, 'minValue',1);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                OPL 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Nº da Amostra 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Produto 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Especificado(%)
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Resultado da Análise (%)
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
        <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Resultado
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>  
        <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Correção (Kg)  
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(tableData, 'maxValue',2):organizar(tableData, 'maxValue',2);" class="ls2 col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Usuário
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>     
                     
    </div>                                             


        <!--                            -->
        <!--                            -->
        <!-- Listagem das Reamostragens -->
        <!--                            -->
        <!--                            -->                            
        <div v-show="!carregando" class="table-margin-resampling">
            <div v-for="(t, index) in tableData" v-bind:class="{cinza: index%2==0}" :key="index">                                    
                <label class="ls2 col-md-1">
                    {{t.dateI}}</label>
                <label class="ls2 col-md-1">
                    {{t.hour}}</label>
                <label class="ls2 col-md-1">
                    {{t.op}}</label>
                <label class="ls2 col-md-1">
                    {{t.numberAnalysis}}</label>
                <label class="ls2 col-md-1">
                    {{t.productName}}</label>
                <label class="ls2 col-md-1">
                    {{t.recipeMin + "% - "}} {{t.recipeMax + "%"}}</label>
                <label class="ls2 col-md-2">
                    {{t.resultAnalysis}}</label>
                <label class="ls2 col-md-1" style="">
                    {{t.status | filterStatus}}</label>
                <label class="ls2 col-md-1">
                    {{t.correction}}</label>
                <label class="ls2 col-md-1">
                    {{t.userName}}</label>

            </div>                       
        </div> 
    </div> 

<!-- MODAL PARA FILTRAR RELATÓRIO -->
<b-modal no-close-on-backdrop ref="filterSearch" hide-footer title="Filtrar Busca">
    <div class="modal-body">
    <div class="form-row">
    <div class="form-group  col-md-6">
    <label><b>Filtrar por</b></label>
    <select class="form-control" v-model="filterSelected">   
        <option value="" selected disabled>Buscar por:</option>
        <option value="op" key="op">OPL</option> 
        <option value="date" key="date">Data</option> 
    </select>
    </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-6" v-if="filterSelected == 'op'">
    <label><b>OPL </b></label>                         
        <input placeholder="Número da OP" class="form-control" 
        v-model="opName" @keyup="prosFim=getResults(urlGatewayOP,opName, prosFim); OP={}" >                                                                                 
        <b-dropdown-item @click.stop.prevent="opName=op.productionOrderNumber;OP=op.productionOrderId;prosFim=[]" 
        v-for="(op,index) in prosFim" :key="index" style="cursor:pointer">{{ op.productionOrderNumber }}</b-dropdown-item>
    </div>
    </div>
    <div v-if="filterSelected != 'op'">
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
    <div class="modal-footer">
        <div class="btn-group" role="group">
            <button class="btn btn-success" @click.stop.prevent="getReportDate();" 
            :disabled="!date ||!timeIni ||!datef || !timeFim " v-if="filterSelected != 'op'">
                <i class="fa fa-check-square"></i> Confirmar
            </button>
            <button class="btn btn-success" @click.stop.prevent="getReportOP();" 
            :disabled="!OP" v-if="filterSelected == 'op'">
                <i class="fa fa-check-square"></i> Confirmar
            </button>
        </div>
        </div>
    </div>
</b-modal>
    <!-- MODAL PARA EXIBIR ERRO  -->
    <b-modal ref="modalInfo" title="Mensagem" hide-footer>
    <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
    </b-modal>
</div>
</template>

<script src="./js/resampling.js">
</script>

<style>
@import url("./css/resampling.css");
</style>
