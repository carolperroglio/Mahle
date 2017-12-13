
<template >      
    <div>       
        <!--                       --> 
        <!--                       -->
        <!--                       --> 
        <!-- Menu de navegação de produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->                     
        
        <div class="fixed-top nav-produtos">                                                         
            <ul class="nav justify-content-end">                                  
                <li class="nav-item">                    
                    <select class="form-control" v-model="orderField">                        
                        <option value="" selected disabled>Escolha o campo</option>
                        <option value="productName">nome</option>
                        <option value="productDescription">descrição</option>
                        <option value="productCode">código</option>
                        <option value="productGTIN">GTIN</option>                    
                    </select>
                </li>
                <li class="nav-item">
                    <select class="form-control" v-model="order">                        
                        <option value="" selected disabled>Crescente ou decrescente</option>
                        <option value="ascending">Crescente</option>                                          
                        <option value="descending">Decrescente</option>                                          
                    </select>
                </li>                
                <li class="nav-item">
                    <select class="form-control" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Selecione o campo para buscar</option>
                        <option value="productName">nome</option>
                        <option value="productDescription">descrição</option>
                        <option value="productCode">código</option>
                        <option value="productGTIN">GTIN</option>                    
                    </select>
                </li>                                                              
                <li class="nav-item">
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" v-model="fieldValue" placeholder="Produto" aria-label="Busca">
                        <button class="btn btn-outline-primary my-2 my-sm-0" @click="buscar(id)">Buscar produtos</button>
                    </form>
                </li>
            </ul>        
        </div>    
         
        <!--                       --> 
        <!--                       -->
        <!--                       --> 
        <!-- Listagem dos produtos -->
        <!--                       -->
        <!--                       -->
        <!--                       -->   
           
        <div class="row conteudo">            
            <div class="produtos col-8">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div v-for="(p, index) in produtos" v-bind:key="index">
                    <div class="card">
                        <div class="card-header"><b></b></div>
                        <div class="card-body">
                            <b>Id : </b>{{p.productId}}&nbsp;&nbsp;&nbsp;  
                            <b>Nome : </b>{{p.productName}}&nbsp;&nbsp;&nbsp;                     
                            <b>Descrição : </b>{{p.productDescription}}&nbsp;&nbsp;&nbsp;
                            <b>Código : </b>{{p.productCode}}&nbsp;&nbsp;&nbsp;
                            <b>GTIN : </b>{{p.productGTIN}}&nbsp;&nbsp;&nbsp;                    
                            <i class="fa fa-check-square-o icon-right" @click="editar(p)" aria-hidden="true"></i>
                        </div>    
                    </div>                     
                </div>
                <div class="paginacao fixed-bottom" v-show="total>0">
                    <nav aria-label="">
                        <ul class="pagination justify-content-center">
                            <li v-show="startat>0" class="page-item" >
                                <a class="page-link" href="#" @click="buscar(startat-=20, quantityPage)">Previous</a>
                            </li>
                            <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                                <a class="page-link"  href="#" @click="buscar(startat=num*20, quantityPage)">{{num+1}}</a>
                            </li>                                                                                
                            <li class="page-item" v-show="pages.length>1 && startat+20<total">
                                <a class="page-link" href="#" @click="buscar(startat+=20, quantityPage)">Next</a> 
                            </li>
                        </ul>
                    </nav>  
                </div>                                                                            
            </div>    
                
            <!--                            -->
            <!--                            -->
            <!--                            --> 
            <!-- Div do formulario cadastro -->
            <!--                            -->
            <!--                            -->
            <!--                            -->         

            <div class="cadForm col-0">            
                <form>
                    <div class="form-row">                                                                                                                                                                                                                                                          
                        <div class="">                              
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>                                                                                                                                                                       
                            <label for="nome"><b>Nome : </b></label>
                            <input type="text" placeholder="nome" required v-model="produto.productName" id="nome" class="form-control danger is-invalid">                                                    
                            <label for="desc" ><b>Descrição : </b></label>
                            <input type="text" id="desc" class="form-control" v-model="produto.productDescription" placeholder="descrição">                            
                            <label for="cod" ><b>Código : </b></label>
                            <input class="form-control" type="text" v-model="produto.productCode" placeholder="código" id="cod">                            
                            <label for="gs1" class=""><b>GS1 : </b></label>
                            <input type="text" id="gs1" v-model="produto.productGTIN" class="form-control" placeholder="gs1">
                            <br>
                            <div>
                                <button class="btn btn-success"><i :disabled="produto.productName==undefined || produto.productName==''" @click="(produto.productId!=undefined) ? put(produto) : cadastrar(produto);" class="fa fa-check-square" aria-hidden="true"></i></button> 
                                <button class="btn btn-danger"><i @click="excluir(produto)" :disabled="produto.productId == undefined" class="fa fa-window-close" aria-hidden="true"></i></button>
                                <div class="btn btn-primary pull-right" @click="produto={}">
                                    Limpar
                                </div>
                            </div>                            
                        </div> 
                    </div>                                                                                              
                </form>                       
            </div>                        
            <br>
            <!-- <br><br> --> 
        </div>            
    </div>
</template>
<script src="./js/product.js">
</script>
<style>
    @import url('./css/product.css');    
</style>
