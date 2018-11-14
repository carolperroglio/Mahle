<template>
    <div>
        <!--     Modal      -->
        <!-- Formulário de  -->
        <!-- Criação de OP  -->
        <!--                -->
        <b-modal size="md" ref="modalCadOP" hide-footer title="Cadastrar Ordem de Produção de Liga" modal-header-close>
                                       
            <div class="modal-body">
                <form>
                    <p v-if="errors.length">
                                <ul v-for="(error, index) in errors" v-bind:key="index">
                                <!-- <li class="alert alert-danger form-control" >{{ error.message}}</li> -->
                                </ul>
                            </p>
                    <div class="alert alert-success" role="alert" v-if="opCreated">
                        OPL criada com sucesso !
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-md-6">
                        <label for="op">OPL </label>
                            <input type="text" class="form-control" id="op" aria-describedby="prodorder" v-model="productionOrderObj.productionOrderNumber">
                        </div>
                        <div class="form-group col-md-4">
                        <label for="desc">Tipo</label>
                            <input type="text" disabled class="form-control" id="desc" v-model="decriptionLiga" value="opDesc">
                        </div>
                    </div>                   
                    <div class="form-group row">
                        <div class="form-group col-md-10">
                            <label for="desc">Equipamento</label>
                            <select class="form-control  mr-sm-2.5" v-model="idAllowed">
                                <option value="" selected disabled></option>
                                <option v-for="(e,index) in equipaments" v-bind:value="e.thingId" v-bind:key="index" >
                                    {{ e.thingName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-md-12">
                            <label for="opType">Código da Liga</label><br/>
                            <input autocomplete="off" @keyup="recipeArray=getResults(urlRecipeSearch, recipeName)" v-model="recipeName"  class="btn btn-outline-secondary col-md-10" id="dropdownMenuButton"/>
                            <button class="btn btn-outline-success btn-sm col-md-1" :disabled="!productionOrderObj.productionOrderNumber || !recipeName || !canAdd" @click.stop.prevent="addRecipe(recipeSelected.recipeName, recipeSelected.recipeId)">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            </button>
                            <b-dropdown-item @click.stop.prevent="recipeSelected=recipe;recipeName = recipeSelected.recipeCode; recipeArray=[]; msg=true" v-for="(recipe,index) in recipeArray" :key="index">{{ recipe.recipeCode }}</b-dropdown-item>
                        </div>
                    </div>

                    <!--  Acordion que mostra qual   -->
                    <!--  receita foi selecionada    -->
                    
                    <div id="accordion" role="tablist" v-if="recipeAdded">
                        <div class="card">
                            <div class="card-header card-header-op" style="text-align:center;" role="tab" id="headingOne">
                                <h5 class="mb-0">
                                    <span class="collapse-color" style="text-align:center;font-weight: bolder;text-decoration: none;" data-toggle="collapse" href="#recipeAdded" aria-expanded="true" aria-controls="recipeAdded">
                                        {{recipeObj.recipeCode}}
                                    </span>
                                </h5>
                            </div>

                            <!--  Mostra as fases da Receita-->
                            <div id="recipeAdded" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body card-body-op" v-if="recipeObj.phases.length != 0 || carregando == true">                                    
                                    <ul class="list-group" v-if="recipeAdded.length != 0">
                                        <span><strong>Descrição da Liga:</strong> {{recipeObj.recipeProduct.product.productName}}</span>                                            
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </form>
            </div>
            <!-- {{objetooo}} -->
            <!-- Botão que cria a OP-->
            <!--                    -->
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="!recipeAdded || !productionOrderObj.productionOrderNumber || productionOrderObj.productionOrderNumber == ' ' ||!idAllowed" @click="createOp(productionOrderObj);hideModal('modalCadOP');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="productionOrderObj.productionOrderNumber = ''; recipeAdded = ''; idAllowed  = '';recipeName=''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
            <!--</Botão que cria a OP -->
            <!--                      -->
        </b-modal>
        
        
        <!-- Fechamento do Modal  -->
        <!-- Do formulário de     -->
        <!-- Criação de OP        -->

        <!--                      -->
        <!--  Botão que inicia    -->
        <!--  o Modal de Criação da OP  -->
        <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
                <li class="nav-prod nav-item-gp col-md-12">
                    <h1 class="title-page-gp"> <b>Ordens de Produção - Ligas (OPL)</b> </h1>
                </li>
                <li class="col-md-2">
                    <select class="form-control form-control-lg" v-model="fieldFilter" @change="fieldValue = ''">
                        <option value="" selected disabled>Buscar por:</option>
                        <option value="productionOrderNumber">OPL</option>                       
                    </select>
                </li>
                <li class="nav-prod col-md-2">
                    <input class="form-control relative btn-lg col-md-auto" type="search" :disabled="!fieldFilter" v-model="fieldValue" aria-label="Busca">
                </li>
                <li class="nav-prod col-md-6">
                    <form class="form-inline my-3 form-control-sm">
                        <div class="col-md-auto">
                            <button type="button" button class="btn btn-primary btn-lg"  @click.stop.prevent="buscar(id)"><i class="fa fa-search"></i> Buscar</button>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="col-md-3">
                            <button @click="productionOrderObj.productionOrderNumber = ''; recipeAdded = ''; idAllowed  = '';recipeName='';showModal('modalCadOP'); getRecipes(); getOpType()" type="button" class="btn btn-success btn-lg">
                                <i class="fa fa-plus"></i> Cadastrar Ordem de Produção
                            </button>
                        </div>
                    </form>
                </li>
            </ul>
        </div>
        <br>

        <!--             -->
        <!--  LISTAR OPs -->
        <!--             -->
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div>
        <p class="col-md-10" v-show="opArrarKeep.length == 0" v-if="!carregando">
            Sem Ordens de Produção Cadastradas
        </p>
        
        <table v-if="!carregando && opArrarKeep.length > 0" class="table w-100 d-block d-md-table table-responsive table-sm table-striped w-100 d-block d-md-table" id="tabela-op-liga">
            <thead id="teste">
                <tr style="background-color: black; color: white;">
                    <th>OPL</th>
                    <th>Código da Liga</th>
                    <th>Nome da Liga</th>
                    <th>Equipamento</th>
                    <th>Status</th>
                    <th></th>                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(op, index) in opArrarKeep" v-bind:key="index">
                    <td>{{op.productionOrderNumber}}</td>
                    <td>{{op.recipeCode}}</td>
                    <td>{{op.recipeName}}</td>                    
                    <td >{{op.currentThing?op.thingName : "-"}}</td>
                    <td>{{op.currentStatus | filterStatus}}</td>                      
                    <td>
                        <i :id="op.recipe.recipeId" class="fa fa-eye" style="font-size: 22px; cursor: pointer;" @click="showModal('visualizarParams');getGatewayRecipe(op)"></i>    
                    </td>                
                </tr>                                  
            </tbody>
        </table>    
        <!-- <div class="paginacao-op-liga fixed-bottom" v-show="total>0">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=20, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*20, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+20<total">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=20, quantityPage)">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div> -->
        <div class="paginacao" v-show="total > 0">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=quantityPage, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*quantityPage, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+quantityPage<total">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=quantityPage, quantityPage)">Próxima</a>
                    </li>
                </ul>
            </nav>
        </div>  


        <!-- MODAL VISUALIZAR PARAMS -->
        <!--                         -->
        <b-modal no-close-on-backdrop size="md" ref="visualizarParams" hide-footer title="Visualizar OPL">
            <div v-if="opSelectedParams != ''">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="">OPL</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.productionOrderNumber" disabled>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="">Status</label>
                        <input type="text" class="form-control" v-model="status[opSelectedParams.currentStatus]" disabled>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="">Código da Liga</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeCode" disabled>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="">Nome da Liga</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeName" disabled>
                    </div>                
                </div>
                <div class="form-row">
                    <div class="form-group col-md-7" v-if="opSelectedParams.currentThing">
                        <label for="">Equipamento</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.currentThing.thingName" disabled>
                    </div>
                </div>
            </div>
            <form>
                <!-- <div class="fundo-branco-po"> -->
                <div class="cabecalho-table-po-modal-liga row">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametros, 'productName',0):organizar(parametros, 'productName',0);" class="col-md-4">
                        <b><font class="cursor-class" color="#ffffff"><p>Componente
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </p></font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametros, 'minValue',2):organizar(parametros, 'minValue',2);" class="col-md-4">
                        <b><font class="cursor-class" color="#ffffff">
                            <p>Mínimo (%)
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </p></font></b>
                    </label> 
                    <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametros, 'maxValue',3):organizar(parametros, 'maxValue',3);" class="col-md-4">
                        <b><font class="cursor-class" color="#ffffff">
                            Máximo (%) 
                            <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                </div>
                <div class="row" v-for="(p, index) in parametros"  :class="{cinza: index%2==0}" :key="index"> 
                    <!-- <div v-for="(prod, index2) in op.phases[0].phaseProducts" :key="index2">                      -->
                    <label class="col-md-4" style="text-align: center">
                    <b><font color="#9BA6A5"> </font></b>
                        {{p.product.productName}}
                    </label>                    
                    <label class="col-md-4" style="text-align: center">
                    <b><font color="#9BA6A5"> </font></b>
                        {{p.minValue}}
                    </label>
                    <label class="col-md-4" style="text-align: center">
                    <b><font color="#9BA6A5"> </font></b>
                        {{p.maxValue}}
                    </label>   
                    <!-- </div> -->
                </div>
            <!-- </div>   -->
            </form>
        </b-modal>

        <!-- MODAL PARA EXIBIR ERRO  -->
        <b-modal no-close-on-backdrop ref="modalInfo" title="Mensagem" hide-footer>
            <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div>


</template>
<script src="./js/orderLiga.js">
</script>
<style>
@import url("./css/orderLiga.css");
</style>