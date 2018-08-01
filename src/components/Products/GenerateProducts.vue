
<template >
    <div>               

            
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->        
        <div class="fixed-top nav-cinza"> 
            <ul class="nav d-flex">
                <li class="nav-item-products col-md-12">
                    <h1 class="title-page-gp"><b>Cadastro de Matéria-Prima</b></h1>
                </li>                   
                <li class="nav-item-products">
                    <select class="form-control form-control-md" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="productName">Nome</option>
                        <option value="productDescription">Descrição</option>
                        <option value="productCode">Código</option>
                        <option value="productGTIN">Código de Barras</option>
                    </select>
                </li>
                <li class="nav-item-products">
                    <input class="form-control btn-md" type="search" v-model="fieldValue" :disabled="fieldFilter=='' || fieldFilter==undefined" :placeholder="mudaPlace(fieldFilter)" aria-label="Busca">
                </li>
                <li class="nav-item-products">
                    <button type="button" class="btn btn-primary btn-md"  @click.stop.prevent="buscar(id)"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </li>
                <li class="nav-item-products">
                    <button type="button" class="btn btn-success btn-md" @click.stop.prevent="cadEdit='Cadastrar Matéria-Prima';produto={};showModal(produto,-1)"><i class="fa fa-plus" aria-hidden="true" ></i> Nova Matéria-Prima</button>
                </li>
            </ul>
        </div>                     
        <div id="load-products" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>       
                                     
        <div class="cabecalho-table" v-show="!carregando && produtos.length>0">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(produtos, 'productName',0):organizar(produtos, 'productName',0);" class="ls2  ls2-margin col-md-2">
                <b><font class="cursor-class" color="#ffffff">Nome &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(produtos, 'productDescription',1):organizar(produtos, 'productDescription',1);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Descrição &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(produtos, 'productCode',2):organizar(produtos, 'productCode',2);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Código &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b></label>
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(produtos, 'productGTIN',3):organizar(produtos, 'productGTIN',3);" class="ls2 col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Código de Barras &nbsp;&nbsp;&nbsp;
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
        <div class="margin-table-products" v-show="!carregando && produtos.length>0">
            <div v-for="(p, index) in produtos" v-bind:class="{cinza: index%2==0}" v-bind:key="index">                                    
                <label class="ls2 col-md-2">
                    {{p.productName}}</label>
                <label class="ls2 col-md-2">
                    {{p.productDescription}}</label>
                <label class="ls2 col-md-2">
                    {{p.productCode}}</label>
                <label class="ls2 col-md-2">
                    {{p.productGTIN}}</label>
                <label class="ls2 col-md-1">                        
                </label>    
                <label class="ls2 col-md-2">                        
                    <i class= "fa fa-trash-o" style="font-size:21px; cursor:pointer; color:red;" @click.stop.prevent="showModalRemoveProduto(p,index)"></i>&nbsp;&nbsp;&nbsp;                     
                    <i class="fa fa-edit" style="font-size:21px; cursor:pointer" @click.stop.prevent="cadEdit='Editar produto';showModal(p, index)"></i>
                </label>
            </div>       
        </div>       



        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--       Paginação       -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="margin-table-products" v-show="!carregando && produtos.length==0">
            <h2>Não foram encontradas Matérias-Primas</h2>
        </div>    



        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--       Paginação       -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="paginacao" v-show="pages.length>1">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=quantityPage, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*quantityPage, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+quantityPage<total">
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
        <!--                       -->
        <b-modal no-close-on-backdrop ref="modalRemoveProduct" hide-footer title="Remover Produto">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover o Produto !?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="excluir(produto);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>   
                        <button @click.stop.prevent="hideModalRemoveProduct()" class="btn btn-danger">
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
        <!--                        -->
        <b-modal no-close-on-backdrop ref="modalEditarProduto" hide-footer title="Editar Produto"> 
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja editar o Produto!?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="put(produto);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModalConfirmPut()" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                            
                        </button>                        
                    </div>
                </div>
            </div>
        </b-modal> 
        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--      Cadastrar        -->
        <!--       Produto         -->
        <!--                       -->
        <!--                       -->
        <b-modal no-close-on-backdrop ref="modalCadastrarProduto" hide-footer title="Cadastrar Produto"> 
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja cadastrar o Produto!?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="cadastrar(produto);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModalConfirmCreate()" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                          
                        </button>                        
                    </div>
                </div>
            </div>
        </b-modal> 


        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--         Erro          -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <b-modal no-close-on-backdrop ref="modalErro" size="md" title="Erro" hide-footer="">
            <p class="alert alert-danger">Ocorreu um erro: {{erro}}</p>
        </b-modal>


        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Menu de navegação de produtos   -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->        
        <b-modal no-close-on-backdrop ref="myModalRef" hide-footer :title="cadEdit">                    
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
                                <b>Nome </b>
                            </label>
                            <input type="text" placeholder="Ex: Estanho" v-model="produto.productName" id="nome" class="form-control form-control-sm">
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Descrição </b>
                            </label>
                            <input type="text" id="desc" class="form-control form-control-sm" v-model="produto.productDescription" placeholder="Ex: Estanho Metálico">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>
                                <b>Código </b>
                            </label>
                            <input class="form-control form-control-sm" type="text" v-model="produto.productCode" placeholder="Ex: 1010144" id="cod">
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Código de barras </b>
                            </label>
                            <input type="text" id="gs1" v-model="produto.productGTIN" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                    </div>
                    <div class="modal-footer">                            
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="produto.productId!=undefined ?  showModalConfirmPut() : showModalConfirmCreate();" class="btn btn-success pull-right" :disabled="validaProduto(produto)">
                                <i  class="fa fa-check-square" aria-hidden="true"></i>
                                Confirmar
                            </button>  
                            <button @click.stop.prevent="produto.productName='';produto.productCode='';produto.productDescription='';produto.productGTIN='';" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>                      
                        </div>                        
                    </div>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script src="./js/product.js">
</script>
<style>
@import url('./css/product.css');
</style>
