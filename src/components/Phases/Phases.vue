<template>
    <div>        
        <h1>Nova Atualizado</h1>        
        <div class="fixed-top nav-produtos">
            <form>
                <ul class="nav">                                  
                    <li class="nav-item">
                        <div class="dropdown input-group input-group-sm">  
                            <label class="mr-sm-2">Nome do produto : </label>                                                                  
                            <input type="text" v-model="nomeP" @keyup="getResults()" class="dropdown-toggle form-control form-control-sm" data-toggle="dropdown" placeholder="Nome do Produto">
                            <ul class="dropdown-menu">
                                <li v-for="(p, index) in produtos" @click.stop.prevent='nomeP=p.productName; recipe.recipeProduct=p;'>{{p.productName}}</li>                                       
                            </ul>                                                 
                        </div>                            
                    </li>
                    <li class="nav-item ">
                        <div class="input-group input-group-sm">
                            <label class="mr-sm-2">Nome da receita : </label>
                            <input type="text" class="form-control form-control-sm" placeholder="Nome da receita">                        
                        </div>    
                    </li>                                                                                            
                    <li class="nav-item">
                        <div class="input-group input-group-sm">
                            <label class="mr-sm-2">Código : </label>
                            <input class="form-control form-control-sm"/>
                        </div>    
                    </li>                        
                </ul>             
            </form>                                                                    
        </div>            
    </div>      
</template>
<script src="./js/phases.js">
</script>
<style>
    @import url('./css/phases.css');    
</style> 