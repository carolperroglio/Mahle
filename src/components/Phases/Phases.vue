<template>
    <div>
        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->                         
        <nav class="fixed-top nav-produtos">                           
            <ul>                
                <li>                    
                    <label><b>Nome da receita : </b></label>
                    <input type="text" class="form-control-sm" v-model="recipe.recipeName" size='5' :disabled="recipeCadastrada" required placeholder="Nome da receita">                                                                                                       
                <li>                        
                    <label><b>Código : </b></label>
                    <input class="form-control-sm" required v-model="recipe.recipeCode" :disabled="recipeCadastrada" size='5' placeholder="Código da receita"/>
                </li>
                <li>                        
                    <button type="button" class="btn btn-success" v-if="!recipeCadastrada" :disabled="carregando || recipe.recipeName==undefined || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''" @click.stop.prevent="createRecipe(recipe)">Enviar</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </li>                  
                <li>                     
                    <div data-toggle="modal" data-target="#modalEdiReceita" v-if="recipeCadastrada"><i class="fa fa-pencil"></i> Editar receita</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </li>
                <li>                        
                    <div data-toggle="modal" v-if="!(carregando || !recipeCadastrada)" data-target="#modalPro"><i class="fa fa-check" aria-hidden="true"></i> Cadastrar produto</div>
                </li>    
                <li class="nav-item justify-content-end" v-if="json.stringify(recipeProduct) !== '{}'">                        
                    Produto : {{recipeProduct.productName}} | Quantidade do produto : {{recipeProductDisplay.value+''+recipeProductDisplay.measurementUnit}} | Tipo do produto : {{recipeProductDisplay.phaseProductType}}  
                </li>                    
            </ul>                                                                                                                     
        </nav>        
                

        <!--                       --> 
        <!--                       -->
        <!--                       --> 
        <!--     Barra de load     -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->  
        <div class="progress fixed-top" v-if="carregando">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
        </div>


        <!--                       --> 
        <!--                       -->
        <!--                       --> 
        <!--   Listagem de fase    -->
        <!--                       -->
        <!--                       -->
        <!--                       -->                    
        <div class="conteudo" v-show="recipeCadastrada">    
            <div class="cabecalhoPhase">
                <h3>Fases da receita : </h3>
                <div data-toggle="modal" data-target="#modalCadFase" id="addPhase" @click.stop.prevent="phase={};abreModal('#modalCadFase');" style="margin-left:40%;" aria-hidden="true">
                    <i class="fa fa-plus"></i><b> Adicionar fase</b>
                </div>
            </div>   
            <div v-for="(pha, index) in phases" class="phase">                                        
                {{index+1}}° Fase<b> Id da fase =</b> {{pha.phaseId}} --- <b>Nome da fase = </b>{{pha.phaseName}} --- <b>Código da fase </b>{{pha.phaseCode}}                 
                <i class="fa fa-pencil" @click.stop.prevent="phase=pha;abreModal('#modalEditFase')" data-toggle="modal" aria-hidden="true"></i><span @click.stop.prevent="pha.expand==false?pha.expand=true:pha.expand=false" id="show-phase-products">\/<b>Expandir</b></span>
                <div v-show="pha.expand" >
                    <button class="btn btn-primary">Botao</button>
                    <div v-for="(pro, indexPro) in pha.products">
                        Produtos [ nome : {{pro.productName}} id :  {{pro.productId}} ]
                    </div>
                </div>                                                                                                                                                                
            </div>                                                                       
        </div>


        <!--                       --> 
        <!--                       -->
        <!--                       -->
        <!--    Editar de receita  -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->  
        <div class="modal fade" id="modalEdiReceita" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar receita</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="">Nome da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" placeholder="Nome">                                    
                        <label for="inputPassword4">Código da fase</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="recipe.recipeCode" placeholder="Código">                            
                    </div>
                    
                    <div class="modal-footer">                                                        
                        <div class="btn-group" role="group">                                                    
                            <button class="btn btn-primary"><i @click.stop.prevent="putRecipe(recipe)" class="fa fa-check-square" aria-hidden="true"></i></button>
                            <button class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>                            
                        </div>
                    </div>                        
                </div>    
            </div>
        </div>
        

        <!--                  -->
        <!--                  -->
        <!--                  -->
        <!--  Produto Final   -->
        <!--                  -->
        <!--                  -->
        <!--                  -->
        <!--      Modal       -->
        <div class="modal fade" id="modalPro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" @click.stop.prevent="createRecipeProduct(recipeProduct)" :disabled="recipeProduct.productId=='' || recipeProduct.productId==undefined" class="btn btn-primary">Cadastrar</button>
                        </div>    
                    </div>
                </div>
            </div>
        </div>


        <!--                       --> 
        <!--                       -->
        <!--                       --> 
        <!--    Editar  da fase    -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->  
        <div class="modal fade" id="modalEditFase" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button @click.stop.prevent="putPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                Limpar
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
        <div class="modal fade" id="modalCadFase" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button @click.stop.prevent="createPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''"><i class="fa fa-check-square" aria-hidden="true"></i></button> 
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase.phaseName='';phase.phaseCode=''">
                                Limpar
                            </div>
                        </div>
                    </div>                        
                </div>    
            </div>
        </div>                
                


        
        <!--                       --> 
        <!--                       -->
        <!--                       --> 
        <!--     Cadastro de       -->
        <!--       produto         -->
        <!--       da fase         -->
        <!--        modal          -->  
        <div class="modal fade" id="pha.phaseId" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <input class="fm form-control mr-sm-2"  v-model="phaseProduct.value" placeholder="Valor"/>
                        <label>Digite a unidade de medida : </label><br>
                        <input class="fm form-control mr-sm-2"  v-model="phaseProduct.measurementUnit" placeholder="Ex.: kg"/>                                                                                                                           
                        <select class="fm form-control mr-sm-2" v-model="phaseProduct.phaseProductType">                        
                            <option value="" selected disabled>Campo para busca</option>
                            <option value="scrap">Rejeito</option>
                            <option value="finished">Acabado</option>
                            <option value="semi_finished">Semi-Acabado</option>                   
                        </select>
                        <label class="fm mr-sm-2">Digite o nome do produto : </label>                            
                        <div class="dropdown">   
                            <!--<input @keyup="pha.pros=getResults('http://brsbap01:8003/api/products?fieldFilter=productName&fieldValue=',productPhaseName)" v-model="productPhaseName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="product=p; phaseProduct.productId=p.productId; productPhaseName=p.productName; pha.pros=[]" v-for="(p,index) in pha.pros">{{p.productName}}</a>                            
                            </div>-->                            
                        </div>
                    </div>
                    <div class="modal-footer">                                                        
                        <div>                                                    
                            <button @click.stop.prevent="createPhaseProduct(index, phaseProduct, product);" class="btn btn-success btn-sm"><i class="fa fa-check-square" aria-hidden="true"></i></button>
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
</template>
<script src="./js/phases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 

