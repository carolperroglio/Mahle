<template>
    <div>

        <!--               -->
        <!--               -->
        <!--               -->
        <!--Nav de Receitas-->
        <!--               -->
        <!--               -->
        <!--               -->
        <nav class="fixed-top nav-recipe">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item col-md-1.5">
                    <form class="form-row">
                        <label>
                            <b>Nome da receita : </b>
                        </label>
                        <input type="text" class="form-control form-control-sm" v-model="recipe.recipeName" size='5' :disabled="recipeCadastrada" required placeholder="Nome da receita">
                    </form>
                </li>
                <li class="nav-item col-md-auto">
                    <form class="form-row">
                        <label>
                            <b>Código : </b>
                        </label>
                        <input class="form-control form-control-sm" required v-model="recipe.recipeCode" :disabled="recipeCadastrada" size='5' placeholder="Código da receita" />
                    </form>
                </li>
                <li class="nav-item col-md-auto">
                    <button type="button" class="btn btn-success" v-if="!recipeCadastrada" :disabled="carregando || recipe.recipeName==undefined || recipe.recipeCode==undefined || recipe.recipeName=='' || recipe.recipeCode==''" @click.stop.prevent="createRecipe(recipe)">Enviar
                    </button>
                </li>
                <li class="nav-item col-md-auto">
                    <div data-toggle="modal" data-target="#modalEdiReceita" v-if="recipeCadastrada">
                        <i class="fa fa-edit"> Editar receita</i>
                    </div>
                </li>
                <li class="nav-item col-md-auto">
                    <div data-toggle="modal" v-if="!(carregando || !recipeCadastrada)" data-target="#modalPro">
                        <i class="fa fa-check" aria-hidden="true"> Cadastrar produto</i>
                    </div>
                </li>
                <li class="nav-item justify-content-end" v-if="json.stringify(recipeProduct) !== '{}'">
                    Produto : {{recipeProduct.productName}} | Quantidade do produto : {{recipeProductDisplay.value+''+recipeProductDisplay.measurementUnit}} | Tipo do produto : {{recipeProductDisplay.phaseProductType}}
                    <i class="fa fa-window-close" aria-hidden="true" @click.stop.prevent="deleteRecipeProduct(pro, pha);"></i>
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
        <div class="container-fluid col-md-9" v-show="recipeCadastrada">
            <div class="card card-margin">
                <h5 class="card-header">
                    <h3>Fases da receita : </h3>
                    <i class="fa fa-plus pull-right" data-toggle="modal" data-target="#modalCadFase" id="addPhase" @click.stop.prevent="phase={};abreModal('#modalCadFase');" style="margin-left:40%;" aria-hidden="true">
                        <b> Adicionar fase</b>
                    </i>
                    <!-- <div data-toggle="modal" data-target="#modalCadFase" id="addPhase" @click.stop.prevent="phase={};abreModal('#modalCadFase');" style="margin-left:40%;" aria-hidden="true">
                                                                                            <i class="fa fa-plus"></i>
                                                                                            <b> Adicionar fase</b>
                                                                                        </div> -->
                </h5>
                <div class="card-body">
                    <div v-for="(pha, index) in phases" class="phase">
                        <div class="card-header">
                            <h5>{{index+1}}° Fase</h5>
                            <b> Id da fase : </b> {{pha.phaseId}} -
                            <b>Nome da fase : </b>{{pha.phaseName}} -
                            <b>Código da fase : </b>{{pha.phaseCode}} &nbsp;&nbsp;
                            <i class="fa fa-edit" @click.stop.prevent="phase=pha;abreModal('#modalEditFase')" data-toggle="modal" aria-hidden="true">
                                <b> Editar </b>
                            </i>
                            <span @click.stop.prevent="pha.expand==false?pha.expand=true:pha.expand=false" id="show-phase-products">
                                <i class="fa fa-expand">
                                    <b> Expandir</b>
                                </i>
                            </span><br>
                        </div>
                        <div class="list-group-item" v-show="pha.expand">
                            <div class="itens-fase">
                                <span data-toggle="modal" data-target="#cadProPhase" @click.stop.prevent="productPhaseName='';phaseProduct={};phase=pha;abreModal('#cadProPhase');" class="pointer" aria-hidden="true">
                                    <i class="fa fa-plus"></i>
                                    <b> Adicionar produtos</b>
                                </span>
                                <ul class="list-group list-group-flush" v-for="(pro, indexPro) in pha.products">
                                    <li class="list-group-item">
                                        <b>VALOR : </b>{{pro.value}} {{pro.measurementUnit}}
                                        <b>TIPO DE PRODUTO : </b>{{pro.phaseProductType | prodTypeName}}
                                        <b>PRODUTO : </b>{{pro.product.productName}}&nbsp;&nbsp;
                                        <i class="fa fa-window-close" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);"></i>
                                    </li>
                                </ul>
                            </div>
                            <div class="itens-fase pull-right">
                                <span class="pointer" data-toggle="modal" data-target="#modalCadParam" @click.stop.prevent="tagName='';phaseParameter={};phase=pha;abreModal('#modalCadParam');" aria-hidden="true">
                                    <i class="fa fa-plus"></i>
                                    <b> Adicionar parametros</b>
                                </span>
                                <ul class="list-group list-group-flush" v-for="(par, indexPro) in pha.parameters">
                                    <li class="list-group-item">
                                        <b>POINTER : </b>{{par.setupValue}} {{par.measurementUnit}}
                                        <b>VALOR MIN. : </b>{{par.minValue}}
                                        <b>VALOR MAX. : </b>{{par.maxValue}}
                                        <b>TAG : </b>{{par.tag.tagName}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Listagem Antiga Phases -->
        <!-- <div class="conteudo" v-show="recipeCadastrada">
                                                                                            <div class="cabecalhoPhase">
                                                                                                <h3>Fases da receita : </h3>
                                                                                                <div data-toggle="modal" data-target="#modalCadFase" id="addPhase" @click.stop.prevent="phase={};abreModal('#modalCadFase');" style="margin-left:40%;" aria-hidden="true">
                                                                                                    <i class="fa fa-plus"></i>
                                                                                                    <b> Adicionar fase</b>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div v-for="(pha, index) in phases" class="phase">
                                                                                                <h3>{{index+1}}° Fase</h3><br>
                                                                                                <b> Id da fase : </b> {{pha.phaseId}} ---
                                                                                                <b>Nome da fase : </b>{{pha.phaseName}} ---
                                                                                                <b>Código da fase : </b>{{pha.phaseCode}} &nbsp;&nbsp;
                                                                                                <i class="fa fa-pencil" @click.stop.prevent="phase=pha;abreModal('#modalEditFase')" data-toggle="modal" aria-hidden="true"></i>
                                                                                                <b>Editar </b>
                                                                                                <span @click.stop.prevent="pha.expand==false?pha.expand=true:pha.expand=false" id="show-phase-products">
                                                                                                    <b>\/Expandir</b>
                                                                                                </span><br>
                                                                                                <div class="container-itens-fase" v-show="pha.expand">
                                                                                                    <div class="itens-fase">
                                                                                                        <span data-toggle="modal" data-target="#cadProPhase" @click.stop.prevent="productPhaseName='';phaseProduct={};phase=pha;abreModal('#cadProPhase');" class="pointer" aria-hidden="true">
                                                                                                            <i class="fa fa-plus"></i>
                                                                                                            <b> Adicionar produtos</b>
                                                                                                        </span>
                                                                                                        <div v-for="(pro, indexPro) in pha.products">
                                                                                                            <b>VALOR : </b>{{pro.value}} {{pro.measurementUnit}}
                                                                                                            <b>TIPO DE PRODUTO : </b>{{pro.phaseProductType}}
                                                                                                            <b>PRODUTO : </b>{{pro.product.productName}}&nbsp;&nbsp;
                                                                                                            <i class="fa fa-window-close" aria-hidden="true" @click.stop.prevent="deletePhaseProduct(pro, pha);"></i>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="itens-fase pull-right">
                                                                                                        <span class="pointer" data-toggle="modal" data-target="#modalCadParam" @click.stop.prevent="tagName='';phaseParameter={};phase=pha;abreModal('#modalCadParam');" aria-hidden="true">
                                                                                                            <i class="fa fa-plus"></i>
                                                                                                            <b> Adicionar parametros</b>
                                                                                                        </span>
                                                                                                        <div v-for="(par, indexPro) in pha.parameters">
                                                                                                            <b>POINTER : </b>{{par.setupValue}} {{par.measurementUnit}}
                                                                                                            <b>VALOR MIN. : </b>{{par.minValue}}
                                                                                                            <b>VALOR MAX. : </b>{{par.maxValue}}
                                                                                                            <b>TAG : </b>{{par.tag.tagName}}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div> -->

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
                            <button class="btn btn-primary">
                                <i @click.stop.prevent="putRecipe(recipe)" class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
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
                        <h5 class="modal-title" id="exampleModalLabel">Cadastrar produto da receita {{recipe.recipeName}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Digite a quantidade : </label>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.value" placeholder="Valor" />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Digite a unidade de medida : </label><br>
                                <input class="form-control mr-sm-2" required v-model="recipeProduct.measurementUnit" placeholder="Ex.: kg" />
                            </div>
                        </div>
                        <label class="mr-sm-2">Digite o nome do produto : </label>
                        <div class="dropdown">
                            <!-- <v-autocomplete :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems">
                            </v-autocomplete> -->
                            <input @keyup.enter="recipeProducts=getResults('http://brsbap01:8003/api/products?&fieldFilter=productName&fieldValue=',recipeProductName)" v-model="recipeProductName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <select class="form-control form-control-sm" v-model="recipeProductName">
                                <option value="" selected disabled></option>
                                <option v-for="(p,index) in recipeProducts" v-bind:value="opType.productionOrderTypeId">
                                    {{p.productName}}
                                </option>
                            </select>
                            <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a class="dropdown-item" @click.stop.prevent="recipeProduct.productId=p.productId; recipeProduct.productName=p.productName; recipeProductName=p.productName; recipeProducts=[]" v-for="(p,index) in recipeProducts">{{p.productName}}</a>
                                                                    </div> -->
                            {{ recipeProductName }}
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
                            <button @click.stop.prevent="putPhase(phase);" class="btn btn-success" :disabled="phase.phaseName==undefined || phase.phaseName=='' || phase.phaseCode==undefined || phase.phaseCode==''">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button @click.stop.prevent="deletePhase(phase, recipe)" :disabled="phase.phaseId == undefined || phase.phaseId == ''" class="btn btn-danger">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
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
                                <i class="fa fa-window-close" aria-hidden="true"></i>
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
                                <label>Fase:</label>
                                <select class="fm form-control mr-sm-2" v-model="phaseProduct.phaseProductType">
                                    <option value="" selected disabled>Campo para busca</option>
                                    <option value="scrap">Rejeito</option>
                                    <option value="finished">Acabado</option>
                                    <option value="semi_finished">Semi-Acabado</option>
                                </select>
                            </div>
                        </div>
                        <label class="fm mr-sm-2">Nome do produto : </label>
                        <div class="dropdown">
                            <input @keyup="phase.pros=getResults('http://brsbap01:8003/api/products?fieldFilter=productName&fieldValue=',productPhaseName)" v-model="productPhaseName" placeholder="Nome do produto" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="phaseProduct.productId=p.productId; phaseProduct.product=p; productPhaseName=p.productName; phase.pros=[];" v-for="(p,index) in phase.pros">{{p.productName}}</a>
                            </div>
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
                                    <input @keyup="phaseTags=getResults('http://brsbap01:8001/api/tags?fieldFilter=tagName&fieldValue=', tagName)" v-model="tagName" placeholder="Nome do parâmetro" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" @click.stop.prevent="phaseParameter.tagId=p.tagId; phaseParameter.tag=p; tagName=p.tagName; phaseTags=[]" v-for="(p,index) in phaseTags">{{p.tagName}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="createPhaseParameter(phaseParameter, phase)" class="btn btn-success">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button @click.stop.prevent="deletePhaseParameter(index, tag)" class="btn btn-danger">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
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