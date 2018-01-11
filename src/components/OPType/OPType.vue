<template>
    <div>
            
       <nav class="fixed-top nav-OP">
            <ul class="nav d-flex align-items-center">
                <h1 class="title-page">Tipo de Ordem de Produção</h1>
                <li class="nav-item-op col-sm-1.5">
                    <router-link class="btn btn-primary btn" :to="{ name: 'HistorianProduction'}" >
                    Apontamentos
                    </router-link>
                </li>
            </ul>
        </nav>

        <div class="row conteudo-tt">
            <div class="op col-md-10">
                    <div class="container-fluid col-md-9">
                     <div class="card">
                        <div v-for="(t, index) in Types" v-bind:key="index">
                        <div class="card-header">
                        <b>Tipo {{ t.productionOrderTypeId }} de Ordem de Produção</b>
                        </div> 
                        <div class="card-body"> 
                            <label class="ls">
                            <b><font color="#9BA6A5">Tipo: </font></b>{{t.typeDescription}}</label>&nbsp;
                            <label class="ls">
                            <b><font color="#9BA6A5">Ecopo: </font></b>{{t.typeScope}}</label>&nbsp;
                            <label class="ls1">
                            <div class="btn-group" role="group">
                            <button type="button" class="btn btn-success btn-sm" data-toggle="modal" @click.stop.prevent="openEditModal(t)">
                            Editar
                            </button>
                            </div>
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--    EDITAR TOOLSTYPE   -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->
        <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Criar Tipo de Ordem de Produção</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                         <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                        <div class="row">
                        <div class="col-md-6 editOP">
                            <label>Descrição</label>
                            <input type="text" class="form-control form-control-sm" placeholder="Descrição" v-model="Type.typeDescription" disabled>
                            </div>
                        </div>
                        <div class="col-md-6 editOP">
                            <label>Escopo</label>
                            <input type="text" class="form-control form-control-sm" placeholder="Descrição" v-model="Type.typeScope" disabled>
                        </div>
                        <div class="form-row">
                            <div class="col-md-2">
                           <label for="opType" class="col-form-label">Grupo</label>
                            </div>
                           <div class="col-md-6">
                            <select class="form-control-outline-secondary form-control" v-model="groupName">
                            <option v-for="(t,index) in thingsGroup" :value="t.groupName">{{ t.groupName }}</option>
                            </select>
                           </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-success" v-if="groupName != ''">
                            <i class="fa fa-check-square" aria-hidden="true" @click.stop.prevent="editType()"></i>
                        </button>
                        <div class="form-row" v-if="lista">
                        <div v-for="(t, index) in Type.thingGroups" v-bind:key="index">
                            <div class="card">    
                                <label class="ls">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{t.groupName}}</label>&nbsp;
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>              
</template>


<script>
export default {
props: ["nothing"]
};
</script>
<script src="./js/OPType.js">
</script>
<style>
@import url("./css/OPType.css");
</style>


