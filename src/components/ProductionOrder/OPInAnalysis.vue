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
            <div class="cabecalho-table-analysis" v-show="!carregando">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opInAnalysis, 'productionOrderNumber',0):organizar(opInAnalysis, 'productionOrderNumber',0);" class="ls2-cabecalho-analysis col-md-1">
                    <b><font class="cursor-class" color="#ffffff">OPL
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opInAnalysis, 'recipeCode',1):organizar(opInAnalysis, 'recipeCode',1);" class="ls2-cabecalho-analysis col-md-2">
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
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(opInAnalysis, 'thingName',4):organizar(opInAnalysis, 'thingName',4);" class="ls2-cabecalho-analysis col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Equipamento 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(opInAnalysis, 'currentStatus',5):organizar(opInAnalysis, 'currentStatus',5);" class="ls2-cabecalho-analysis col-md-1">
                    <b><font class="cursor-class" color="#ffffff">
                        Status 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
            </div>
            <div class="table-margin-analysis" v-show="!carregando">
            <div v-for="(o, index) in opInAnalysis" v-bind:key="index" :class="{cinza: index%2==0}">
                <label class="ls1 col-md-1">
                    {{o.productionOrderNumber}}</label>
                <label class="ls1 col-md-2">
                    {{o.recipeCode}}</label>
                <label class="ls1 col-md-2">
                    {{o.recipeName}}</label>
                <label class="ls1 col-md-2">
                    {{o.typeDescription}}</label>
                <label class="ls1 col-md-2">
                    {{o.thingName}} </label>
                <label class="ls1 col-md-1">
                    {{o.currentStatus | filterStatus}}</label>
                <label class="ls1 col-md-1">
                    <button class="btn btn-primary" @click.stop.prevent="showModal('realizarAnalise'); idOP = o.productionOrderId" >Realizar Análise</button>   
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
            <b-modal size="md" ref="realizarAnalise" hide-footer title="Realizar Análise">
                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label for="">Componente</label>
                        <input autocomplete="off" @keyup="recipeArray=getProducts(productName)" v-model="productName"  class="form-control" id="dropdownMenuButton" placeholder="Ex: Estanho" />
                        <b-dropdown-item @click.stop.prevent="productName = p.productName; comp.productId = p.productId;comp.productName = p.productName;products=[]" v-for="(p,index) in products" :key="index">{{ p.productName }}</b-dropdown-item>
                    </div>
                    <div class="form-group col-md-5">
                        <label for="">Resultado da Análise(%)</label>
                        <input type="text" class="form-control" v-model="comp.value">
                    </div>
                    <div class="form-group-col-md-1">
                        <br>
                        <button class="btn btn-success btn-sm" @click.stop.prevent="addComponente(comp)">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="form-row">
                <div class="col-md-10">
                    <ul class="list-group" v-for="(c,index) in components" :key="index">
                        <li class="list-group-item">{{c.productName + ': ' + c.value + '%'}}</li>
                    </ul>
                </div>
                </div>
                <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="components.length == 0" @click="realizarAnálise();hideModal('realizarAnalise');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="components = []; comp = {};productName = ''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
            </b-modal>
        <b-modal ref="modalErro" title="Erro" hide-footer="">
            <p :class="erro?'alert alert-danger':'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/orderLigaWaitingApproval.js">
</script>
<style>
@import url('./css/orderLiga.css');
</style>
