<template>
  <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--      Barra de busca de OP       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
         <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod nav-item-gp col-md-12">
                <h1 class="title-page-gp-s-campo"> <b>Ordens de Produção Em Análise</b> </h1>
            </li>
            <li class="col-md-12">
                <p></p>
            </li>
            </ul>
        </div>
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div> 
        <h3 style="text-align:center"></h3>
        <p class="col-md-10" v-show="opInAnalysis.length == 0" v-if="!carregando">
            Sem Ordens de Produção para Análise
        </p>
            <div class="cabecalho-table-analysis" v-show="!carregando" v-if="opInAnalysis.length > 0">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opInAnalysis, 'productionOrderNumber',0):organizar(opInAnalysis, 'productionOrderNumber',0);" class="ls2-cabecalho-analysis col-md-2">
                    <b><font class="cursor-class" color="#ffffff">OPL
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <!-- <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opInAnalysis, 'recipeCode',1):organizar(opInAnalysis, 'recipeCode',1);" class="ls2-cabecalho-analysis col-md-2">
                    <b><font class="cursor-class" color="#ffffff">Código da Liga
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opInAnalysis, 'recipeName',2):organizar(opInAnalysis, 'recipeName',2);" class="ls2-cabecalho-analysis col-md-2">
                    <b><font class="cursor-class" color="#ffffff">Nome da Liga
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(opInAnalysis, 'typeDescription',3):organizar(opInAnalysis, 'typeDescription',3);" class="ls2-cabecalho-analysis col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Descrição 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                    </font></b>
                </label> -->
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(opInAnalysis, 'thingName',4):organizar(opInAnalysis, 'thingName',4);" class="ls2-cabecalho-analysis col-md-3">
                    <b><font class="cursor-class" color="#ffffff">
                        Equipamento 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(opInAnalysis, 'currentStatus',5):organizar(opInAnalysis, 'currentStatus',5);" class="ls2-cabecalho-analysis col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Status 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
            </div>
            <div class="table-margin-analysis" v-show="!carregando">
            <div v-for="(o, index) in opInAnalysis" v-bind:key="index" :class="{cinza: index%2==0}">
                <label class="ls1-analysis col-md-2">
                    {{o.productionOrderNumber}}</label>
                <!-- <label class="ls1-analysis col-md-2">
                    {{o.recipeCode}}</label>
                <label class="ls1-analysis col-md-2">
                    {{o.recipeName}}</label>
                <label class="ls1-analysis col-md-2">
                    {{o.typeDescription}}</label> -->
                <label class="ls1-analysis col-md-3">
                    {{o.posicao}} </label>
                <label class="ls1-analysis col-md-2">
                    {{o.status | filterStatus}}</label>
                <label class="ls1-analysis col-md-2">
                    <button class="btn btn-primary" @click.stop.prevent="showModal('realizarAnalise'); idOP = o.productionOrderId;cobreqtd = '';cobre = {}; getProductsOP(o);" >Realizar Análise</button>   
                </label>
            </div>
            </div>
            <div class="paginacao" v-show="total>0">
                <nav aria-label="">
                    <ul class="pagination justify-content-center">
                        <li v-show="startat>0" class="page-item">
                            <a class="page-link" href="#" @click.stop.prevent="getResults(startat-=20, quantityPage)">Anterior</a>
                        </li>
                        <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                            <a class="page-link" href="#" @click.stop.prevent="getResults(startat=num*20, quantityPage)">{{num+1}}</a>
                        </li>
                        <li class="page-item" v-show="pages.length>1 && startat+20<total">
                            <a class="page-link" href="#" @click.stop.prevent="getResults(startat+=20, quantityPage)">Próximo</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <b-modal no-close-on-backdrop size="md" ref="realizarAnalise" hide-footer title="Realizar Análise">
                <div class="form-row">
                <div class="form-group col-md-5">
                    <select class="form-control" id="" disabled>
                        <!-- COLOCAR O ID FIXO DEPOIS -->
                        <option value="someid" selected>Cobre Fosforoso</option>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <input type="number" class="form-control" v-model="cobreqtd" placeholder="" />
                </div>
                <div class="form-group-col-md-2">
                    <button class="btn btn-success" @click.stop.prevent="addCobre(cobreqtd)" :disabled="cobreqtd.length == 0">
                        Adicionar Cobre
                    </button>
                    <!-- <button class="btn btn-warning btn-sm" @click.stop.prevent="addComponente(comp)">
                        <i class="fa fa-remove" aria-hidden="true"></i>
                    </button> -->
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-10">
                    <ul v-for="value in cobre" :key="value" class="list-group">
                        <li class="list-group-item">{{'Cobre Fosforoso: ' + value}} 
                            <i class="fa fa-remove pull-right" style="color:red" @click="removeCobre()"></i> </li>
                    </ul>    
                    </div>
                </div>
                <div>
                <div class="form-row">
                    <div class="form-group col-md-5">
                    <label for="">Componente</label>
                </div>
                <div class="form-group col-md-5">
                    <label for="">Resultado da Análise(%)</label>
                </div>
                </div>
                <div class="form-row" v-if="comp.type!='scrap' && comp.type != 'semi_finished'" v-for="comp in components" :key="comp.productId">
                    <div class="form-group col-md-5">
                        <input disabled v-model="comp.productName" class="form-control" id="dropdownMenuButton"/>
                    </div>
                    <div class="form-group col-md-5">
                        <input type="number" class="form-control" v-model="comp.value" @keyup="blockConfirmButton();">
                    </div>
                </div>
                </div>
                <!-- <div class="form-row">
                <div class="col-md-10">
                    <ul class="list-group" v-for="(c,index) in components" :key="index">
                        <li class="list-group-item">{{c.productName + ': ' + c.value + '%'}}</li>
                    </ul>
                </div>
                </div> -->
                <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="blockConfirm" @click="realizarAnálise();hideModal('realizarAnalise');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="components = []; comp = {};productName = ''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
            </b-modal>
        <b-modal no-close-on-backdrop ref="modalErro" title="" hide-footer="">
            <p :class="erro?'alert alert-danger':'alert alert-success'">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/orderLigaWaitingApproval.js">
</script>
<style>
@import url('./css/opInAnalysis.css');
</style>
