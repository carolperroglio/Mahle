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

                <li class="col-md-4">
                    <button type="button" class="btn btn-info"  @click.prevent="OP='';showModal('myModalEdit')">
                        Filtrar Busca
                    </button>
                </li>                
                <li class="mr-1">
                    <button type="button" class="btn btn-danger btn-sm btn-sm pull-left" @click.prevent="toPdf()">
                        <i class="fa fa-file-pdf-o"></i> Exportar para PDF
                    </button>
                </li>
                <li class="mr-1">
                    <download-excel class   = "btn btn-success btn-sm btn-sm pull-left" :data   = providertable :fields = jsonfields :name = filename>
                        <i class="fa fa-file-excel-o"></i> Exportar para Excel
                    </download-excel>
                </li>
                <li>
                    <select class="form-control form-control-sm pull-left" v-model="newGroup" @change.prevent="editGroup(newGroup)">
                        <option v-show="g!='Linha' && g!='Alarme'" v-for="(g,index) in groups" :value="g" v-bind:key="index" >{{g}}</option>
                    </select>
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
                    <div id="chartrast" style="width:100%; height:500px;margin-top:-3%;"></div>
                <!-- </div> -->
              <!-- </div> -->
            <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->        
        <!-- <div class="form-group">
            <label for="filter" class="sr-only">Filter</label>
            <input type="text" class="form-control" v-model="filter">
        </div>
        <datatable :columns="table_columns" :data="table_rows" :filter-by="filter"></datatable>
        
     -->

        <!-- <table class="table" id="tabela" style="width:100%;"> 
            <thead >
                <tr class="cabecalho-tabela-scroll" style="background-color: black;width:100%; ">
                    <th >Data</th>
                    <th>Hora</th>
                    <th>Valor Medição</th>
                    <th>LSE Limite Superior de Especificação</th>
                    <th>LSC Limite Superior de Controle</th>
                    <th>LIC Limite Inferior de Controle</th>
                    <th>LIE Limite Inferior de Especificação</th>
                    <th>OP</th>
                    <th>Rolo</th>
                    <th>Tira</th>
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
 -->

        <!-- // <table class="table" v-show="active" style="width:100%;"> 
        //     <thead >
        //         <tr class="cabecalho-tabela-scroll" style="background-color: black;width:100%; ">
        //             <th >Data</th>
        //             <th>Hora</th>
        //             <th>Valor Medição</th>
        //             <th>LSE Limite Superior de Especificação</th>
        //             <th>LSC Limite Superior de Controle</th>
        //             <th>LIC Limite Inferior de Controle</th>
        //             <th>LIE Limite Inferior de Especificação</th>
        //             <th>OP</th>
        //             <th>Rolo</th>
        //             <th>Tira</th>
        //         </tr>
        //     </thead>        
        // </table> -->

        <!-- <v-client-table :data="providertable" :columns="columns" :options="options"></v-client-table> -->

        <table class="table table-striped mb-5" id="tabela">
            <thead id="teste">
                <tr style="background-color: black;">
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
                            <option v-if="t.thingId==11 || t.thingId==12 || t.thingId==13 || t.thingId==14 || t.thingId==17 || t.thingId==21 || t.thingId==22 || t.thingId==26" v-for="(t,index) in things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6" v-if="filterSelected == 'op'">
                    <label><b>OP </b></label>
                        <input class="form-control"
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

