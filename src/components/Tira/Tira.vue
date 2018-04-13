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
                <li class="nav-item-tira col-md-12">
                    <h1 class="title-page-gp"><b>Gerenciamento de Tira</b></h1>
                </li>               
                <li class="nav-items-tira form-group col-md-0 margin-nav">                    
                    <b>Nome da Tira</b>                    
                </li>
                <li class="nav-items-tira form-group col-md-2">
                    <input type="text" class="form-control form-control-md" v-model="recipe.recipeName" size='9' :disabled="true" required placeholder="Nome da Tira">                        
                </li>                  
                <li class="nav-items-tira form-group col-md-0  margin-nav">                 
                    <b>Código</b>                                                           
                </li>                                     
                <li class="nav-items-tira form-group col-md-2">
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
        <div class="header-table-tira"  v-show="!carregando" v-if="recipeCadastrada">
            <label class="ls-tira">
                <b><font class="cursor-class" color="#ffffff">Parâmetro
                </font></b>
            </label>                    
            <label class="ls-tira">
                <b><font class="cursor-class" color="#ffffff">
                    Valor Nominal
                </font></b>
            </label>
            <label class="ls-tira">
                <b><font class="cursor-class" color="#ffffff">
                    Unidade
                </font></b>
            </label>  
            <label class="ls-tira">
                <b><font class="cursor-class" color="#ffffff">
                    LIE <p class="font-size">Limite inferior da Especificação
                </p></font></b>
            </label> 
            <label class="ls-tira">
               <b><font class="cursor-class" color="#ffffff">
                    LIC <p class="font-size">Limite inferior de Controle 
                </p></font></b>
            </label> 
            <label class="ls-tira">
               <b><font class="cursor-class" color="#ffffff">
                    LSC <p class="font-size">Limite superior de Controle
            </p></font></b>
            </label>
            <label class="ls-tira">
                <b><font class="cursor-class" color="#ffffff">
                    LSE <p class="font-size">Limite superior de Especificação 
                </p></font></b>
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
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.parametro}}
                </label>                    
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.vn}}
                </label>
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.unidade}}
                </label>
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lie}}
                </label>   
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lic}}
                </label>            
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lsc}}
                </label>
                <label class="ls-tira">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lse}}
                </label>                                                                                        
            </div>                                                                                                       
        </div>

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--         Erro          -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <b-modal ref="modalErro" size="md" title="Erro" hide-footer="">
            <p class="alert alert-danger">Ocorreu um erro: {{erro}}</p>
        </b-modal>                                                                
    </div>
</template>
<script src="./js/tira.js">
</script>
<style>
@import url("./css/tira.css");
</style> 


<!-- -->