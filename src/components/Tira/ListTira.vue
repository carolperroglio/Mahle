<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <div class="fixed-top nav-list-tira">            
            <ul class="nav d-flex">
                <li class="nav-item title-nav-tira nav-item-tira">
                    <h1 class="title-page-gp"><b>Gerenciamento de Tira</b></h1>
                </li>
                <li class="nav-item nav-item-tira">
                    <select class="form-control form-control-lg" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="productName">Nome</option>
                        <option value="productDescription">Descrição</option>
                        <option value="productCode">Código</option>
                        <option value="productGTIN">Código de Barras</option>
                    </select>
                </li>
                <li class="nav-item nav-item-tira">
                    <input class="form-control btn-lg" type="search" v-model="fieldValue" placeholder="Tira" aria-label="Busca">
                </li> 
                <li class="nav-item nav-item-tira">
                    <button type="button" class="btn btn-primary btn-lg" @click.stop.prevent="buscar(id)"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </li>   
                <li class="nav-item nav-item-tira">                                               
                    <router-link :to="{ name: 'Tira',params: { id: 0 }}" class="btn btn-success btn-lg">
                        <i class="fa fa-plus" aria-hidden="true" ></i>  Cadastrar Tira
                    </router-link>                      
                </li>              
            </ul>                
        </div>
        <div class="fundo-branco-list-tira">
            <div class="cabecalho-table-tira">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'recipeName',0):organizar(recipes, 'recipeName',0);" class="ls2-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">Nome da Tira &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'recipeCode',1):organizar(recipes, 'recipeCode',1);" class="ls2-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Código da Tira &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'recipeDescription',2):organizar(recipes, 'recipeDescription',2);" class="ls2-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Descrição &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                    </font></b>
                </label>                
            </div>
        </div>
        <!--                         -->
        <!--                         -->
        <!--        Fases            --> 
        <!--                         -->
      
        <div class="" style="">
            <div class="tiras">
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
                    <router-link :to="{ name: 'Tira',params: { id: recipe.recipeId }}">
                        <i class="fa fa-eye" style="font-size:22px; cursor:pointer" @click="id = recipe.recipeId">                        
                        </i>
                    </router-link>
                    <!--Teste-->
                    <div class="paginacao-tira" v-show="total>0">
                        <nav aria-label="">
                            <ul class="pagination justify-content-center">
                                <li v-show="startat>0" class="page-item">
                                    <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=quantityPage, quantityPage)">Previous</a>
                                </li>
                                <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                                    <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*quantityPage, quantityPage)">{{num+1}}</a>
                                </li>
                                <li class="page-item" v-show="pages.length>1 && startat+quantityPage<total">
                                    <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=quantityPage, quantityPage)">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script src="./js/listTira.js">
</script>
<style>
@import url("./css/listtira.css");
</style> 