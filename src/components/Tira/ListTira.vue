<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <div class="fixed-top nav-cinza">            
            <ul class="nav d-flex">
                <li class="nav-item-tira col-sm-12">
                    <h1 class="title-page-gp"><b>Gerenciamento de Tira</b></h1>
                </li>
                <li class="nav-item-tira">
                    <select class="form-control form-control-md" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                                                                                          
                        <option selected value="recipeCode">Código</option>                        
                    </select>
                </li>
                <li class="nav-item-tira">
                    <input class="form-control btn-md" type="search" v-model="fieldValue" :disabled="fieldFilter=='' || fieldFilter==undefined" aria-label="Busca">
                </li> 
                <li class="nav-item-tira">
                    <button type="button" class="btn btn-primary btn-md" @click.stop.prevent="buscar(id)"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </li>                                
            </ul>                
        </div>  
        <div id="load-listtira" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>       
        <div class="header-table-listtira" v-show="!carregando">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="ls2 col-md-3">
                <b><font class="cursor-class" color="#ffffff">Código da Tira &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="ls2 col-md-6">
                <b><font class="cursor-class" color="#ffffff">
                    Descrição da Tira &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>            
        </div>

        <!--                         -->
        <!--                         -->
        <!--        Fases            --> 
        <!--                         -->    
        <div class="table-listtira" v-show="!carregando">    
            <div v-for="(recipe,index) in recipes" v-bind:class="{cinza: index%2==0}" v-bind:key="index">
                <label class="ls2 col-md-3">
                    <b><font color="#9BA6A5"> </font></b>{{recipe.recipeCode}}                    
                </label>
                <label class="ls2 col-md-6" style="margin-left:-1%">
                    <b><font color="#9BA6A5"> </font></b> {{recipe.recipeDescription}}
                </label>
                <!-- <label class="ls2 col-md-3">
                    <b><font color="#9BA6A5"> </font></b>{{recipe.recipeDescription}}
                </label>   -->
                <label class="ls2 col-md-2">                                   
                    <router-link class="link-decoration" :to="{ name: 'Tira',params: { id: recipe.recipeId }}">
                        <i class="fa fa-eye" style="font-size:22px; cursor:pointer" @click="id = recipe.recipeId">                        
                        </i>
                    </router-link>
                </label>    
            </div>
        </div>    

        <!--Paginação-->
        <div class="paginacao" v-show="total > 0">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=quantityPage, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*quantityPage, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+quantityPage<total">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=quantityPage, quantityPage)">Próxima</a>
                    </li>
                </ul>
            </nav>
        </div>  

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--         Erro          -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <b-modal no-close-on-backdrop ref="modalErro" size="md" title="Erro" hide-footer="">
            <p class="alert alert-danger">Ocorreu um erro: {{erro}}</p>
        </b-modal>      
    </div>
</template>



<script src="./js/listTira.js">
</script>
<style>
@import url("./css/listtira.css");
</style> 