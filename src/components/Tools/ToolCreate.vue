
<template >
    <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Barra de botões de cadastro     -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
         <div class="fixed-top nav-produtos  ">
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
            </ul>
        </div>

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Menu de Cadastro de Ferramentas -->
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
                                <input class="form-control form-control-sm" type="text" v-model="ferramenta.lifeCycle" placeholder="Life Cycle" id="lifec">
                                <label for="currL">
                                    <b>Estado atual: </b>
                                </label>
                                <input type="text" id="currL" v-model="ferramenta.currentLife" class="form-control form-control-sm" placeholder="Estado Atual">
                                <br>
                                <label>
                                    <b>Unidade de Medida: </b>
                                </label>
                                <input type="text" id="unitMeas" v-model="ferramenta.unitOfMeasurement" class="form-control form-control-sm" placeholder="Minuto">
                                <br>
                                <select class="form-control form-control-sm">
                                    <option value="" selected disabled>Tipo</option>
                                    <option value="facas">Facas de Guilhotina</option>
                                    <option value="buchas">Bucha da Formadora de Canal</option>
                                    <option value="flange">Flange da Formadora de canal</option>
                                    <option value="regua">Régua da guia de entrada da formadora de canal direita</option>
                                </select>
                                <select class="form-control form-control-sm">
                                    <option value="" selected disabled>Status</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="não ativo">Não Ativo</option>
                                </select>
                                <br>
                                </div>
                                <div class="btn-group" role="group">
                                        <button class="btn btn-success">
                                            <i @click.stop.prevent="cadastrar(ferramenta)" class="fa fa-check-square" aria-hidden="true"></i>
                                        </button>
                                        <button class="btn btn-danger">
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
</template>
<script src="./js/toolcreate.js">
</script>
<style>
@import url('./css/toolcreate.css');
</style>
