
<template>
    <div>
        <!--     Modal      -->
        <!-- Formulário de  -->
        <!-- Criação de OP  -->
        <!--                -->
        <b-modal ref="modalCadOP" hide-footer title="Cadastrar Ordem de Produção de Tira">
                                       
                    <div class="modal-body">
                        <form>
                            <p v-if="errors.length">
                                        <ul v-for="(error, index) in errors" v-bind:key="index">
                                        <!-- <li class="alert alert-danger form-control" >{{ error.message}}</li> -->
                                        </ul>
                                    </p>
                            <div class="alert alert-success" role="alert" v-if="opCreated">
                                OP criada com sucesso !
                            </div>
                            <div class="form-group row">
                                <label for="op" class="col-sm-3 col-form-label">Ordem de Produção de Tira</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control form-control-sm" id="op" aria-describedby="prodorder" placeholder="ex:20405060" v-model="productionOrderObj.productionOrderNumber">
                                </div>
                                <label for="qtd" class="col-sm-2 col-form-label">Quantidade</label>
                                <div class="col-sm-3">
                                    <input type="number" class="form-control form-control-sm" id="qtd" v-model="productionOrderObj.quantity">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="opType" class="col-sm-3 col-form-label">Tipo de Ordem</label>
                                <div class="col-sm-3">
                                    <select class="form-control form-control-sm mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="opSelected">
                                        <option value="" selected disabled>Tipo de Ordem</option>
                                        <option v-for="(opType,index) in opTypeArray" v-bind:value="opType.productionOrderTypeId" v-bind:key="index" @click.stop="VOpType = opTypeArray[index].typeDescription">
                                            {{ opType.typeDescription }}
                                        </option>
                                    </select>
                                </div>
                                <label for="desc" class="col-sm-2 col-form-label">Descrição</label>
                                <div class="col-sm-4">
                                    <input type="text" disabled class="form-control form-control-sm" id="desc" v-model="filterDesc" value="opDesc">
                                </div>
                            </div>
                            <div class="form-group row">
                            </div>
                            <div class="form-group row">
                                <label for="opType" class="col-sm-2 col-form-label" v-if="opSelected == '1' || opSelected == ''">Tira</label>
                                <label for="opType" class="col-sm-2 col-form-label" v-if="opSelected == '2'">Liga</label>
                                <input @keyup="recipeArray=getResults(urlRecipeSearch, recipeName)" v-model="recipeName"  class="btn btn-outline-secondary col-sm-10" id="dropdownMenuButton" placeholder="Ex: Receita1" />
                                <b-dropdown-item @click.stop.prevent="recipeSelected=recipe;recipeName = recipeSelected.recipeName; recipeArray=[]; msg=true" v-for="(recipe,index) in recipeArray" :key="index">{{ recipe.recipeName }}</b-dropdown-item>
                                <div class="col-sm-2">
                                    <button class="btn btn-outline-success btn-sm" :disabled="!productionOrderObj.productionOrderNumber || !productionOrderObj.quantity || !opSelected || !filterDesc" @click.stop.prevent="addRecipe(recipeSelected.recipeName, recipeSelected.recipeId)">
                                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    </button>
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
                                                    <!-- <strong>Código:</strong> {{phases.phaseCode}} | -->
                                                    <!--Botão para procurar os produtos de uma determinada fase-->
                                                    <!-- <button type="button" class="btn btn-outline-info btn-sm" :id="index" data-toggle="collapse" data-target="#verProdutos" @click="seeProduct(index)" v-if="phases.phaseProducts != 0">Produtos</button> -->
                                                    <!--Botão para procurar os parâmetros de uma determinada fase-->
                                                    <!-- <button type="button" class="btn btn-outline-info btn-sm" :id="index" data-toggle="collapse" data-target="#verPârametros" @click="seeParam(index)" v-if="phases.phaseParameters != 0">Pârametros</button> -->
                                                <!-- </li> -->
                                                <!-- Collapse de ver 'Produtos' -->
                                                <!-- <div class="collapse" id="verProdutos">
                                                    <div class="card card-body-op">
                                                        <h6>Produtos</h6>
                                                        <ul class="list-group" v-for="product in productArray" v-bind:value="product">
                                                            <li class="list-group-item">
                                                                <strong>Nome:</strong> {{product.product.productName}} -
                                                                <strong>Descrição:</strong> {{product.product.productDescription}} -
                                                                <strong>GTIN:</strong> {{product.product.productGTIN}}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> -->
                                                <!-- Collapse de ver 'Pârametros' -->
                                                <!-- <div class="collapse" id="verPârametros">
                                                    <div class="card card-body-op">
                                                        <h6>Pârametros</h6>
                                                        <ul class="list-group" v-for="param in paramArray" v-bind:value="param">
                                                            <li class="list-group-item">
                                                                <strong>Nome:</strong> {{param.tag.tagName}} -
                                                                <strong>Descrição:</strong> {{param.tag.tagDescription}} -
                                                                <strong>Grupo:</strong> {{param.tag.thingGroup.groupName}}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> -->
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
                            <button class="btn btn-success" @click="createOp(productionOrderObj)">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
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
        <div class="fixed-top nav-op">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod col-sm-1.5">
                    <h1 class="title-page-op"> <b>Cadastro de Ordem de Produção de Tira</b> </h1>
                    <select class="form-control form-control-sm" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">
                        <option value="" selected disabled>Buscar por:</option>
                        <option value="productionOrderNumber">Nº Ordem de Produção</option>
                        <option value="typeDescription">Descrição</option>
                        <option value="quantity">Quantidade</option>
                        <option value="currentStatus">Status</option>
                    </select>
                </li>
                <li class="nav-prod col-sm-1.5">
                    <input class="form-control relative btn-sm col-md-auto" type="search" v-model="fieldValue" placeholder="Produto" aria-label="Busca">
                </li>
                <li class="nav-prod col-sm-1.5">
                    <form class="form-inline my-3 form-control-sm">
                        <div class="col-md-auto">
                            <button type="button" button class="btn btn-primary btn-sm" @click.stop.prevent="buscar(id)">Buscar</button>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="col-sm-1.5">
                            <button @click="showModal('modalCadOP'); getRecipes(); getOpType()" type="button" class="btn btn-success btn-sm btn-sm">
                                Cadastrar Ordem de Produção
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
        <div class="" style="">
            <div class="op col-md-12">
                <div id="load" v-show="carregando">
                    <stretch background="#4d4d4d"></stretch>
                </div>
                <div class="fundo-branco-po">
                    <div class="cabecalho-table-po">
                        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(opArray.values, 'productionOrderNumber',0):organizar(opArray.values, 'productionOrderNumber',0);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff">Ordem &nbsp;&nbsp;&nbsp;
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                            </font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(opArray.values, 'typeDescription',1):organizar(opArray.values, 'typeDescription',1);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff">
                                Descrição &nbsp;&nbsp;&nbsp;
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                            </font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(opArray.values, 'quantity',2):organizar(opArray.values, 'quantity',2);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff">
                                Quantidade&nbsp;&nbsp;&nbsp;
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                            </font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(opArray.values, 'recipeName',3):organizar(opArray.values, 'recipeName',3);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff">
                                Nome de Tira &nbsp;&nbsp;&nbsp;
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(opArray.values, 'recipeCode',4):organizar(opArray.values, 'recipeCode',4);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff">
                                Código da Tira &nbsp;&nbsp;&nbsp;
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </font></b>
                        </label> 
                    </div>
                </div>   
                <div class="table-margin">
                <div v-for="(op, index) in opArray.values" v-bind:key="index" :class="{cinza: index%2==0}">
                            <label class="ls ls1 col-md-2">
                                {{op.productionOrderNumber}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls1 col-md-2">
                                {{op.typeDescription}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls1 col-md-2">
                                {{op.quantity}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls1 col-md-2">
                                {{op.recipe.recipeName}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls1 col-md-2">
                                {{op.recipe.recipeCode}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls1 col-md-2" v-if="op.hasProd == true">
                                {{op.recipe.recipeProduct.product.productName}}
                            </label>
                            <label class="ls ls1 col-md-1">
                                <i :id="op.recipe.recipeId" class="fa fa-eye" style="font-size: 22px; cursor: pointer;" @click="showModal('visualizarParams');getGatewayRecipe(op)"></i>
                            </label>
                    </div>
                </div>
                </div>
                <div class="paginacao-op fixed-bottom" v-show="total>0">
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

            <!-- MODAL VISUALIZAR PARAMS -->
            <b-modal size="lg" ref="visualizarParams" hide-footer title="Visualizar Ordem de Produção de Tira">
                <div v-if="opSelectedParams != ''">
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="">OP</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.productionOrderNumber" disabled>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="">Status</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.currentStatus" disabled>
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
                        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametros, 'parametro',0):organizar(parametros, 'parametro',0);" class="ls2-cabecalho-po col-md-2">
                            <b><font class="cursor-class" color="#ffffff"><p>Parâmetro
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(parametros, 'vn',1):organizar(parametros, 'vn',1);" class="ls2-cabecalho-po col-md-1">
                            <b><font class="cursor-class" color="#ffffff">
                                <p>Valor
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametros, 'unidade',2):organizar(parametros, 'unidade',2);" class="ls2-cabecalho-po col-md-1">
                            <b><font class="cursor-class" color="#ffffff">
                                <p>Unidade
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametros, 'lie',3):organizar(parametros, 'lie',3);" class="ls2-cabecalho-po col-md-2 width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LIE <p class="font-size">Limite inferior da Especificação 
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label>
                        <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(parametros, 'lic',4):organizar(parametros, 'lic',4);" class="ls2-cabecalho-po col-md-2 width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LIC <p class="font-size">Limite inferior de controle 
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(parametros, 'lsc',5):organizar(parametros, 'lsc',5);" class="ls2-cabecalho-po col-md-2 width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LSC <p class="font-size">Limite superior de controle
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                        <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(parametros, 'lse',6):organizar(parametros, 'lse',6);" class="ls2-cabecalho-po col-md-2 width-table-context">
                            <b><font class="cursor-class" color="#ffffff">
                                LSE <p class="font-size">Limite superior de especificação 
                                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                            </p></font></b>
                        </label> 
                    </div>
                    <div v-for="(pro, index) in parametros" v-bind:class="{cinza: index%2==0}" :key="index">                     
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
                    <label class="width-table-context">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.lse}}
                    </label>                                                                                        
                </div>
                <!-- </div>   -->
                    </form>
            </b-modal>
    </div>


</template>
<script src="./js/order.js">
</script>
<style>
@import url("./css/order.css");
</style>
