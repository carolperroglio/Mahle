
<template>
    <div>
        <!--     Modal      -->
        <!-- Formulário de  -->
        <!-- Criação de OP  -->
        <!--                -->
        <b-modal no-close-on-backdrop ref="modalCadOP" hide-footer title="Cadastrar Ordem de Produção de Tira" modal-header-close>
                                       
            <div class="modal-body">
                <form>                  
                    <div class="form-group row">
                        <div class="form-group col-sm-6">
                            <label for="op">OP</label>
                            <input class="form-control" :class="{'is-invalid' : !productionOrderNumber}" id="op" placeholder="" v-model="productionOrderNumber">                            
                            <div class="invalid-feedback" v-show="!productionOrderNumber">
                                Digite a OP
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                        <label for="desc">Tipo</label>
                            <input disabled class="form-control" id="desc" v-model="descriptionTira" value="opDesc">
                        </div>
                    </div>                    
                    <div class="form-group row">
                        <div class="form-group col-md-12">
                            <label for="opType" class="col-12">Código da Tira</label>
                            <input autocomplete="off" :disabled="!productionOrderNumber" @keyup="recipeArray=getResults(urlRecipeSearch, recipeName)" v-model="recipeName"  class="btn btn-outline-secondary col-md-9" id="dropdownMenuButton" />
                            <button class="btn btn-outline-success btn-sm col-md-1" :disabled="!productionOrderNumber || !recipeName || !canAdd" @click.stop.prevent="addRecipe(recipeSelected.recipeName, recipeSelected.recipeId)">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            </button>
                            <b-dropdown-item @click.stop.prevent="recipeSelected=recipe;recipeName = recipeSelected.recipeCode; recipeArray=[]; msg=true" v-for="(recipe,index) in recipeArray" :key="index">{{ recipe.recipeCode }}</b-dropdown-item>
                        </div>                        
                    </div>

                    <!--  Acordion que mostra qual   -->
                    <!--  receita foi selecionada    -->
                    
                    <div id="accordion" role="tablist" v-if="recipeAdded">
                        <div class="card">
                            <div class="card-header card-header-op" style="text-align: center;" role="tab" id="headingOne">
                                <h5 class="mb-0">
                                    <span class="collapse-color" style="text-align:center; font-weight: bolder; text-decoration: none;" data-toggle="collapse" href="#recipeAdded" aria-expanded="true" aria-controls="recipeAdded">
                                        {{recipeObj.recipeCode}}
                                    </span>
                                </h5>
                            </div>

                            <!--  Mostra as fases da Receita-->
                            <div id="recipeAdded" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body card-body-op" v-if="recipeObj.phases.length != 0 || carregando == true">
                                    <!-- <h5>Fases</h5> -->
                                    <!-- <ul class="list-group" v-for="(phases, index) in recipeObj.phases" v-bind:value="phases"> -->
                                    <ul class="list-group" v-if="recipeAdded.length != 0">
                                        <!-- <li class="list-group-item" > -->
                                        <span><strong>Descrição da Tira:</strong> {{recipeObj.recipeDescription}}</span>                                                                                 
                                    </ul>
                                </div>
                                <!-- Fim - </Mostra as fases da Receita>-->
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
                    <button class="btn btn-success" :disabled="!recipeAdded || !productionOrderNumber" @click="productionOrderObj.productionOrderNumber=productionOrderNumber;createOp(productionOrderObj); hideModal('modalCadOP');">
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
            <ul class="nav d-flex align-items-center nav-item-gp">
            <li class="nav-prod col-md-12">
                <h1 class="title-page-gp"> <b>Ordens de Produção - Tiras</b> </h1>
            </li>
            <li class="nav-prod col-md-2">
                <select class="form-control form-control-lg" aria-placeholder="Escolha o campo \/" v-model="fieldFilter" @change="fieldValue = ''">
                    <option value="" selected disabled>Buscar por:</option>
                    <option value="productionOrderNumber">OP</option>
                    <option value="productionOrderRecipeCode">Código da Tira</option>
                    <!-- <option value="typeDescription">Descrição</option> -->
                    <!-- <option value="recipeCode">Código</option> -->
                    <!-- <option value="currentstatus">Status</option> -->
                </select>
            </li>
                <li class="nav-prod col-md-2">
                    <input class="form-control relative btn-lg col-md-auto" type="search" :disabled="!fieldFilter" v-model="fieldValue" aria-label="Busca">
                </li>
                <li class="nav-prod col-md-6">
                    <form class="form-inline my-3 form-control-sm">
                        <div class="col-md-auto">
                            <button type="button" button class="btn btn-primary btn-lg" @click.stop.prevent="buscar(id)"><i class="fa fa-search"></i> Buscar</button>
                        </div>
                        <!-- Button trigger modal -->
                        <div class="col-md-3">
                            <button @click="productionOrderObj.productionOrderNumber = '';productionOrderNumber=''; recipeAdded = ''; idAllowed  = '';recipeName='';showModal('modalCadOP'); getRecipes(); getOpType()" type="button" class="btn btn-success btn-lg">
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
        <div>
            <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
            </div>
             <p class="col-md-10" v-show="opArrarKeep.length == 0" v-if="!carregando">
                Sem Ordens de Produção Cadastradas
            </p>


            <table v-if="!carregando && opArrarKeep.length>0" class="table w-100 d-block d-md-table table-responsive table-sm table-striped " id="tabela-op-tira">
                <thead id="teste">
                    <tr style="background-color: black; color: white;">
                        <th>OP</th>
                        <th>Código da Tira</th>
                        <th>Descrição</th>
                        <th>Status</th> 
                        <th></th>
                        <th></th>                               
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(op, index) in opArrarKeep" v-bind:key="index">
                        <td>{{op.productionOrderNumber}}</td>
                        <td>{{op.recipeCode}}</td>
                        <td>{{op.recipe.recipeDescription}}</td>
                        <td>{{op.currentStatus | filterStatus}}</td>
                        <td>{{op.hasProd == true?op.recipe.recipeProduct.product.productName:''}}</td>  
                        <td>
                            <i :id="op.recipe.recipeId" class="fa fa-eye" style="font-size: 22px; cursor: pointer;" @click="parametrosteste=[];recipes={};getGatewayRecipe(op)"></i>
                        </td>                                      
                    </tr>                                  
                </tbody>
            </table>    
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
            <!-- <div class="paginacao" v-show="total>0">
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
        </div>

            <!-- MODAL VISUALIZAR PARAMS -->
        <b-modal no-close-on-backdrop size="lg" ref="visualizarParams" hide-footer title="Visualizar Ordem de Produção de Tira" class="">
            <div v-if="opSelectedParams != ''">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="">OP</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.productionOrderNumber" disabled>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="">Status</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.status" disabled>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="">Código da Tira</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeCode" disabled>
                    </div>                    
                    <div class="form-group col-md-6">
                        <label for="">Descrição da Tira</label>
                        <input type="text" class="form-control" v-model="opSelectedParams.recipe.recipeDescription" disabled>
                    </div>
                </div>                
            </div>
            <form>
                <table v-if="!carregando && parametrosteste.length>0" class="table w-100 d-block d-md-table table-responsive table-sm table-striped" id="tabela-op-tira-parametros">
                    <thead id="teste">
                        <tr style="background-color: black; color: white;">
                            <th>Parâmetro</th>
                            <th>Valor</th>
                            <th>Unidade</th>
                            <th>LIE</th> 
                            <th>LIC</th>
                            <th>LSC</th> 
                            <th>LSE</th>                               
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pro, index) in parametrosteste" v-bind:key="index">
                            <td>{{pro.parametro}}</td>
                            <td>{{pro.vn}}</td>
                            <td>{{pro.unidade}}</td>
                            <td>{{pro.lie}}</td>
                            <td>{{pro.lic}}</td>  
                            <td>{{pro.lsc}}</td>                                      
                            <td>{{pro.lse}}</td>
                        </tr>                                  
                    </tbody>
                </table> 
               
            </form>
        </b-modal>

        <!-- MODAL PARA EXIBIR ERRO  -->
        <b-modal no-close-on-backdrop ref="modalInfo" title="Mensagem" hide-footer>
            <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div>


</template>
<script src="./js/orderTira.js">
</script>
<style>
@import url("./css/orderTira.css");
</style>
