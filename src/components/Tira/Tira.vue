<template>
    <div>
          
        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->
        <div class="fixed-top nav-cinza">            
            <ul class="nav d-flex">
                <li class="nav-item nav-item-tira col-md-12">
                    <h1 class="title-page-gp"><b>Gerenciamento de Tira</b></h1>
                </li>               
                <li class="nav-item nav-items-tira form-group col-md-0">                    
                    <b>Nome da Tira</b>                    
                </li>
                <li class="nav-item nav-items-tira form-group col-md-2">
                    <input type="text" class="form-control form-control-md" v-model="recipe.recipeName" size='9' :disabled="true" required placeholder="Nome da Tira">                        
                </li>                  
                <li class="nav-item nav-items-tira form-group col-md-0">                 
                    <b>Código</b>                                                           
                </li>                                     
                <li class="nav-item nav-items-tira form-group col-md-2">
                    <input type="text" class="form-control form-control-md" required v-model="recipe.recipeCode" :disabled="true" size='12' placeholder="Código da receita">    
                </li>
            </ul>                 
        </div>     
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--     Barra de load     -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div id="load-tira" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div>   
        <div class="header-table-tira"  v-show="!carregando">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametros, 'parametro',0):organizar(parametros, 'parametro',0);" class="ls3">
                <b><font class="cursor-class" color="#ffffff">Parâmetro
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>                    
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(parametros, 'vn',1):organizar(parametros, 'vn',1);" class="ls3">
                <b><font class="cursor-class" color="#ffffff">
                    Valor Nominal
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametros, 'unidade',2):organizar(parametros, 'unidade',2);" class="ls3">
                <b><font class="cursor-class" color="#ffffff">
                    Unidade
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>  
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametros, 'lie',3):organizar(parametros, 'lie',3);" class="ls3">
                <b><font class="cursor-class" color="#ffffff">
                    Lim. Inferior Específico
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(parametros, 'lic',4):organizar(parametros, 'lic',4);" class="ls3">
                <b><font class="cursor-class" color="#ffffff">
                    Lim. Inferior Controle
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(parametros, 'lsc',5):organizar(parametros, 'lsc',5);" class="ls3">
                <b>
                    <font class="cursor-class" color="#ffffff">
                        Lim. Superior Controle
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                    </font>
                </b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(parametros, 'lse',6):organizar(parametros, 'lse',6);" class="ls3">
                <b><font class="cursor-class" color="#ffffff">
                    Lim. Superior Específico
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i>
                </font></b>
            </label>                              
        </div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--   Listagem de fase    -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="margin-table-tira" v-show="!carregando">            
            <div v-for="(pro, index) in parametros" v-bind:class="{cinza: index%2==0}" :key="index">                     
                <label class="ls2 col-md-2">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.parametro}}
                </label>                    
                <label class="ls3">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.vn}}
                </label>
                <label class="ls3">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.unidade}}
                </label>
                <label class="ls3">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lie}}
                </label>   
                <label class="ls3">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lic}}
                </label>            
                <label class="ls3">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lsc}}
                </label>
                <label class="ls3">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lse}}
                </label>                                                                                        
            </div>                                                                                                       
        </div>                                                                
    </div>
</template>
<script src="./js/tira.js">
</script>
<style>
@import url("./css/tira.css");
</style> 


<!-- -->