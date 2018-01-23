<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <nav class="fixed-top nav-recipe">
            
            <ul class="nav d-flex align-items-center">
                <li class="title-recipe col-md-1.5">
                <b>Gerenciamento de Receita</b>
            </li>
                <li class="col-md-1.5">
                    <br> 
                    <form id="cadReceita">
                     <router-link :to="{ name: 'Phases',params: { id: 0 }}" class="btn btn-primary">
                        Cadastrar Receita
                    </router-link>
                    </form>
                    <!-- {{"id: " + id }} -->
                </li>
            </ul>
        </nav>

<!--                         -->
<!--                         -->
<!--        Fases            --> 
<!--                         -->
      
        <div class="" style="">
            <div class="phases">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                </div>
                    </div>
                          <div class="" v-for="(recipe,index) in recipes" v-bind:key="index">
                            <div class="card-header card-header-recipe col-sm-12">
                                </div>
                                <label class="ls ls4">
                                    <b><font color="#9BA6A5">Nome da Receita: </font></b> {{recipe.recipeName}}
                                </label>
                                <label class="ls ls4">
                                    <b><font color="#9BA6A5">Código da Receita: </font></b>{{recipe.recipeCode}}
                                </label>
                                <router-link :to="{ name: 'Phases',params: { id: recipe.recipeId }}">
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



<script src="./js/listPhases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 