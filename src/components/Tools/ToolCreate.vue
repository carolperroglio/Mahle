
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
                </li>    
                <li class="nav-item-tool">
                    <h1 class="title-page-tool"> <b>Cadastro de Ferramentas</b> </h1>
                            <select class="form-control form-control-sm" v-model="orderField">
                            <option value="" selected disabled="disabled">Ordenar por:</option>
                            <option value="name">Nome</option>
                            <option value="description">Descrição</option>
                            <option value="serialNumber">Número serial</option>
                            <option value="code">Código</option>
                            <option value="lifeCycle">Life cycle</option>
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
                            <option value="lifeCycle">Life cycle</option>
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
                             Cadastrar Ferramenta
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
        
                <b-modal ref="modalCadTool" hide-footer title="Cadastro de Ferramentas">
                        <form>
                            <div class="form-group">

                                <p v-if="errors.length">
                                        <ul v-for="(error, index) in errors" :key="index">
                                        <li class="alert alert-danger form-control" >{{ error }}</li>
                                        </ul>
                                </p>
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                <label>
                                    <b>Nome: </b>
                                </label>
                                <input type="text" placeholder="nome" v-model="ferramenta.name" id="nome" class="form-control form-control-sm">
                                <label>
                                    <b>Descrição: </b>
                                </label>
                                <input type="text" id="desc" class="form-control form-control-sm" v-model="ferramenta.description" placeholder="descrição">
                                <label>
                                    <b>Número Serial: </b>
                                </label>
                                <input type="text" id="sernum" class="form-control form-control-sm" v-model="ferramenta.serialNumber" placeholder="serial number">                                    <label>
                                    <b>Código: </b>
                                </label>
                                <label>
                                    <b>Life Cycle: </b>
                                </label>
                                <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="life cycle" id="lifec">
                                <label>
                                    <b>Vida útil atual: </b>
                                </label>
                                <input type="text" id="currL" v-model="ferramenta.currentLife" class="form-control form-control-sm" placeholder="vida útil atual" disabled>
                            
                                <label>
                                    <b>Unidade de Medida: </b>
                                </label>
                                <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="Ex.: minutos">                              
                                <label>
                                    <b>Tipo: </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="ferramenta.typeName">
                                    <option v-for="(tipo, index) in tipos" :value="tipo.name" v-bind:key="index">{{ tipo.name }}</option>
                                    </select>
                                <label>
                                    <b>Status: </b>
                                </label>
                                <select class="form-control form-control-sm" v-model="ferramenta.status">
                                    <option value="available">Disponível</option>
                                    <option value="in_use">Em uso</option>
                                    <option value="in_maintenance">Em manutenção</option>
                                    <option value="not_available">Indisponível</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                                </div>
                                <div class="btn-group" role="group">
                                        <button class="btn btn-success">
                                            <i @click.stop.prevent="cadastrar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                        </button>
                                        
                                </div>
                                    <div class="btn btn-primary pull-right" @click.stop.prevent="ferramenta={};errors=[];">
                                        Limpar
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
                <div v-for="(f, index) in ferramentas" :key="index">
                    <div class= "card-header">
                    </div>
                    <div class="card-body">
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Nome: </font></b>{{f.name}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{f.description}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Serial: </font></b>{{f.serialNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Code: </font></b>{{f.code}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Life Cycle: </font></b>{{f.lifeCycle}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Vida Útil Atual: </font></b>{{f.currentLife}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">UM: </font></b>{{f.unitOfMeasurement}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{f.typeName}}</label>&nbsp;&nbsp;&nbsp;
                                </label>
                            <label class="ls ls30">
                                <b><font color="#9BA6A5">Status: </font></b>{{f.status}}</label>&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-edit icon-right icon-style" style="font-size:22px; cursor:pointer" @click.stop.prevent="itemClicado(f)"></i>
                            </label>
                    </div>
                </div>
            
                <div class="paginacao2 fixed-bottom" v-show="total>0">
                    <nav aria-label="">
                        <ul class="pagination justify-content-center">
                            <li v-show="startat>0" class="page-item">
                                <a class="page-link" href="#" @click.stop.prevent="listar(startat-=20, quantityPage)">Previous</a>
                            </li>
                            <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
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
                                    <div class="form-group">
                                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                        <label>
                                            <b>Nome:</b>
                                        </label>
                                        <input type="text" placeholder="nome" v-model="ferramenta.name" id="nome" class="form-control form-control-sm">

                                        <label>
                                            <b>Descrição: </b>
                                        </label>
                                        <input type="text" id="desc" class="form-control form-control-sm" v-model="ferramenta.description" placeholder="descrição">
                                        <label>
                                            <b>Número Serial: </b>
                                        </label>
                                        <input type="text" id="sernum" class="form-control form-control-sm" v-model="ferramenta.serialNumber" placeholder="serial number">
                                         <label>
                                            <b>Código: </b>
                                        </label>
                                        <input type="text" id="code" class="form-control form-control-sm" v-model="ferramenta.code" placeholder="código">
                                                                                 
                                        <label>
                                            <b>Life Cycle: </b>
                                        </label>
                                        <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="life cycle" id="lifec" disabled>
                                        <label>
                                            <b>Vida útil atual: </b>
                                        </label>
                                        <input type="text" id="currL" v-model="ferramenta.currentLife" class="form-control form-control-sm" placeholder="vida útil atual" disabled>
                                    
                                        <label>
                                            <b>Unidade de Medida: </b>
                                        </label>
                                        <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="Ex.: minutos" disabled>                              
                                        <label>
                                            <b>Tipo: </b>
                                        </label>
                                            <select class="form-control form-control-sm" v-model="ferramenta.typeName" disabled>
                                            <option v-for="tipo in tipos" :value="tipo.name" v-bind:key="tipo">{{ tipo.name }}</option>
                                            </select>
                                        <label>
                                            <b>Status: </b>
                                        </label>
                                        <select class="form-control form-control-sm" v-model="ferramenta.status" disabled>
                                            <option value="available">Disponível</option>
                                            <option value="in_use">Em uso</option>
                                            <option value="in_maintenance">Em manutenção</option>
                                            <option value="not_available">Indisponível</option>
                                            <option value="inactive">Inativo</option>
                                        </select>
                                        </div>
                                        <div class="btn-group" role="group">
                                                <button class="btn btn-warning">
                                                    <i @click.stop.prevent="editar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                                </button>
                                        </div>
                                            <div class="btn btn-primary pull-right" @click.stop.prevent="errors=[];ferramenta={}">
                                                Limpar
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
