
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
                <li class="nav-item">
                    <form class="form-inline my-3 form-control-sm mr-sm-12">
                    <div class="">
                        <button type="button" class="btn btn-outline-success btn-sm col-md-12" data-toggle="modal" data-target="#ToolCreateModal">
                             Cadastrar Ferramenta
                        </button>
                    </div>

                    </form>
                </li>
                <li class="nav-item">
                    <form class="form-inline my-3 form-control-sm mr-sm-12">
                    <div class="">
                        <button type="button" class="btn btn-outline-success btn-sm col-md-12" @click.stop.prevent="listar()">
                                Listar Ferramentas
                            </button>
                        </div>

                    </form>
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
        <div class="modal fade" id="ToolCreateModal" tabindex="-1" role="dialog" aria-labelledby="ToolCreateModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ToolCreateModalLabel">Cadastrar Ferramenta</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                <label>
                                    <b>Nome: </b>
                                </label>
                                <input type="text" placeholder="nome" required v-model="ferramenta.name" id="nome" class="form-control danger is-invalid form-control-sm">
                                <label>
                                    <b>Descrição: </b>
                                </label>
                                <input type="text" id="desc" class="form-control form-control-sm" v-model="ferramenta.description" placeholder="descrição">
                                <label for="lifeC">
                                    <b>Life Cycle: </b>
                                </label>
                                <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="life cycle" id="lifec">
                                <label for="currL">
                                    <b>Vida útil atual: </b>
                                </label>
                                <input type="text" id="currL" v-model="ferramenta.currentLife" class="form-control form-control-sm" placeholder="vida útil atual" disabled>
                            
                                <label>
                                    <b>Unidade de Medida: </b>
                                </label>
                                <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="minuto">                              
                                <label>
                                    <b>Tipo: </b>
                                </label>
                                    <select class="form-control form-control-sm" v-model="ferramenta.typeName">
                                    <option v-for="tipo in tipos" :value="tipo.name">{{ tipo.name }}</option>
                                    </select>
                                <label>
                                    <b>Status: </b>
                                </label>
                                <select class="form-control form-control-sm" v-model="ferramenta.status">
                                    <option value="active">Ativo</option>
                                    <option value="disabled">Não Ativo</option>
                                </select>
                                </div>
                                <div class="btn-group" role="group">
                                        <button class="btn btn-success">
                                            <i @click.stop.prevent="cadastrar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                        </button>
                                        
                                </div>
                                    <div class="btn btn-primary pull-right" @click.stop.prevent="ferramenta={}">
                                        Limpar
                                    </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        
            <!--                            -->
            <!--                            -->
            <!--                            -->
            <!--   Listagem de ferramentas  -->
            <!--                            -->
            <!--                            -->
            <!--                            -->

        <div class="row conteudo" style="top:-400px;">
            <div class="ferramentas col-8">
                <!-- <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div> -->
                <div v-for="(f, index) in ferramentas" v-bind:key="index">
                    <div class="card">
                        <div class="card-header">
                            <b></b>
                        </div>
                        <div class="card-body">
                            <label class="ls">
                                <b><font color="#9BA6A5">Nome: </font></b>{{f.name}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{f.description}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Life Cycle: </font></b>{{f.lifeCycle}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Vida Útil Atual: </font></b>{{f.currentLife}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Unindade de Medida: </font></b>{{f.unitOfMeasurement}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{f.typeName}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">status: </font></b>{{f.status}}</label>&nbsp;&nbsp;&nbsp;
                                <button @click.stop.prevent="itemClicado(f)">
                            <i class="fa fa-pencil icon-right" style="font-size:22px; cursor:pointer"></i>
                                </button>
                        </div>
                    </div>
                </div>

                
            <!--                            -->
            <!--                            -->
            <!--                            -->
            <!--      Editar Ferramentas    -->
            <!--                            -->
            <!--                            -->
            <!--                            -->

                <div class="modal fade" id="editarFerr" tabindex="-1" role="dialog" aria-labelledby="editarFerrLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editarFerrLabel">Editar Ferramentas</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                        <label>
                                            <b>Nome:</b>
                                        </label>
                                        <input type="text" placeholder="nome" required v-model="ferramenta.name" id="nome" class="form-control danger is-invalid form-control-sm">

                                        <label>
                                            <b>Descrição: </b>
                                        </label>
                                        <input type="text" id="desc" class="form-control form-control-sm" v-model="ferramenta.description" placeholder="descrição">
                                        <label for="lifeC">
                                            <b>Life Cycle: </b>
                                        </label>
                                        <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="life cycle" id="lifec">
                                        <label for="currL">
                                            <b>Vida útil atual: </b>
                                        </label>
                                        <input type="text" id="currL" v-model="ferramenta.currentLife" class="form-control form-control-sm" placeholder="vida útil atual" disabled>
                                    
                                        <label>
                                            <b>Unidade de Medida: </b>
                                        </label>
                                        <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="minuto">                              
                                        <label>
                                            <b>Tipo: </b>
                                        </label>
                                            <select class="form-control form-control-sm" v-model="ferramenta.typeName">
                                            <option v-for="tipo in tipos" :value="tipo.name">{{ tipo.name }}</option>
                                            </select>
                                        <label>
                                            <b>Status: </b>
                                        </label>
                                        <select class="form-control form-control-sm" v-model="ferramenta.status">
                                            <option value="active">Ativo</option>
                                            <option value="disabled">Não Ativo</option>
                                        </select>
                                        </div>
                                        <div class="btn-group" role="group">
                                                <button class="btn btn-warning">
                                                    <i @click.stop.prevent="editar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                                </button>
                                        </div>
                                            <div class="btn btn-primary pull-right" @click.stop.prevent="ferramenta={}">
                                                Limpar
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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
