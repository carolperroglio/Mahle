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
             <h1 class="title-page-hp" id="exButton1"><b> Apontamentos de Ordem de Produção</b> </h1>
            <ul class="nav d-flex align-items-center">
               <li class="nav-item-hp col-2.5">
                   <div class="badge">Clique para escolher uma ordem de produção   <i class="fa fa-arrow-right" id="seta"></i></div>
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
                            
                            <button type="button" class="btn btn-secondary pull-right" @click.stop.prevent="listar()">
                            Listar materiais
                            </button>
                        </div>
                            <div v-show="lista">
                                    <div class="card">
                                        <div class="card-header card-header-hp">
                                            <b>Materiais consumidos</b>
                                            <button type="button" class="btn btn-success pull-right" @click.stop.prevent=" showModal(); ordem.type='input'">
                                            Registrar matéria prima
                                            </button>
                                        </div>
                                        <div class="card-body card-body-hp">
                                            
'                                       <div id="load" v-show="carregando">
                                          <stretch background="#4d4d4d"></stretch>
                                        </div> 
                                        
                                        <div v-for="(o, index) in orderHistorian.productsInput" v-bind:key="index">
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Material: </font></b>{{o.product}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Quantidade: </font></b>{{o.quantity}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Lote: </font></b>{{o.batch}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Data: </font></b>{{o.date}}</label>&nbsp;
                                                
                                        </div>
                                        </div>
                                    </div>
                                      
                                        <div class="card-header card-header-hp">
                                            <b>Materiais apontados</b>
                                            <button type="button" class="btn btn-success pull-right" @click.stop.prevent=" showModal(); ordem.type='output'">
                                            Registrar rolo de tira
                                            </button>
                                        </div>
                                        <div class="card-body card-body-hp">
                                            <div v-for="(o, index) in orderHistorian.productsOutput" v-bind:key="index">
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Material: </font></b>{{o.product}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Quantidade: </font></b>{{o.quantity}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Rolo: </font></b>{{o.batch}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Data: </font></b>{{o.date}}</label>&nbsp;
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
        <b-modal ref="myModalRef" hide-footer title="Registrar Material">
                        <form>
                            <div class="form-group">
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                <div v-show="pReceita">
                                <label>
                                    <b>Material: </b>
                                </label>
                                <input type="text" id="prodReceita" placeholder="nome" required v-model="ordem.productName" class="form-control form-control-sm" disabled>
                                </div>
                                <div v-show="pFase">
                                <label>
                                    <b>Fase: </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="phaseIndex">
                                     <option v-for="(p,index) in orderPhaseProducts" :value="index" v-bind:key="index">{{ p.phaseName }}</option>
                                    </select>
                                <div v-if="consumo = true && phaseIndex != '' || phaseIndex == '0' && orderPhaseProducts[phaseIndex].lenght !== '0'">
                                <label>
                                    <b>Materiais: </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="ordem.productId">
                                    <option v-for="(p,index) in orderPhaseProducts[phaseIndex].phaseProducts" :value="p.product.productId" v-bind:key="index">{{ p.product.productName }}</option>
                                    </select>
                                </div>
                                </div>
                                <label>
                                    <b>Quantidade: </b>
                                </label>
                                <input type="text" required v-model="ordem.quantity" placeholder="quantidade" class="form-control form-control-sm">
                                <div v-show="pFase">
                                <label>
                                    <b>Lote: </b>
                                </label>
                                <input type="text" required v-model="ordem.batch" class="form-control form-control-sm">
                                </div>
                                <div v-show="pReceita">
                                    <label>
                                    <b>Rolo: </b>
                                </label>
                                <input type="text" required v-model="rolo" :disabled="true" class="form-control form-control-sm">
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.stop.prevent="cadastrarApont(ordem)">
                            Cadastrar
                            </button>
                        </form>
         </b-modal>
    </div>
</template>
<script src="./js/historianProduction.js">
</script>
<style>
@import url('./css/historianproduction.css');
</style>
