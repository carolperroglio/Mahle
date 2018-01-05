<template>
    <div>
        <!--               -->
        <!--               -->
        <!--Redireciona p/ -->
        <!-- página de cad -->
        <!-- nova -->
        <nav class="fixed-top nav-recipe">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item col-md-1.5">
                    <form class="form-row">
                        <router-link :to="{ name: 'Phases',params: { id: 0 }}" class="btn btn-outline-primary">
                            Cadastrar Receita
                        </router-link>
                    </form>
                    <!-- {{"id: " + id }} -->
                </li>
            </ul>
        </nav>
        <div class="row conteudo">
            <div class="op col-md-10">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div>
                    <div class="container-fluid col-md-9">
                        <div class="card" v-for="(recipe,index) in recipes">
                            <div class="card-header" >
                                <b></b>
                            </div>
                            <div class="card-body -op" >
                                <b>Nome da Receita: </b> {{recipe.recipeName}} -
                                <b>Código da Receita: </b>{{recipe.recipeCode}} -
                                <router-link :to="{ name: 'Phases',params: { id: recipe.recipeId }}">
                                    <i class="fa fa-edit" @click="id = recipe.recipeId">
                                        Editar
                                    </i>
                                </router-link>
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
    </div>
</template>



<script src="./js/listPhases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 