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
                        <button type="button" class="btn btn-primary btn-sm" :disabled="carregando || !recipeCadastrada" data-toggle="modal" data-target="#modalCadFase">Cadastrar fase</button>                        
                    </li> 
                    <li class="nav-item">                     
                        <button type="button" class="btn btn-success fa fa-pencil" id="btnEditarRec" v-show="recipeCadastrada" @click.stop.prevent="putRecipe(recipe)">Editar Receita</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li>                        
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Cadastrar produto</button>
                    </li>    
                    <li class="nav-item justify-content-end" v-if="json.stringify(recipeProduct) !== '{}'">                        
                        Produto : {{recipeProduct.productName}} | Quantidade do produto : {{recipeProductDisplay.value+''+recipeProductDisplay.measurementUnit}} | Tipo do produto : {{recipeProductDisplay.phaseProductType}}  
                    </li>                    
                </ul>                                                         
            </form>                                                  
        </div>
        


        <!--                  -->
        <!--                  -->
        <!--                  -->
        <!--  Produto Final   -->
        <!--                  -->
        <!--                  -->
        <!--                  -->
        <!--      Modal       -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cadastrar produto da receita {{recipe.recipeName}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Digite a quantidade : </label><br>
                        <input class="fm form-control mr-sm-2"  required v-model="recipeProduct.value" placeholder="Valor"/>
                        <label>Digite a unidade de medida : </label><br>
                        <input class="fm form-control mr-sm-2"  required v-model="recipeProduct.measurementUnit" placeholder="Ex.: kg"/>                                                   
                        <label class="fm mr-sm-2">Digite o nome do produto : </label>                                                    
                        <div class="dropdown">   
                            <input @keyup="recipeProducts=getResults('http://brsbap01:8003/api/products?&fieldFilter=productName&fieldValue=',recipeProductName)" v-model="recipeProductName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="recipeProduct.productId=p.productId; recipeProduct.productName=p.productName; recipeProductName=p.productName; recipeProducts=[]" v-for="(p,index) in recipeProducts">{{p.productName}}</a>                            
                            </div>                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" @click.stop.prevent="createRecipeProduct(recipeProduct)" class="btn btn-primary">Cadastrar</button>
                    </div>
                </div>
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
                        <button class="btn btn-primary btn-sm" @click.stop.prevent="expand==false?expand=true:expand=false" >\/</button><button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalProPhase">Cadastrar produto</button>
                        <div v-show="expand" v-for="(pro, indexPro) in pha.products">Produtos {{pro.productName}} {{pro.productId}}</div>
                    </div>
                    <!--                       --> 
                    <!--                       -->
                    <!--                       --> 
                    <!--     Cadastro de       -->
                    <!--       produto         -->
                    <!--       da fase         -->
                    <!--        modal          -->  
                    <div class="modal fade" id="modalProPhase" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Cadastrar produto da fase</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label>Digite a quantidade : </label><br>
                                    <input class="fm form-control mr-sm-2"  required v-model="phaseProduct.value" placeholder="Valor"/>
                                    <label>Digite a unidade de medida : </label><br>
                                    <input class="fm form-control mr-sm-2"  required v-model="phaseProduct.measurementUnit" placeholder="Ex.: kg"/>                                                                                                                           
                                    <select class="fm form-control mr-sm-2" v-model="phaseProduct.phaseProductType">                        
                                        <option value="" selected disabled>Campo para busca</option>
                                        <option value="scrap">Rejeito</option>
                                        <option value="finished">Acabado</option>
                                        <option value="semi_finished">Semi-Acabado</option>                   
                                    </select>
                                    <label class="fm mr-sm-2">Digite o nome do produto : </label>                            
                                    <div class="dropdown">   
                                        <input @keyup="pha.pros=getResults('http://brsbap01:8003/api/products?&fieldFilter=productName&fieldValue=',productPhaseName)" v-model="productPhaseName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" @click.stop.prevent="phaseProduct.productId=p.productId; productPhaseName=p.productName; pha.pros=[]" v-for="(p,index) in pha.pros">{{p.productName}}</a>                            
                                        </div>                            
                                    </div>
                                </div>
                                <div class="modal-footer">                                                        
                                    <div>                                                    
                                        <button @click.stop.prevent="createPhaseProduct(index, phaseProduct);" class="btn btn-success"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                                        <button @click.stop.prevent="deletePhaseProduct(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                                        <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                            Limpar
                                        </div>
                                    </div>
                                </div>                        
                            </div>    
                        </div>
                    </div>                                                                                                                                                                
                </div>
            </div>

            <!--                       --> 
            <!--                       -->
            <!--                       --> 
            <!--   Cadastro da fase    -->
            <!--                       -->
            <!--                       -->
            <!--        modal          -->  
            <div class="modal fade" id="modalCadFase" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cadastrar fase</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label for="">Nome da fase</label>
                            <input type="text" class="form-control form-control-sm" v-model="phase.phaseName" placeholder="Nome">                                    
                            <label for="inputPassword4">Código da fase</label>                            
                            <input type="text" class="form-control form-control-sm" v-model="phase.phaseCode" placeholder="Código">                            
                        </div>
                        
                        <div class="modal-footer">                                                        
                            <div>                                                    
                                <button @click.stop.prevent="(phase.phaseId!=undefined) ? putPhase(phase) : createPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                                <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                                <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                    Limpar
                                </div>
                            </div>
                        </div>                        
                    </div>    
                </div>
            </div>                                               
        </div>                      
    </div>      
</template>
<script src="./js/phases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 