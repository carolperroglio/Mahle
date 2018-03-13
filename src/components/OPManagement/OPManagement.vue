<template>
        <div>
         <div class="fixed-top op-management">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item nav-item-opmanagement col-sm-1.5">
                    <h1 class="title-page-opmanagement"> <b>Gerenciamento de Ordem de Produção</b> </h1>
                </li>
            </ul>
        </div>
            <div class="contentMOP">
                <div id="load" v-show="carregando">
                    <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                    <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                    <stretch background="#4d4d4d"></stretch>
                </div> 
               <div v-for="(o, index) in OPs" v-bind:key="index">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <label class="ls lsactive">
                                <b><font color="#9BA6A5">Status: </font></b>{{o.currentStatus}}</label>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Nº Ordem de produção: </font></b>{{o.productionOrderNumber}}</label>
                            <label class="ls lsquant">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{o.quantity}}</label>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{o.typeDescription}}</label>
                            <label class="ls ls3">
                                <button class="btn btn-sm btn-success" @click.stop.prevent="configOPEstate(o)">Alterar Status</button>
                            </label>
                                                      
                        </div>
                </div>
            </div>
        <b-modal ref="modalGerOP" hide-footer title="Editar Status">
            
                    <form>
                        <div class="form-group">
                        <div id="load" v-show="carregandost">
                        <stretch background="#4d4d4d"></stretch>
                        </div> 
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                            <label>
                                <b>Status:</b>
                            </label>
                            <select class="form-control form-control-sm" v-model="newStatus" >
                            <option v-for="(n,index) in nextstates" :value="n" v-bind:key="index">{{ n }}
                            </option>
                            </select>
                                        <label>
                                            <b>Nº Ordem de produção: </b>
                                        </label>
                                        <input type="text" id="desc" class="form-control form-control-sm" v-model="OP.productionOrderNumber" placeholder="001" disabled>
                                        <label>
                                            <b>Quantidade: </b>
                                        </label>
                                        <input type="text" id="sernum" class="form-control form-control-sm" v-model="OP.quantity" placeholder="1" disabled>
                                         <label>
                                            <b>Descrição: </b>
                                        </label>
                                        <input type="text" id="code" class="form-control form-control-sm" v-model="OP.typeDescription" placeholder="código" disabled>
                                        <br>
                                        <div class="btn-group" role="group">
                                                <button class="btn btn-warning" style="color: white" @click.stop.prevent="showModalConfirmEditar()">
                                                    <i  class="fa fa-check-square"></i>
                                                </button>
                                        </div>
                                            <div class="btn btn-primary pull-right" @click.stop.prevent="OP={}">
                                                Limpar
                                        </div>
                                    </div>
                                </form>
        </b-modal>
        <b-modal ref="confirmarEditar" hide-footer title="Tem certeza que deseja mudar o status?">
                    <form>
                        <div class="form-group">
                        <div id="load" v-show="carregandost">
                        <stretch background="#4d4d4d"></stretch>
                        </div>
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" style="color: white" @click.stop.prevent="editar(OP)">
                                <i class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-danger" style="color: white" @click.stop.prevent="hideModalConfirmEditar()">
                                <i  class="fa fa-times" aria-hidden="true"></i>
                            </button>
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
