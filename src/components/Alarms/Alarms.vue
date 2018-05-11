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
            </ul>
        </div>
        <div id="load-alarms" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>            
        <!-- GRÁFICO DOS ALARMES -->
        <div id="charAlarm" style="width: 100%; height: 400px;margin-top: 15%;"></div>                           
        
        <!-- TABELA DOS ALARMES -->
        <div class="cabecalho-table-alarms"  v-show="!carregando">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(produtos, 'product',0):organizar(produtos, 'product',0);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">Parâmetro &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(produtos, 'minValue',1):organizar(produtos, 'minValue',1);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Equipamento &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Tipo &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Data &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Hora Início &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Hora Fim &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>                
        </div>                                             

        <button class="btn btn-primary" @click="getReport()">Texto</button> 
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Listagem dos produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->                            
        <div v-show="!carregando" class="alarms-produtos">
            <div v-for="(pro, index) in produtos" v-bind:class="{cinza: index%2==0}" :key="index">                                    
                <label class="ls2 col-md-2">
                    {{pro.product.productName}}</label>
                <label class="ls2 col-md-2">
                    {{pro.minValue}}</label>
                <label class="ls2 col-md-2">
                    {{pro.maxValue}}</label>                                        
                <label class="ls2 fim col-md-5">                        
                    <i class = "fa fa-trash-o" style="font-size:21px; cursor:pointer; color:red;"></i>&nbsp;&nbsp;&nbsp;                     
                    <!--<i class="fa fa-edit" style="font-size:21px; cursor:pointer" @click.stop.prevent="phaseProduct = {};showModalEditProPhase(pro, index)"></i>-->
                </label>
            </div>                       
        </div> 
        

    </div>
</template>
<script src="./js/alarms.js">
</script>
<style>
@import url("./css/alarms.css");
</style> 


<!-- -->