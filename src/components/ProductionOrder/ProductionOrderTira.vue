
<template>
    <div>
        <!--     Modal      -->
        <!-- Formulário de  -->
        <!-- Criação de OP  -->
        <!--                -->
        <b-modal no-close-on-backdrop ref="modalCadOP" hide-footer title="Cadastrar Ordem de Produção de Tira" modal-header-close>
                                       
            <div class="modal-body">
                <form>
                    <!-- <div class="alert alert-success" role="alert" v-if="opCreated">
                        OP criada com sucesso !
                    </div> -->
                    <div class="form-group row">
                        <div class="form-group col-sm-6">
                        <label for="op">OP</label>
                            <input required type="text" class="form-control" id="op" aria-describedby="prodorder" placeholder="ex:20405060" v-model="productionOrderObj.productionOrderNumber">
                        </div>
                        <div class="form-group col-sm-4">
                        <label for="desc">Descrição</label>
                            <input type="text" disabled class="form-control" id="desc" v-model="descriptionTira" value="opDesc">
                        </div>
                    </div>
                    <!-- <div class="form-group row">
                        <div class="form-group col-sm-6">
                        <label for="opType" >Tipo de Ordem</label>
                            <select class="form-control form-control-sm mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="opSelected">
                                <option value="" selected disabled>Tipo de Ordem</option>
                                <option v-for="(opType,index) in opTypeArray" v-bind:value="opType.productionOrderTypeId" v-bind:key="index" @click.stop="VOpType = opTypeArray[index].typeDescription">
                                    {{ opType.typeDescription }}
                                </option>
                            </select>
                        </div>
                    </div> -->
                    <div class="form-group row">
                        <div class="form-group col-md-12">
                        <label for="opType">Código da Tira</label>
                        <input autocomplete="off" @keyup="recipeArray=getResults(urlRecipeSearch, recipeName)" v-model="recipeName"  class="btn btn-outline-secondary col-md-9" id="dropdownMenuButton" placeholder="Ex: Receita1" />
                        <button class="btn btn-outline-success btn-sm col-md-1" :disabled="!productionOrderObj.productionOrderNumber || !recipeName || !canAdd" @click.stop.prevent="addRecipe(recipeSelected.recipeName, recipeSelected.recipeId)">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                        <b-dropdown-item @click.stop.prevent="recipeSelected=recipe;recipeName = recipeSelected.recipeCode; recipeArray=[]; msg=true" v-for="(recipe,index) in recipeArray" :key="index">{{ recipe.recipeCode }}</b-dropdown-item>
                        </div>
                        
                    </div>

                    <!--  Acordion que mostra qual   -->
                    <!--  receita foi selecionada    -->
                    
                    <div id="accordion" role="tablist" v-if="recipeAdded">
                        <div class="card">
                            <div class="card-header card-header-op" role="tab" id="headingOne">
                                <h5 class="mb-0">
                                    <a class="collapse-color" data-toggle="collapse" href="#recipeAdded" aria-expanded="true" aria-controls="recipeAdded">
                                        {{recipeAdded}}
                                    </a>
                                </h5>
                            </div>

                            <!--  Mostra as fases da Receita-->
                            <div id="recipeAdded" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body card-body-op" v-if="recipeObj.phases.length != 0 || carregando == true">
                                    <!-- <h5>Fases</h5> -->
                                    <!-- <ul class="list-group" v-for="(phases, index) in recipeObj.phases" v-bind:value="phases"> -->
                                    <ul class="list-group" v-if="recipeAdded.length != 0">
                                        <!-- <li class="list-group-item" > -->
                                        <span><strong>Descrição da Tira:</strong> {{recipeObj.recipeDescription}}</span>
                                        <span><strong>Código:</strong> {{recipeObj.recipeCode}}</span>                                           
                                    </ul>
                                </div>
                                <!-- Fim - </Mostra as fases da Receita>-->
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
            <!-- {{objetooo}} -->
            <!-- Botão que cria a OP-->
            <!--                    -->
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="!recipeAdded || !productionOrderObj.productionOrderNumber || productionOrderObj.productionOrderNumber == ' '" @click="createOp(productionOrderObj); hideModal('modalCadOP');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="productionOrderObj.productionOrderNumber = ''; recipeAdded = ''; idAllowed  = '';recipeName=''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
            <!--</Botão que cria a OP -->
            <!--                      -->
        
        </b-modal>
        <!-- Fechamento do Modal  -->
        <!-- Do formulário de     -->
        <!-- Criação de OP        -->

        <!--                      -->
        <!--  Botão que inicia    -->
        <!--  o Modal de Criação da OP  -->
        <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center nav-item-gp">
            <li class="nav-prod col-md-12">
                <h1 class="title-page-gp"> <b>Ordens de Produção - Tiras</b> </h1>
            </li>
            <li class="nav-prod col-md-2">
                <select class="form-control form-control-lg" aria-placeholder="Escolha o campo \/" v-model="fieldFilter" @change="fieldValue = ''">
                    <option value="" selected disabled>Buscar por:</option>
                    <option value="productionOrderNumber">OP</option>
                    <option value="typeDescription">Descrição</option>
                    <!-- <option value="recipeCode">Código</option> -->
                    <!-- <option value="currentStatus">Status</option> -->
                </select>
            </li>
                <li class="nav-prod col-md-2">
                    <input class="form-control relative btn-lg col-md-auto" type="search" :disabled="!fieldFilter" v-model="fieldValue" placeholder="Ex:OP1" aria-label="Busca">
                </li>
                <li class="nav-prod col-md-6">
                    <form class="form-inline my-3 form-control-sm">
                        <div class="col-md-auto">
                            <button type="button" button class="btn btn-primary btn-lg" @click.stop.prevent="buscar(id)"><i class="fa fa-search"></i> Buscar</button>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="col-md-3">
                            <button @click="productionOrderObj.productionOrderNumber = ''; recipeAdded = ''; idAllowed  = '';recipeName='';showModal('modalCadOP'); getRecipes(); getOpType()" type="button" class="btn btn-success btn-lg">
                                <i class="fa fa-plus"></i> Cadastrar Ordem de Produção
                            </button>
                        </div>
                    </form>
                </li>
            </ul>
        </div>
        <br>
        <!--             -->
        <!--  LISTAR OPs -->
        <!--             -->
        <div>
            <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
            </div>
             <p class="col-md-10" v-show="opArrarKeep.length == 0" v-if="!carregando">
                Sem Ordens de Produção Cadastradas
            </p>
                <div class="cabecalho-table-po"  v-show="!carregando" v-if="opArrarKeep.length > 0">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opArrarKeep, 'productionOrderNumber',0):organizar(opArrarKeep, 'productionOrderNumber',0);" class="ls2-cabecalho-po col-md-2">
                        <b><font class="cursor-class" color="#ffffff">OP &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(opArrarKeep, 'recipeCode',4):organizar(opArrarKeep, 'recipeCode',4);" class="ls2-cabecalho-po col-md-2">
                        <b><font class="cursor-class" color="#ffffff">
                            Código da Tira &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                        </font></b>
                    </label> 
                    <!-- <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(opArrarKeep, 'recipeName',3):organizar(opArrarKeep, 'recipeName',3);" class="ls2-cabecalho-po col-md-2">
                        <b><font class="cursor-class" color="#ffffff">
                            Nome da Tira &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label> -->
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(opArrarKeep, 'typeDescription',1):organizar(opArrarKeep, 'typeDescription',1);" class="ls2-cabecalho-po col-md-2" style="margin-left:1%">
                        <b><font class="cursor-class" color="#ffffff">
                            Descrição &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(opArrarKeep, 'quantity',2):organizar(opArrarKeep, 'quantity',2);" class="ls2-cabecalho-po col-md-2">
                        <b><font class="cursor-class" color="#ffffff">
                            Status&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </font></b>
                    </label> 
                </div>   
                <div class="table-margin"  v-show="!carregando">
                    <div v-for="(op, index) in opArrarKeep" v-bind:key="index" :class="{cinza: index%2==0}">
                        <label class="ls ls1 col-md-2">
                            {{op.productionOrderNumber}}
                        </label>&nbsp;&nbsp;&nbsp;
                        <label class="ls ls1 col-md-2">
                            {{op.recipeCode}}
                        </label>&nbsp;&nbsp;&nbsp;
                        <!-- <label class="ls ls1 col-md-2">
                            {{op.recipeName}}
                        </label>&nbsp;&nbsp;&nbsp; -->
                        <label class="ls ls1 col-md-2 aling-lb">
                            {{op.typeDescription}}
                        </label>&nbsp;&nbsp;&nbsp;
                        <label class="ls ls1 col-md-2">
                            {{op.currentStatus | filterStatus}}
                        </label>&nbsp;&nbsp;&nbsp;
                        <label class="ls ls1 col-md-2" v-if="op.hasProd == true">
                            {{op.recipe.recipeProduct.product.productName}}
                        </label>
                        <label class="ls ls1 col-md-1">
                            <i :id="op.recipe.recipeId" class="fa fa-eye" style="font-size: 22px; cursor: pointer;" @click="parametrosteste=[];recipes={};getGatewayRecipe(op)"></i>
                        </label>
                    </div>
                </div>
                <div class="paginacao" v-show="total>0">
                    <nav aria-label="">
                        <ul class="pagination justify-content-center">
                            <li v-show="startat>0" class="page-item">
                                <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=20, quantityPage)">Anterior</a>
                            </li>
                            <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                                <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*20, quantityPage)">{{num+1}}</a>
                            </li>
                            <li class="page-item" v-show="pages.length>1 && startat+20<total">
                                <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=20, quantityPage)">Próximo</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <!-- MODAL VISUALIZAR PARAMS -->
            <b-modal no-close-on-backdrop size="lg" ref="visualizarParams" hide-footer title="Visualizar Ordem de Produção de Tira" class="">
                <div v-if="opSelectedParams != ''">
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="">OP</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.productionOrderNumber" disabled>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="">Status</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.status" disabled>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="">Código da Tira</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeCode" disabled>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="">Nome da Tira</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeName" disabled>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="">Descrição</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeDescription" disabled>
                    </div>
                    </div>
                </div>
                </div>
                    <form>
                    <!-- <div class="fundo-branco-po"> -->
                    <div class="cabecalho-table-po-modal col-md-12">
                        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametrosteste, 'parametro',0):organizar(parametrosteste, 'parametro',0);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff"><p>Parâmetro
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(parametrosteste, 'vn',1):organizar(parametrosteste, 'vn',1);" class="ls2-cabecalho-po col-md-1">
                            <b><font class="cursor-class" color="#ffffff">
                                <p>Valor
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametrosteste, 'unidade',2):organizar(parametrosteste, 'unidade',2);" class="ls2-cabecalho-po col-md-1">
                            <b><font class="cursor-class" color="#ffffff">
                                <p>Unidade
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametrosteste, 'lie',3):organizar(parametrosteste, 'lie',3);" class="ls2-cabecalho-po  width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LIE <p class="font-size">Limite inferior da Especificação 
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(parametrosteste, 'lic',4):organizar(parametrosteste, 'lic',4);" class="ls2-cabecalho-po  width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LIC <p class="font-size">Limite inferior de Controle 
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(parametrosteste, 'lsc',5):organizar(parametrosteste, 'lsc',5);" class="ls2-cabecalho-po  width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LSC <p class="font-size">Limite superior de Controle
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(parametrosteste, 'lse',6):organizar(parametrosteste, 'lse',6);" class="ls2-cabecalho-po  width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LSE <p class="font-size">Limite superior de Especificação 
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                    </div>
                    <div class="table-margin-params">
                    <div v-for="(pro, index) in parametrosteste" v-bind:class="{cinza: index%2==0}" :key="index">                     
                    <label class="width-table-context-wider col-md-2">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.parametro}}
                    </label>                    
                    <label class="width-table-context col-md-1">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.vn}}
                    </label>
                    <label class="width-table-context col-md-1">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.unidade}}
                    </label>
                    <label class="width-table-context" >
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.lie}}
                    </label>   
                    <label class="width-table-context" >
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.lic}}
                    </label>            
                    <label class="width-table-context" >
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.lsc}}
                    </label>
                    <label class="width-table-context" style="margin-left:-0.5%">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.lse}}
                    </label>                                                                                        
                </div>
                </div>
                <!-- </div>   -->
                    </form>
            </b-modal>

            <!-- MODAL PARA EXIBIR ERRO  -->
            <b-modal no-close-on-backdrop ref="modalInfo" title="Mensagem" hide-footer>
            <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
            </b-modal>
    </div>


</template>
<script src="./js/orderTira.js">
</script>
<style>
@import url("./css/orderTira.css");
</style>
