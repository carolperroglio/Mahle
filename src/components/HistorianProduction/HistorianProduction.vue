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
            <ul class="nav d-flex align-items-center">
            <h1 class="title-page"> Apontamentos de OP </h1>
                <li class="nav-item nav-item-hp col-sm-1.5">
                    <label class="fm mr-sm-2">Número da OP: </label>   

                </li>
                <li class=""> 
                    <div class="dropdown">   
                            <br><br><input @keyup="POs=getResults(op)" v-model="op" placeholder="número da ordem" class="btn btn-outline-secondary dropdown-toggle col-sm-10" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="productionOrder.productionOrderNumber=p.productionOrderNumber; 
                                                                              productionOrder.productionOrderId=p.productionOrderId; 
                                                                              op=p.productionOrderNumber;
                                                                              productionOrderRecipe=p.recipe" v-for="(p,index) in POs">{{p.productionOrderNumber}}</a>                            
                            </div>                            
                        </div>
                </li>
                <li class="">
                    <form class="">
                    <div class="dropdown">
                        <br><br><button type="button" class="btn btn-primary btn-sm col-md-12 col-sm-1" @click.stop.prevent="listaOp()">
                            Selecionar
                        </button>
                             
                    </div>

                    </form>
                </li>
            </ul>
        </div>


        <div id="order" style="display: none">
            <div class="orderHistorian col-11">
                    <div class="card">
                        <div class="card-header card-header-hp">
                            <b><label class="ls">
                                <b><font color="#9BA6A5">Nº da OP: </font></b>{{productionOrder.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls10">
                                <b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>&nbsp;&nbsp;&nbsp;
                            </b>
                        </div>
                        <div class="card-body card-body-hp" id="tipo">
                            <div class="row">
                            <div class="col-1">
                            <label>
                                <b><font color="#9BA6A5">Tipo:</font></b>
                            </label> 
                            </div>
                            <div class="col-2">
                                <select required v-model="ordem.type" class="form-control form-control-sm-">
                                    <option value="input">Input</option>
                                    <option value="output">Output</option>
                                </select>
                            </div>   
                            <div class="col-2">
                            <button type="button" class="btn btn-primary btn-sm" @click.stop.prevent="getOrderProducts()">
                            Registrar Produto
                            </button>
                            </div>
                            <div class="col-2">
                            <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="listar()">
                            Listar Produtos
                            </button>
                            </div>
                            </div>
                        </div>
                            <div v-show="lista">
                                
                                    <div class="card">
                                        <div class="card-header card-header-hp">
                                            <b>Produtos de entrada</b>
                                        </div>
                                        <div class="card-body card-body-hp">
                                        <div v-for="(o, index) in orderHistorian.productsInput" v-bind:key="index">
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Produto: </font></b>{{o.product}}</label>&nbsp;
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
                                            <b>Produto de saída</b>
                                        </div>
                                        <div class="card-body card-body-hp">
                                            <div v-for="(o, index) in orderHistorian.productsOutput" v-bind:key="index">
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Produto: </font></b>{{o.product}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Quantidade: </font></b>{{o.quantity}}</label>&nbsp;
                                            <label class="ls ls10">
                                                <b><font color="#9BA6A5">Lote: </font></b>{{o.batch}}</label>&nbsp;
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
        <div class="modal fade" id="OPApont" tabindex="-1" role="dialog" aria-labelledby="OPApontLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="OPApontLabel">Registrar produto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                <div v-show="pReceita">
                                <label>
                                    <b>Produto: </b>
                                </label>
                                <input type="text" id="prodReceita" placeholder="nome" required v-model="ordem.productName" class="form-control form-control-sm" disabled>
                                </div>
                                <div v-show="pFase">
                                <label>
                                    <b>Fase: </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="phaseIndex">
                                    <option v-for="(p,index) in orderPhaseProducts" :value="index" >{{ p.phaseName }}</option>
                                    </select>
                                <div v-if="phaseIndex != '' || phaseIndex == '0' && orderPhaseProducts[phaseIndex].lenght !== '0'">
                                <label>
                                    <b>Produtos: </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="ordem.productId">
                                    <option v-for="(p,index) in orderPhaseProducts[phaseIndex].phaseProducts" :value="p.product.productId">{{ p.product.productName }}</option>
                                    </select>
                                </div>
                                </div>
                                <label>
                                    <b>Quantidade: </b>
                                </label>
                                <input type="text" required v-model="ordem.quantity" placeholder="quantidade" class="form-control form-control-sm">
                                <label>
                                    <b>Lote: </b>
                                </label>
                                <input type="text" required v-model="ordem.batch"  placeholder="lote" class="form-control form-control-sm">
                            </div>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.stop.prevent="cadastrarApont(ordem)">
                            Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./js/historianProduction.js">
</script>
<style>
@import url('./css/historianproduction.css');
</style>
