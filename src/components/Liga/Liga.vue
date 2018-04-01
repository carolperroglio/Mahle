<template>
    <div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--     Barra de load     -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div>  
        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->
        <div class="fixed-top nav-recipeP-liga">
            <li class="title-recipeP-liga">
                <b>Composição Química da Liga</b>
            </li>
            <ul class="nav d-flex">
                <li class="form-group nav-ligas col-md-0">
                    <label class="">
                        <b>Nome da Liga</b>
                    </label>                        
                </li>
                <li class="form-group nav-ligas col-md-2">
                    <input type="text" class="form-control form-control-md" v-model="recipe.recipeName" size='5' :disabled="recipeCadastrada" required placeholder="Nome da receita">
                </li>
                <li class="form-group nav-ligas col-md-0">
                    <label class="">
                        <b>Código da Liga</b>
                    </label>                    
                </li>       
                <li class="form-group nav-ligas col-md-2">
                    <input type="text" class="form-control form-control-md" required v-model="recipe.recipeCode" :disabled="recipeCadastrada" size='5' placeholder="Código da receita">         
                </li>                    
                <li class="form-group nav-ligas col-md-2" v-if="!recipeCadastrada" :disabled="!recipe.recipeName || !recipe.recipeCode || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''">                    
                    <button type="button" class="btn btn-success"  @click.stop.prevent="createRecipe(recipe)">
                        Enviar
                    </button>                    
                </li>
                <li class="nav-ligas col-md-2" v-if="recipeCadastrada">
                    <button class="btn btn-warning btn-md" @click.stop.prevent="showModalEditRecipe()" >                        
                        <i class="fa fa-pencil" style="font-size:22px; cursor:pointer"></i>                          
                        Editar liga
                    </button>
                </li>
                <li class="nav-ligas col-md-2" v-if="recipeCadastrada">
                    <button class="btn btn-success btn-md" v-if="!(carregando || !recipeCadastrada)" @click.stop.prevent="showModalAddProdFin()">
                        <i class="fa fa-plus" aria-hidden="true" style="font-size:22px; cursor:pointer"> 
                        </i> Cadastrar produto da Liga                                                    
                    </button>
                </li>
                <li class="nav-ligas col-md-2" id="produtoR" v-if="recipeCadastrada">                        
                    <button class="btn btn-danger btn-md" aria-hidden="true" id="removerP" @click.stop.prevent="showModalRemoveLiga()">
                        <i class= "fa fa-trash-o" style="font-size:23px; cursor:pointer">
                        </i> Remover Liga
                    </button>
                </li>                
            </ul>
        </div>
        

    <!--                       -->
    <!--                       -->
    <!--                       -->
    <!--   Listagem de fase    -->
    <!--                       -->
    <!--                       -->
    <!--                       -->
    <div class="container-fluid card-header-liga" v-show="recipeCadastrada">                    
        <div class="card-body">
            <div v-for="(pha, index) in phases" class="liga" :key="index">
                <div class="card-header card-header-recipe">
                    <form row="">                                                                               
                        <label class="btn btn-primary btn-edit btn-sm config-button" @click.stop.prevent="showModalAddProd();phase=pha;" aria-hidden="true">
                            <i class= "fa fa-plus-circle" style="font-size:22px; cursor:pointer"></i> Materiais
                        </label>                         
                    </form>
                    <div v-if="editarActivate">
                        <h2> Matéria Prima </h2>
                        <div v-if="pha.phaseProducts.length == 0">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-3">
                                    <label class="ls ls14">
                                    Sem Matéria Prima cadastradas ainda...
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <ul class="list-group" v-for="(pro, indexPro) in pha.phaseProducts" :key="indexPro">
                            <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-3">
                                <label v-if="pro.product.productName != undefined" class="ls ls14">
                                <b>Componente: </b>{{pro.product.productName}}&nbsp;&nbsp;
                                </label> 
                                <label v-else class="ls ls14">
                                    Componente
                                </label>
                                <label class="ls ls14">
                                <b>Especificação: </b>{{pro.minValue}} mínimo {{pro.maxValue}} máximo
                                </label>
                                <!-- <label class="ls ls14">
                                    <b>Tipo de Produto: </b>{{pro.phaseProductType | prodTypeName}}
                                </label> -->
                                <label class="ls ls14">
                                <button type="button" class="btn btn-danger btn-edit btn-sm fa fa-trash-o" style="font-size:17px; cursor:pointer" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);">
                                </button>
                                </label>
                            </li>
                        </ul>

                    </div>
                                                      
                </div>
            </div>
        </div>
    </div>
                
        
            
            
        
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--    Editar receita     -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->

        <b-modal ref="modalEditRecipe" hide-footer title="Editar Liga">
            
            <div class="modal-body">
                <label for="">Nome da Liga</label>
                <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" placeholder="Nome">
                <label for="inputPassword4">Código da Liga</label>
                <input type="text" class="form-control form-control-sm" v-model="recipe.recipeCode" placeholder="Código">
            </div>

            <div class="modal-footer">
                <div class="btn-group" role="group">
                   <button class="btn btn-primary">
                        <i @click.stop.prevent="putRecipe(recipe)" class="fa fa-check-square" aria-hidden="true"></i>
                   </button>
                </div>
            </div>
        </b-modal>                 

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--     Cadastro de       -->
        <!--       produto         -->
        <!--       da liga         -->
        <!--        modal          -->
        
         <b-modal ref="modalcadProPhase" hide-footer title="Cadastrar produto">
            
            <div class="modal-body">

                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Unidade de medida : </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.measurementUnit" placeholder="Ex.: kg" />
                    </div>
                    <div class="form-group col-md-6">
                        <label>Tipo de Produto:</label>
                        <select class="fm form-control mr-sm-2" v-model="phaseProduct.phaseProductType">
                            <option value="" selected disabled>Campo para busca</option>
                            <option value="scrap">Rejeitado</option>
                            <option value="finished">Acabado</option>
                            <option value="semi_finished">Semi-Acabado</option>
                        </select>
                    </div>
                    
                </div>
                <div class="form-row">
                    <label>Tolerância: </label><br>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label>Mín: </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.minValue" placeholder="Valor mínimo" />
                    </div>
                    <div class="form-group col-md-3">
                        <label>Máx : </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.maxValue" placeholder="Valor máximo" />
                    </div>
                </div>
                <label class="fm mr-sm-2">Nome do produto : </label>
                    <input @keyup="phase.pros=getResults(urlProducts,productPhaseName)" v-model="productPhaseName" placeholder="Nome do produto"  class="btn btn-outline-secondary col-sm-10" id="dropdownMenuButton"/>
                        <b-dropdown-item id="dropdownMenuButton" @click.stop.prevent="phaseProduct.productId=p.productId; phaseProduct.product=p; productPhaseName=p.productName; phase.pros=[];" v-for="(p,index) in phase.pros" v-bind:key="index">{{p.productName}}</b-dropdown-item>
                    <small>Digite no minimo 3 letras para busca do produto</small>
            </div>
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="createPhaseProduct(phaseProduct, phase);" :disabled="!phaseProduct.phaseProductType || !phaseProduct.minValue || !phaseProduct.maxValue || !productPhaseName" class="btn btn-success">

                            <i class="fa fa-check-square" aria-hidden="true"></i>
                        </button>
                        <div class="btn btn-primary pull-right" @clicqk.stop.prevent="phase={}">
                            Limpar
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--        Remove         -->
        <!--        Liga           -->
        <!--                       -->
        <!--                       -->
        <b-modal ref="modalRemoveLiga" hide-footer title="Remover Liga">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover !</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="deleteRecipe(recipe);" class="btn btn-success">

                            <i class="fa fa-check-square" aria-hidden="true"></i>
                        </button>                        
                    </div>
                </div>
            </div>
         </b-modal>
    </div>
</template>
<script src="./js/liga.js">
</script>
<style>
@import url("./css/liga.css");
</style> 


<!-- -->