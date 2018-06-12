<template >
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
            <h1 class="title-page-gp-s-campo" id="exButton1"><b> Apontamentos de Ordem de Produção de Liga (OPL)</b> </h1>
            </li> 
               <!-- <li class="nav-item-hp col-2.5">
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
                </li>                 -->
            </ul>
        </div>

        <div id="order" v-show="order" style="display: none">
            
            <div class="orderHistorian col-11">
            <div class="card">
                <div class="card-header card-header-hp">
                    
                    <b><label class="ls">
                        <b><font color="#9BA6A5">Nº da OP: </font></b>{{productionOrder.productionOrderNumber}}</label>
                    <label class="ls">
                        <b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>
                    <!--<label class="ls">
                        <b><font color="#9BA6A5">Receita da OP: </font></b>{{productionOrderRecipe.recipeName}}</label>
                    <label class="ls">
                        <b><font color="#9BA6A5">Produto da Receita: </font></b>{{productionOrderRecipe.recipeProduct.product.productName}}</label> -->
                    </b>
                    
                    <!-- <button type="button" class="btn btn-secondary pull-right" style="font-size:21px;" @click.stop.prevent="listar()">
                    Listar materiais
                    </button> -->
                </div>
                    <div v-show="lista">
                        <div class="card">
                            <div class="card-header card-header-hp">
                                <b>Materiais Apontados</b>
                                <div style="margin-right:1%" class="pull-right">
                                <button type="button" class="btn btn-success"  @click.stop.prevent="ordem.quantity ==''; showModal('myModalRef'); ordem.type='input'">
                                <i aria-hidden="true" class="fa fa-plus"></i> Registrar Matéria-Prima
                                </button>
                                <button type="button" class="btn btn-warning"  @click.stop.prevent="getAnalysis();showModal('exibirCalculo'); ordem.type='input'">
                                <i aria-hidden="true" class="fa fa-eye"></i> Exibir Cálculo
                                </button>
                                <button v-if="productionOrder.status == 'approved'" type="button" class="btn btn-danger" @click.stop.prevent="getAnalysis();showModal('lastAnalysis'); ordem.type='input'">
                                <i aria-hidden="true" class="fa fa-eye"></i> Exibir Última Análise
                                </button>
                                <button v-else type="button" class="btn btn-danger"  v-show="productionOrder.status == 'reproved'" @click.stop.prevent="getAnalysis();showModal('correction'); ordem.type='input'">
                                <i aria-hidden="true" class="fa fa-eye"></i> Correção
                                </button>
                                <button type="button" class="btn btn-primary"  @click.stop.prevent="changeStatusToWaitingAnalysis()"
                                v-if="productionOrder.status == 'active' || productionOrder.status == 'reproved'">
                                <i class="fa fa-flask" aria-hidden="true"></i> Liberar para Análise
                                </button>
                                </div>
                            </div>
                        <div class="card-body card-body-hp">
                            
                        <div class="fundo-branco-ap-liga">
                            <p class="col-md-10" v-show="allProducts.length == 0">
                                    {{noRegister}}
                            </p>
                            <div class="cabecalho-table-ap-liga" v-if="allProducts.length > 0">
                                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(allProducts, 'product',0):organizar(allProducts, 'product',0);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">Material 
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(allProducts, 'quantity',1):organizar(allProducts, 'quantity',1);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Quantidade 
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(allProducts, 'lote',2):organizar(allProducts, 'lote',2);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Lote/OPL 
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(allProducts, 'date',3):organizar(allProducts, 'date',3);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Data 
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label> 
                                <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(allProducts, 'hour',4):organizar(allProducts, 'hour',4);" class="ls2-cabecalho-ap-liga col-md-2">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Hora 
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>
                                <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(allProducts, 'username',5):organizar(allProducts, 'username',5);" class="ls2-cabecalho-ap-liga col-md-1">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Username 
                                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                                    </font></b>
                                </label>               
                            </div>
                            <div id="load2" v-show="carregando">
                                <stretch background="#4d4d4d"></stretch>
                            </div> 
                            <div v-for="(o, index) in allProducts" v-bind:key="index" :class="{cinza: index%2==0}">
                                
                                <label class="ls ls10 col-md-2">
                                    {{o.product}}</label>
                                <label class="ls ls10 col-md-2">
                                    {{o.quantity}}</label>
                                <label class="ls ls10 col-md-2">
                                    {{o.lote}}</label>
                                <label class="ls ls10 col-md-2">
                                    {{o.date}}</label>
                                <label class="ls ls10 col-md-2">
                                    {{o.hour}}</label>
                                <label class="ls ls10 col-md-1" v-if="o.username != undefined">
                                    {{o.username}}</label>    
                            </div>
                        </div>
                            
                            </div>
                        </div>
                </div>
            </div>
                    
            </div>
         </div>
        <!-- ||||||||||||||| -->
        <!-- EXIBIR CÁLCULO  -->
         <b-modal size="lg" ref="exibirCalculo" hide-footer title="Cálculo da Análise Química Realizada">
            <form>
                <div v-if="calculoOK">
                    <div class="cabecalho-table-exibir-cálculo">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(calculos, 'key',0):organizar(allProducts, 'product',0);" class="ls2-cabecalho-ap-liga col-md-4">
                        <b><font class="cursor-class" color="#ffffff">Material 
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(calculos, 'value',1):organizar(allProducts, 'quantity',1);" class="ls2-cabecalho-ap-liga col-md-7">
                        <b><font class="cursor-class" color="#ffffff">
                            Quantidade necessária a ser adicionada no forno(Kg)
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                </div>
                <div v-for="(c, index) in calculos" v-bind:key="index" :class="{cinza: index%2==0}">
                    <label class="ls ls10 col-md-4">
                        {{c.key}}</label>
                    <label class="ls ls10 col-md-7">
                        {{c.value}}</label>
                </div>
                </div>
            </form>
         </b-modal>

         <!-- 
            CORREÇÃO - É EXIBIDA SE A OP FOI REPROVADA
          -->
         <b-modal size="lg" ref="correction" hide-footer title="Correção">
            <form>
                <div v-if="calculoOK">
                    <div class="cabecalho-table-exibir-cálculo">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(lastAnalysis, 'key',0):organizar(lastAnalysis, 'product',0);" class="ls2-cabecalho-ap-liga col-md-4">
                        <b><font class="cursor-class" color="#ffffff">Material 
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(lastAnalysis, 'value',1):organizar(lastAnalysis, 'quantity',1);" class="ls2-cabecalho-ap-liga col-md-7">
                        <b><font class="cursor-class" color="#ffffff">
                            Quantidade necessária a ser adicionada no forno(Kg)
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                </div>
                <div v-for="(l, index) in lastAnalysis.messages" v-bind:key="index" :class="{cinza: index%2==0}">
                    <label class="ls ls10 col-md-4">
                        {{l.key}}</label>
                    <label class="ls ls10 col-md-7">
                        {{l.value}}</label>
                </div>
                <div v-if="cobreFosforoso!= null">
                <label class="ls ls10 col-md-4">
                    Cobre Fosforoso</label>
                <label class="ls ls10 col-md-7">
                    {{cobreFosforoso}}</label>
                </div>
                        
                </div>
            </form>
         </b-modal>

         <!-- 
            LAST ANALYSYS - É EXIBIDA SE A OP FOI APROVADA
          -->
         <b-modal size="lg" ref="lastAnalysis" hide-footer title="Última Análise">
            <form>
                <div v-if="calculoOK">
                    <div class="cabecalho-table-exibir-cálculo">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(lastAnalysis, 'key',0):organizar(lastAnalysis, 'product',0);" class="ls2-cabecalho-ap-liga col-md-4">
                        <b><font class="cursor-class" color="#ffffff">Material 
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(lastAnalysis, 'value',1):organizar(lastAnalysis, 'quantity',1);" class="ls2-cabecalho-ap-liga col-md-7">
                        <b><font class="cursor-class" color="#ffffff">
                            Resultado(%)
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                </div>
                <div v-for="(l, index) in lastAnalysis.comp" v-bind:key="index" :class="{cinza: index%2==0}">
                    <label class="ls ls10 col-md-4">
                        {{l.productName}}</label>
                    <label class="ls ls10 col-md-7">
                        {{l.value}}</label>
                </div>
                <div v-if="cobreFosforoso!= null" :class="{cinza: index%2==0}">
                <label class="ls ls10 col-md-4">
                    Cobre Fosforoso</label>
                <label class="ls ls10 col-md-7">
                    {{cobreFosforoso}}</label>
                </div>
                        
                </div>
            </form>
         </b-modal>

        <!--                                 -->
        <!--   Cadastro de orderHistorian    -->
        <!--               Modal             -->
        <b-modal ref="myModalRef" hide-footer title="Registrar Matéria-Prima">
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>
                        <b>Materiais </b>
                    </label>
                    <select class="form-control form-control-sm" v-model="prodRolo">
                        <option v-for="(p,index) in orderPhaseProducts" :value="p.product.productId" v-bind:key="index">{{ p.product.productName }}</option>
                    </select>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade </b>
                    </label>
                    <input type="number" required v-model="quantity" placeholder="Ex:5" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Unidade </b>
                    </label>
                    <input type="text" required :value="unity ='kg'" placeholder="Ex:kg" class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-5">
                    <label>
                        <b>Lote </b>
                    </label>
                    <input type="text" required v-model="lote" class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" :disabled="!quantity ||prodRolo == ''||lote ==''|| unity ==''" @click.stop.prevent="cadastrarApont(ordem);hideModal('myModalRef')">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="quantity =''; lote = ''; unity = ''" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button> 
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>

         <b-modal ref="modalErro" title="" hide-footer="">
            <p :class="erro? 'alert alert-danger':'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianProductionLiga.js">
</script>
<style>
@import url('./css/historianproductionLiga.css');
</style>
