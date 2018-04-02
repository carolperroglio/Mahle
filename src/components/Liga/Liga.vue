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
                    <button class="btn btn-warning btn-md" @click.stop.prevent="showModalEditRecipe(recipe)" >                        
                        <i class="fa fa-pencil" style="font-size:22px; cursor:pointer"></i>                          
                        Editar liga
                    </button>
                </li>
                <li class="nav-ligas col-md-2" v-if="recipeCadastrada">
                    <button class="btn btn-success btn-md" v-if="recipeCadastrada" @click.stop.prevent="showModalAddProd()">
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
            
        <div class="fundo-branco">                             
            <div class="cabecalho-table">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(produtos, 'productName',0):organizar(produtos, 'productName',0);" class="ls2-cabecalhotab col-md-2">
                    <b><font class="cursor-class" color="#ffffff">Componente &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(produtos, 'productDescription',1):organizar(produtos, 'productDescription',1);" class="ls2-cabecalhotab col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Máximo &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(produtos, 'productCode',2):organizar(produtos, 'productCode',2);" class="ls2-cabecalhotab col-md-2">
                    <b><font class="cursor-class" color="#ffffff">
                        Mínimo &nbsp;&nbsp;&nbsp;
                        <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                    </font></b>
                </label>                
            </div> 
        </div> 

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--   Listagem de fase    -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="container-fluid card-header-liga" v-show="recipeCadastrada && !carregando">                    
            <div class="card-body">
                <div class="liga">
                    <div class="card-header card-header-recipe">                    
                        <div v-if="recipeCadastrada">
                            <h2 style="text-align:center;">{{recipe.recipeName}}</h2>  











                            <ul class="list-group" v-for="(pro, indexPro) in recipe.phases[0].phaseProducts" :key="indexPro">
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
                <input type="text" class="form-control form-control-sm" v-model="recipeTemp.recipeName" placeholder="Nome">
                <label for="">Código da Liga</label>
                <input type="text" class="form-control form-control-sm" v-model="recipeTemp.recipeCode" placeholder="Código">
            </div>
            <div class="modal-footer">
                <div class="btn-group" role="group">
                   <button @click.stop.prevent="showModalConfirmEditLiga()" class="btn btn-success">
                        <i class="fa fa-check-square" aria-hidden="true"></i>
                   </button>
                   <button @click.stop.prevent="recipeTemp = {}" class="btn btn-primary pull-right">
                        Limpar                           
                    </button>  
                </div>
            </div>
        </b-modal>    
                
        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Confirm        -->
        <!--        edit           -->
        <!--        Liga           -->
        <!--                       -->
        <b-modal ref="modalConfirmEditLiga" hide-footer title="Editar Liga">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja editar !</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="putRecipe(recipeTemp);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i>
                        </button>                        
                    </div>
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
        <!--        Modal          -->
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