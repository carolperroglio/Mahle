<template>
  <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--      Barra de busca de OP       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
         <div class="fixed-top nav-hp">
            <h1 class="title-page-hp" id="exButton1"><b> Apontamentos de Ordens de Produção</b> </h1>
            <ul class="nav d-flex align-items-center">
            </ul>
        </div>
        <div class="op col-md-12">

        <h3 style="text-align:center"></h3>
        <div class="fundo-branco-ap">
            <div class="cabecalho-table-ap">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(orderHistorian, 'productionOrderNumber',0):organizar(orderHistorian, 'productionOrderNumber',0);" class="ls2-cabecalho-ap col-md-3">
                    <b><font class="cursor-class" color="#ffffff">OP 
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(orderHistorian, 'quantity',1):organizar(orderHistorian, 'quantity',1);" class="ls2-cabecalho-ap col-md-3">
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
            <div class="table-margin">
            <div v-for="(o, index) in orderHistorian" v-bind:key="index" :class="{cinza: index%2==0}">
                <label class="ls ls10 col-md-3">
                    {{o.productionOrderNumber}}</label>
                <label class="ls ls10 col-md-3" v-if="o.currentThing">
                    {{o.currentThing.thingName}} </label>
                 <label class="ls ls10 col-md-3" v-else>
                    - </label>
                <label class="ls ls10 col-md-2">
                    {{o.typeDescription}}</label>
                <label class="ls ls10 col-md-2" v-if="o.typeDescription == 'Liga'" style="margin-top:1%">
                    <router-link class="btn btn-info"  :to="{ name: 'HistorianProductionLiga', params: { id: o.productionOrderId }}">Realizar Apontamento</router-link>
                </label>  
                <label class="ls ls10 col-md-2" v-else-if="o.typeDescription == 'Tira'" style="margin-top:1%">
                    <router-link class="btn btn-info"  :to="{ name: 'HistorianProductionTira', params:{id: o.productionOrderId}}">Realizar Apontamento</router-link>
                </label>  
            </div>
            </div>
            <div class="paginacao" v-show="total>0">
                <nav aria-label="">
                    <ul class="pagination justify-content-center">
                        <li v-show="startat>0" class="page-item">
                            <a class="page-link" href="#" @click.stop.prevent="getResults(startat-=20, quantityPage)">Previous</a>
                        </li>
                        <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                            <a class="page-link" href="#" @click.stop.prevent="getResults(startat=num*20, quantityPage)">{{num+1}}</a>
                        </li>
                        <li class="page-item" v-show="pages.length>1 && startat+20<total">
                            <a class="page-link" href="#" @click.stop.prevent="getResults(startat+=20, quantityPage)">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
            </div>
        </div>
    </div>
</template>
<script src="./js/historianMain.js">
</script>
<style>
@import url('./css/historianMain.css');
</style>
