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
                        <stretch background="#4d4d4d"></stretch>
                        </div> 
               <div v-for="(o, index) in OPs" v-bind:key="index">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <label class="ls lsactive">
                                <b><font color="#9BA6A5">Status: </font></b>{{o.currentStatus}}</label>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Production Order no: </font></b>{{o.productionOrderNumber}}</label>
                            <label class="ls lsquant">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{o.quantity}}</label>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{o.typeDescription}}</label>
                            <label class="ls ls3">
                                <button class="btn btn-sm btn-success" @click.stop.prevent="showModal(o)">Editar Status</button>
                            </label>
                            
                        </div>
                </div>
            </div>
        <b-modal ref="modalGerOP" hide-footer title="Editar Status">
            
                    <form>
                        <div class="form-group">
                             
                        <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                        <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                            
                            <div id="load" v-show="carregando">
                        <stretch background="#4d4d4d"></stretch>
                        </div> 

                            <label>
                                <b>Status:</b>
                            </label>
                            <select class="form-control form-control-sm" v-model="newStatus" >
                            <option v-for="(n,index) in newNextSt" :value="n" v-bind:key="index">{{ n }}
                            </option>
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
