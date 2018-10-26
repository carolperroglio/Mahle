<template>
<div>
    <nav class="fixed-top nav-cinza">
        <!-- <button @click="getTesteInterceptor()">Teste</button> -->
        <ul class="nav d-flex align-items-center">
            <li class="nav-item-hist nav-item-gp col-md-12">
            <h1 class="title-page-gp"><b>Grupo de Usuários</b></h1>
            </li>
            <li class="nav-prod col-md-6">
            <form class="form-inline my-3 form-control-sm">
                <!-- Button trigger modal -->
                <div class="col-md-3">
                    <button @click="showModal('cadUserGroup');cleanVariableCreate(); 
                    userlist = inicialuserlist;permissionsList = incialPermissionList;uSelected = {};pSelected={}" type="button" class="btn btn-success btn-lg">
                        <i class="fa fa-plus"></i> Cadastrar Grupo de Usuário
                    </button>
                </div>
            </form>
            </li>
        </ul>
    </nav>
    <div id="load" v-show="carregando">
    <stretch></stretch>
    </div>
    <div class="cabecalho-table-po-usergroup"  v-show="!carregando">
        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(usergrouplist, 'name',0):organizar(usergrouplist, 'name',0);" class="ls2-cabecalho-po-usergroup col-md-3">
            <b><font class="cursor-class" color="#ffffff">Nome do Grupo &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(usergrouplist, 'description',1):organizar(usergrouplist, 'description',1);" class="ls2-cabecalho-po-usergroup col-md-3">
            <b><font class="cursor-class" color="#ffffff">
                Descrição &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(usergrouplist, 'enabled',2):organizar(usergrouplist, 'enabled',2);" class="ls2-cabecalho-po-usergroup col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Ativo &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>
    </div>   
    <div class="table-margin-usergroup"  v-show="!carregando">
    <div v-for="(u, index) in usergrouplist" v-bind:key="index" :class="{cinza: index%2==0}">
        <label class="ls1-usergroup col-md-3">
            {{u.name}}
        </label>
        <label class="ls1-usergroup col-md-3">
            {{u.description}}
        </label>
        <label class="ls1-usergroup col-md-2" v-if="u.enabled">
            <i class="fa fa-check" aria-hidden="true"></i>
        </label>
        <label class="ls1-usergroup col-md-2" v-else>
            <i class="fa fa-remove" aria-hidden="true"></i>
        </label>
        <label class="ls1-usergroup col-md-1">
            <i class="fa fa-trash" style="font-size:21px; cursor:pointer;color:red" @click.stop.prevent="objUserGroup = u;showModal('deleteUsergroup')"></i>
            <i class="fa fa-edit cursor" style="font-size:21px; cursor:pointer;" @click.stop.prevent="objUserGroup = u;checkPermissionList(u);checkUserList(u);
            showModal('editUserGroup');uSelected = {};pSelected={};"></i>
        </label>
    </div>
    </div>  
    <br>


                            <!--                             -->
                            <!-- MODALZÃO CRIAÇÃO DE GRUPO DE USUÁRIO -->
                            <!--                             -->
<b-modal no-close-on-backdrop size="lg" ref="cadUserGroup" hide-footer title="Cadastrar Grupo de Usuário" modal-header-close>
<div class="modal-body">
    <form>
    <div class="form-group row">
        <div class="form-group col-md-6">
        <label for="name">Nome </label>
            <input required type="text" class="form-control" id="name"  v-model="name">
        </div>
        <div class="form-group col-md-6">
        <label for="descrip">Descrição</label>
            <input required type="text" class="form-control" id="descrip"  v-model="description">
        </div>
    </div>
    <div class="form-group row">
    <div class="form-group col-md-6"> 
    <ul class="list-group" v-for="(us,index) in users" v-bind:key="index">
        <li class="list-group-item">{{us.username}} <i class="fa fa-remove pull-right cursor-class" style="color:red" @click="removeUserFromGroup(us,objUserGroup.userGroupId)" aria-hidden="true"></i></li>
    </ul>
    </div>
    <div class="form-group col-md-6">
    <ul class="list-group" v-for="(per,index) in permissions" v-bind:key="index">
        <li class="list-group-item">{{per}} <i class="fa fa-remove pull-right cursor-class" style="color:red" aria-hidden="true" @click="removePermissionOfGroup(per,objUserGroup.userGroupId)"></i></li>
    </ul>
    </div>
    </div>
    </form>
</div>
<!-- Botão que cria Usuário-->
<!--                    -->
<div class="modal-footer">
    <div class="btn-group" role="group">
        <button class="btn btn-success" :disabled="name == ''|| description == ''" @click="createUser();hideModal('cadUserGroup');">
            <i  class="fa fa-check-square" aria-hidden="true"></i>
            Confirmar
        </button>
        <button @click.stop.prevent="name = ''; description = '';" class="btn btn-primary pull-right">
            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
        </button> 
    </div>
