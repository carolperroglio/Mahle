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
        <div class="fixed-top nav-list-tira">            
            <ul class="nav d-flex">
                <li class="nav-item title-nav-tira nav-item-tira">
                    <h1 class="title-page-gp"><b>Gerenciamento de Tira</b></h1>
                </li>               
                <li class="nav-item nav-item-tira">  
                    <label>
                       <b>Nome da Tira</b>
                    </label>                  
                    <input type="text" class="form-control form-control-md" v-model="recipe.recipeName" size='9' :disabled="true" required placeholder="Nome da Tira">                    
                </li>                  
                <li class="nav-item nav-item-tira"> 
                    <label>
                        <b>Código</b>
                    </label>                   
                    <input type="text" class="form-control form-control-md" required v-model="recipe.recipeCode" :disabled="true" size='12' placeholder="Código da receita">    
                </li>                                     
            </ul>                 
        </div>
        <div class="fundo-branco-tira">
            <div class="cabecalho-table-tira">
                <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametros, 'parametro',0):organizar(parametros, 'parametro',0);" class="ls7-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">Parâmetro
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                    </font></b>
                </label>                    
                <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(parametros, 'vn',1):organizar(parametros, 'vn',1);" class="ls7-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Valor Nominal
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                    </font></b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametros, 'unidade',2):organizar(parametros, 'unidade',2);" class="ls7-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Unidade
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                    </font></b>
                </label>  
                <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametros, 'lie',3):organizar(parametros, 'lie',3);" class="ls7-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Lim. Inferior Específico
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                    </font></b>
                </label> 
                <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(parametros, 'lic',4):organizar(parametros, 'lic',4);" class="ls7-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Lim. Inferior Controle
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                    </font></b>
                </label> 
                <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(parametros, 'lsc',5):organizar(parametros, 'lsc',5);" class="ls7-cabecalho-tira">
                    <b>
                        <font class="cursor-class" color="#ffffff">
                            Lim. Superior Controle
                            <i class="fa fa-sort-desc" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                        </font>
                    </b>
                </label>
                <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(parametros, 'lse',6):organizar(parametros, 'lse',6);" class="ls7-cabecalho-tira">
                    <b><font class="cursor-class" color="#ffffff">
                        Lim. Superior Específico
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i>
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
        <div class="tiras-parametros">
            <div class="progress" v-show="carregando">
                <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                </div>
            </div>
            <div v-for="(pro, index) in parametros" v-bind:class="{cinza: index%2==0}" :key="index">                     
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.parametro}}
                </label>                    
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.vn}}
                </label>
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.unidade}}
                </label>
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lie}}
                </label>   
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lic}}
                </label>            
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lsc}}
                </label>
                <label class="ls4-parametros">
                <b><font color="#9BA6A5"> </font></b>
                    {{pro.lse}}
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
                        <label>Mínimo: </label><br>
                        <input class="form-control mr-sm-2" required v-model="recipeProduct.minValue" placeholder="Ex.: kg" />
                    </div>
                    <div class="form-group col-md-6">
                        <label>Máximo: </label><br>
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

                    <button type="button" @click.stop.prevent="createRecipeProduct(recipeProduct)" 
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
        <!--     Cadastro de       -->
        <!--       produto         -->
        <!--       da fase         -->
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
                <div class="form-group col-md-6">
                    <label for="">Set Point</label>
                    <input type="text" class="form-control form-control-sm" v-model="phaseParameter.setupValue" placeholder="Set Point">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="mr-sm-2">Nome : </label><br>
                    <div class="dropdown">
                        <input @keypress.capture="phaseTags=getResults(urlRecipeSearch, tagName)" v-model="tagName" placeholder="Nome do parâmetro" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <b-dropdown-item @click.stop.prevent="phaseParameter.tagId=p.tagId; phaseParameter.tag=p; tagName=p.tagName; phaseTags=[]" v-for="(p,index) in phaseTags" v-bind:key="index">{{p.tagName}}</b-dropdown-item>
                    </div>
                <small>Digite no mínimo 3 letras para busca da tag</small>
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
<script src="./js/tira.js">
</script>
<style>
@import url("./css/tira.css");
</style> 


<!-- -->