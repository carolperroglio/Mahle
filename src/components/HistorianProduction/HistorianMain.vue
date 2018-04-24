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
                <h1 class="title-page-gp-s-campo"> <b>Apontamentos de Ordens de Produção</b> </h1>
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
            <div class="cabecalho-table-ap" v-show="!carregando">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(orderHistorian, 'productionOrderNumber',0):organizar(orderHistorian, 'productionOrderNumber',0);" class="ls2-cabecalho-ap col-md-3">
                    <b><font class="cursor-class" color="#ffffff">OP 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(orderHistorian, 'thingName',1):organizar(orderHistorian, 'thingName',1);" class="ls2-cabecalho-ap col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Estação 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(orderHistorian, 'typeDescription',2):organizar(orderHistorian, 'typeDescription',2);" class="ls2-cabecalho-ap col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Tipo de Ordem 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
            </div>
            <div class="table-margin-hm" v-show="!carregando">
            <div v-for="(o, index) in orderHistorian" v-bind:key="index" :class="{cinza: index%2==0}">
                <label class="ls ls10 col-md-3">
                    {{o.productionOrderNumber}}</label>
                <label class="ls ls10 col-md-2">
                    {{o.thingName}} </label>
                <label class="ls ls10 col-md-2">
                    {{o.typeDescription}}</label>
                <label v-if="o.typeDescription == 'Liga'" class="col-md-4">
                <label class="ls ls10 col-md-6 router">
                    <router-link class="btn btn-info"  :to="{ name: 'HistorianProductionLiga', params: { id: o.productionOrderId }}">Realizar Apontamento</router-link>
                </label> 
                <label class="ls ls10 col-md-4 router">
                    <router-link class="btn btn-success"  :to="{ name: 'HistorianProductionTira', params:{id: o.productionOrderId}}">
                        <i class="fa fa-calculator" aria-hidden="true"></i> Exibir Calculo</router-link>
                </label>  
                </label>
                <label  class="col-md-4" v-else-if="o.typeDescription == 'Tira'">
                <label class="ls ls10 col-md-6 router" >
                    <router-link class="btn btn-info"  :to="{ name: 'HistorianProductionTira', params:{id: o.productionOrderId}}">Realizar Apontamento</router-link>
                </label>  
                
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
        <b-modal ref="modalErro" title="Erro" hide-footer="">
            <p class="alert alert-danger">Ocorreu um erro: {{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianMain.js">
</script>
<style>
@import url('./css/historianMain.css');
</style>
