<template>
    <div>
            
       <nav class="fixed-top nav-optype">
            <ul class="nav d-flex align-items-center">
                <h1 class="title-page-optype"><b>Tipos de Ordem de Produção</b></h1>
                <li class="nav-item-op col-sm-1.5">
                    <router-link class="btn btn-primary btn" :to="{ name: 'HistorianProduction'}" >
                      Ir para Apontamentos <i class= "fa fa-hand-o-right" style="font-size:22px; cursor:pointer"></i>
                    </router-link>
                </li>
            </ul>
        </nav>

        <div class="row conteudo-tt">
            <div class=" col-md-12">
                    <div class="container-fluid">
                        <div class="progress" v-show="carregando">
                            <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        </div>
                            </div>
                     <div class="card types">
                        <div v-for="(t, index) in Types" v-bind:key="index">
                        <div class="card-header card-header-optype">
                        <i class= "fa fa-file-text" style="font-size:22px; cursor:pointer"></i><b>&nbsp&nbsp&nbspTipo {{ t.productionOrderTypeId }}</b> 
                        </div> 
                        <div class="card-body"> 
                            <label class="ls lsoptype">
                            <b><font color="#9BA6A5"> Tipo: </font></b>{{t.typeDescription}}</label>&nbsp;
                            <label class="ls lsoptype">
                            <b><font color="#9BA6A5">Ecopo: </font></b>{{t.typeScope}}</label>&nbsp;
                            </div>
                            
                        <div class="card-header card-header-optype" id="group">
                            <b>Grupos Associados</b>
                        </div> 
                        <div class="card-body"> 

                            <div v-for="(tg, index) in t.thingGroups" v-bind:key="index">

                            <label class="ls lsoptype2">
                            <b><font color="#9BA6A5">Código: </font></b>{{tg.groupCode}}</label>&nbsp;
                            <label class="ls lsoptype2">
                            <b><font color="#9BA6A5">Nome: </font></b>{{tg.groupName}}</label>&nbsp;
                        
                            </div>

                            <label class="ls lsoptype2">
                            <div class="btn-group" role="group">

                            <button type="button" class="btn btn-success btn-sm pull-right" data-toggle="modal" @click.stop.prevent="openEditModal(t)">
                            Editar&nbsp&nbsp <font size="4">&#x270d  </font>   
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
         <b-modal ref="myModalRef" hide-footer title="Cadastro de Produtos">
   
                   <div class="modal-body">
                         <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                        <div class="row">
                        <div class="col-md-6 editOP">
                            <label>Descrição</label>
                            <input type="text" class="form-control" placeholder="Descrição" v-model="Type.typeDescription" disabled>
                            </div>
                        
                        <div class="col-md-6 editOP">
                            <label>Escopo</label>
                            <input type="text" class="form-control" placeholder="Descrição" v-model="Type.typeScope" disabled>
                        </div>

                        </div>
                        </br>
                        <div class="form-row">
                            <div class="col-md-2">
                           <label for="opType" class="col-form-label">Grupo</label>
                            </div>
                           <div class="col-md-6">
                            <select class="form-control-outline-secondary form-control" v-model="groupName" v-if="select">
                            <option v-for="(t,index) in thingsGroup" :value="t.groupName" v-bind:key="index">{{ t.groupName }}</option>
                            </select>
                             <div v-for="(t, index) in Type.thingGroups" v-bind:key="index" >
                                <ul class="list-group">
                                    <li class="list-group-item">
                                    <b>{{t.groupName}}</b></li>
                                </ul>
                                </div>
                           </div>
                           <div class="col-md-2">
                               <button class="btn btn-outline-secondary">
                                    <i class="fa fa-plus-square" aria-hidden="true" @click.stop.prevent="setSelect()"></i>
                                </button>
                           </div>
                        </div>
                        
                    </div>

                    <div class="modal-footer">
                       
                        <button class="btn btn-success" v-if="groupName != ''">
                            <i class="fa fa-check-square" aria-hidden="true" @click.stop.prevent="editType()"></i>
                        </button>
                        
                    </div>
          
        </b-modal>

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


