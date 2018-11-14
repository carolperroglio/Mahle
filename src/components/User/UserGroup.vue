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
    <div v-show="!carregando && usergrouplist.length==0" id="tabela-users-group">
        <h1>Sem registros de grupos</h1>
    </div>
    <table v-if="!carregando && usergrouplist.length>0" class="table table-responsive w-100 d-block d-md-table table-sm table-striped" id="tabela-users-group">
        <thead id="teste">
            <tr style="background-color: black; color: white;">
                <th>Nome do Grupo</th>
                <th>Descrição</th>
                <th>Ativo</th>                       
                <th></th>                      
            </tr>
        </thead>
        <tbody>       
            <tr v-for="(u, index) in usergrouplist" v-bind:key="index">                  
                <td>{{u.name}}</td>
                <td>{{u.description}}</td>                
                <td>
                    <i class="fa fa-check" v-if="u.enabled" aria-hidden="true"></i>
                    <i class="fa fa-remove" v-if="!u.enabled" aria-hidden="true"></i>                               
                </td>
                <td>
                    <i class="fa fa-trash" style="font-size:21px; cursor:pointer;color:red" @click.stop.prevent="objUserGroup = u;showModal('deleteUsergroup')"></i>
                    <i class="fa fa-edit cursor" style="font-size:21px; cursor:pointer;" @click.stop.prevent="objUserGroup = u;checkPermissionList(u);checkUserList(u);showModal('editUserGroup');uSelected = {};pSelected={};"></i>
                </td>                
            </tr>                                  
        </tbody>
    </table>
    <br>

                            <!--                                      -->
                            <!-- MODALZÃO CRIAÇÃO DE GRUPO DE USUÁRIO -->
                            <!--                                      -->
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
