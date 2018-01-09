<template>
  <div class="row conteudo-tm">
            <div class="op col-md-10">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div>
                    <div class="container-fluid col-md-9">
                        <div class="card" v-for="(t,index) in tools" :key="index">
                            <div class="card-header">
                                <b></b>
                            </div>
                            <div class="card-body">
                                <b>Nome: </b> {{t.name}} -
                                <b>Descrição: </b>{{t.description}} -
                                <b>Serial Number: </b>{{t.description}} -
                                <b>Status: </b>{{t.status | StatusName}} -
                                <button type="button" class="btn btn-success btn-sm"  @click="catchToolToChange(t)" data-target="#editarStatus" data-toggle="modal" >
                                Mudar Status
                                </button>
                    </div>
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="editarStatus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Confirmar Alteração do Status</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="tool = {}; obj = {}">&times;</span>
                            </button>
                        </div>
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
                        </div>
                    </div>
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
