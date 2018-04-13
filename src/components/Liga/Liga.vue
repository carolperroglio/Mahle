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
                <li class="nav-items-liga col-md-12">
                    <h1 class="title-page-gp"><b>Composição Química da Liga</b></h1>
                </li>
                <li class="nav-items-liga form-group col-sm-0">                    
                    <b>Nome <br>da Liga</b>
                </li>
                <li class="nav-items-liga form-group col-sm-1">
                    <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" :disabled="recipeCadastrada" required placeholder="Nome da liga">
                </li>
                <li class="nav-items-liga form-group col-sm-0">
                    <b>Código <br>da Liga</b>
                </li>       
                <li class="nav-items-liga col-sm-2">
                    <input type="text" class="form-control form-control-sm" required v-model="recipe.recipeCode" :disabled="recipeCadastrada" placeholder="Código da liga">         
                </li>                                    
                <li class="nav-items-liga col-sm-0" id="produtoR">                        
                    <b>Produto <br>Final</b>
                </li>                 
                <li class="nav-items-liga form-group col-sm-2"><!--recipe.recipeProduct.product.productName-->
                    <input :disabled="recipeCadastrada" placeholder="Nome do produto" class="form-control form-control-sm" 
                        v-model="productRecipeName" @keyup="prosFim=getResults(urlProducts, productRecipeName, prosFim); recipeProduct={}" >                                                                                 
                    
                    <select id="dropdownMenuButton" @change="productRecipeName=recipeProduct.productName" 
                        v-show="prosFim.length>0" v-model="recipeProduct" class="form-control form-control-sm">
                        <option :value="p" 
                        v-for="(p,index) in prosFim" v-bind:key="index">
                        {{p.productName}}</option>                   
                    </select>
                      
                </li>
                <li class="nav-items-liga col-sm-2" v-if="!recipeCadastrada" >                    
                    <button type="button" class="btn btn-success btn-sm" :disabled="!recipe.recipeName || !recipe.recipeCode || recipeProduct==undefined || recipeProduct.productId==undefined || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''"  @click.stop.prevent="createRecipe(recipe,recipeProduct)">
                        Enviar
                    </button>   
                </li> 

                <li class="nav-items-liga col-sm-0" v-if="recipeCadastrada">
                    <button class="btn btn-warning btn-sm" @click.stop.prevent="showModalEditRecipe(recipe)" >                        
                        <i class="fa fa-pencil" style="font-size:22px; cursor:pointer"></i>                          
                        Editar liga
                    </button>
                </li>
                
                <li class="nav-items-liga col-sm-0" id="produtoR" v-if="recipeCadastrada">                        
                    <button class="btn btn-danger btn-sm" aria-hidden="true" id="removerP" @click.stop.prevent="showModalRemoveLiga()">
                        <i class= "fa fa-trash-o" style="font-size:23px; cursor:pointer">
                        </i> Remover Liga
                    </button>
                </li>                  
                <li class="nav-items-liga" v-if="recipeCadastrada">
                    <button class="btn btn-success btn-sm" v-if="recipeCadastrada" @click.stop.prevent="showModalAddProd()">                                                
                        <i class="fa fa-plus" aria-hidden="true" style="font-size:22px; cursor:pointer"></i>                                                    
                        Cadastrar Componente
                    </button>
                </li>            
            </ul>
        </div>

        <div id="load-liga" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>            
        <h2 v-if="recipeCadastrada" v-show="!carregando" class="nome-liga">{{recipe.recipeName}}</h2>                           
        <div v-if="recipeCadastrada" class="cabecalho-table-liga"  v-show="!carregando && produtos.length>0">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(produtos, 'product',0):organizar(produtos, 'product',0);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">Componente &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(produtos, 'minValue',1):organizar(produtos, 'minValue',1);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Mínimo(%) &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(produtos, 'maxValue',2):organizar(produtos, 'maxValue',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Máximo(%) &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>                 
        </div>                                             


        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Listagem dos produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->                            
        <div v-if="recipeCadastrada" v-show="!carregando" class="liga-produtos">
            <div v-for="(pro, index) in produtos" v-bind:class="{cinza: index%2==0}" :key="index">                                    
                <label class="ls2 col-md-2">
                    {{pro.product.productName}}</label>
                <label class="ls2 col-md-2">
                    {{pro.minValue}}</label>
                <label class="ls2 col-md-2">
                    {{pro.maxValue}}</label>                                        
                <label class="ls2 fim col-md-5">                        
                    <i class = "fa fa-trash-o" style="font-size:21px; cursor:pointer; color:red;" @click.stop.prevent="showModalRemoveProduto(pro, index)"></i>&nbsp;&nbsp;&nbsp;                     
                    <!--<i class="fa fa-edit" style="font-size:21px; cursor:pointer" @click.stop.prevent="phaseProduct = {};showModalEditProPhase(pro, index)"></i>-->
                </label>
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
                        <i  class="fa fa-check-square" aria-hidden="true"></i> 
                        Confirmar
                   </button>
                   <button @click.stop.prevent="recipeTemp = {}" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                            
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
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja editar!?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="putRecipe(recipeTemp);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModalConfirmEditLiga()" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                        
                        </button>                        
                    </div>
                </div>
            </div>
        </b-modal>             


        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Editar         -->
        <!--        Produto        -->
        <!--                       -->
        <!--                       -->
        <b-modal ref="modalConfirmEditarProduto" hide-footer title="Editar Produto"> 
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja editar o Componente!?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="put(produtos);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModalConfirmEditarProduto()" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                            
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
        
        <b-modal ref="modalcadProPhase" hide-footer title="Cadastrar Componente">            
            <div class="modal-body">
                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                <div class="form-row"> 
                    <div class="form-group col-md-12">
                        <label>Nome do produto </label>
                        <input @keyup="pros=getResults(urlProducts, productPhaseName, pros);delete phaseProduct.productId;" v-model="productPhaseName" placeholder="Nome do produto"  class="fm form-control mr-sm-0" id="dropdownMenuButton"/>
                        <b-dropdown-item id="dropdownMenuButton" @click.stop.prevent="phaseProduct.productId=p.productId; phaseProduct.product=p; productPhaseName=p.productName; pros=[];" v-for="(p,index) in pros" v-bind:key="index">{{p.productName}}</b-dropdown-item>
                    </div>                                                                                          
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Mín(%) </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.minValue" placeholder="Valor mínimo" />
                    </div>
                    <div class="form-group col-md-6">
                        <label>Máx(%) </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.maxValue" placeholder="Valor máximo" />
                    </div>
                </div>                
            </div>
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        {{phaseProduct.phaseProductId}}
                        <button @click.stop.prevent="createPhaseProduct(phaseProduct, recipe.phases[0]);" :disabled="!phaseProduct.productId || !phaseProduct.minValue || !phaseProduct.maxValue" class="btn btn-success">
                            <i  class="fa fa-check-square" aria-hidden="true"></i>
                            Confirmar
                        </button>
                        <button class="btn btn-primary pull-right" @click.stop.prevent="phaseProduct={}; productPhaseName=''">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
        
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--       Editar de       -->
        <!--       produto         -->
        <!--       da liga         -->
        <!--        modal          -->        
        <b-modal ref="modalEditProPhase" hide-footer title="Editar Componente">            
            <div class="modal-body">
                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                <div class="form-row"> 
                    <div class="form-group col-md-6">
                        <label>Nome do produto </label>
                        <input @keyup="pros=getResults(urlProducts, productPhaseName, pros);delete phaseProduct.productId;" v-model="productPhaseName" placeholder="Nome do produto"  class="fm form-control mr-sm-0" id="dropdownMenuButton"/>
                        <b-dropdown-item id="dropdownMenuButton" @click.stop.prevent="phaseProduct.productId=p.productId; phaseProduct.product=p; productPhaseName=p.productName; pros=[];" v-for="(p,index) in pros" v-bind:key="index">{{p.productName}}</b-dropdown-item>
                    </div>                                                   
                    <div class="form-group col-md-6">
                        <label>Tipo de Produto</label>
                        <select class="fm form-control mr-sm-2" v-model="phaseProduct.phaseProductType">
                            <option value="" selected disabled>Campo para busca</option>
                            <option value="scrap">Rejeitado</option>
                            <option value="finished">Acabado</option>
                            <option value="semi_finished">Semi-Acabado</option>
                        </select>
                    </div>                    
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Mín(%) </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.minValue" placeholder="Valor mínimo" />
                    </div>
                    <div class="form-group col-md-6">
                        <label>Máx(%) </label><br>
                        <input class="fm form-control mr-sm-2" v-model="phaseProduct.maxValue" placeholder="Valor máximo" />
                    </div>
                </div>                
            </div>
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">{{phaseProduct.phaseProductId}}
                        <button @click.stop.prevent="putPhaseProduct(phaseProduct, recipe.phases[0]);" :disabled="!phaseProduct.productId || !phaseProduct.phaseProductType || !phaseProduct.minValue || !phaseProduct.maxValue" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <div class="btn btn-primary pull-right" @click.stop.prevent="phaseProduct={}; productPhaseName=''">
                            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar 
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
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover a Liga!</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="deleteRecipe(recipe);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>  
                        <button @click.stop.prevent="hideModalRemoveLiga()" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                            
                        </button>                       
                    </div>
                </div>
            </div>
         </b-modal>

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--       Remove          -->
        <!--       Produtos        -->
        <!--                       -->
        <!--                       -->
        <b-modal ref="modalRemoveProdutos" hide-footer title="Remover Componente">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover o componente!</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="deletePhaseProduct(produto, recipe.phases[0]);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>  
                        <button @click.stop.prevent="hideModalRemoveProduto()" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                            
                        </button>                       
                    </div>
                </div>
            </div>
         </b-modal>


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
<script src="./js/liga.js">
</script>
<style>
@import url("./css/liga.css");
</style> 


<!-- -->