</div>
</b-modal>


                            <!--                             -->
                            <!-- MODALZÃO EDITAR DE GRUPO DE USUÁRIO  -->


<b-modal no-close-on-backdrop size="lg" ref="editUserGroup" hide-footer title="Cadastrar Grupo de Usuário" modal-header-close>
    <div class="modal-body">
        <form>
            <div class="form-group row">
                <div class="form-group col-md-6">
                    <label for="name">Nome </label>
                    <input required type="text" class="form-control" id="name"  v-model="objUserGroup.name">
                </div>
                <div class="form-group col-md-6">
                    <label for="descrip">Descrição</label>
                    <input required type="text" class="form-control" id="descrip"  v-model="objUserGroup.description">
                </div>
            </div>
            <div class="form-group row">
                <div class="form-group col-md-5">
                    <label for="password">Usuários</label>
                    <select class="form-control  mr-sm-2.5" aria-placeholder="tipo de ordem" v-model="uSelected">
                        <option value="" selected disabled></option>
                        <option v-for="(u,index2) in userlist" v-bind:value="u" v-bind:key="index2" >
                            {{ u.username }}
                        </option>
                    </select>
                </div>
                <div class="form-group col-md-1">
                    <br>
                    <button class="btn btn-outline-success btn-sm"  @click.stop.prevent="addUserToGroup(uSelected,objUserGroup.userGroupId)">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="form-group col-md-5">
                    <label for="password">Permissões</label>
                    <select class="form-control  mr-sm-2.5" aria-placeholder="tipo de ordem"  v-model="pSelected">
                        <option value="" selected disabled></option>
                        <option v-for="(p,index) in permissionsList" v-bind:value="p" v-bind:key="index">
                            {{ traducao[p] }}
                        </option>
                    </select>
                </div>
                <div class="form-group col-md-1">
                    <br>
                    <button class="btn btn-outline-success btn-sm" @click.stop.prevent="addPermissionToGroup(pSelected,objUserGroup.userGroupId)">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div class="form-group row">
                <div class="form-group col-md-6">
                    <ul class="list-group" v-for="(us,index) in users" v-bind:key="index">
                        <li class="list-group-item">{{us.username}}<i class="fa fa-remove pull-right cursor-class" style="color:red" @click="removeUserFromGroup(us,objUserGroup.userGroupId)" aria-hidden="true"></i></li>
                    </ul>
                </div>
                <div class="form-group col-md-6">
                    <ul class="list-group" v-for="(per,index) in permissions" v-bind:key="index">
                        <li class="list-group-item">{{traducao[per]}} <i class="fa fa-remove pull-right cursor-class" style="color:red" aria-hidden="true" @click="removePermissionOfGroup(per,objUserGroup.userGroupId)"></i></li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
    <!-- Botão que Edita Usuário-->
    <!--                    -->
    <div class="modal-footer">
        <div class="btn-group" role="group">
            <button class="btn btn-success" :disabled="objUserGroup.name == ''|| objUserGroup.description == ''" @click="showModal('editUserGroupConfirm');">
                <i  class="fa fa-check-square" aria-hidden="true"></i>
                Confirmar
            </button>
            <button @click.stop.prevent="objUserGroup.name = ''; objUserGroup.description = '';" class="btn btn-primary pull-right">
                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
            </button> 
        </div>
    </div>
</b-modal>

<!-- MODAL PARA CONFIRMAR DELETE  -->
<b-modal no-close-on-backdrop ref="deleteUsergroup" title="Deseja realmente excluir este grupo de usuários ?" hide-footer>
<button class="btn btn-success" @click="deleteUsergroup(objUserGroup.userGroupId);hideModal('deleteUsergroup');">
    <i  class="fa fa-check-square" aria-hidden="true"></i>
    Confirmar
</button>
<button class="btn btn-danger" @click="hideModal('deleteUsergroup');">
    <i  class="fa fa-times" aria-hidden="true"></i>
    Cancelar
</button>
</b-modal>
<!-- MODAL PARA CONFIRMAR EDIT  -->
<b-modal no-close-on-backdrop ref="editUserGroupConfirm" title="Deseja realmente editar este usuário ?" hide-footer>
<button class="btn btn-success" @click="updateUserGroup(objUserGroup.userGroupId);hideModal('editUserGroupConfirm');">
    <i  class="fa fa-check-square" aria-hidden="true"></i>
    Confirmar
</button>
<button class="btn btn-danger" @click="hideModal('deleteUsergroup');">
    <i  class="fa fa-times" aria-hidden="true"></i>
    Cancelar
</button>
</b-modal>
<!-- MODAL PARA EXIBIR ERRO  -->
<b-modal no-close-on-backdrop ref="modaInfo" title="Mensagem" hide-footer>
<p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
</b-modal>
</div>
</template>

<script src="./js/userGroup.js">
</script>

<style>
@import url("./css/userGroup.css");
</style>
