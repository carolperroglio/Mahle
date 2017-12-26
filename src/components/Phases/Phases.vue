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
                        <label class="mr-sm-2">Nome da receita: </label>
                        <input type="text" class="form-control mr-sm-2" v-model="recipe.recipeName" required placeholder="Nome da receita">                                                                                                       
                    <li class="nav-item">                        
                        <label class="mr-sm-2">Código: </label>
                        <input class="form-control mr-sm-2" required v-model="recipe.recipeCode" placeholder="Código da receita"/>
                    </li>
                    <li class="nav-item">                        
                        <button type="button" class="btn btn-success" v-show="!recipeCadastrada" :disabled="carregando || recipe.recipeName==undefined || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''" @click.stop.prevent="createRecipe(recipe)">Enviar</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li> 
                    <li class="nav-item justify-content-end">                        
                        <button type="button" class="btn btn-primary btn-sm" :disabled="carregando || !recipeCadastrada" @click.stop.prevent="displayCadPhase=true; displayCadProPhase=false">Cadastrar fase</button>                        
                    </li> 
                    <li class="nav-item">                     
                        <button type="button" class="btn btn-success fa fa-pencil" id="btnEditarRec" v-show="recipeCadastrada" @click.stop.prevent="putRecipe(recipe)"> Editar Receita</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li class="nav-item justify-content-end" v-show="json.stringify(recipeProductEnd) !== '{}'">                        
                        Produto: {{recipeProduct.productName}} | Quantidade do produto : {{recipeProductEnd.value+''+recipeProductEnd.measurementUnit}} | Tipo do produto : {{recipeProductEnd.phaseProductType}}  
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
                    <label>Quantidade: </label><br>
                    <input class="fm form-control mr-sm-2"  required v-model="recipeProductEnd.value" placeholder="Valor"/>
                    <label>Unidade de medida: </label><br>
                    <input class="fm form-control mr-sm-2"  required v-model="recipeProductEnd.measurementUnit" placeholder="Ex.: kg"/>
                    <label>Tipo de produto: </label><br>
                    <select class="fm form-control mr-sm-2" v-model="recipeProductEnd.phaseProductType">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="scrap">Rejeito</option>
                        <option value="finished">Acabado</option>
                        <option value="semi_finished">Semi-Acabado</option>                   
                    </select>
                               
                    <label class="fm mr-sm-2">Nome do produto: </label>                            
                    
                    <div class="dropdown">   
                        <input @keyup="recipeProducts=getProductFinal(productName)" v-model="productName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                             <a class="dropdown-item" @click.stop.prevent="recipeProduct=p; productName=recipeProduct.productName; recipeProducts=[]" v-for="(p,index) in recipeProducts">{{p.productName}}</a>                            
                        </div>                            
                        
                    </div>

                    <button @click.stop.prevent="createRecipeProduct(recipeProduct, recipeProductEnd)" :disabled="recipeProduct.productName==undefined">Cadastrar Produto</button>
                    
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
                        Fase {{index}} Nome da fase = {{pha.phaseName}} --- Código da fase {{pha.phaseCode}} <i class="fa fa-check-square-o icon-right" @click.stop.prevent="phase=pha" aria-hidden="true"></i>
                        <button class="btn btn-primary btn-sm" @click.stop.prevent="expand==false?expand=true:expand=false">\/</button><button class="btn btn-primary btn-sm" @click.stop.prevent="displayCadProPhase=true; displayCadPhase=false">Cadastrar Produto</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Cadastro Parâmetros</button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cadastrar Parâmetros de Fase</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div class="modal-body">
                    <form>
                    <div class="form-row">
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>                                                                                                                       
                        <label for="">Set point</label>
                        <input type="text" class="form-control form-control-sm" v-model="tag.setupValue" placeholder="Set point">                                    
                        <label for="inputPassword4">Unidade de Medida</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="tag.measurementUnit" placeholder="Unidade de medida">                    
                        <label for="inputPassword4">Valor mínimo</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="tag.minValue" placeholder="Valor mínimo">                    
                        <label for="inputPassword4">Valor máximo</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="tag.maxValue" placeholder="Valor máximo">                    
                        <div>
                            <button @click.stop.prevent="createPhaseTag(index, tag)" class="btn btn-success"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                        </div>                                   
                    </div>                                                                                                                                                       	                                            
                </form>
            </div>
            </div>
        </div>
        </div>
                        <div v-show="expand" v-for="(pro, indexPro) in pha.products">Produtos</div>
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
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" @click="msgVis = !msgVis" role="alert">{{mensagemSuc}}</div>                                                                                                                       
                        <label for="">Nome da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseName" placeholder="Nome">                                    
                        <label for="inputPassword4">Código da fase</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseCode" placeholder="Código">                    
                        <div>                                                    
                            <button @click.stop.prevent="(phase.phaseId!=undefined) ? putPhase(phase) : createPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                Limpar
                            </div>
                        </div>                                   
                    </div>                                                                                                                                                       	                                            
                </form>    
            </div>  
            <!--                       --> 
            <!--                       -->
            <!--                       --> 
            <!-- Cadastro de produtos  -->
            <!--                       -->
            <!--                       -->
            <!--                       -->  
            <div class="cadForm" v-show="displayCadProPhase">                                                          
                <form>
                    <div class="form-row">
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>                                                                                                                       
                        <label for="">Nome do produto</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseName" placeholder="Nome">                                    
                        <label for="inputPassword4">Código do produto</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseCode" placeholder="Código">                    
                        <div>                                                    
                            <button @click.stop.prevent="(phase.phaseId!=undefined) ? putPhase(phase) : createPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                Limpar
                            </div>
                        </div>                                   
                    </div>                                                                                                                                                       	                                            
                </form>    
            </div>
            <!--                       --> 
            <!--                       -->
            <!--                       --> 
            <!-- Cadastro de parâmetros-->
            <!--                       -->
            <!--                       -->
            <!--                       -->  


        </div>                      
    </div>      
</template>
<script src="./js/phases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 