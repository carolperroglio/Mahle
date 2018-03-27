<template>
<div>
  <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->
        
        <div class="fixed-top nav-genealogy">                                   
            <ul class="nav d-flex">
                <li class="nav-item nav-item-genealogy col-sm-1.5 ">
                    <h3 class="title-page-gp"><b>Relatório de Genealogia de Liga</b></h3>
                </li>                  
            </ul>


            <div class="fundo-branco">
            <div class="container col-md-6">
                    <br>
                    <div class="row">
                        <label><b>Início: </b></label>
                        <div class="col-md-3">
                            <date-picker class="form-control form-control-sm" v-model="date" :config="config" ></date-picker>
                        </div>
                        <label><b>Fim: </b></label>  
                        <div class="col-md-3">
                            <date-picker class="form-control form-control-sm" v-model="datef" :config="config2"></date-picker>
                        </div>
                        <div class="col-md-3">
                        <select class="form-control form-control-sm" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                            <option v-for="(op,index) in ops" :value="op.productionOrderTypeId" v-bind:key="index" >{{op.productionOrderNumber}}</option>
                        </select>    
                        </div>
                    </div>                    
            </div>                         
                <div class="cabecalho-table-gen">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(produtos, 'productName',0):organizar(produtos, 'productName',0);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">Ordem de Produção &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(produtos, 'productDescription',1):organizar(produtos, 'productDescription',1);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Produto Final &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(produtos, 'productCode',2):organizar(produtos, 'productCode',2);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Componentes &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </font></b></label>
                    <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(produtos, 'productGTIN',3):organizar(produtos, 'productGTIN',3);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Quantidade &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(produtos, 'productGTIN',3):organizar(produtos, 'productGTIN',3);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Unidade &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(produtos, 'productGTIN',3):organizar(produtos, 'productGTIN',3);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Lote &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(produtos, 'productGTIN',3):organizar(produtos, 'productGTIN',3);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Data &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[7]==false?desorganizar(produtos, 'productGTIN',3):organizar(produtos, 'productGTIN',3);" class="ls2-cabecalhotabgenealogy">
                        <b><font class="cursor-class" color="#ffffff">
                            Hora &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                </div> 
            </div>



            <div class="" style="">
            
            <div class="genealogy col">
                <div id="load" v-show="carregando">
                    <stretch background="#4d4d4d"></stretch>                
                </div> 
                
                <div v-for="(p, index) in produtos" :class="{cinza: index%2==0}" :key="index">                                    
                    <label class="ls ls2">
                        {{p.productName}}</label>&nbsp;&nbsp;&nbsp;
                    <label class="ls ls2">
                        {{p.productDescription}}</label>&nbsp;&nbsp;&nbsp;
                    <label class="ls ls2">
                        {{p.productCode}}</label>&nbsp;&nbsp;&nbsp;
                    <label class="ls ls2">
                        {{p.productGTIN}}</label>&nbsp;&nbsp;&nbsp;
                    <i class="fa fa-edit icon-right" style="font-size:21px; cursor:pointer" @click.stop.prevent="showModal2(p)" aria-hidden="true"></i>
                </div>
                <div class="paginacao" v-show="total>0">
                    <nav aria-label="">
                        <ul class="pagination justify-content-center">
                            <li v-show="startat>0" class="page-item">
                                <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=20, quantityPage)">Previous</a>
                            </li>
                            <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                                <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*20, quantityPage)">{{num+1}}</a>
                            </li>
                            <li class="page-item" v-show="pages.length>1 && startat+20<total">
                                <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=20, quantityPage)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <br>
        </div>               
        </div>
</div>
</template>

<script src="./js/genealogyReport.js">
</script>

<style>
@import url("./css/genealogyReport.css");
</style>
