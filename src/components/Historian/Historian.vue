<script src="./js/historian.js">
</script>
<style>
@import url("./css/historian.css");
</style>


<template>
  <div id="teste">
        <nav class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item-hist nav-item-gp col-md-12">
                <h1 class="title-page-gp"><b>Relatório de Rastreamento</b></h1>
                </li>
                <li class="nav-item-hist nav-item-gp col-md-4">
                <button type="button" class="btn btn-info"  @click.prevent="OP='';showModal('myModalEdit')">
                    Filtrar Busca
                </button>
                </li>
            </ul>
        </nav>
        <!-- <div class="row conteudo-history"> -->
            <!-- <div class="container-fluid"> -->
            <div id="load" v-show="carregando">
            <stretch></stretch>
            </div>

                <div class="history">
                <div class="row">
                    <div class="col-md-8">
                        <h3>Equipamento: {{thingNameCabeçalho}} Grupo: {{thingGroup}}</h3>
                    </div>
                </div>
                </div>
                <!--
                    GRÁFICO
                    -->
                <!-- <div class="col-md-11" > -->
                    <div id="chartrast" style="width:100%; height:500px"></div>
                <!-- </div> -->
              <!-- </div> -->
            <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->

        <div class="row conteudotabela">
            <div class="col-sm-2">
            <select class="form-control-outline-secondary" v-model="newGroup" @change.prevent="editGroup(newGroup)">
                <option v-for="(g,index) in groups" :value="g" v-bind:key="index" >{{g}}</option>
            </select>
            </div>
            <div class="col-sm-2 offset-md-4">
            <button type="button" class="btn btn-danger btn-sm btn-sm pull-left" @click.prevent="toPdf()">
               <i class="fa fa-file-pdf-o"></i> Exportar para PDF
            </button>
            </div>
            <div class="col-sm-2">
            <download-excel
                class   = "btn btn-success btn-sm btn-sm pull-left"
                :data   = providertable
                :fields = jsonfields
                :name = filename><i class="fa fa-file-excel-o"></i> Exportar para Excel
            </download-excel>
            </div>
        </div>
        <div class="cabecalho-table-rastreamento row" id="cabecalho-rastreamento" v-show="!carregando" v-if="providertable.length > 0">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(providertable, 'product',0):organizar(providertable, 'product',0);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">Data
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(providertable, 'minValue',1):organizar(providertable, 'minValue',1);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Hora
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(providertable, 'maxValue',2):organizar(providertable, 'maxValue',2);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Valor Medição
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(providertable, 'maxValue',3):organizar(providertable, 'maxValue',3);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    LSE Limite superior especifico
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(providertable, 'maxValue',4):organizar(providertable, 'maxValue',4);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    LSC Limite superior de controle
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(providertable, 'maxValue',5):organizar(providertable, 'maxValue',5);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    LIC Limite inferior de controle
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(providertable, 'maxValue',6):organizar(providertable, 'maxValue',6);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    LIE Limite inferior especifico
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(providertable, 'maxValue',6):organizar(providertable, 'maxValue',6);" class="ls2 col-md-1" >
                <b><font class="cursor-class" color="#ffffff">
                    OP
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(providertable, 'maxValue',6):organizar(providertable, 'maxValue',6);" class="ls2 col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Rolo
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(providertable, 'maxValue',6):organizar(providertable, 'maxValue',6);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Tira
                    <!-- <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i> -->
                </font></b>
            </label>
        </div>
        <div v-show="!carregando" class="table-margin-historian" id="table-historian">
            <div v-for="(t, index) in providertable" :class="{cinza: index%2==0}" class="row" :key="index">
                <label class="ls2 col-md-1">
                    {{t.Data}}</label>
                <label class="ls2 col-md-1">
                    {{t.Hora}}</label>
                <label class="ls2 col-md-1">
                    {{t.VM}}</label>
                <label class="ls2 col-md-1">
                    {{t.LSE}}</label>
                <label class="ls2 col-md-1">
                    {{t.LSC}}</label>
                <label class="ls2 col-md-1">
                    {{t.LIC}}</label>
                <label class="ls2 col-md-1">
                    {{t.LIE}}</label>
                <label class="ls2 col-md-1">
                    {{t.Ordem}}</label>
                <label class="ls2 col-md-1">
                    {{t.Rolo}}</label>
                <label class="ls2 col-md-2">
                    {{t.codTira}}</label>
            </div>
        </div>
        <!-- <tr class="" v-for="(obj,index1) in providertable" v-bind:key="index1" :class="{cinza: index1%2==0}"> -->
            <!-- <td :class="key == 'Data'?'col-md-1':''" v-for="(value, key, index2) in obj" v-bind:key="index2">{{ value }}</td>
            <td class="col-md-1" v-for="(value, key, index2) in obj" v-bind:key="index2" v-if="key == 'Hora'">{{ value }}</td> -->
            <!-- <td class="col-md-1" v-for="(value, key, index2) in obj" v-bind:key="index2">{{ value }}</td> -->
            <!-- <td class="col-md-1" v-for="(value, key, index2) in obj" v-bind:key="index2" >{{ value }}</td>
            <td class="col-md-2" v-for="(value, key, index2) in obj" v-bind:key="index2" v-if="key == 'LSE Limite superior de especifico'">{{ value }}</td>
            <td class="col-md-2" v-for="(value, key, index2) in obj" v-bind:key="index2" v-if="key == 'LSC Limite superior de controle'">{{ value }}</td>
            <td class="col-md-2" v-for="(value, key, index2) in obj" v-bind:key="index2" v-if="key == 'LIC Limite inferior de controle'">{{ value }}</td>
            <td class="col-md-2" v-for="(value, key, index2) in obj" v-bind:key="index2" v-if="key == 'LIE Limite inferior de especifico'">{{ value }}</td> -->
        <!-- </tr>      -->
            <!-- <div class="col-md-12">
                <table class="">
                    <tr class="tr1 cabecalho-table-rastreamento">
                        <th class="th1 text-white ls2-cabecalho-rastreamento" v-for="(h, index) in headers" :key="index">{{h}}</th>
                    </tr>

                </table>
            </div> -->

        <b-modal ref="myModalEdit" no-close-on-backdrop hide-footer title="Filtrar Busca">
            <div class="modal-body">
                <div class="form-row">
                    <div class="form-group  col-md-6">
                        <label><b>Filtrar por</b></label>
                        <select class="form-control" v-model="filterSelected">
                            <option value="" selected disabled>Buscar por:</option>
                            <option value="op" key="op">OP</option>
                            <option value="code" key="code">Código da Tira/Liga</option>
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
                        v-model="opName" @keyup="prosFim=getResults(urlGatewayOP,opName, prosFim); OP=''" >
                        <b-dropdown-item @click.stop.prevent="opName=op.productionOrderNumber;OP=op.productionOrderId;prosFim=[]"
                            v-for="(op,index) in prosFim" :key="index" style="cursor:pointer">{{ op.productionOrderNumber }}</b-dropdown-item>
                    </div>
                <div class="form-group col-md-6"  v-if="filterSelected == 'code'">
                    <label><b>Código da Tira/Liga </b></label>
                    <input class="form-control"
                    v-model="recipeCode" @keyup="prosFim=getResults(urlGatewayRecipe,recipeCode, prosFim); OP=''" >
                    <b-dropdown-item @click.stop.prevent="recipeCode=r.recipeCode;OP=r.recipeId;prosFim=[]"
                    v-for="(r,index) in prosFim" :key="index" style="cursor:pointer">{{ r.recipeCode }}</b-dropdown-item>

                        <!-- <select class="form-control" v-model="recipeCode">
                            <option v-for="(r,index) in recipeList" :value="r.recipeId" v-bind:key="index">{{ r.recipeName }}
                            </option>
                        </select> -->
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
                    <button class="btn btn-success" @click.stop.prevent="getReportDate();"
                    :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingId" v-if="filterSelected != 'op' && filterSelected != 'code'">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                    <button class="btn btn-success" @click.stop.prevent="getReportOP();"
                    :disabled="!thingId || !OP" v-if="filterSelected == 'op'">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                    <button class="btn btn-success" @click.stop.prevent="getReportCode();"
                    :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingId || !recipeCode" v-if="filterSelected == 'code'">
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

