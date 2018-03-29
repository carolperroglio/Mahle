
<template >
    <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Barra de botões de cadastro     -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
         <div class="fixed-top nav-ferramentas">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item-tool">
                    <h1 class="title-page-tool"> <b>Cadastrar Ferramentas/Insumos</b> </h1>
                            <select class="form-control form-control-sm" v-model="orderField">
                            <option value="" selected disabled="disabled">Ordenar por:</option>
                            <option value="name">Nome</option>
                            <option value="description">Descrição</option>
                            <option value="serialNumber">Número serial</option>
                            <option value="code">Código</option>
                            <option value="lifeCycle">Vida Útil</option>
                            <option value="currentLife">Ciclo de vida atual</option>
                            <option value="unitOfMeasurement">Unidade de Medida</option>
                            <option value="typeName">Tipo</option>
                            <option value="status">Status</option>
                    </select>
                </li>
                <li class="nav-item-tool">
                        <select class="form-control form-control-sm" v-model="order">                        
                           <option value="" selected disabled="disabled">Cresc./Decresc.</option>
                            <option value="ascending">Crescente</option>
                            <option value="descending">Decrescente</option>
                    </select>
                </li>
                <li class="nav-item-tool">
                            <select class="form-control form-control-sm" v-model="fieldFilter">
                            <option value="" selected disabled="disabled">Buscar por campo:</option>
                            <option value="name">Nome</option>
                            <option value="description">Descrição</option>
                            <option value="serialNumber">Número serial</option>
                            <option value="code">Código</option>
                            <option value="lifeCycle">Vida Útil</option>
                            <option value="currentLife">Ciclo de vida atual</option>
                            <option value="unitOfMeasurement">Unidade de Medida</option>
                            <option value="typeName">Tipo</option>
                            <option value="status">Status</option>
                    </select>
                </li>    
                <li class="nav-item-tool">
                    <input type="text" id="valor" v-model="fieldValue" class="form-control form-control-sm" placeholder="Valor">                              
                </li> 
                <li class="nav-item-tool">        
                        <button type="button" class="btn btn-primary btn-sm" @click.stop.prevent="listar()">
                                Buscar
                        </button>
                <li class="nav-item-tool">
                        <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="showModalCad">
                             Cadastrar Ferramentas/Insumos
                        </button>
                </li>


            </ul>
        </div>

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--     Cadastro de Ferramentas     -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
        
                <b-modal ref="modalCadTool" hide-footer title="Cadastrar Ferramentas/Insumos">
                        <form>
                            <div class="">

                                <p v-if="errors.length > 0">
                                        <ul v-for="(error, index) in errors" :key="index">
                                        <li class="alert alert-danger form-control" >{{ error }}</li>
                                        </ul>
                                </p>
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                
                                <div class="form-row">
                                <div class="form-group col-md-6">
                                <label>
                                    <b>Nome </b>
                                </label>
                                <input type="text" placeholder="Ex: Facas de Guilhotina " v-model="ferramenta.name" id="nome" class="form-control form-control-sm">
                                </div>
                                <div class="form-group col-md-6">
                                <label>
                                    <b>Descrição </b>
                                </label>
                                <input type="text" id="desc" class="form-control form-control-sm" v-model="ferramenta.description" placeholder="Ex: Ferramenta usada na Guilhotina">
                                </div>
                                </div>
                                <div class="form-row">
                                <div class="form-group col-md-6">
                                <label>
                                    <b>Número Serial </b>
                                </label>
                                <input type="text" id="sernum" class="form-control form-control-sm" v-model="ferramenta.serialNumber" placeholder="Ex:124856648">
                                </div>
                                <div class="form-group col-md-6">
                                    <label>
                                        <b>Código: </b>
                                    </label>
                                    <input type="text" id="code" class="form-control form-control-sm" v-model="ferramenta.code" placeholder="código">
                                </div>
                                    <!-- <b>Código: </b> -->
                                <div class="form-row">
                                <div class="form-group col-md-4">
                                <label>
                                    <b>Vida Útil </b>
                                </label>
                                <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="Ex: 100" id="lifec">
                                </div>
                                <div class="form-group col-md-5">
                                <label>
                                    <b>Unidade de Medida </b>
                                </label>
                                <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="Ex.: dias">                              
                                </div>
                                </div>
                                </div>
                                <div class="form-row">
                                <div class="form-group col-md-6">
                                <label>
                                    <b>Tipo </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="ferramenta.typeName">
                                    <option v-for="(tipo, indexOp) in tipos" :value="tipo.name" v-bind:key="indexOp">{{ tipo.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                <label>
                                    <b>Status </b>
                                </label>
                                <select class="form-control form-control-sm" v-model="ferramenta.status">
                                    <option value="available">Disponível</option>
                                    <option value="in_use">Em uso</option>
                                    <option value="in_maintenance">Em manutenção</option>
                                    <option value="not_available">Indisponível</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                                </div>
                                </div>
                                </div>
                                <div class="btn btn-primary pull-left" style="margin-top:3%" @click.stop.prevent="ferramenta={};errors=[];">
                                        Limpar
                                </div>
                                <div class="modal-footer">
                                    
                                <div class="btn-group pull-right" role="group">
                                    <button class="btn btn-success pull-right">
                                        <i @click.stop.prevent="cadastrar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                </b-modal>         
            <!--                            -->
            <!--                            -->
            <!--                            -->
            <!--   Listagem de ferramentas  -->
            <!--                            -->
            <!--                            -->
            <!--                            -->

        <div class="" style="">
            <div class="ferramentas col">
                <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
                </div>    
                <div v-for="(f, indexF) in ferramentas" :key="indexF">
                    <div class= "card-header">
                    </div>
                    <div class="card-body">
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Nome: </font></b>{{f.name}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{f.description}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Número Serial: </font></b>{{f.serialNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Code: </font></b>{{f.code}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Vida Útil: </font></b>{{f.lifeCycle}}</label>&nbsp;&nbsp;&nbsp;
                            <!-- <label class="ls ls30">
                                <b><font color="#9BA6A5">Vida Útil Atual: </font></b>{{f.currentLife}}</label>&nbsp;&nbsp;&nbsp; -->
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Unidade de Medida: </font></b>{{f.unitOfMeasurement}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{f.typeName}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Status: </font></b>{{f.status}}</label>&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-edit icon-right icon-style" style="font-size:22px; cursor:pointer" @click.stop.prevent="itemClicado(f)"></i>
                    </div>
                </div>
            
                <div class="paginacao2 fixed-bottom" v-show="total>0">
                    <nav aria-label="">
                        <ul class="pagination justify-content-center">
                            <li v-show="startat>0" class="page-item">
                                <a class="page-link" href="#" @click.stop.prevent="listar(startat-=20, quantityPage)">Previous</a>
                            </li>
                            <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index2) in pages" v-bind:key="index2">
                                <a class="page-link" href="#" @click.stop.prevent="listar(startat=num*20, quantityPage)">{{num+1}}</a>
                            </li>
                            <li class="page-item" v-show="pages.length>1 && startat+20<total">
                                <a class="page-link" href="#" @click.stop.prevent="listar(startat+=20, quantityPage)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                
            <!--                            -->
            <!--                            -->
            <!--                            -->
            <!--      Editar Ferramentas    -->
            <!--                            -->
            <!--                            -->
            <!--                            -->

                <b-modal ref="myModalRef" hide-footer title="Editar Ferramentas">
                 
                                <form>
                                    <div>
                                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                        <div class="form-row">
                                        <div class="form-group col-md-6">
                                        <label>
                                            <b>Nome:</b>
                                        </label>
                                        <input type="text" placeholder="Ex: Facas de Guilhotina " v-model="ferramenta.name" id="nome" class="form-control form-control-sm">
                                        </div>
                                        <div class="form-group col-md-6">
                                        <label>
                                            <b>Descrição: </b>
                                        </label>
                                        <input type="text" id="desc" class="form-control form-control-sm" v-model="ferramenta.description" placeholder="descrição">
                                        </div>
                                        </div>
                                        <div class="form-row">
                                        <div class="form-group col-md-6">
                                        <label>
                                            <b>Número Serial: </b>
                                        </label>
                                        <input type="text" id="sernum" class="form-control form-control-sm" v-model="ferramenta.serialNumber" placeholder="124856648">
                                        </div>
                                        <div class="form-group col-md-4">
                                        <label>
                                            <b>Código: </b>
                                        </label>
                                        <input type="text" id="code" class="form-control form-control-sm" v-model="ferramenta.code" placeholder="código">
                                        </div>
                                        <div class="form-group col-md-4">
                                        <label>
                                            <b>Vida Útil: </b>
                                        </label>
                                        <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="Ex: 100" id="lifec" disabled>
                                        </div>
                                        <div class="form-group col-md-4">
                                        <label>
                                            <b>Unidade de Medida: </b>
                                        </label>
                                        <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="Ex.: minutos" disabled>                              
                                        </div>
                                        </div>
                                        <!-- <label>
                                            <b>Vida útil atual: </b>
                                        </label>
                                        <input type="text" id="currL" v-model="ferramenta.currentLife" class="form-control form-control-sm" placeholder="vida útil atual" disabled>
                                     -->
                                        <div class="form-row">
                                        <div class="form-group col-md-6">
                                        <label>
                                            <b>Tipo: </b>
                                        </label>
                                            <select class="form-control form-control-sm" v-model="ferramenta.typeName" disabled>
                                            <option v-for="tipo in tipos" :value="tipo.name" v-bind:key="tipo">{{ tipo.name }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                        <label>
                                            <b>Status: </b>
                                        </label>
                                        <select class="form-control form-control-sm" v-model="ferramenta.status" disabled>
                                            <option value="available">Disponível</option>
                                            <option value="in_use">Em uso</option>
                                            <option value="in_maintenance">Em manutenção</option>
                                            <option value="in_test">Em Teste</option>
                                            <option value="not_available">Indisponível</option>
                                            <option value="inactive">Inativo</option>
                                        </select>
                                        </div>
                                        </div>
                                        <div class="btn btn-primary pull-left" style="margin-top:3%" @click.stop.prevent="errors=[];ferramenta={}">
                                                Limpar
                                        </div>
                                        <div class="modal-footer">
                                            <div class="btn-group" role="group">
                                                <button class="btn btn-success">
                                                <i @click.stop.prevent="editar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                            </button>
                                            </div>
                                        </div>
                                        </div>
                                        
                                </form>
                </b-modal>
            </div>
            <br>
        </div>

    </div>
</template>
<script src="./js/toolcreate.js">
</script>
<style>
@import url('./css/toolcreate.css');
</style>
