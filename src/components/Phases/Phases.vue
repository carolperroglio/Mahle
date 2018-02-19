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
        <nav class="fixed-top nav-recipeP">
            <li class="title-recipeP">
                <b>Gerenciamento de Receita</b>
            </li>
                <ul class="nav d-flex">
                    <li class="form-group nav-phases col-md-2">
                        <label class="">
                            <b>Nome da receita:</b>
                        </label>
                            <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" size='5' :disabled="recipeCadastrada" required placeholder="Nome da receita">
                    </li>
                    <li class="form-group nav-phases col-md-2">
                        <label class="">
                            <b>Código:</b>
                        </label>
                            <input type="text" class="form-control form-control-sm" required v-model="recipe.recipeCode" :disabled="recipeCadastrada" size='5' placeholder="Código da receita">
                    </li>
                    <li class="form-group nav-phases col-md-2">
                        <form row>
                            <br><button type="button" class="btn btn-success" v-if="!recipeCadastrada" :disabled="!recipe.recipeName || !recipe.recipeCode || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''" @click.stop.prevent="createRecipe(recipe)">
                                Enviar
                            </button>
                        </form>
                    </li>
                    <li class="nav-phases col-md-2">
                        <div @click.stop.prevent="showModalEditRecipe()" v-if="recipeCadastrada">
                            <br>
                            <i class="fa fa-edit" style="font-size:22px; cursor:pointer"> 
                                <div class="edit-text">   
                                    <b>Editar receita</b>
                                </div>
                            </i>
                        </div>
                    </li>
                    <li class="nav-phases col-md-2">
                        <div v-if="!(carregando || !recipeCadastrada)" @click.stop.prevent="showModalAddProdFin()">
                            <br>
                            <i class="fa fa-plus" aria-hidden="true" style="font-size:22px; cursor:pointer"> 
                                <div class="edit-text">
                                    <b> Cadastrar produto da Receita </b>
                                </div>
                            </i>
                        </div>
                    </li>
                    <li class="nav-phases col-md-2" id="produtoR" v-if="pName !== '' || json.stringify(recipeProduct) !== '{}'">
                            <b><font color="#9BA6A5">
                                Produto:
                            </font></b>
                               {{pName}}
                                <br>
                        <button type="button" class="btn btn-danger config-button2" aria-hidden="true" id="removerP" @click.stop.prevent="deleteRecipeProduct(recipeProduct);">
                            <i class= "fa fa-trash-o"></i> Remover
                        </button>
                    </li>
                    <li v-else class="nav-phases col-md-2" id="produtoR">
                            <br>
                    </li>
                </ul>
        </nav>
        

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--   Listagem de fase    -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="container-fluid card-header-phase" v-show="recipeCadastrada">
            <br>
            <div class="card card-margin2">
                <h2>
                    <b style="font-size:20px; font-family: sans-serif;">
                        Fases da receita: 
                    </b>  
                    <br>
                    <button type="button" class="btn btn-primary btn-sm config-button" id="addPhase" @click.stop.prevent="showModalCadFase();phase={};" aria-hidden="true">
                        <i class= "fa fa-plus-square" style="font-size:18px; cursor:pointer"></i> Adicionar fase  
                    </button>
                </h2>
            </div>         
        <div class="card-body">
            <div v-for="(pha, index) in phases" class="phase" :key="index">
                <div class="card-header card-header-recipe">
                    <form row="">
                    <h6>
                        <b> {{index+1}}° Fase </b>
                    </h6>
                    <hr>    
                        <label class="ls5">
                            
                            <b style="font-size:13px; color: #696969">  
                                Código da fase: 
                            </b>
                                {{pha.phaseCode}} &nbsp;&nbsp;
                        
                        
                            <b style="font-size:13px; color: #696969"> 
                                Nome da fase: 
                            </b>
                                {{pha.phaseName}} 
    
                    </label>
                        <label class="btn btn-warning btn-edit btn-sm config-button" style="color: white" @click.stop.prevent="showModalEditFase();phase=pha" aria-hidden="true">
                            <i class= "fa fa-edit" style="font-size:18px; cursor:pointer"></i> Editar Fase

                        </label> 
                        <label class="btn btn-primary btn-edit btn-sm config-button" @click.stop.prevent="showModalAddProd();phase=pha;" aria-hidden="true">
                            <i class= "fa fa-plus-circle" style="font-size:22px; cursor:pointer"></i> Materiais

                        </label> 
                        <label class="btn btn-info btn-edit btn-sm config-button" @click.stop.prevent="showModalAddParam();phase=pha;" aria-hidden="true">
                            <i class= "fa fa-plus-circle" style="font-size:22px; cursor:pointer"></i> Parâmetros   
                        </label> 
                    </form>
                <div v-if="editarActivate">
                    <ul class="list-group" v-for="(pro, indexPro) in pha.phaseProducts" :key="indexPro">
                        <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-3">
                            <label v-if="pro.product.productName != undefined" class="ls ls14">
                              <b>Material: </b>{{pro.product.productName}}&nbsp;&nbsp;
                            </label> 
                            <label v-else class="ls ls14">
                                Material
                            </label>
                            <label class="ls ls14">
                               <b>Quantidade: </b>{{pro.minValue}} min. {{pro.maxValue}} máx
                            </label>
                            <label class="ls ls14">
                                <b>Tipo de Produto: </b>{{pro.phaseProductType | prodTypeName}}
                            </label>
                            <label class="ls ls14">
                            <button type="button" class="btn btn-danger btn-edit btn-sm fa fa-trash-o" style="font-size:17px; cursor:pointer" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);">
                            </button>
                            </label>
                        </li>
                    </ul>

                </div>
                <!-- Fim v-else -->
                                
                <div v-else>
                    <a class="list-group" v-for="(pro, indexPro) in pha.phaseProducts" :key="indexPro">
                            <div class="list-group-item list-group-item-3">
                            <label class="ls ls14">
                              <b>Material: </b>{{pro.product.productName}}&nbsp;&nbsp;
                            </label>
                            <label class="ls ls14">
                                <b>Quantidade : </b>{{pro.value}} {{pro.measurementUnit}}
                            </label>
                            <label class="ls ls14">
                                <b>Tipo de Material: </b>{{pro.phaseProductType | prodTypeName}}
                            </label>
                            <label class="ls ls14">
                                <button type="button" class="btn btn-danger btn-edit btn-sm fa fa-trash-o" style="font-size:17px; cursor:pointer" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);">
                            </button>
                            </label>
                            
                        </div>
                    </a>
                </div>


                <br>
                    <a class="list-group" v-for="(par, indexPro) in pha.parameters" v-bind:key="indexPro">
                        <div class="list-group-item list-group-item-4">
                            <label class="ls ls14">
                                <b>Pointer:</b>{{par.setupValue}} {{par.measurementUnit}}
                            </label>
                            <label class="ls ls16">
                                <b>Valor min.: </b>{{par.minValue}}
                            </label>
                            <label class="ls ls16">
                                <b>Valor max.: </b>{{par.maxValue}}
                            </label>
                            <label class="ls ls16">
                                <b>Tag: </b>{{par.tag.tagName}}
                            </label>
                        </div>
                    </a>
                                
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

        <b-modal ref="modalEditRecipe" hide-footer title="Editar Receita">
            
            <div class="modal-body">
                <label for="">Nome da fase</label>
                <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" placeholder="Nome">
                <label for="inputPassword4">Código da fase</label>
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

        <!--                  -->
        <!--                  -->
        <!--                  -->
        <!--  Produto Final   -->
        <!--                  -->
        <!--                  -->
        <!--                  -->
        <!--      Modal       -->
         <b-modal ref="modalProFinal" hide-footer title="Cadastro de Produto Final">
                    <div class="modal-body">
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Quantidade: </label>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.value" placeholder="Valor" />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Unidade de medida: </label><br>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.measurementUnit" placeholder="Ex.: kg" />
                            </div>
                        </div>

                        <div class="form-row">
                            <label>Tolerância: </label><br>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Mín: </label><br>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.minValue" placeholder="Ex.: kg" />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Máx: </label><br>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.maxValue" placeholder="Ex.: kg" />
                            </div>
                        </div>
                        <label class="mr-sm-2">Nome do produto: </label>
                            <input @keyup="recipeProducts=getResults(urlProducts,recipeProductName)" v-model="recipeProductName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <b-dropdown-item id="dropdownMenuButton" @click.stop.prevent="recipeProduct.productId=p.productId; recipeProduct.productName=p.productName; pName=recipeProductName; recipeProductName=p.productName; recipeProducts=[]" v-for="(p,index) in recipeProducts" v-bind:key="index">{{p.productName}}</b-dropdown-item>
                              {{ recipeProductName }}
                            <br>
                            <small>Digite no minimo 3 letras para busca do produto</small>
                        </div>
                 
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>

                            <button type="button" @click.stop.prevent="checkCadProdReceita(); createRecipeProduct(recipeProduct)" 
                            :disabled="!recipeProduct.value || !recipeProduct.measurementUnit || !recipeProductName || !recipeProduct.minValue || !recipeProduct.maxValue" class="btn btn-success">

                            <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
         </b-modal>           
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--    Editar  da fase    -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->

        <b-modal ref="modalEditFase" hide-footer title="Editar Fase">

                    <div class="modal-body">
                        <label for="">Nome da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseName" placeholder="Nome">
                        <label for="inputPassword4">Código da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseCode" placeholder="Código">
                    </div>

                    <div class="modal-footer">
                        <div>
                            <button @click.stop.prevent="putPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                Limpar
                            </div>
                        </div>
                    </div>
        </b-modal>
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--   Cadastro da fase    -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->

        <b-modal ref="myModalRefCF" hide-footer title="Cadastrar fase">
                    <div class="modal-body">
                        <label for="">Nome da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseName" placeholder="Nome">
                        <label for="inputPassword4">Código da fase</label>
                        <input type="text" class="form-control form-control-sm" v-model="phase.phaseCode" placeholder="Código">
                    </div>

                    <div class="modal-footer">
                        <div>
                            <button @click.stop.prevent="createPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <div class="btn btn-primary pull-right" @click.stop.prevent="phase.phaseName='';phase.phaseCode=''">
                                Limpar
                            </div>
                        </div>
                    </div>
        </b-modal>
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--     Cadastro de       -->
        <!--       produto         -->
        <!--       da fase         -->
        <!--        modal          -->
        
         <b-modal ref="modalcadProPhase" hide-footer title="Cadastrar produto">
                  
                    <div class="modal-body">

                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                        
                        <div class="form-row">
                            
                            <div class="form-group col-md-3">
                                <label>Quantidade : </label><br>
                                <input class="fm form-control mr-sm-2" v-model="phaseProduct.value" placeholder="Valor" />
                            </div>
                            <div class="form-group col-md-4">
                                <label>Unidade de medida : </label><br>
                                <input class="fm form-control mr-sm-2" v-model="phaseProduct.measurementUnit" placeholder="Ex.: kg" />
                            </div>
                            <div class="form-group col-md-4">
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
        <!--    Modal da Flavia    -->
        <!--                       -->
        <!--                       -->
        <!-- Cadastro de parâmetros-->
        <!--                       -->
        <!--                       -->
        <!--         Modal         -->
        <b-modal ref="modalCadParam" hide-footer title="Cadastrar Parâmetro">
                 
                        <div class="modal-body">
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="">Set Point</label>
                                <input type="text" class="form-control form-control-sm" v-model="phaseParameter.setupValue" placeholder="Set Point">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputPassword4">Unidade de Medida</label>
                                <input type="text" class="form-control form-control-sm" v-model="phaseParameter.measurementUnit" placeholder="Ex.: Kg">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="mr-sm-2">Nome : </label><br>
                                <div class="dropdown">
                                    <input @keypress.capture="phaseTags=getResults(urlRecipeSearch, tagName)" v-model="tagName" placeholder="Nome do parâmetro" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                        <b-dropdown-item @click.stop.prevent="phaseParameter.tagId=p.tagId; phaseParameter.tag=p; tagName=p.tagName; phaseTags=[]" v-for="(p,index) in phaseTags" v-bind:key="index">{{p.tagName}}</b-dropdown-item>
                                </div>
                            <small>Digite no minimo 3 letras para busca da tag</small>
                            </div>
                        </div>
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="createPhaseParameter(phaseParameter, phase)" :disabled="!phaseParameter.setupValue || !phaseParameter.measurementUnit || !tagName" class="btn btn-success">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button @click.stop.prevent="deletePhaseParameter(index, tag)" class="btn btn-danger">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
        </b-modal>
    </div>
</template>
<script src="./js/phases.js">
</script>
<style>
@import url("./css/phases.css");
</style> 


<!-- -->