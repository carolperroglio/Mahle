
<template >
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Menu de navegação de produtos   -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cadastrar Produto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                <label for="nome">
                                    <b>Nome : </b>
                                </label>
                                <input type="text" placeholder="Nome" required v-model="produto.productName" id="nome" class="form-control danger is-invalid form-control-sm">
                                <label for="desc">
                                    <b>Descrição : </b>
                                </label>
                                <input type="text" id="desc" class="form-control form-control-sm" v-model="produto.productDescription" placeholder="Descrição">
                                <label for="cod">
                                    <b>Código : </b>
                                </label>
                                <input class="form-control form-control-sm" type="text" v-model="produto.productCode" placeholder="Código" id="cod">
                                <label for="gs1" class="">
                                    <b>GS1 : </b>
                                </label>
                                <input type="text" id="gs1" v-model="produto.productGTIN" class="form-control form-control-sm" placeholder="gs1">
                                <br>
                                </div>
                                <div class="btn-group" role="group">
                                        <button class="btn btn-success">
                                            <i :disabled="produto.productName==undefined || produto.productName==''" @click.stop.prevent="(produto.productId!=undefined) ? put(produto) : cadastrar(produto);" class="fa fa-check-square" aria-hidden="true"></i>
                                        </button>
                                        <button class="btn btn-danger">
                                            <i @click.stop.prevent="excluir(produto)" :disabled="produto.productId == undefined" class="fa fa-window-close" aria-hidden="true"></i>
                                        </button>
                                </div>
                                    <div class="btn btn-primary pull-right" @click.stop.prevent="produto={}">
                                        Limpar
                                    </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->
        <div class="fixed-top nav-produtos">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item col-sm-1.5">
                    <h1 class="title-page"> Cadastro de Produtos </h1>
                        <select class="form-control form-control-sm" v-model="orderField">
                            <option value="" selected disabled>Campo para busca</option>
                            <option value="productName">Nome</option>
                            <option value="productDescription">Descrição</option>
                            <option value="productCode">Código</option>
                            <option value="productGTIN">GTIN</option>
                    </select>
                </li>
                <li class="nav-item col-sm-1.5">
                    <select class="form-control form-control-sm" v-model="order">                        
                           <option value="" selected disabled>Ordenação</option>
                            <option value="ascending">Crescente</option>
                            <option value="descending">Decrescente</option>
                    </select>
                </li>
                <li class="nav-item col-sm-1.5">
                    <select class="form-control form-control-sm" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                            <option value="" selected disabled>Campo para busca</option>
                            <option value="productName">nome</option>
                            <option value="productDescription">descrição</option>
                            <option value="productCode">código</option>
                            <option value="productGTIN">GTIN</option>
                    </select>
                </li>
                <li class="nav-item col-sm-2">
                        <input class="form-control btn-sm" type="search" v-model="fieldValue" placeholder="Produto" aria-label="Busca">
                </li>
                <li class="nav-item  col-sm-1.5">
                        <button type="button" button class="btn btn-primary btn-sm" @click.stop.prevent="buscar(id)">Buscar</button>
                </li>
                <li class="nav-item col-sm-1">
                    <button type="button" class="btn btn-success btn-sm btn-sm" data-toggle="modal" data-target="#exampleModal">
                                Novo Produto
                    </button>

                </li>
            </ul>
        </div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Listagem dos produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->

        <div class="" style="">
            <div class="produtos col-11">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div v-for="(p, index) in produtos" v-bind:key="index">
                    <div class="card">
                        <div class="card-header">
                            <b></b>
                        </div>
                        <div class="card-body">
                            <label class="ls ls2">
                                <b>
                                    <font color="#9BA6A5">Nome: </font>
                                </b>{{p.productName}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls2">
                                <b>
                                    <font color="#9BA6A5">Descrição: </font>
                                </b>{{p.productDescription}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls2">
                                <b>
                                    <font color="#9BA6A5">Código: </font>
                                </b>{{p.productCode}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls2">

                                <b><font color="#9BA6A5">GTIN: </font></b>{{p.productGTIN}}</label>&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-edit icon-right" style="font-size:21px; cursor:pointer" @click.prevent="editar(p)" aria-hidden="true" data-toggle="modal" data-target="#exampleModal"></i>
                        </div>
                    </div>
                </div>
                <div class="paginacao" v-show="total>0">
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
            <br>
        </div>
    </div>
</template>
<script src="./js/product.js">
</script>
<style>
@import url('./css/product.css');
</style>
