<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <div class="fixed-top nav-cinza">            
            <ul class="nav d-flex">
                <li class="nav-item nav-items-listliga">
                    <h1 class="title-page-gp"><b>Gerenciamento de Liga</b></h1>
                </li>
                <li class="nav-item nav-items-listliga">
                    <select class="form-control form-control-md" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="recipeName">Nome</option>
                        <option value="recipeCode">Código</option>
                    </select>
                </li>
                <li class="nav-item nav-items-listliga">
                    <input class="form-control btn-md" type="search" v-model="fieldValue" placeholder="Produto" aria-label="Busca">
                </li>
                <li class="nav-item nav-items-listliga">
                    <button type="button" class="btn btn-primary btn-md" @click.stop.prevent="buscar(id)"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </li>
                <li class="nav-item nav-items-listliga">                     
                    <router-link :to="{ name: 'Liga',params: { id: 0 }}" class="btn btn-success btn-md">
                        <i class="fa fa-plus" aria-hidden="true" ></i>
                        Cadastrar Liga
                    </router-link>
                </li>
            </ul>
        </div>
        <div id="load-listliga" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>        
        <div class="cabecalho-table-listliga" v-show="!carregando">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="ls2 col-md-3">
                <b><font class="cursor-class" color="#ffffff">Nome da Liga &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="ls2 col-md-3">
                <b><font class="cursor-class" color="#ffffff">
                    Código da Liga &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'recipeDescription',2):organizar(recipes, 'recipeDescription',2);" class="ls2 col-md-3">
                <b><font class="cursor-class" color="#ffffff">
                    Descrição &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>                
        </div>    

        <!--                         -->
        <!--                         -->
        <!--        Fases            --> 
        <!--                         -->      
        <div class="ligas" v-show="!carregando">            
            <div v-for="(recipe,index) in recipes" v-bind:class="{cinza: index%2==0}" v-bind:key="index">    
                <label class="ls2 col-md-3">
                    <b><font color="#9BA6A5"> </font></b> {{recipe.recipeName}}
                </label>
                <label class="ls2 col-md-3">
                    <b><font color="#9BA6A5"> </font></b>{{recipe.recipeCode}}
                </label>
                <label class="ls2 col-md-3">
                    <b><font color="#9BA6A5"> </font></b>{{recipe.recipeDescription}}
                </label>  
                <label class="ls2 col-md-2">                  
                    <router-link :to="{ name: 'Liga',params: { id: recipe.recipeId }}">
                        <i class="fa fa-eye" style="font-size:22px; cursor:pointer" @click="id = recipe.recipeId">                        
                        </i>
                    </router-link> 
                </label>               
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
</template>



<script src="./js/listLiga.js">
</script>
<style>
@import url("./css/listliga.css");
</style> 