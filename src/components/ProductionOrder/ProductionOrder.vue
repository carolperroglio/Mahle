
<template>
    <div>
        <!--     Modal      -->
        <!-- Formulário de  -->
        <!-- Criação de OP  -->
        <!--                -->
        <div class="modal fade cadastro-op" id="cadastrarOp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">

                <div class="modal-content">
                    <div class="progress" v-show="carregando">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cadastrar OP</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="alert alert-success" role="alert" v-if="opCreated">
                                OP criada com sucesso !
                            </div>
                            <div class="form-group row">
                                <label for="op" class="col-sm-3 col-form-label">Ordem de Produção</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control form-control-sm" id="op" aria-describedby="prodorder" placeholder="ex:20405060" v-model="productionOrderObj.productionOrderNumber">
                                </div>
                                <label for="qtd" class="col-sm-2 col-form-label">Quantidade</label>
                                <div class="col-sm-3">
                                    <input type="number" class="form-control form-control-sm" id="qtd" v-model="productionOrderObj.quantity">
                                </div>
                            </div>
                            <!--<div class="form-group row">
                                                                                                                <label for="qtd" class="col-sm-4 col-form-label">Quantidade</label>
                                                                                                                <div class="col-sm-8">
                                                                                                                    <input type="number" class="form-control" id="qtd" aria-describedby="qty" placeholder="">
                                                                                                                </div>
                                                                                                            </div>-->
                            <div class="form-group row">
                                <label for="opType" class="col-sm-3 col-form-label">Tipo de Ordem</label>
                                <div class="col-sm-3">
                                    <select class="form-control form-control-sm mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="opSelected">
                                        <option value="" selected disabled>Tipo de Ordem</option>
                                        <option v-for="opType in opTypeArray" v-bind:value="opType.productionOrderTypeId">
                                            {{ opType.productionOrderTypeId }}
                                        </option>
                                    </select>
                                </div>
                                <label for="desc" class="col-sm-2 col-form-label">Descrição</label>
                                <div class="col-sm-4">
                                    <input type="text" disabled class="form-control form-control-sm" id="desc" v-model="filterDesc" value="opDesc">
                                </div>
                            </div>
                            <div class="form-group row">
                                <!--<label for="desc" class="col-sm-4 col-form-label">Descrição</label>
                                                                                                                <div class="col-sm-8">
                                                                                                                    <input type="text" disabled class="form-control" id="desc" v-model="filterDesc" value="opDesc">
                                                                                                                    <small id="descrip" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                                                                                                </div>-->
                            </div>
                            <div class="form-group row">
                                <label for="opType" class="col-sm-3 col-form-label">Receita</label>
                                <div class="col-sm-5">
                                    <select class="form-control form-control-sm mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="recipeSelected">
                                        <option value="" selected disabled>Selecione uma receita</option>
                                        <option v-for="recipe in recipeArray" v-bind:value="recipe">
                                            {{ recipe.recipeName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-outline-success btn-sm" @click="addRecipe(recipeSelected.recipeName, recipeSelected.recipeId)">
                                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <!--{{ recipeSelected }}-->
                            </div>
                            <!--  Acordion que mostra qual     -->
                            <!--  receita foi selecionada      -->
                            <div id="accordion" role="tablist" v-if="recipeAdded">
                                <div class="card">
                                    <div class="card-header" role="tab" id="headingOne">
                                        <h5 class="mb-0">
                                            <a class="collapse-color" data-toggle="collapse" href="#recipeAdded" aria-expanded="true" aria-controls="recipeAdded">
                                                {{recipeAdded}}
                                            </a>
                                        </h5>
                                    </div>

                                    <!--  Mostra as fases da Receita-->
                                    <div id="recipeAdded" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body-op" v-if="recipeObj.phases.length != 0 || carregando == true">
                                            <h5>Fases</h5>
                                            <ul class="list-group" v-for="(phases, index) in recipeObj.phases" v-bind:value="phases">
                                                <li class="list-group-item" v-if="recipeAdded.length != 0">
                                                    <strong>Nome:</strong> {{phases.phaseName}} -
                                                    <strong>Código:</strong> {{phases.phaseCode}} |
                                                    <!--Botão para procurar os produtos de uma determinada fase-->
                                                    <button type="button" class="btn btn-outline-info btn-sm" :id="index" data-toggle="collapse" data-target="#verProdutos" @click="seeProduct(index)" v-if="phases.phaseProducts != 0">Produtos</button>
                                                    <!--Botão para procurar os parâmetros de uma determinada fase-->
                                                    <button type="button" class="btn btn-outline-info btn-sm" :id="index" data-toggle="collapse" data-target="#verPârametros" @click="seeParam(index)" v-if="phases.phaseParameters != 0">Pârametros</button>
                                                </li>
                                                <!-- Collapse de ver 'Produtos' -->
                                                <div class="collapse" id="verProdutos">
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
                                                </div>
                                                <!-- Collapse de ver 'Pârametros' -->
                                                <div class="collapse" id="verPârametros">
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
                                                </div>
                                            </ul>

                                        </div>
                                        <!-- Fim - </Mostra as fases da Receita>-->
                                    </div>
                                </div>
                            </div>
                            <!--  Fim - </Acordion que mostra qual  -->
                            <!--  receita foi selecionada>          -->

                            <!--<div class="alert alert-warning" role="alert" v-if="recipeObj.phases.length == 0">
                                                                                                Não possui fases!
                                                                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                </button>
                                                                                            </div>-->
                        </form>
                    </div>
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
                </div>
            </div>
        </div>
        <!-- Fechamento do Modal  -->
        <!-- Do formulário de     -->
        <!-- Criação de OP        -->

        <!--                      -->
        <!--  Botão que inicia    -->
        <!--  o Modal de Criação da OP  -->
        <div class="fixed-top nav-op">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod col-sm-1.5">
                    <h1 class="title-page-op"> Cadastro de Ordem de Produção </h1>
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
                    <select class="form-control form-control-sm" v-model="orderField">
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="productionOrderNumber">Nº Ordem de Produção</option>
                        <option value="typeDescription">Descrição</option>
                        <option value="quantity">Quantidade</option>
                        <option value="currentStatus">Status</option>
                    </select>
                </li>
                <li class="nav-prod col-sm-1.5">
                    <select class="form-control form-control-sm" v-model="order">
                        <option value="" selected disabled>Ordenação</option>
                        <option value="ascending">Crescente</option>
                        <option value="descending">Decrescente</option>
                    </select>
                </li>

                <li class="nav-prod col-sm-1.5">
                    <form class="form-inline my-3 form-control-sm">
                        <div class="col-md-auto">
                            <button type="button" button class="btn btn-primary btn-sm" @click.stop.prevent="buscar(id)">Listar Ordens</button>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="col-sm-1.5">
                            <button @click="getRecipes(); getOpType()" type="button" class="btn btn-success btn-sm btn-sm" data-toggle="modal" data-target="#cadastrarOp">
                                Cadastrar Ordem
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
        <div class="row conteudo" style="top:-400px;">
            <div class="op col-md-10">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div v-for="(op, index) in opArray.values" v-bind:key="index">
                    <div class="card card-margin">
                        <div class="card-header">
                            <b></b>
                        </div>
                        <div class="card-body-op">
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Ordem: </font>
                                </b>{{op.productionOrderNumber}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Descrição: </font>
                                </b>{{op.typeDescription}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Quantidade: </font>
                                </b>{{op.quantity}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Nome Receita: </font>
                                </b>{{op.recipe.recipeName}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Cod. Receita: </font>
                                </b>{{op.recipe.recipeCode}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls" v-if="op.hasProd == true">
                                <b>
                                    <font color="#9BA6A5">Nome Produto: </font>
                                </b>{{op.recipe.recipeProduct.product.productName}}
                            </label>

                            </br>

                            <!--Botão para procurar as fases de uma determinada op-->
                            <!--<button type="button" class="btn btn-outline-info btn-sm" data-toggle="collapse" :data-target="getIdPhase(index)">Fases</button>-->
                            <!--Botão para procurar os produtos de uma determinada fase-->

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
        </div>
    </div>
    </div>
    </div>
</template>
<script src="./js/order.js">
</script>
<style>
@import url('./css/order.css');
</style>
