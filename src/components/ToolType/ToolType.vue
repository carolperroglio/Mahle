<template>
  <div>
        <nav class="fixed-top nav-tool-type">
            <h1 class="title-page-TT"><b>Tipo de Ferramentas</b></h1>
            <ul class="nav d-flex align-items-center">
                 <li class="nav-item-tt">
                    <button type="button" class="btn btn-primary cadFer" @click.stop.prevent="showModal()">
                        Cadastrar Tipo de Ferramenta
                    </button>
                </li>
            </ul>
        </nav>
        <div class="row conteudo-tt col">
            <div class="fundo-branco-tt">
                <div class="cabecalho-table-tt">
                    <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(toolsType, 'name',0):organizar(toolsType, 'name',0);" class="ls2-cabecalho-tt col-md-2">
                        <b><font class="cursor-class" color="#ffffff">Nome &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(toolsType, 'description',1):organizar(toolsType, 'description',1);" class="ls2-cabecalho-tt col-md-4">
                        <b><font class="cursor-class" color="#ffffff">
                            Descrição &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                        </font></b>
                    </label>
                    <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(toolsType, 'serialNumber',2):organizar(toolsType, 'status',2);" class="ls2-cabecalho-tt col-md-2">
                        <b><font class="cursor-class" color="#ffffff">
                            Status&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-sort-desc pull-right" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                            <i class="fa fa-sort-asc pull-right" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                        </font></b>
                    </label> 
            </div>
            <div v-for="(ttype,index) in toolsType" :key="index" :class="{cinza: index%2==0}">
                <label class="ls ls21 col-md-2">
                    {{ttype.name}}
                </label>
                <label class="ls ls21 col-md-4">
                    {{ttype.description}}
                </label>
                <label class="ls ls21 col-md-2">
                    {{ttype.status}}
                </label>
                <button type="button" class="btn btn-outline-primary btn-sm btn-sm" @click.prevent="showModalEdit();catchObjToUpdate(ttype)">
                Editar
                </button>
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

        <b-modal ref="myModalRef" hide-footer title="Criar Tipo de Ferramenta">
                
                    <div class="modal-body">
                        <div class="alert alert-success" role="alert" v-show="ttCreated">
                            Tipo de Ferramenta cadastrada com sucesso !
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Ferramenta</label>
                            <input type="text" class="form-control form-control-sm" v-model="tooltype.name" placeholder="Ex: Ferramenta Guilhotina">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input type="text" class="form-control form-control-sm" v-model="tooltype.description" placeholder="Ex:21721098">
                        </div>
                        </div>
                        <div class="form-row">
                           <div class="col-md-6">
                            <label for="opType" class="col-form-label">Estação</label>
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
                            <!-- <button class="btn btn-danger">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
                            </button> -->
                        </div>
                    </div>
        </b-modal>
        <!-- 
            /FIM CRIAR TOOLSTIP MODAL
         -->

         <!-- 
             EDITAR TOOLSTIP
          -->
       <b-modal ref="myModalEdit" hide-footer title="Editar Tipo de Ferramenta">
         
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
                    </b-modal>
         
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
