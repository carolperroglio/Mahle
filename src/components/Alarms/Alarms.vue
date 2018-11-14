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
                <li class="col-md-4 mb-1">
                    <button type="button" class="btn btn-info"  @click.prevent="showModal('filterSearch')">
                        Filtrar Busca
                    </button>
                </li>                    
                <li class="mr-1 mb-1">                    
                    <button type="button" class="btn btn-danger pull-right" @click.prevent="toPdf()">
                        <i class="fa fa-file-pdf-o"></i> Exportar para PDF
                    </button>
                </li>
                <li class="mr-1 mb-1">                    
                    <!-- <download-excel class = "btn btn-success pull-right" :data   = dataProvider :fields = jsonfields name = 'alarmsreport.xls'>
                        <i class="fa fa-file-excel-o"></i> Exportar para Excel
                    </download-excel>     -->
                    <button class = "btn btn-success pull-right" @click.prevent="toExcel(tableAlarms,groupselected, 'equipamento')">
                        <i class="fa fa-file-excel-o"></i> Exportar para Excel
                    </button>    
                </li>                
                <li class="mr-1 mb-1">                    
                    <select class="form-control form-control-sm" v-model="groupselected" @change.prevent="makeGraph(groupselected)">    
                        <option v-for="(g,index) in groups" :value="g" v-bind:key="index" >{{g}}</option>
                    </select>
                </li>
                <!-- <li class="nav-item-alarms col-md-2">
                    <button class="btn btn-primary" @click="getReport()">Texto</button> 
                </li>                      -->
            </ul>
        </div>
        <table v-if="tableAlarms.length>0 && active" class="table table-responsive mb-5 w-100 d-block d-md-table" id="header_table_fixed">
            <thead>
                <tr style="background-color: black; color: white">
                    <th>Parâmetro</th>
                    <th>Equipamento</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Hora Início</th>
                    <th>Hora Fim</th>
                    <th>OP</th>
                    <th>Rolo</th>
                    <th>Tira</th>
                </tr>
            </thead>
            <tbody>
                <tr style="color: rgba(0,0,0,0.0); height: 0px !important;" class="hide">
                    <td>{{tableAlarms[0].groupTag}}</td>
                    <td>{{thingNameInTable}}</td>
                    <td>{{tableAlarms[0].type}}</td>
                    <td>{{tableAlarms[0].dateIni}}</td>
                    <td>{{tableAlarms[0].hourIni}}</td>
                    <td>{{tableAlarms[0].dateEnd}}</td>
                    <td>{{tableAlarms[0].Ordem}}</td>
                    <td>{{tableAlarms[0].rolo}}</td>
                    <td>{{tableAlarms[0].codTira}}</td>
                </tr>
            </tbody>
        </table>
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>            
        <!-- GRÁFICO DOS ALARMES -->
        <div id="chartAlarm" style="width: 100%; height: 400px;margin-top: 15%;font-weight: 900;font-size: 20pt;"></div>                           
                
        <table v-show="!carregando" v-if="tableAlarms.length>0" class="table table-striped table-responsive mb-5 w-100 d-block d-md-table" id="tabela">
            <thead>
                <tr style="background-color: black; color: white">
                    <th>Parâmetro</th>
                    <th>Equipamento</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Hora Início</th>
                    <th>Hora Fim</th>
                    <th>OP</th>
                    <th>Rolo</th>
                    <th>Tira</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t, index) in tableAlarms" :key="index" v-scroll="handleScroll">
                    <td>{{t.groupTag}}</td>
                    <td>{{thingNameInTable}}</td>
                    <td>{{t.type}}</td>
                    <td>{{t.dateIni}}</td>
                    <td>{{t.hourIni}}</td>
                    <td>{{t.dateEnd}}</td>
                    <td>{{t.Ordem}}</td>
                    <td>{{t.rolo}}</td>
                    <td>{{t.codTira}}</td>
                </tr>                
            </tbody>
        </table>       
        
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
                            <option v-if="t.thingId==8 || t.thingId==10 || t.thingId==11 || t.thingId==12 || t.thingId==13|| t.thingId==14 || t.thingId==15 || t.thingId==17 || t.thingId==18 || t.thingId==19 || t.thingId==21 || t.thingId==22 || t.thingId==26" v-for="(t,index) in things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6" v-if="filterSelected == 'op'">
                        <label><b>OP </b></label>                         
                        <input class="form-control" 
                        v-model="opName" @keyup="prosFim=getResults(URL_OP, opName, prosFim); OP={}" >                                                                                 
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
            </div>
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" @click.stop.prevent="filterSelected=='op'?getReportByOP():getReportByDate();" :disabled="(filterSelected=='op' && !opName && !thingId) || (filterSelected!='op' && (!date ||!timeIni ||!datef || !timeFim || !thingId))" >
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