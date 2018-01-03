<template >
    <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--      Barra de busca de OP       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
         <div class="fixed-top nav-ferramentas">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item">
                    <label class="fm mr-sm-2">Número da OP: </label>   
                     <div class="dropdown">   
                            <input @keyup="POs=getResults(op)" v-model="op" placeholder="número da ordem" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="productionOrder.productionOrderNumber=p.productionOrderNumber; 
                                                                              productionOrder.productionOrderId=p.productionOrderId; 
                                                                              op=p.productionOrderNumber;
                                                                              productionOrderRecipe=p.recipe" v-for="(p,index) in POs">{{p.productionOrderNumber}}</a>                            
                            </div>                            
                        </div>
                </li>
                <li class="nav-item">
                    <form class="form-inline my-3 form-control-sm mr-sm-12">
                    <div class="">
                        <button type="button" class="btn btn-outline-primary btn-sm col-md-12" @click.stop.prevent="listaOp()">
                            Selecionar
                        </button>
                    </div>

                    </form>
                </li>
            </ul>
        </div>


        <div id="order" class="row conteudo" style="display: none">
            <div class="ferramentas col-8">
                    <div class="card">
                        <div class="card-header">
                            <b></b>
                        </div>
                        <div class="card-body">
                            <label class="ls">
                                <b><font color="#9BA6A5">Nº da OP: </font></b>{{productionOrder.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Tipo:</font></b>
                            </label> 
                                <select required v-model="ordem.type" class="ls form-control form-control-sm">
                                    <option value="input">Input</option>
                                    <option value="output">Output</option>
                                </select>   
                            <button type="button" class="btn btn-outline-success btn-sm" @click.stop.prevent="getOrderProducts()">
                            Registrar Produto
                            </button>
                        </div>
                    </div>
            </div>
         </div>

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--     Cadastro de Ferramentas     -->
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
