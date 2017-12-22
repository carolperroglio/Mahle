<template>
    <div>
        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->                         
        <div class="fixed-top nav-produtos">
            <form>                
                <ul class="nav d-flex align-items-center">                
                    <li class="nav-item">                    
                        <label class="mr-sm-2">Nome da receita : </label>
                        <input type="text" class="form-control mr-sm-2" v-model="recipe.recipeName" required placeholder="Nome da receita">                                                                                                       
                    <li class="nav-item">                        
                        <label class="mr-sm-2">Código : </label>
                        <input class="form-control mr-sm-2" required v-model="recipe.recipeCode" placeholder="Código da receita"/>
                    </li>
                    <li class="nav-item">                        
                        <button type="button" class="btn btn-success" v-show="!recipeCadastrada" :disabled="carregando" @click.stop.prevent="createRecipe(recipe)">Cadastrar Receita</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li> 
                    <li class="nav-item justify-content-end">                        
                        <button type="button" class="btn btn-primary" :disabled="carregando || recipe.recipeName==undefined" @click.stop.prevent="displayCadPhase=true">Cadastrar Fase</button>                        
                    </li> 
                    <li class="nav-item">                     
                        <button type="button" class="btn btn-success fa fa-pencil" id="btnEditarRec" v-show="recipeCadastrada" @click.stop.prevent="putRecipe(recipe)"> Editar Receita</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li class="nav-item justify-content-end" v-show="json.stringify(recipeProductEnd) !== '{}'">                        
                        Produto : {{recipeProduct.productName}} | Quantidade do produto : {{recipeProductEnd.value+''+recipeProductEnd.measurementUnit}} | Tipo do produto : {{recipeProductEnd.phaseProductType}}  
                    </li>                    
                </ul>                                                         
            </form>
       
            <!--               -->
            <!--               -->
            <!--               -->
            <!-- Produto Final -->
            <!--               -->
            <!--               -->
            <!--               -->        
            <div class="row nav-produto-final" id="cadprodfinal" v-show="recipeCadastrada">                
                    <label>Digite a quantidade : </label><br>
                    <input class="fm form-control mr-sm-2"  required v-model="recipeProductEnd.value" placeholder="Valor"/>
                    <label>Digite a unidade de medida : </label><br>
                    <input class="fm form-control mr-sm-2"  required v-model="recipeProductEnd.measurementUnit" placeholder="Ex.: kg"/>
                    <label>Digite o tipo de produto : </label><br>
                    <select class="fm form-control mr-sm-2" v-model="recipeProductEnd.phaseProductType">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="scrap">Rejeito</option>
                        <option value="finished">Acabado</option>
                        <option value="semi_finished">Semi-Acabado</option>                   
                    </select>
                               
                    <label class="fm mr-sm-2">Digite o nome do produto : </label>                            
                    
                    <div class="dropdown">   
                        <input @keyup="recipeProducts=getProductFinal(productName)" v-model="productName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                             <a class="dropdown-item" @click.stop.prevent="recipeProduct=p; productName=recipeProduct.productName; recipeProducts=[]" v-for="(p,index) in recipeProducts">{{p.productName}}</a>                            
                        </div>                            
                        
                    </div>

                    <button @click.stop.prevent="createRecipeProduct(recipeProduct, recipeProductEnd)" :disabled="recipeProduct.productName==undefined">Ola mundo</button>
                <br><br>                
            </div>
        </div>
        <div class="progress fixed-top" v-show="carregando">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
        </div>
        <div class="row conteudo">
            <!--                       --> 
            <!--                       -->
            <!--                       --> 
            <!--   Listagem de fase    -->
            <!--                       -->
            <!--                       -->
            <!--                       -->        
            <div class="listagem col-8">            
                <div v-for="(pha, index) in phases">                        
                    <div class="card-body">
                        Fase {{index}} Nome da fase = {{pha.phaseName}} --- Código da fase {{pha.phaseCode}} <i class="fa fa-check-square-o icon-right" @click.stop.prevent="phase=pha" aria-hidden="true"></i><i class="fa fa-check-square-o" @click.stop.prevent="" aria-hidden="true"></i>
                    </div>                                                                                                                                            
                </div>
            </div>

            <!--                       --> 
            <!--                       -->
            <!--                       --> 
            <!--   Cadastro da fase    -->
            <!--                       -->
            <!--                       -->
            <!--                       -->  
            <div class="cadForm" v-show="displayCadPhase">                                                          
                <form>
                    <div class="form-row">
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>                                                                                                                       
                        <label for="">Nome da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseName" placeholder="Nome">                                    
                        <label for="inputPassword4">Código da fase</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseCode" placeholder="Código">                    
                        <div>                                                    
                            <button @click.stop.prevent="(phase.phaseId!=undefined) ? putPhase(phase) : createPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==''"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                            <button class="btn btn-danger"><i @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined" class="fa fa-window-close" aria-hidden="true"></i></button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                Limpar
                            </div>
                        </div>                                   
                    </div>                                                                                                                                                       	                                            
                </form>    
            </div>  
        </div>                      
    </div>      
</template>
<script src="./js/phases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 
<!--
{
  "phaseId": 1,
  "phaseName": "cois2a",
  "phaseCode": "xpto",
  "inputProducts": [],
  "outputProducts": [],
  "predecessorPhaseId": 0,
  "phaseProducts": [3, 2]
}


<div class="col-4">
            <ul class="nav row">                                                      
                <li class="nav-item col-md-3">
                    <div class="form-group ">
                        <label class="mr-sm-2">Digite o nome do produto : </label>
                        <input class="dropdown-menu" @keyup="phaseProducts=getProductFinal(pha.name)" placeholder="Nome do produto"/>                            
                        <a class="dropdown-item" v-for="phaPro in phaseProducts" @click.stop.prevent="">{{phaPro.productName}}</a>                                                                                                                                
                    </div>    
                </li>                                                                                            
                <li class="nav-item col-md-3">
                    <div class="form-group">
                        <label class="mr-sm-2">Digite a unidade de medida : </label>value
                        <input class="form-control form-control-sm" required  placeholder="Ex.: Kg"/>
                    </div>    
                </li>
                <li class="nav-item col-md-2">
                    <div class="form-group">
                        <label class="mr-sm-2">Digite o valor : </label>
                        <input type="text" placeholder="Valor" class="form-control form-control-sm">
                    </div>    
                </li>  
                <li class="nav-item col-md-3">
                    <div class="form-group">
                        <label class="mr-sm-2">Digite o tipo do produto : </label>
                    <input class="form-control form-control-sm" placeholder="Status" required/>
                    </div>    
                </li>                                                  
            </ul> 
            <button class="form-control btn-success">Enviar produto</button>
        </div>               -->