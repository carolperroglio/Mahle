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
                                <b><font color="#9BA6A5">Nº da OP: </font></b>{{productionOrder.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>&nbsp;&nbsp;&nbsp;
                            <!--<label class="ls">
                                <b><font color="#9BA6A5">Receita da OP: </font></b>{{productionOrderRecipe.recipeName}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Produto da Receita: </font></b>{{productionOrderRecipe.recipeProduct.product.productName}}</label>&nbsp;&nbsp;&nbsp; -->
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
                                    <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = '';lote = ''; unity='';loteAco=''; showModal('cadAco'); ordem.type = 'input'">
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
                                <div class="cabecalho-table-ap-tira">
                                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(teste, 'product',0):organizar(teste, 'product',0);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">Material &nbsp;&nbsp;&nbsp;
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(teste, 'lote',2):organizar(teste, 'lote',2);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">
                                            OF/OPL &nbsp;&nbsp;&nbsp;
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(teste, 'rolo',5):organizar(teste, 'rolo',5);" class="ls2-cabecalho-ap-tira col-md-1">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Rolo &nbsp;&nbsp;&nbsp;
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label> 
                                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(teste, 'quantity',1):organizar(teste, 'quantity',1);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Quantidade &nbsp;&nbsp;&nbsp;
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>
                                    <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(teste, 'date',3):organizar(teste, 'date',3);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Data &nbsp;&nbsp;&nbsp;
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label> 
                                    <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(teste, 'hour',4):organizar(teste, 'hour',4);" class="ls2-cabecalho-ap-tira col-md-2">
                                        <b><font class="cursor-class" color="#ffffff">
                                            Hora &nbsp;&nbsp;&nbsp;
                                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                                        </font></b>
                                    </label>                
                                </div>
                            </div>
                            <div id="load2" v-show="carregando">
                                <stretch background="#4d4d4d"></stretch>
                            </div> 
                            <div v-for="(o, index) in teste" v-bind:key="index" :class="{cinza: index%2==0}">
                                    <label class="ls ls10 col-md-2">
                                        {{o.product}}</label>&nbsp;
                                    <label class="ls ls10  col-md-2">
                                        {{o.lote}}</label>&nbsp;
                                    <label class="ls ls10  col-md-1">
                                        {{o.rolo}}</label>&nbsp;
                                    <label class="ls ls10  col-md-2">
                                        {{o.quantity}}</label>&nbsp;
                                    <label class="ls ls10  col-md-2">
                                        {{o.date}}</label>&nbsp;
                                    <label class="ls ls10  col-md-1" style="margin-left:4%">
                                        {{o.hour}}</label>&nbsp;    
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
        <b-modal ref="cadAco" hide-footer title="Registrar Aço" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Rolo de Aço: </b>
                    </label>
                    <input type="text" id="prodReceita" placeholder="nome" required  :value="prodRolo" class="form-control form-control-sm" disabled>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" placeholder="Ex:5" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required v-model="unity" placeholder="Ex:kg" class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-5">
                    <label>
                        <b>OPL: </b>
                    </label>
                    <input type="text"  v-model="loteAco" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btn-group" role="group">
                        <button class="btn btn-success" :disabled=" quantity==='' || loteAco=='' || unity==''" @click.stop.prevent="cadastrarApont(ordem);">
                            <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="ordem.quantity = ''; ordem.productName = ''" class="btn btn-primary pull-right">
                            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                        </button>
                    </div>
                    
                </div>
                </div>
            </form>
         </b-modal>

        <!-- MODAL CADASTRAR LIGA -->
        <!--                      -->
        <b-modal ref="cadLiga" hide-footer title="Registrar Liga" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Liga: </b>
                    </label>
                    <select class="form-control form-control-sm" required v-model="productionOrderId">
                        <option v-for="(p,index) in listOP" :value="p" v-bind:key="index">{{ p.productionOrderNumber }}</option>
                    </select>
                    <!-- <input type="text" id="prodReceita" placeholder="nome" required v-model="ordem.productName" class="form-control form-control-sm" disabled> -->
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" placeholder="Ex:5" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required v-model="unity" placeholder="Ex:kg" class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-5">
                        <label>
                        <b>OPL: </b>
                        </label>
                        <input type="text" required :value="loteLiga = productionOrderId.productionOrderNumber" class="form-control form-control-sm" disabled>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" :disabled=" quantity==='' || productionOrderId=='' || unity == ''" @click.stop.prevent="cadastrarApont(ordem);">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="ordem.quantity = ''; ordem.productName = ''" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>

        <!-- MODAL CADASTRAR ROLO DE SAÍDA -->
        <b-modal ref="cadRoloSaida" hide-footer title="Registrar Rolo de Saída" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Rolo de Saída: </b>
                    </label>
                    <input type="text" id="prodReceita" placeholder="nome" required v-model="roloSaida" class="form-control form-control-sm" disabled>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" placeholder="Ex:5" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required v-model="unity" placeholder="Ex:kg" class="form-control form-control-sm">
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
                            <button class="btn btn-success" :disabled=" quantity==='' || productionOrderId=='' || unity == ''" v-show=" pReceita" @click.stop.prevent="cadastrarApont(ordem);">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="ordem.quantity = ''; ordem.productName = ''" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>
        <!-- MODAL ERRO -->
          <b-modal ref="modalErro" title="Erro" hide-footer="">
            <p class="alert alert-danger">Ocorreu um erro: {{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianProductionTira.js">
</script>
<style>
@import url('./css/historianproductionTira.css');
</style>
