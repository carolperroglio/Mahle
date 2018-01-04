<template>


<div class="row conteudo" style="top:-400px;">
            <div class="op col-md-10">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div v-for="(op, index) in opArray" v-bind:key="index">
                    <div class="card card-margin">
                        <div class="card-header">
                            <b></b>
                        </div>
                        <div class="card-body">
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Numero de Ordem: </font>
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
                                    <font color="#9BA6A5">Nome da Receita: </font>
                                </b>{{op.recipe.recipeName}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b>
                                    <font color="#9BA6A5">Cod. da Receita: </font>
                                </b>{{op.recipe.recipeCode}}
                            </label>&nbsp;&nbsp;&nbsp;
                            <label class="ls" v-if="op.hasProd == true">
                                <b>
                                    <font color="#9BA6A5">Nome do Produto: </font>
                                </b>{{op.recipe.recipeProduct.product.productName}}
                            </label>

                            </br>

                        </div>
                    </div>
                </div>
                <div class="paginacao-prd fixed-bottom" v-show="total>0">
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
  
</template>
<script src="./js/stateManagement.js">
</script>
<style>
@import url(./css/stateManagement.css);
</style>
