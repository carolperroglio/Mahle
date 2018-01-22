<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--       Barra de Associação       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        
         <div class="fixed-top nav-OP">
            <h1 class="title-page-assop"> 
                <b>Associação de OP</b>
            </h1>
            <ul class="nav d-flex align-items-center">
                <li class="nav-item nav-item-assop col-sm-1.5">
                    <b>&nbsp&nbsp&nbsp Número da Ordem:</b>
                        <input @keyup="OPs=getOPs(numOP)" v-model="numOP" placeholder="Número" class="btn btn-outline-secondary dropdown-toggle btn-sm" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <b-dropdown-item class="dropdown-item" v-if="notSelected" @click.stop.prevent="OPId = o.productionOrderId;
                                numOP = o.productionOrderNumber;
                                typeId = o.productionOrderTypeId;
                                notSelected = false;
                                openSelectGroup()" v-for="(o,index) in OPs" v-bind:key="index">{{o.productionOrderNumber}}
                            </b-dropdown-item>
                </li>                                                          
                <li class="nav-item nav-item-assop col-sm-1.5" v-if="group">                                                                                                              
                    <b>&nbsp&nbsp Grupo:</b>
                        <select class="form-control-outline-secondary form-control-sm" v-model="groupId"  v-on:change="openSelectThings()">
                            <option v-for="(g,index) in Groups" :value="g.thingGroupId" v-bind:key="index">{{ g.groupName }}
                            </option>
                        </select> 
                </li>   
                <li class="nav-item nav-item-assop col-sm-2"  v-if="thing || groupId != ''"> 
                    <b>Thing:</b>
                        <select class="form-control-outline-secondary form-control-sm" v-model="thingId">    
                            <option v-for="(t,index) in Things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}
                            </option>
                        </select>
                </li>   
                <li class="nav-item nav-item-assop"  v-if="thing || groupId != ''">    
                    <div class="btn-group">
                        <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="getAssoc()">
                            Associar OP   
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#DisAssocModal">
                            Desassociar OP
                        </button>
                    </div>    
                </li>    
            </ul>        
        </div>            
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--    Listagem de Associações      -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <div class="OPAssoc col-11">
            <div class="progress" v-show="carregando">
                            <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        </div>
                            </div>    
            <div v-show="lista || OP.length > 0">      
                <div class="card">
                    <div class="card-header card-header-ass-op">
                        <b>Ferramenta Associada</b>
                    </div>
                        <div class="card-body card-body-ass-op">
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Status: </font></b>{{OP.currentStatus}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Production Order no: </font></b>{{OP.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{OP.quantity}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{OP.typeDescription}}</label>&nbsp;&nbsp;&nbsp;

                        </div>
                </div>      
            </div>
            <br>
             <div v-show="lista2" class="card">
                    <div class="card-header card-header-ass-op">
                        <b>Thing Associada</b>
                    </div>
                    <div class="card-body card-body-ass-op">
                        <label class="ls ls3">
                            <b><font color="#9BA6A5">Código: </font></b></label>
                        <label class="ls ls3">{{Thing.thingCode}}</label>
                        <br>
                        <label class="ls ls3">
                            <b><font color="#9BA6A5">Nome: </font></b></label>
                        <label class="ls ls3">{{Thing.thingName}}</label>
                    </div>
                    </div>
        </div>
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--    Modal de Desassociações      -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <div class="modal fade" id="DisAssocModal" tabindex="-1" role="dialog" aria-labelledby="DisAssocModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="DisAssocModalLabel">Cadastrar Ferramenta</h5>
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
                                <input type="text" placeholder="nome"  id="nome" class="form-control danger is-invalid form-control-sm">
                                <label>
                                    <b>Descrição: </b>
                                </label>
                                <input type="text" id="desc" class="form-control form-control-sm" placeholder="descrição">
                                <label>
                                    <b>Número Serial: </b>
                                </label>
                                <input type="text" id="sernum" class="form-control form-control-sm" placeholder="serial number">                                    <label>
                                    <b>Código: </b>
                                </label>
                                <label>
                                    <b>Life Cycle: </b>
                                </label>
                                <input class="form-control form-control-sm" type="text" placeholder="life cycle" id="lifec">
                                <label>
                                    <b>Vida útil atual: </b>
                                </label>
                                <input type="text" id="currL" class="form-control form-control-sm" placeholder="vida útil atual" disabled>
                            
                                <label>
                                    <b>Unidade de Medida: </b>
                                </label>
                                <input type="text" id="unitMeas" class="form-control form-control-sm" placeholder="Ex.: minutos">                              
                                <label>
                                    <b>Tipo: </b>
                                </label>
                                    <select class="form-control form-control-sm" >
                                    </select>
                                <label>
                                    <b>Status: </b>
                                </label>
                                <select class="form-control form-control-sm">
                                    <option value="available">Disponível</option>
                                    <option value="in_use">Em uso</option>
                                    <option value="in_maintenance">Em manutenção</option>
                                    <option value="not_available">Indisponível</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                                </div>
                                <div class="btn-group" role="group">
                                        <button class="btn btn-success">
                                            <i class="fa fa-check-square" aria-hidden="true"></i>
                                        </button>
                                        
                                </div>
                                    <div class="btn btn-primary pull-right" >
                                        Limpar
                                    </div>
                        </form>
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
<script src="./js/associateOP.js">
</script>
<style>
@import url("./css/associateOP.css");
</style>


