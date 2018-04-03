<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <nav class="fixed-top nav-cinza">            
            <ul class="nav d-flex align-items-center">
                <li class="nav-item col-sm-1.5">
                    <h1 class="title-page-gp-liga"><b>Parâmetros da Linha</b></h1>
                </li>
                <li class="nav-item nav-item-products">
                    <select class="form-control form-control-md" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="productName">Nome</option>
                        <option value="productDescription">Descrição</option>
                        <option value="productCode">Código</option>
                        <option value="productGTIN">Código de Barras</option>
                    </select>
                </li>
                <li class="nav-item nav-item-products">
                    <input class="form-control btn-md" type="search" v-model="fieldValue" placeholder="Parametro" aria-label="Busca">
                </li>
                <li class="nav-item  nav-item-products">
                    <button type="button" class="btn btn-primary btn-md" @click.stop.prevent="buscar(id)"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </li>
                <li class="nav-item  nav-item-products">                     
                    <router-link :to="{ name: 'Liga',params: { id: 0 }}" class="btn btn-success btn-md">
                        <i class="fa fa-plus" aria-hidden="true" ></i>
                        Cadastrar Parâmetro
                    </router-link>
                </li>
            </ul>
            <div class="fundo-branco-liga">
                <div class="cabecalho-table-liga">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">Parâmetro &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">
                            Equipamento &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'recipeDescription',2):organizar(recipes, 'recipeDescription',2);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">
                            Valor Nominal &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>   
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">Unidade &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">
                            LIE<br>Limite Inferior de Especificação &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'recipeDescription',2):organizar(recipes, 'recipeDescription',2);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">
                            Limite Inferior de Controle &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">Limite Superior de Controle &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">
                            Limite Superior de Especificação &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'recipeDescription',2):organizar(recipes, 'recipeDescription',2);" class="cabecalho-parametros-text">
                        <b><font class="cursor-class" color="#ffffff">
                            Referência &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>             
                </div>
            </div>    
        </nav>

        <!--                         -->
        <!--                         -->
        <!--        Fases            --> 
        <!--                         -->
      
        <div class="" style="">
            <div class="ligas">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                    </div>
                </div>
                <div v-for="(recipe,index) in recipes" v-bind:class="{cinza: index%2==0}" v-bind:key="index">    
                    <label class="ls4">
                        <b><font color="#9BA6A5"> </font></b> {{recipe.recipeName}}
                    </label>
                    <label class="ls4">
                        <b><font color="#9BA6A5"> </font></b>{{recipe.recipeCode}}
                    </label>
                    <label class="ls4">
                        <b><font color="#9BA6A5"> </font></b>{{recipe.recipeDescription}}
                    </label>                    
                    <router-link :to="{ name: 'Liga',params: { id: recipe.recipeId }}">
                        <i class="fa fa-eye" style="font-size:22px; cursor:pointer" @click="id = recipe.recipeId">                        
                        </i>
                    </router-link>
                    <div class="paginacao-liga" v-show="total>0">
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
</template>



<script src="./js/listlineParameters.js">
</script>
<style>
@import url("./css/listLineParameters.css");
</style> 