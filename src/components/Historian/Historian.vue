

<template>
  <div id="teste">
        <nav class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item-hist nav-item-gp col-md-12">
                    <h1 class="title-page-gp"><b>Relatório de Rastreamento</b></h1>
                </li>
                <li class="col-md-4 mb-1">
                    <button type="button" class="btn btn-info"  @click.prevent="opName='';OP='';prosFim=[];showModal('myModalEdit')">
                        Exibir Gráfico
                    </button>
                    <button class = "btn btn-primary" @click.prevent="opName='';OPgeral='';prosFim=[];showModal('myModalGeral');">
                        Planilha Geral Excel
                    </button>
                </li>                
                <li class="mr-1 mb-1">
                    <button type="button" class="btn btn-danger pull-left" @click.prevent="toPdf()">
                        <i class="fa fa-file-pdf-o"></i> Exportar para PDF
                    </button>
                </li>
                <li class="mr-1 mb-1">
                    <!-- <download-excel class   = "btn btn-success pull-left" :data   = providertable :fields = jsonfields :name = filename>
                        <i class="fa fa-file-excel-o"></i> Exportar para Excel
                    </download-excel> -->
                    <button class   = "btn btn-success pull-left" @click.prevent="toExcel(providertable,thingNameCabeçalho, thingGroup)">
                        <i class="fa fa-file-excel-o"></i> Exportar para Excel
                    </button>
                </li>
                <li>
                    <select class="form-control form-control-sm pull-left" v-model="newGroup" @change.prevent="editGroup(newGroup)">
                        <option v-show="g!='Linha' && g!='Alarme'" v-for="(g,index) in groups" :value="g" v-bind:key="index" >{{g}}</option>
                    </select>
                </li>                
            </ul>
        </nav>
        <table v-if="providertable.length>0 && active" style="text-align: center;" class="table table-responsive w-100 d-block d-md-table mb-5" id="header_table_fixed">
            <thead >
                <tr style="background-color: black;color: white;">
                    <td>Data</td>
                    <td>Hora</td>
                    <td>Valor Medição</td>
                    <td>LSE Limite Superior de Especificação</td>
                    <td>LSC Limite Superior de Controle</td>
                    <td>LIC Limite Inferior de Controle</td>
                    <td>LIE Limite Inferior de Especificação</td>
                    <td>OP</td>
                    <td>Rolo</td>
                    <td>Tira</td>
                </tr>
            </thead>
            <tbody>
                <tr  style="color: rgba(0,0,0,0.0); height: 0px !important;" class="hide">
                    <td>{{providertable[1].Data}}</td>
                    <td>{{providertable[1].Hora}}</td>
                    <td>{{providertable[1].VM}}</td>
                    <td>{{providertable[1].LSE}}</td>
                    <td>{{providertable[1].LSC}}</td>
                    <td>{{providertable[1].LIC}}</td>
                    <td>{{providertable[1].LIE}}</td>
                    <td>{{providertable[1].ordem}}</td>
                    <td>{{providertable[1].rolo}}</td>
                    <td>{{providertable[1].codTira}}</td>
                </tr>                                  
            </tbody>
        </table>   
        <div id="load" v-show="carregando">
            <stretch></stretch>
        </div>

        <div v-show="!carregando" class="history">
            <div class="row">                
                <div class="col-6">
                    <label style="font-weight:bolder;font-size:17pt">Equipamento : </label>{{'  '}}<span style="text-decoration: underline;font-style:italic;">{{thingNameCabeçalho}}</span>
                </div>
                <div class="col-6" >
                    <label style="font-weight:bolder;font-size:17pt">Grupo : </label>{{'  '}}<span style="text-decoration: underline;font-style:italic;">{{thingGroup}}</span>                
                </div>
            </div>
        </div>
        
        <!--
            GRÁFICO
        -->
            
        <div v-show="!carregando" id="chartrast" style="width:100%; height:500px;margin-top:-3%;font-weight: 900; font-size: 12pt;"></div>
          
        <table v-show="!carregando" v-if="providertable.length>0" class="table table-striped table-responsive w-100 d-block d-md-table mb-5" style="z-index:100;" id="tabela">
            <thead id="teste">
                <tr style="background-color: black;color: white;">
                    <td>Data</td>
                    <td>Hora</td>
                    <td>Valor Medição</td>
                    <td>LSE Limite Superior de Especificação</td>
                    <td>LSC Limite Superior de Controle</td>
                    <td>LIC Limite Inferior de Controle</td>
                    <td>LIE Limite Inferior de Especificação</td>
                    <td>OP</td>
                    <td>Rolo</td>
                    <td>Tira</td>
                </tr>
            </thead>
            <tbody v-scroll="handleScroll">
                <tr v-for="(t, index) in providertable" :key="index">
                    <td>{{t.Data}}</td>
                    <td>{{t.Hora}}</td>
                    <td>{{t.VM}}</td>
                    <td>{{t.LSE}}</td>
                    <td>{{t.LSC}}</td>
                    <td>{{t.LIC}}</td>
                    <td>{{t.LIE}}</td>
                    <td>{{t.ordem}}</td>
                    <td>{{t.rolo}}</td>
                    <td>{{t.codTira}}</td>
                </tr>                                  
            </tbody>
        </table>        

        <b-modal ref="myModalEdit" no-close-on-backdrop hide-footer title="Filtrar Busca">
            <div class="modal-body">
                <div class="form-row">
                    <div class="form-group  col-md-6">
                        <label><b>Filtrar por</b></label>
                        <select class="form-control" v-model="filterSelected">
                            <option value="" selected disabled>Buscar por:</option>
                            <option value="op" key="op">OP</option>
                            <!-- <option value="code" key="code">Código da Tira/Liga</option> -->
                            <option value="date" key="date">Data</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-9">
                        <label><b>Equipamento </b></label>
                        <select class="form-control" v-model="thingT">
                            <option v-if="t.thingId==8 || t.thingId==11 || t.thingId==12 || t.thingId==13 || t.thingId==14|| t.thingId==15 || t.thingId==17 || t.thingId==18 || t.thingId==19 || t.thingId==21 || t.thingId==22 || t.thingId==26" v-for="(t,index) in things" :value="t" v-bind:key="index">{{ t.thingName }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6" v-if="filterSelected == 'op'">
                    <label><b>OP </b></label>
                        <input class="form-control" v-model="opName" @keyup="prosFim=[];prosFim=getResults(urlGatewayOP,opName, prosFim); OP=''" >
                        <b-dropdown-item @click.stop.prevent="opName=op.productionOrderNumber;OP=op.productionOrderId;prosFim=[]" v-for="(op,index) in prosFim" :key="index" style="cursor:pointer">
                            {{ op.productionOrderNumber }}
                        </b-dropdown-item>
                    </div>
                <div class="form-group col-md-6"  v-if="filterSelected == 'code'">
                    <label><b>Código da Tira/Liga </b></label>
                    <input class="form-control" v-model="recipeCode" @keyup="prosFim=getResults(urlGatewayRecipe,recipeCode, prosFim); OP=''" >
                    <b-dropdown-item @click.stop.prevent="recipeCode=r.recipeCode;OP=r.recipeId;prosFim=[]"
                        v-for="(r,index) in prosFim" :key="index" style="cursor:pointer">{{ r.recipeCode }}</b-dropdown-item>
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
                    <button class="btn btn-success" @click.stop.prevent="getReportDate();" :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingT" v-if="filterSelected != 'op' && filterSelected != 'code'">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                    <button class="btn btn-success" @click.stop.prevent="getReportOP();" :disabled="!thingT || !OP" v-if="filterSelected == 'op'">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                    <button class="btn btn-success" @click.stop.prevent="getReportCode();" :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingT || !recipeCode" v-if="filterSelected == 'code'">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                </div>
            </div>
        </b-modal>



    <b-modal ref="myModalGeral" no-close-on-backdrop hide-footer title="Filtrar Busca">
        <div class="modal-body">
            <div class="form-row">
                <div class="form-group  col-md-12">
                    <h3>Digite o numero da OP </h3>
                </div>
            </div>                
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label><b>OP </b></label>
                    <input class="form-control" v-model="opName" @keyup="prosFim=getResults(urlGatewayOP,opName, prosFim); OPgeral=''" >
                    <b-dropdown-item @click.stop.prevent="opName=op.productionOrderNumber;OPgeral=op.productionOrderId;prosFim=[]" v-for="(op,index) in prosFim" :key="index" style="cursor:pointer">{{ op.productionOrderNumber }}</b-dropdown-item>
                </div>
            </div>                
        </div>
        <div class="modal-footer">
            <div class="btn-group" role="group">                    
                <button class="btn btn-success" @click.stop.prevent="getReportGeral();" :disabled="!OPgeral">
                    <i class="fa fa-check-square"></i> Confirmar
                </button>                    
            </div>
        </div>
    </b-modal>
    <!-- MODAL PARA EXIBIR ERRO  -->
    <b-modal ref="modalInfo" no-close-on-back droptitle="Mensagem" hide-footer>
        <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
    </b-modal>
  </div>
</template>

<script src="./js/historian.js"></script>
<style>
    @import url("./css/historian.css");
</style>
