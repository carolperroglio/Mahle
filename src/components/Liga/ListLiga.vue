<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <nav class="fixed-top nav-recipe">            
            <ul class="nav d-flex align-items-center" style="margin: 2% 0 0 0">
                <li class="nav-item nav-item-products col-sm-1.5">
                    <h1 class="title-page-gp"><b>Gerenciamento de Liga</b></h1>
                </li>
                <li class="col-sm-2 botao-cadastro">                     
                    <router-link :to="{ name: 'Liga',params: { id: 0 }}" class="btn btn-primary">
                        Cadastrar Liga
                    </router-link>
                </li>
            </ul>
            <div class="fundo-branco">
                <div class="cabecalho-table">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="ls ls4">
                        <b><font class="cursor-class" color="#ffffff">Nome da Liga &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="ls ls4">
                        <b><font class="cursor-class" color="#ffffff">
                            Código da Liga &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'recipeDescription',2):organizar(recipes, 'recipeDescription',2);" class="ls ls4">
                        <b><font class="cursor-class" color="#ffffff">
                            Descrição &nbsp;&nbsp;&nbsp;
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
      
        <div class="" style="margin-top:10%;">
            <div class="phases">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                    </div>
                </div>
                <div class="" v-for="(recipe,index) in recipes" v-bind:key="index">
                    <div class="card-header card-header-recipe col-sm-12"></div>
                    <label class="ls ls4">
                        <b><font color="#9BA6A5"> </font></b> {{recipe.recipeName}}
                    </label>
                    <label class="ls ls4">
                        <b><font color="#9BA6A5"> </font></b>{{recipe.recipeCode}}
                    </label>
                    <label class="ls ls4">
                        <b><font color="#9BA6A5"> </font></b>{{recipe.recipeDescription}}
                    </label>
                    <label class="ls lsbtn">
                    <button type="button" class="btn btn-danger btn-edit btn-sm fa fa-trash-o" style="font-size:17px; cursor:pointer" aria-hidden="true" @click.stop.prevent="recipeDelete(recipe.recipeId);">
                    </button>
                    </label>
                    <router-link :to="{ name: 'Liga',params: { id: recipe.recipeId }}">
                        <i class="fa fa-edit icon-right2 icon-style" style="font-size:22px; cursor:pointer" @click="id = recipe.recipeId">
                        </i>
                    </router-link>
                    <div class="paginacao-phase" v-show="total>0">
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



<script src="./js/listLiga.js">
</script>
<style>
@import url("./css/liga.css");
</style> 