<!--     Moda da Flavia    --> 
<!--                       -->
<!--                       --> 
<!-- Cadastro de parâmetros-->
<!--                       -->
<!--                       -->
<!--         Modal         -->
<!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <label for="">Nome</label>
                        <div class="dropdown">   
                        <input @keyup="phaseTags=getResults('http://192.168.11.160:8003/gateway/tags/', tagName)" v-model="tagName" placeholder="Nome do parâmetro" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" @click.stop.prevent="phaseTag=p; tagName=phaseTag.tagName; phaseTags=[]" v-for="(p,index) in phaseTags">{{p.tagName}}</a>                            
                        </div>                            
                        </div>                                                
                        <label for="">Set Point</label>
                        <input type="text" class="form-control form-control-sm" v-model="tag.setupValue" placeholder="Set Point">                                    
                        <label for="inputPassword4">Unidade de Medida</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="tag.measurementUnit" placeholder="Unidade de Medida">                    
                        <label for="inputPassword4">Valor Mínimo</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="tag.minValue" placeholder="Valor Mínimo">                    
                        <label for="inputPassword4">Valor Máximo</label>                            
                        <input type="text" class="form-control form-control-sm" v-model="tag.maxValue" placeholder="Valor Máximo">
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="createPhaseTag(index, tag)" class="btn btn-success"><i class="fa fa-check-square" aria-hidden="true"></i></button>
                            <button @click.stop.prevent="deletePhaseTag(index, tag)" class="btn btn-danger"><i class="fa fa-window-close" aria-hidden="true"></i></button>
                        </div>                    
                    </div>                                                                                                                                            	                                            
                </form>
            </div>
        </div>
    </div>                                
</div>-->