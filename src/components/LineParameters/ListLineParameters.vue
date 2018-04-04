<template>
    <div>               

            
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->        
        <div class="fixed-top nav-cinza"> 
            <ul class="nav d-flex">
                <li class="nav-item nav-item-prameters">
                    <h1 class="title-page-gp"><b>Parâmetros de Linha</b></h1>
                </li>                   
                <li class="nav-item nav-item-prameters">
                    <select class="form-control form-control-lg" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="productName">Nome</option>
                        <option value="productDescription">Descrição</option>
                        <option value="productCode">Código</option>
                        <option value="productGTIN">Código de Barras</option>
                    </select>
                </li>
                <li class="nav-item nav-item-prameters">
                    <input class="form-control btn-lg" type="search" placeholder="Parâmetros" aria-label="Busca">
                </li>
                <li class="nav-item  nav-item-prameters">
                    <button type="button" class="btn btn-primary btn-lg" @click.stop.prevent="buscar(id)"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </li>
                <li class="nav-item nav-item-prameters">
                    <button type="button" class="btn btn-success btn-lg" @click.stop.prevent="showModalCreateParameter()"><i class="fa fa-plus" aria-hidden="true" ></i> Cadastrar Parâmetro</button>
                </li>
            </ul>
        </div>                     
        <div id="load-parameters" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>                                    
        <div class="cabecalho-table-prameters">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(recipes, 'productName',0):organizar(recipes, 'productName',0);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">Parâmetro &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(recipes, 'productDescription',1):organizar(recipes, 'productDescription',1);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Equipamento &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(recipes, 'productCode',2):organizar(recipes, 'productCode',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Valor Nominal &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b></label>
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(recipes, 'productGTIN',3):organizar(recipes, 'productGTIN',3);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Unidade &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                </font></b>
            </label>
        </div>                           

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Listagem dos produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->                        
        <div class="margin-table" v-show="!carregando">
            <div v-for="(p, index) in recipes" v-bind:class="{cinza: index%2==0}" v-bind:key="index">                                    
                <label class="ls2 col-md-2">
                    </label>
                <label class="ls2 col-md-2">
                    </label>
                <label class="ls2 col-md-2">
                    </label>
                <label class="ls2 col-md-2">
                    </label>
                <label class="ls2 col-md-1">                        
                </label>    
                <label class="ls2 col-md-2">                        
                    <i class= "fa fa-trash-o" style="font-size:21px; cursor:pointer; color:red;" @click.stop.prevent=""></i>&nbsp;&nbsp;&nbsp;                     
                    <i class="fa fa-edit" style="font-size:21px; cursor:pointer" @click.stop.prevent=""></i>
                </label>
            </div>       
        </div>       
            
        <div class="paginacao" v-show="total>0">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=quantityPage, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*quantityPage, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+20<total">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=quantityPage, quantityPage)">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>


        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Remove         -->
        <!--        Produto        -->
        <!--                       -->
        <!--                       
        <b-modal ref="modalRemoveProduct" hide-footer title="Remover Produto">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover o Produto !?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="excluir(produto);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i>
                        </button>                        
                    </div>
                </div>
            </div>
        </b-modal> -->

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Editar         -->
        <!--        Produto        -->
        <!--                       -->
        <!--                       
        <b-modal ref="modalEditarProduto" hide-footer title="Editar Produto"> 
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja editar o Produto!?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="put(produto);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i>
                        </button>
                        <button @click.stop.prevent="hideModalConfirmPut()" class="btn btn-danger">Cancelar                            
                        </button>                        
                    </div>
                </div>
            </div>
        </b-modal> -->
        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--      Cadastrar        -->
        <!--       Produto         -->
        <!--                       -->
        <!--                       
        <b-modal ref="modalCadastrarProduto" hide-footer title="Cadastrar Produto"> 
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja cadastrar o Produto!?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="cadastrar(produto);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i>
                        </button>
                        <button @click.stop.prevent="hideModalConfirmCreate()" class="btn btn-danger">Cancelar                            
                        </button>                        
                    </div>
                </div>
            </div>
        </b-modal> -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Menu de navegação de produtos   -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->     
        <b-modal ref="modalCreateParameter" hide-footer title="Cadastrar Parâmetro">                    
            <form>
                <div>
                    <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                    <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                    <p v-if="errors.length">
                        <ul v-for="(error, index) in errors" v-bind:key="index">
                            <li class="alert alert-danger form-control" >{{ error }}</li>
                        </ul>
                    </p>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>
                                <b>Equipamento </b>
                            </label>
                            <select class="fm form-control mr-sm-2" v-model="ferramenta">
                                <option v-for="(fer,index) in ferramentas" :value="fer" :key="index">{{fer.groupName}}</option>                                
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Parâmetro </b>
                            </label>
                            <select class="fm form-control mr-sm-2" v-model="recipe">
                                <option v-for="(groups,index) in ferramenta.possibleTagGroups" :key="index">{{groups}}</option>                                
                            </select>
                        </div>                        
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>Valor Nominal</b>
                            </label>
                            <input class="fm form-control mr-sm-2" type="text" v-model="parameter" placeholder="Ex: 1010144">
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>Unidade </b>
                            </label>
                            <br><br>
                            <input type="text" v-model="parameter" class="fm form-control mr-sm-2" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIE </b>
                            </label>
                            <input type="text" v-model="parameter" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>  
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIC </b>
                            </label>
                            <input type="text" v-model="parameter" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSC </b>
                            </label>
                            <input type="text" v-model="parameter" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div> 
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSE </b>
                            </label>
                            <input type="text" v-model="parameter" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>       
                    </div>    
                    <div class="modal-footer">                            
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="recipe" class="btn btn-success pull-right" :disabled="recipe">
                                <i  class="fa fa-check-square" aria-hidden="true"></i>
                            </button>  
                            <button @click.stop.prevent="recipe" class="btn btn-primary pull-right">
                                Limpar                           
                            </button>                      
                        </div>                        
                    </div>
                </div>
            </form>
        </b-modal> 
    </div>
</template>



<script src="./js/listlineParameters.js">
</script>
<style>
@import url("./css/listlineparameters.css");
</style> 