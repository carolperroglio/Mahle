<template>
<div>
    <div class="fixed-top nav-tm">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod col-sm-1.5">
                    <h1 class="title-page-tm"> <b>Gerenciamento de Ferramentas </b></h1>
            </li>
            </ul>
        </div>
  <div class="row conteudo-tm">
            <div class="tools-manag col-md-12">
                <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
                </div> 
                <div>
                    <div class="container-fluid col-md-12">

                        <div class="card-header card-header-tools-manag">
                                <b>Lista de Ferramentas</b>
                            </div>
                        <div v-for="(t,index) in tools" :key="index">
                            <div class="card">
                                <b></b>
                            </div>
                            <div class="card-body card-body-tools-manag">
                                <label class="ls ls20">
                                    <b>Nome: </b> {{t.name}}
                                </label>
                                <label class="ls ls20">
                                    <b>Descrição: </b>{{t.description}}
                                </label>
                                <label class="ls ls20">
                                    <b>Número Serial: </b>{{t.serialNumber}}
                                </label>
                                <label class="ls ls20">
                                    <b>Status: </b>{{t.status | StatusName}}
                                </label>
                                <label class="ls ls20">
                                    <button type="button" class="btn btn-success btn-sm"  @click="catchToolToChange(t)">
                                    Alterar Status da Ferramenta
                                </button>
                                </label>
                                
                    </div>
                        </div>
                    </div>
                    <!-- Modal -->
                     <b-modal ref="modalGerT" hide-footer title="Alterar Status da Ferramenta">
                        <div class="modal-body">
                            <div class="alert alert-success" role="alert" v-if="tsUpdated">
                                Status da Ferramenta Alterado com Sucesso !
                            </div>
                            <div class="form-row">
                                <div class="col-md-6">
                                    <label for="" >Status</label>
                                    <input type="text" disabled class="form-control" v-model="tool.status">
                                </div>
                                <!-- {{ tool }} -->
                                </div>
                                <div class="form-row">
                                <label for="">Status Disponíveis</label>
                                <div class="col-md-12">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-outline-success btn-sm" 
                                        @click.prevent="changeStatus(tool, 'available' )" v-if="buttons.available">
                                        Disponibilizar
                                        </button> 
                                        <button type="button" class="btn btn-outline-secondary btn-sm" 
                                        @click.prevent="changeStatus(tool, 'not_available' )" v-if="buttons.not_available">
                                        Indisponibilizar
                                        </button> 
                                        <button type="button" class="btn btn-outline-warning btn-sm" 
                                        @click.prevent="changeStatus(tool, 'in_use')" v-show="buttons.in_use">
                                        Em uso
                                        </button> 
                                        <button type="button" class="btn btn-outline-danger btn-sm" 
                                        @click.prevent="changeStatus(tool, 'in_maintenance')" v-if="buttons.in_maintenance">
                                        Em Manutenção
                                        </button> 
                                        <button type="button" class="btn btn-secondary btn-sm" 
                                        @click.prevent="changeStatus(tool,'inactive')" v-if="buttons.inactive">
                                        Inativar
                                        </button>
                                    </div>
                                </div>
                                </div>
                            <div class="form-row" v-show="needJustification">
                                <label for="">Motivo</label>
                                <textarea  type="textarea" class="form-control" v-model="obj.text" placeholder="Escreva o motivo da mudança de status"/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" @click="updateStatus(tool)">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>   
                        </div>
                    </b-modal>
                </div>
            </div>
        </div>
        </div>
</template>

<script src="./js/toolsmanagement.js">
</script>

<style>
@import url("./css/toolsmanagement.css");
</style>
