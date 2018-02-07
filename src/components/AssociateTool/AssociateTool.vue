<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--       Barra de Associação       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        
         <div class="fixed-top nav-item-ass-tool">
         <h1 class="title-page-ass-tool"> 
         <b>Associação de Ferramenta</b></h1>
            <ul class="nav d-flex align-items-center">
                 <li class="nav-item col-sm-1.5">  
                    <label><br><br><br><b>&nbsp&nbsp&nbsp Nome da ferramenta: </b></label>     
                       <input @keyup="Tools=getTools(tool)" v-model="tool" placeholder="Ferramenta" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                           <b-dropdown-item class="dropdown-item" v-if="notSelected" @click.stop.prevent="toolName = t.name;
                                                                              toolId = t.id;
                                                                              tool = t.name;
                                                                              typeId = t.typeId;
                                                                              notSelected = false;  
                                                                              openSelectGroup()" v-for="(t,index) in Tools" v-bind:key="index">{{t.name}}</b-dropdown-item>                              
                </li>
                <li class="nav-item-ass-tool  col-sm-1.5"  v-if="group"> 
                    <label>
                        <b>Grupo: </b>
                    </label>  
                    <select class="form-control-outline-secondary form-control" v-model="groupId"  v-on:change="openSelectThings()">
                    <option v-for="(g,index) in Groups" :value="g.thingGroupId" v-bind:key="index">{{ g.groupName }}</option>
                    </select>    
                </li>
                <li class="nav-item-ass-tool  col-sm-1.5"  v-if="thing || groupId != ''">
                       <label>
                        <b>Thing: </b>
                    </label> 
                    <select class="form-control-outline-secondary form-control" v-model="thingId">
                    <option v-for="(t,index) in Things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}</option>
                    </select>    
                </li>
                <li class="nav-item-ass-tool  col-sm-1.5"  v-if="thing || groupId != ''">
                    <button type="button" class="btn btn-success" @click.stop.prevent="getAssoc()">
                        Associar
                    </button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#DisAssocModal">
                        Desassociar
                    </button>
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

        <div class="ferAssoc col-11">   
             <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
            </div> 
            <div v-show="lista || Tool.length > 0"> 
                <div v-for="(t, index) in AllTools" v-bind:key="index">     
                <div class="card">
                    <div class="card-header card-header-ass-tool">
                        <b>Ferramenta Associada</b>
                    </div>
                        <div class="card-body card-body-ass-tool">
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Nome: </font></b></label>
                            <label class="ls">{{ t.name }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">No Serial: </font></b></label>
                            <label class="ls">{{ t.serialNumber }}</label>                          
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Status: </font></b></label>
                            <label class="ls">{{ t.status }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Tipo: </font></b></label>
                            <label class="ls">{{ t.typeName }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Unidade de Medida: </font></b></label>
                            <label class="ls">{{ t.unitOfMeasurement }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Vida Atual: </font></b></label>
                            <label class="ls ls11">{{ t.currentLife }}</label>
                        </div>
                </div>  
                </div>    
            </div>
            <br>
             <div v-show="lista2" class="card">
                    <div class="card-header">
                        <b>Thing Associada</b>
                    </div>
                    <div class="card-body card-body-ass-tool">
                        <label class="ls">
                            <b><font color="#9BA6A5">Código: </font></b></label>
                        <label class="ls">{{Thing.thingCode}}</label>
                        <br>
                        <label class="ls">
                            <b><font color="#9BA6A5">Nome: </font></b></label>
                        <label class="ls">{{Thing.thingName}}</label>
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
                        <h5 class="modal-title" id="DisAssocModalLabel">Desassociar Thing</h5>
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
<script src="./js/associateTool.js">
</script>
<style>
@import url("./css/associateTool.css");
</style>


