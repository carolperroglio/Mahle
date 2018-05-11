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
                <h1 class="title-page-gp-s-campo"><b>Relatório de Rastreamento</b></h1>
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
                    <div class="col-md-8">
                        <h3>Equipamento: {{thingNameCabeçalho}} Grupo: {{thingGroup}}</h3>
                    </div>
                    <div class="col-md-4">
                    <button type="button" class="btn btn-info btn-sm btn-sm"  @click.prevent="showModal('myModalEdit')">
                        Filtrar Busca
                    </button>
                    
                    </div>
                    <br>
                    <br>
                    <div class="col-md-11" >
                        <div id="chartrast" style="width:100%; height:500px"></div>
                    </div>
              </div>
            </div>
        </div>
        </div>

        <div class="row conteudotabela">
            <div class="col-sm-2">
            <select class="form-control-outline-secondary" v-model="newGroup" @change.prevent="editGroup(newGroup)">    
                <option v-for="(g,index) in groups" :value="g" v-bind:key="index" >{{g}}</option>
            </select>
            </div>
            <!-- <div class="col-sm-2">
            <button type="button" class="btn btn-info btn-sm btn-sm" @click.prevent="editGroup(newGroup)">
                Editar Grupo
            </button>
            </div>
            <div class="col-sm-2">
            <button type="button" class="btn btn-warning btn-sm btn-sm pull-left" style="color:white" @click.prevent="refreshGraph()">
                Atualizar Gráfico
            </button>
            </div> -->
            <div class="col-sm-2 offset-md-4">
            <button type="button" class="btn btn-danger btn-sm btn-sm pull-left" @click.prevent="toPdf()">
               <i class="fa fa-file-pdf-o"></i> Exportar para PDF
            </button>
            </div>
            <div class="col-sm-2">
            <download-excel
                class   = "btn btn-success btn-sm btn-sm pull-left"
                :data   = provider
                :fields = jsonfields
                :name = filename><i class="fa fa-file-excel-o"></i> Exportar para Excel
            </download-excel>
            </div>
            <br>
            <br>
            <div class="col-md-12">
                <table class="table1">
                    <tr class="tr1 cabecalho-table-rastreamento">
                        <th class="th1 text-white ls2-cabecalho-rastreamento" v-for="(h, index) in headers" :key="index">{{h}}</th>
                    </tr>
                    <tr class="tr1" v-for="(obj,index1) in providertable" v-bind:key="index1">
                        <td class="td1" v-for="(value, key, index2) in obj" v-bind:key="index2">{{ value }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <b-modal ref="myModalEdit" hide-footer title="Filtrar Busca">
            <div class="modal-body">
            <div class="form-row">
            <div class="form-group  col-md-6">
            <label><b>Filtrar por</b></label>
            <select class="form-control" v-model="filterSelected">   
                <option value="" selected disabled>Buscar por:</option>
                <option value="op" key="op">OP</option> 
                <option value="code" key="code">Código da Receita</option> 
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

                <!-- <select id="dropdownMenuButton" @change="productRecipeName=recipeProduct.productName" 
                    v-show="prosFim.length>0" v-model="OP" class="form-control form-control-sm">
                    <option :value="op.productionOrderId" v-for="(op,index) in prosFim" v-bind:key="index">
                        {{ op.productionOrderNumber}}
                    </option>                   
                </select> -->

            </div>
            <div class="form-group col-md-6"  v-if="filterSelected == 'code'">
                <label><b>Código da Receita </b></label>  
                <input placeholder="Número da OP" class="form-control" 
                v-model="recipeCode" @keyup="prosFim=getResults(urlGatewayRecipe,recipeCode, prosFim); OP={}" >                                                                                 
                <b-dropdown-item @click.stop.prevent="recipeCode=r.recipeCode;OP=r.recipeId;prosFim=[]" 
                v-for="(r,index) in prosFim" :key="index" style="cursor:pointer">{{ r.recipeCode }}</b-dropdown-item>

                    <!-- <select class="form-control" v-model="recipeCode">    
                        <option v-for="(r,index) in recipeList" :value="r.recipeId" v-bind:key="index">{{ r.recipeName }}
                        </option>
                    </select> -->
                </div>
            </div>
            
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
                    :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingId" v-if="filterSelected != 'op' && filterSelected != 'code'">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                    <button class="btn btn-success" @click.stop.prevent="getReportOP();" 
                    :disabled=" !date ||!timeIni ||!datef || !timeFim || !thingId || !OP" v-if="filterSelected == 'op'">
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
    <b-modal ref="modalInfo" title="Mensagem" hide-footer>
    <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
    </b-modal>
  </div>
</template>

