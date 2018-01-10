<template>
  <div>
        <nav class="fixed-top nav-tool-type">
            <ul class="nav d-flex align-items-center">
                <li class="title-tool-type">Tipo de Ferramentas</li>
                <li class="nav-tt col-sm-1.5">
                    <form class="form-inline my-3 form-control-sm">
                        <!-- <div class="col-md-auto">
                            <button type="button" button class="btn btn-primary btn-sm" @click.stop.prevent="buscar(id)">Buscar</button>
                        </div> -->
                        <!-- Button trigger modal -->
                        <div class="col-sm-1.5">
                            <br><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#cadastrar-tt">
                                Cadastrar Tipo de Ferramenta
                            </button>
                        </div>
                    </form>
                </li>
            </ul>
        </nav>
        <div class="row conteudo-tt">
            <div class="col-md-12">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <div>
                    <div class="container-fluid col-md-12">
                        <div class="card" v-for="(ttype,index) in toolsType" :key="index">
                            <div class="card-header card-header7">
                                <b></b>
                            </div>
                            <div class="card-body card-body7">
                                <label class="ls ls7">
                                    <b><font color="#9BA6A5">Nome:</font></b> {{ttype.name}}
                                </label>
                                <label class="ls ls7">
                                    <b><font color="#9BA6A5">Descrição:</font> </b>{{ttype.description}}
                                </label>
                                <label class="ls ls7">
                                    <b><font color="#9BA6A5">Status:</font> </b>{{ttype.description}}
                                </label>
                                <!-- <b>Grupo: </b>{{ttype.thingGroups}} - -->
                                
                                <i class="fa fa-edit icon-right" style="font-size:21px; cursor:pointer" @click.prevent="catchObjToUpdate(ttype)" data-toggle="modal" data-target="#editar-tt">
                                </i>
                                    <!-- <i class="fa fa-edit" @click="updateToolType(ttype)">
                                        Editar
                                    </i> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--    CRIAR TOOLSTYPE    -->
        <!--                       -->
        <!--                       -->
        <!--        modal          -->
        <div class="modal fade" id="cadastrar-tt" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Criar Tipo de Ferramenta</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-success" role="alert" v-show="ttCreated">
                            Tipo de Ferramenta cadastrada com sucesso !
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Ferramenta</label>
                            <input type="text" class="form-control form-control-sm" v-model="tooltype.name" placeholder="Nome">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input type="text" class="form-control form-control-sm" v-model="tooltype.description" placeholder="Código">
                        </div>
                        </div>
                        <div class="form-row">
                           <div class="col-md-6">
                            <label for="opType" class="col-form-label">Grupo</label>
                                    <select class="form-control form-control-sm mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="groupSelected">
                                        <option value="" selected disabled>Selecione um grupo</option>
                                        <option v-for="(tgroup,index) in thingsGroup" v-bind:value="tgroup" :key="index">
                                            {{ tgroup.groupName }}
                                        </option>
                                    </select>
                                    <div class="list-group-item" v-for="(g,index) in groups" :key="index">
                                        {{ g.groupName }}
                                        <i class="fa fa-remove pull-right" @click="removeGroup(g)"></i> 
                                    </div>
                            </div>
                            <div class="col-md-2 btn-add-tt">
                                <button class="btn btn-outline-success btn-sm" @click="addThingsGroup(groupSelected)">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success">
                                <i @click.stop.prevent="createToolType(tooltype)" class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 
            /FIM CRIAR TOOLSTIP MODAL
         -->

         <!-- 
             EDITAR TOOLSTIP
          -->
        <div class="modal fade" id="editar-tt" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar Tipo de Ferramenta</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-success" role="alert" v-show="ttUpdated">
                            Tipo de Ferramenta atualizada com sucesso !
                        </div>
                        <div class="alert alert-success" role="alert" v-show="ttDeleted">
                            Tipo de Ferramenta excluida com sucesso !
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Ferramenta</label>
                            <input type="text" class="form-control form-control-sm" v-model="tooltypeUp.name" placeholder="Nome">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input type="text" class="form-control form-control-sm" v-model="tooltypeUp.description" placeholder="Código">
                        </div>
                        </div>
                        <div class="form-row">
                           <div class="col-md-6">
                            <label for="opType" class="col-form-label">Grupo</label>
                                    <select class="form-control form-control-sm mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="groupSelected">
                                        <option value="" selected disabled>Selecione um grupo</option>
                                        <option v-for="(tgroup,index) in thingsGroup" v-bind:value="tgroup" :key="index">
                                            {{ tgroup.groupName }}
                                        </option>
                                    </select>
                                    <div class="list-group-item" v-for="(g,index) in groups" :key="index">
                                        {{ g.groupName }}
                                        <i class="fa fa-remove pull-right" @click="removeGroup(index)"></i> 
                                    </div>
                            </div>
                            <div class="col-md-2 btn-add-tt">
                                <button class="btn btn-outline-success btn-sm" @click="addThingsGroup(groupSelected)">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success">
                                <i @click.stop.prevent="updateToolType(tooltypeUp)" class="fa fa-check-square" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-remove" @click="deleteToolType(tooltypeUp)"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--
             /FIM CRIAR TOOLSTIP MODAL
         -->
  </div>
</template>

<script src="./js/tooltype.js">
</script>

<style>
@import url("./css/toolType.css");
</style>
