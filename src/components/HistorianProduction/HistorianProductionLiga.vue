<template >
    <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--      Barra de busca de OP       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
         <div class="fixed-top nav-hp">
            <h1 class="title-page-hp" id="exButton1"><b> Apontamentos de Ordem de Produção de Liga</b> </h1>
            <ul class="nav d-flex align-items-center">
               <li class="nav-item-hp col-2.5">
                   <div class="badge">Escolha uma ordem de produção   <i class="fa fa-arrow-right" id="seta"></i></div>
               </li>
                <li class="nav-item-hp col-3">
                    <b-dropdown id="ddown-buttons" text="Número da ordem" class="m-2 pull-left">
                        <b-dropdown-item v-for="(p,index) in OPs" v-bind:key="index" id="dropdownMenuButton" 
                                                                              @click.stop.prevent="productionOrder.productionOrderNumber=p.productionOrderNumber; 
                                                                              productionOrder.productionOrderId=p.productionOrderId; 
                                                                              op=p.productionOrderNumber;
                                                                              listaOp(p);
                                                                              productionOrderRecipe=p.recipe" >{{p.productionOrderNumber}}</b-dropdown-item>          
                    </b-dropdown>                                                  
                </li>                
            </ul>
        </div>

        <div id="order" v-show="order" style="display: none">
            
            <div class="orderHistorian col-11">
            <div class="card">
                <div class="card-header card-header-hp">
                    
                    <b><label class="ls">
                        <b><font color="#9BA6A5">Nº da OP: </font></b>{{productionOrder.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                    <label class="ls">
                        <b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>&nbsp;&nbsp;&nbsp;
                    <!--<label class="ls">
                        <b><font color="#9BA6A5">Receita da OP: </font></b>{{productionOrderRecipe.recipeName}}</label>&nbsp;&nbsp;&nbsp;
                    <label class="ls">
                        <b><font color="#9BA6A5">Produto da Receita: </font></b>{{productionOrderRecipe.recipeProduct.product.productName}}</label>&nbsp;&nbsp;&nbsp; -->
                    </b>
                    
                    <!-- <button type="button" class="btn btn-secondary pull-right" style="font-size:21px;" @click.stop.prevent="listar()">
                    Listar materiais
                    </button> -->
                </div>
                    <div v-show="lista">
                        <div class="card">
                            <div class="card-header card-header-hp">
                                <b>Materiais Consumidos e Apontados</b>
                                <div style="margin-right:1%" class="pull-right">
                                    <button type="button" class="btn btn-success"  @click.stop.prevent=" showModal(); ordem.type='input'">
                                <i aria-hidden="true" class="fa fa-plus"></i> Registrar Matéria-Prima
                                </button>
                                <!-- <button type="button" class="btn btn-success"  @click.stop.prevent=" showModal(); ordem.type='output'">
                                <i aria-hidden="true" class="fa fa-plus"></i> Registrar rolo de tira
                                </button> -->
                                </div>
                            </div>
                            <div class="card-body card-body-hp">
                            <div id="load" v-show="carregando">
                                <stretch background="#4d4d4d"></stretch>
                            </div> 
                        <div class="fundo-branco-ap-liga">
                            <div class="cabecalho-table-ap-liga">
                                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(allProducts, 'product',0):organizar(allProducts, 'product',0);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">Material &nbsp;&nbsp;&nbsp;
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(allProducts, 'quantity',1):organizar(allProducts, 'quantity',1);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Quantidade &nbsp;&nbsp;&nbsp;
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(allProducts, 'batch',2):organizar(allProducts, 'batch',2);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Lote/OPL &nbsp;&nbsp;&nbsp;
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(allProducts, 'date',3):organizar(allProducts, 'date',3);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Data &nbsp;&nbsp;&nbsp;
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label> 
                                <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(allProducts, 'hour',4):organizar(allProducts, 'hour',4);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Hora &nbsp;&nbsp;&nbsp;
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>                
                            </div>
                            <div v-for="(o, index) in allProducts" v-bind:key="index" :class="{cinza: index%2==0}">
                                <label class="ls ls10 col-md-2">
                                    {{o.product}}</label>&nbsp;
                                <label class="ls ls10 col-md-2">
                                    {{o.quantity}}</label>&nbsp;
                                <label class="ls ls10 col-md-2">
                                    {{o.batch}}</label>&nbsp;
                                <label class="ls ls10 col-md-2">
                                    {{o.date}}</label>&nbsp;
                                <label class="ls ls10 col-md-2">
                                    {{o.hour}}</label>&nbsp;    
                            </div>
                        </div>
                            
                            </div>
                        </div>
                </div>
            </div>
                    
            </div>
         </div>

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--   Cadastro de orderHistorian    -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
        <b-modal ref="myModalRef" hide-footer title="Registrar Matéria-Prima">
                        <form>
                            <div>
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                <div class="form-row">
                                <div class="form-group col-md-6" v-show="pReceita">
                                <label>
                                    <b>Material </b>
                                </label>
                                <input type="text" id="prodReceita" placeholder="nome" required v-model="ordem.productName" class="form-control form-control-sm" disabled>
                                </div>
                                <div class="form-group col-md-6" v-show="pFase" v-if="consumo = true">
                                <label>
                                    <b>Materiais </b>
                                </label>
                                <select class="form-control form-control-sm" v-model="ordem.productId">
                                    <option v-for="(p,index) in orderPhaseProducts.phaseProducts" :value="p.product.productId" v-bind:key="index">{{ p.product.productName }}</option>
                                </select>
                                </div>
                                <div class="form-group col-md-3" v-show="pFase">
                                <label>
                                    <b>Quantidade </b>
                                </label>
                                <input type="number" required v-model="ordem.quantity" placeholder="Ex:5" class="form-control form-control-sm">
                                </div>
                                <div class="form-group col-md-5">
                                <label>
                                    <b>Lote </b>
                                </label>
                                <input type="text" required v-model="lote" class="form-control form-control-sm">
                                </div>
                                <!-- </div> -->
                                <div class="form-group col-md-4" v-show="pReceita">
                                <label>
                                    <b>Rolo </b>
                                </label>
                                <input type="text" required v-model="rolo" :disabled="true" class="form-control form-control-sm">
                                </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-success"  @click.stop.prevent="cadastrarApont(ordem)">
                                            <i class="fa fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
         </b-modal>
    </div>
</template>
<script src="./js/historianProductionLiga.js">
</script>
<style>
@import url('./css/historianproductionLiga.css');
</style>
