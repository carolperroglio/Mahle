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
                <li class="nav-item nav-item-prameters col-md-12">
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
                    <button type="button" class="btn btn-success btn-lg" @click.stop.prevent="showModal('modalCreateParameter')"><i class="fa fa-plus" aria-hidden="true" ></i> Cadastrar Parâmetro</button>
                </li>
            </ul>
        </div>                     
        <div id="load-parameters" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>                                                                          
        

        <div class="cabecalho-table-parameters"  v-show="!carregando">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametros, 'parametro',0):organizar(parametros, 'parametro',0);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">Parâmetro
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>                    
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(parametros, 'vn',1):organizar(parametros, 'vn',1);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    Valor Nominal
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametros, 'unidade',2):organizar(parametros, 'unidade',2);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    Unidade
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label>  
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametros, 'lie',3):organizar(parametros, 'lie',3);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    Lim. Inferior Específico
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(parametros, 'lic',4):organizar(parametros, 'lic',4);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    Lim. Inferior Controle
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(parametros, 'lsc',5):organizar(parametros, 'lsc',5);" class="ls2 item-cabecalho-table-parameters">
                <b>
                    <font class="cursor-class" color="#ffffff">
                        Lim. Superior Controle
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                    </font>
                </b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(parametros, 'lse',6):organizar(parametros, 'lse',6);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    Lim. Superior Específico
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i>
                </font></b>
            </label>                              
        </div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--   Listagem de fase    -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="margin-table-parameters" v-show="!carregando">            
            <div v-for="(pro, index) in parametros" v-bind:class="{cinza: index%2==0}" :key="index">                     
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.parametro}}
                </label>                    
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                        {{pro.vn}}
                </label>
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                    {{pro.unidade}}
                </label>
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                    {{pro.lie}}
                </label>   
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                    {{pro.lic}}
                </label>            
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                    {{pro.lsc}}
                </label>
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                    {{pro.lse}}
                </label> 
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"> </font></b>
                    <i class= "fa fa-trash-o" style="font-size:21px; cursor:pointer; color:red;" @click.stop.prevent="deletar=pro;showModal('modalRemoveParameter');"></i>&nbsp;&nbsp;&nbsp;                     
                    <i class="fa fa-edit" style="font-size:21px; cursor:pointer" @click.stop.prevent="cadEdit='Editar produto';showModal(p, index)"></i>
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
        <!--       Parametro       -->
        <!--                       -->
        <!--                       -->                 
        <b-modal ref="modalRemoveParameter" hide-footer title="Remover Parâmetro">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover o Parametro !?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="deleteParameter(deletar);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModal('modalRemoveParameter')" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar   
                        </button>                      
                    </div>
                </div>
            </div>
        </b-modal>

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
                            <select class="fm form-control mr-sm-2" v-model="thing">
                                <option v-for="(fer,index) in things" :value="fer" :key="index">{{fer.groupName}}</option>                                
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Parâmetro </b>
                            </label>
                            <select class="fm form-control mr-sm-2" v-model="tagGroup">
                                <option v-for="(groups,index) in thing.possibleTagGroups" :key="index">{{groups}}</option>                                
                            </select>
                        </div>                        
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>Valor Nominal</b>
                            </label>
                            <input class="fm form-control mr-sm-2" type="text" v-model="valores.vn" placeholder="Ex: 1010144">
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>Unidade </b>
                            </label>
                            <br><br>
                            <input type="text" v-model="valores.unidade"  class="fm form-control mr-sm-2" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIE </b>
                            </label>
                            <input type="text" v-model="valores.lie" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>  
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIC </b>
                            </label>
                            <input type="text" v-model="valores.lic" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSC </b>
                            </label>
                            <input type="text" v-model="valores.lsc" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div> 
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSE </b>
                            </label>
                            <input type="text" v-model="valores.lse" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>       
                    </div>   
                    <div class="modal-footer">                            
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="createParameter(valores, thing, tagGroup)" class="btn btn-success pull-right" :disabled="false">
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