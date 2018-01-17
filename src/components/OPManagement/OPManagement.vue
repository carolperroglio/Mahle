<template>
        <div>
         <div class="fixed-top op-management">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item nav-item-opmanagement col-sm-1.5">
                    <h1 class="title-page-opmanagement"> <b>Gerenciamento de Ordem de Produção</b> </h1>
                </li>
            </ul>
        </div>
        <div class="table table-striped">
               <div v-for="(o, index) in OPs" v-bind:key="index">
                    <div class="">
                        <div class="card-header card-header2">
                        </div>
                        <div class="card-body card-body2">
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Status: </font></b>{{o.currentStatus}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Production Order no: </font></b>{{o.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{o.quantity}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{o.typeDescription}}</label>&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-edit icon-right icon-style" style="font-size:22px; cursor:pointer" @click.stop.prevent="showModal(o)"></i>
                        </div>
                    </div>
                </div>
        </div>
        <b-modal ref="modalGerOP" hide-footer title="Registrar Produto">
                    <form>
                        <div class="form-group">
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                            <label>
                                <b>Status:</b>
                            </label>
                            <select class="form-control form-control-sm" v-model="newStatus">
                                <option value="created">Criada</option>
                                <option value="active">Ativa</option>
                                <option value="inactive">Inativa</option>
                                <option value="paused">Pausada</option>
                                <option value="ended">Encerrada</option>
                                <option value="waiting_approval">Aguardando Aprovação</option>
                                <option value="approved">Aprovada</option>
                                <option value="reproved">Reprovada</option>
                            </select>
                                        <label>
                                            <b>Production Order no: </b>
                                        </label>
                                        <input type="text" id="desc" class="form-control form-control-sm" v-model="OP.productionOrderNumber" placeholder="descrição" disabled>
                                        <label>
                                            <b>Quantidade: </b>
                                        </label>
                                        <input type="text" id="sernum" class="form-control form-control-sm" v-model="OP.quantity" placeholder="serial number" disabled>
                                         <label>
                                            <b>Descrição: </b>
                                        </label>
                                        <input type="text" id="code" class="form-control form-control-sm" v-model="OP.typeDescription" placeholder="código" disabled>
                                        <br>
                                        <div class="btn-group" role="group">
                                                <button class="btn btn-warning" style="color: white">
                                                    <i @click.stop.prevent="editar(OP)" class="fa fa-check-square" aria-hidden="true"></i>
                                                </button>
                                        </div>
                                            <div class="btn btn-primary pull-right" @click.stop.prevent="OP={}">
                                                Limpar
                                        </div>
                                    </div>
                                </form>
        </b-modal>
    </div>        
</template>
<script src="./js/OpManagement.js">
</script>
<style>
@import url(./css/OpManagement.css);
</style>
