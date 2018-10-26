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
                <h1 class="title-page-gp-s-campo" id="exButton1"><b> Apontamentos de Ordem de Produção de Tira</b> </h1>
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

        <!-- <div id="order" v-show="order" style="display: none"> -->
        <div id="order">
            
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
                            
                            <!-- <button type="button" class="btn btn-secondary pull-right" @click.stop.prevent="listar()">
                            Listar materiais
                            </button> -->
                        </div>
                
                        <div>
                            <div class="card">
                                <div class="card-header card-header-hp">                                    
                                    <b>Materiais Consumidos e Apontados</b>
                                    <!-- <button type="button" class="btn btn-success pull-right" @click.stop.prevent=" showModal('myModalRef'); ordem.type='input'"> -->
                                    <div style="margin-right:1%" class="pull-right">
                                    <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = '';lote = ''; unity='';loteAco='';codeAco = ''; showModal('cadAco'); ordem.type = 'input'">
                                    <i aria-hidden="true" class="fa fa-plus"></i> Registrar Aço
                                    </button>
                                    <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = '';productionOrderId=''; unity='';loteLiga=''; showModal('cadLiga'); ordem.type = 'input'">
                                    <i aria-hidden="true" class="fa fa-plus"></i> Registrar Liga
                                    </button>
                                    <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = ''; ordem.productName = ''; unity=''; showModal('cadRoloSaida');pReceita = true; ordem.type = 'output'">
                                    <i aria-hidden="true" class="fa fa-plus"></i> Registrar Rolo de Saída
                                    </button>
                                    </div>
                                </div>
                                <div class="card-body card-body-hp">
                                <div class="fundo-branco-ap-tira">
                                <p class="col-md-10" v-show="teste.length == 0">
                                    {{noRegister}}
                                </p>
                                <div class="cabecalho-table-ap-tira" v-show="teste.length > 0">
                                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(teste, 'product',0):organizar(teste, 'product',0);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">Material 
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(teste, 'lote',2):organizar(teste, 'lote',2);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">
                                            OF/OP/OPL
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(teste, 'rolo',5):organizar(teste, 'rolo',5);" class="ls2-cabecalho-ap-tira col-md-1">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Rolo 
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label> 
                                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(teste, 'quantity',1):organizar(teste, 'quantity',1);" class="ls2-cabecalho-ap-tira col-md-1">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Quantidade 
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(teste, 'date',3):organizar(teste, 'date',3);" class="ls2-cabecalho-ap-tira col-md-1">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Data 
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label> 
                                    <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(teste, 'hour',4):organizar(teste, 'hour',4);" class="ls2-cabecalho-ap-tira col-md-1">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Hora 
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(teste, 'code',5):organizar(teste, 'code',5);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Código 
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label class="ls2-cabecalho-ap-tira col-md-1">
                                    <b><font class="cursor-class" color="#ffffff">
                                        Nome
                                    </font></b>
                                </label>                  
                                </div>
                            </div>
                            <div id="load2" v-show="carregando">
                                <stretch background="#4d4d4d"></stretch>
                            </div> 
                            <div v-for="(o, index) in teste" v-bind:key="index" :class="{cinza: index%2==0}" v-show="teste.length > 0">
                                    <label class="ls ls10 col-md-2">
                                        {{o.product=='aco'?'Aço': o.product}}</label>
                                    <label class="ls ls10  col-md-2">
                                        {{o.productType=='saida'?productionOrder.productionOrderNumber:o.lote}}</label>
                                    <label class="ls ls10 col-md-1">
                                        {{o.rolo}}</label>
                                    <label class="ls ls10  col-md-1">
                                        {{o.quantity}}</label>
                                    <label class="ls ls10  col-md-1">
                                        {{o.date}}</label>
                                    <label class="ls ls10  col-md-1">
                                        {{o.hour}}</label>  
                                    <label class="ls ls10 col-md-2">
                                        {{o.productType=='saida'?productionOrder.recipe.recipeCode:o.code}}</label>                                                        
                                    <label class="ls ls10 col-md-1" v-if="o.username != undefined">
                                        {{o.username}}
                                    </label> 
                                    <label class="ls ls10 col-md-1" v-else>
                                    </label>  

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
        <!--   Cadastro de Rolo de Aço       -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
        <b-modal no-close-on-backdrop ref="cadAco" hide-footer title="Registrar Aço" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Rolo de Aço: </b>
                    </label>
                    <input type="text" id="prodReceita" required  :value="prodRolo=='aco'?'Aço':prodRolo" class="form-control form-control-sm" disabled>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required :value="unity = 'kg'" class="form-control form-control-sm">
                    </div>
                    </div>
                <div class="form-row">
                    <div class="form-group col-md-5">
                    <label>
                        <b>OF: </b>
                    </label>
                    <input type="text"  v-model="loteAco" class="form-control form-control-sm">
                    </div>
                     <div class="form-group col-md-5">
                    <label>
                        <b>Código: </b>
                    </label>
                    <input type="text"  v-model="codeAco" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btn-group" role="group">
                        <button class="btn btn-success" :disabled=" quantity=='' || loteAco=='' || codeAco=='' || unity==''" @click.stop.prevent="ordem.type = 'input';cadastrarApont(ordem, 'aco');">
                            <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="quantity = ''; loteAco = ''; codeAco = ''; unity = ''" class="btn btn-primary pull-right">
                            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                        </button>
                    </div>                    
                </div>
                </div>
            </form>
         </b-modal>

        <!-- MODAL CADASTRAR LIGA -->
        <!--                      -->
        <b-modal no-close-on-backdrop ref="cadLiga" hide-footer title="Registrar Liga" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Liga: </b>
                    </label>
                    <input disabled type="text"  class="form-control form-control-sm" v-b-tooltip.hover title="NÃO HÁ OPS ATIVAS PARA A OP DE TIRA DESEJADA" placeholder="NÃO HÁ OPS DE LIGA PARA ESSA TIRA" v-show="listOP.lengt==0">
                    <select class="form-control form-control-sm" required v-model="productionOrderId" :change="loteLiga=productionOrderId.productionOrderNumber" v-if="listOP.length>0">                        
                        <option v-for="(p,index) in listOP" :value="p" v-bind:key="index" >{{ p.productionOrderNumber }}</option>
                    </select>
                    <!-- <input type="text" id="prodReceita" placeholder="nome" required v-model="ordem.productName" class="form-control form-control-sm" disabled> -->
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required :value="unity = 'kg'"  class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-5">
                        <label>
                        <b>OF: </b>
                        </label>
                        <input type="text" :disabled="true" required v-model="loteLiga" class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" :disabled=" quantity=='' || productionOrderId=='' || unity == ''" @click.stop.prevent="ordem.type = 'input';codeAco=productionOrderId.productionOrderId;cadastrarApont(ordem, 'liga');">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="quantity = ''; quantity = ''; unity = '';productionOrderId=''" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>

        <!-- MODAL CADASTRAR ROLO DE SAÍDA -->
        <b-modal no-close-on-backdrop ref="cadRoloSaida" hide-footer title="Registrar Rolo de Saída" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Rolo de Saída: </b>
                    </label>
                    <input type="text" id="prodReceita" required v-model="roloSaida" class="form-control form-control-sm" disabled>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required :value="unity = 'kg'"  class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-3">
                    <label>
                        <b>Nº do Rolo: </b>
                    </label>
                    <input type="text" required v-model="rolo" disabled class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" v-show="pReceita" @click.stop.prevent="ordem.type = 'output';cadastrarApont(ordem, 'saida');">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="quantity = ''; unity = '';" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>
        <!-- MODAL ERRO -->
          <b-modal ref="modalErro" no-close-on-backdrop title="" hide-footer="">
            <p class="alert alert-danger">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianProductionTira.js">
</script>
<style>
@import url('./css/historianproductionTira.css');
</style>
