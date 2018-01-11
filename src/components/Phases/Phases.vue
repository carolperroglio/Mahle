<template>
    <div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--     Barra de load     -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->
        <div class="progress fixed-top" v-if="carregando">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
            </div>
        </div>

        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->
        <nav class="fixed-top nav-recipe">
            <!-- {{ 'idRecipe' + $route.params.id }} -->
            <li class="title-recipe">
                Gerenciamento de Receita
            </li>
                <ul class="nav d-flex">
                    <li class="form-group nav-phases col-md-2">
                        <label class="ls ls12">
                            <b>Nome da receita:</b>
                        </label>
                            <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" size='5' :disabled="recipeCadastrada" required placeholder="Nome da receita">
                    </li>
                    <li class="form-group nav-phases col-md-2">
                        <label class="ls ls12">
                            <b>Código:</b>
                        </label>
                            <input type="text" class="form-control form-control-sm" required v-model="recipe.recipeCode" :disabled="recipeCadastrada" size='5' placeholder="Código da receita">
                    </li>
                        <form row>
                            <br><br><button type="button" class="btn btn-success" v-if="!recipeCadastrada" :disabled="carregando || recipe.recipeName==undefined || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''" @click.stop.prevent="createRecipe(recipe)">
                                Enviar
                            </button>
                        </form>
                    </li>
                    <li class="nav-phases col-md-2">
                        <div data-toggle="modal" data-target="#modalEdiReceita" v-if="recipeCadastrada">
                            <br>
                            <i class="fa fa-edit" style="font-size:22px; cursor:pointer"> 
                                <div class="edit-text">   
                                    <b>Editar receita</b>
                                </div>
                            </i>
                        </div>
                    </li>
                    <li class="nav-phases col-md-2">
                        <div data-toggle="modal" v-if="!(carregando || !recipeCadastrada)" data-target="#modalPro">
                            <br>
                            <i class="fa fa-plus" aria-hidden="true" style="font-size:22px; cursor:pointer"> 
                                <div class="edit-text">
                                    <b> Cadastrar produto da Receita </b>
                                </div>
                            </i>
                        </div>
                    </li>
                    <li class="nav-phase col-md-3" v-if="json.stringify(recipeProduct) !== '{}'">
                            <b><font color="#9BA6A5">
                                Produto:
                            </font></b>
                                {{recipeProduct.productName}}
                            <br><b>
                            <!-- {{ recipeProduct }} -->
                            <font color="#9BA6A5">
                                Quantidade do produto:
                            </font></b> 
                                {{recipeProductDisplay.value+''+recipeProductDisplay.measurementUnit}} 
                            <!--<br>Tipo do produto: {{recipeProductDisplay.phaseProductType}}-->
                            <br>
                        <button type="button" class="btn btn-danger btn-sm config-button2" style="font-size:12px;" aria-hidden="true" @click.stop.prevent="deleteRecipeProduct(pro, pha);">
                            <i class= "fa fa-trash-o" style="font-size:18px; cursor:pointer"></i> Remover Produto
                        </button>
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
                    <br><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCadFase" id="addPhase" @click.stop.prevent="phase={};abreModal('#modalCadFase');" style="" aria-hidden="true">
                        Adicionar fase
                    </button>
                </h2>
                <!-- <div data-toggle="modal" data-target="#modalCadFase" id="addPhase" @click.stop.prevent="phase={};abreModal('#modalCadFase');" style="margin-left:40%;" aria-hidden="true">
                    <i class="fa fa-plus"></i>
                        <b> Adicionar fase</b>
                    </div> -->
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
                        <!--<label class="ls5">
                        <b> Id da fase: </b> {{pha.phaseId}} 
                        </label>-->
                        <!-- <span @click.stop.prevent="pha.expand==false?pha.expand=true:pha.expand=false" id="show-phase-products"> -->
                            <!-- <button type="button" class="btn btn-secondary btn-sm col-sm-1.5">
                                <b> Expandir </b> {{ pha.expand }}
                            </button> -->
                            <!-- </span> -->
                        <label class="btn btn-warning btn-edit btn-sm config-button" @click.stop.prevent="phase=pha;abreModal('#modalEditFase')" data-toggle="modal" aria-hidden="true">
                            <i class= "fa fa-edit" style="font-size:18px; cursor:pointer"></i>              Editar Fase

                        </label> 
                        <label class="btn btn-primary btn-edit btn-sm config-button" @click.stop.prevent="productPhaseName='';phaseProduct={};phase=pha;abreModal('#cadProPhase');" aria-hidden="true">
                            <i class= "fa fa-plus-circle" style="font-size:18px; cursor:pointer"></i>       Adicionar materiais

                        </label> 
                        <label class="btn btn-info btn-edit btn-sm config-button" @click.stop.prevent="tagName='';phaseParameter={};phase=pha;abreModal('#modalCadParam');" aria-hidden="true">
                            <i class= "fa fa-plus-circle" style="font-size:18px; cursor:pointer"></i>       Adicionar parâmetros   
                        </label> 
                    </form>

                <div v-if="editarActivate">
                    <ul class="list-group" v-for="(pro, indexPro) in pha.phaseProducts">
                        <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-3">
                            <label class="ls ls14">
                                Produto:{{pro.product.productName}}&nbsp;&nbsp;
                            </label>
                            <label class="ls ls14">
                                <b>Quantidade: </b>{{pro.value}} {{pro.measurementUnit}}
                            </label>
                            <label class="ls ls14">
                                <b>Tipo de Produto: </b>{{pro.phaseProductType | prodTypeName}}
                            <i class="fa fa-window-close" style="font-size:30px; cursor:pointer" aria-hidden="true" cursor="pointer" @click.stop.prevent="deletePhaseProduct(pro, pha);"></i>
                            </label>
                        </li>
                    </ul>

                </div>
                <!-- Fim v-else -->
                                
                <div v-else>
                    <!-- <label class="ls ls15">
                            <b> Materiais </b>
                            </label> -->
                    <a class="list-group" v-for="(pro, indexPro) in pha.products">
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
                <!-- <div class="ls ls15">
                    <b> Parâmetros </b>
                </div>              -->
                    <a class="list-group" v-for="(par, indexPro) in pha.parameters">
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
                        <!-- v-if para verificar se o usuário está editando ou cadastrando uma fase -->
                        <!-- <div class="list-group-item" v-show="pha.expand">
                            <div class="itens-fase">
                                <span data-toggle="modal" data-target="#cadProPhase" @click.stop.prevent="productPhaseName='';phaseProduct={};phase=pha;abreModal('#cadProPhase');" class="pointer" aria-hidden="true">
                                    <button type="button" class="btn btn-link">
                                    <b> Adicionar produtos</b></button>
                                </span> -->
                                <!-- v-else -->
                                <!-- <div v-if="editarActivate">
                                    <ul class="list-group list-group-flush" v-for="(pro, indexPro) in pha.phaseProducts">
                                    <li class="list-group-item">
                                        <b>VALOR : </b>{{pro.value}} {{pro.measurementUnit}}
                                        <b>TIPO DE PRODUTO : </b>{{pro.phaseProductType | prodTypeName}}
                                        <b>PRODUTO : </b>{{pro.product.productName}}&nbsp;&nbsp;
                                        <i class="fa fa-window-close" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);"></i>
                                    </li>
                                </ul>
                                </div> -->
                                <!-- Fim v-else -->
                                <!-- <div v-else>
                                    <ul class="list-group list-group-flush" v-for="(pro, indexPro) in pha.products">
                                    <li class="list-group-item">
                                        <b>VALOR : </b>{{pro.value}} {{pro.measurementUnit}}
                                        <b>TIPO DE PRODUTO : </b>{{pro.phaseProductType | prodTypeName}}
                                        <b>PRODUTO : </b>{{pro.product.productName}}&nbsp;&nbsp;
                                        <i class="fa fa-window-close" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);"></i>
                                    </li>
                                </ul>
                                </div> -->
                                
                            <!-- </div>
                            <div class="itens-fase pull-right">
                                <span class="pointer" data-toggle="modal" data-target="#modalCadParam" @click.stop.prevent="tagName='';phaseParameter={};phase=pha;abreModal('#modalCadParam');" aria-hidden="true">
                                    <button type="button" class="btn btn-link">
                                    <b> Adicionar parametros</b></button>
                                </span> -->
                                <!-- <ul class="list-group list-group-flush" v-for="(par, indexPro) in pha.parameters">
                                    <li class="list-group-item">
                                        <b>POINTER : </b>{{par.setupValue}} {{par.measurementUnit}}
                                        <b>VALOR MIN. : </b>{{par.minValue}}
                                        <b>VALOR MAX. : </b>{{par.maxValue}}
                                        <b>TAG : </b>{{par.tag.tagName}}
                                    </li>
                                </ul>
                            </div> -->
                        <!-- </div>
                    </div> -->
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
                        <h6 class="modal-title" id="exampleModalLabel">Editar receita</h6>
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
                            <button class="btn btn-primary">
                                <i @click.stop.prevent="putRecipe(recipe)" class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
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
                        <h7 class="modal-title" id="exampleModalLabel">Cadastrar produto da receita {{recipe.recipeName}}</h7>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Quantidade : </label>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.value" placeholder="Valor" />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Unidade de medida : </label><br>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.measurementUnit" placeholder="Ex.: kg" />
                            </div>
                        </div>
                        <label class="mr-sm-2">Nome do produto : </label>
                        <div class="dropdown">
                            
                            <input @keypress.capture="recipeProducts=getResults(urlProducts,recipeProductName)" v-model="recipeProductName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="recipeProduct.productId=p.productId; recipeProduct.productName=p.productName; recipeProductName=p.productName; recipeProducts=[]" v-for="(p,index) in recipeProducts" v-bind:key="index">{{p.productName}}</a>
                            </div>
                            {{ recipeProductName }}
                            <br>
                            <small>Digite no minimo 3 letras para busca do produto</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" @click.stop.prevent="createRecipeProduct(recipeProduct)" 
                            :disabled="!recipeProduct.value || !recipeProduct.measurementUnit || !recipeProductName" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
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
                        <h5 class="modal-title" id="exampleModalLabel">Editar Fase</h5>
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
        <div class="modal fade" id="cadProPhase" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cadastrar produto da fase</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
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
                        <label class="fm mr-sm-2">Nome do produto : </label>
                        <div class="dropdown">
                            <input @keypress.capture="phase.pros=getResults(urlProducts,productPhaseName)" v-model="productPhaseName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="phaseProduct.productId=p.productId; phaseProduct.product=p; productPhaseName=p.productName; phase.pros=[];" v-for="(p,index) in phase.pros">{{p.productName}}</a>
                            </div>
                            <small>Digite no minimo 3 letras para busca do produto</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div>
                            <div class="btn-group" role="group">
                                <button @click.stop.prevent="createPhaseProduct(phaseProduct, phase);" class="btn btn-success" :disabled="!phaseProduct.phaseProductType || !phaseProduct.measurementUnit || !phaseProduct.value || !productPhaseName">
                                    <i class="fa fa-check-square" aria-hidden="true"></i>
                                </button>
                                <div class="btn btn-primary pull-right" @click.stop.prevent="phase={}">
                                    Limpar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--    Modal da Flavia    -->
        <!--                       -->
        <!--                       -->
        <!-- Cadastro de parâmetros-->
        <!--                       -->
        <!--                       -->
        <!--         Modal         -->
        <div class="modal fade" id="modalCadParam" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cadastrar Parâmetros de Fase</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
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
                            <div class="form-group col-md-4">
                                <label for="inputPassword4">Valor Mínimo</label>
                                <input type="text" class="form-control form-control-sm" v-model="phaseParameter.minValue" placeholder="Valor Mínimo">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputPassword4">Valor Máximo</label>
                                <input type="text" class="form-control form-control-sm" v-model="phaseParameter.maxValue" placeholder="Valor Máximo"><br>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="mr-sm-2">Nome : </label><br>
                                <div class="dropdown">
                                    <input @keypress.capture="phaseTags=getResults(urlRecipeSearch, tagName)" v-model="tagName" placeholder="Nome do parâmetro" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" @click.stop.prevent="phaseParameter.tagId=p.tagId; phaseParameter.tag=p; tagName=p.tagName; phaseTags=[]" v-for="(p,index) in phaseTags">{{p.tagName}}</a>
                                    </div>
                                </div>
                            <small>Digite no minimo 3 letras para busca da tag</small>
                            </div>
                        </div>
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="createPhaseParameter(phaseParameter, phase)" class="btn btn-success">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button @click.stop.prevent="deletePhaseParameter(index, tag)" class="btn btn-danger">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
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


<!-- -->