<template>
<div>
    <nav class="fixed-top nav-cinza">
        <ul class="nav d-flex align-items-center">
            <li class="nav-item-hist nav-item-gp col-md-12">
            <h1 class="title-page-gp"><b>Usuários</b></h1>
            </li>
            <li class="nav-prod col-md-6">
            <form class="form-inline my-3 form-control-sm">
                <!-- Button trigger modal -->
                <div class="col-md-3">
                    <button @click="showModal('cadUser');objUser={}" type="button" class="btn btn-success btn-lg">
                        <i class="fa fa-plus"></i> Cadastrar Usuário
                    </button>
                </div>
            </form>
            </li>
        </ul>
    </nav>
    <div id="load" v-show="carregando">
        <stretch></stretch>
    </div>
    <div v-show="!carregando && userlist.length==0" id="tabela-users">
        <h1>Sem registros de usuários</h1>
    </div>
    <table v-if="!carregando && userlist.length>0" class="table table-responsive w-100 d-block d-md-table table-sm table-striped mb-5" id="tabela-users">
        <thead id="teste">
            <tr style="background-color: black; color: white;">
                <th>Nome</th>
                <th>E-mail</th>
                <th>Nome do Usuário</th>                
                <th>Grupo do Usuário</th>
                <th></th>              
            </tr>
        </thead>
        <tbody>       
            <tr v-for="(us, index) in userlist" v-bind:key="index">                
                <td>{{us.name}}</td>
                <td>{{us.email}}</td>
                <td>{{us.username}}</td>
                <td>{{us.userGroup?us.userGroup.name:'-'}}</td>                                  
                <td>
                    <i class="fa fa-trash" style="font-size:21px; cursor:pointer;color:red" @click.stop.prevent="objUser = us;showModal('deleteUser')"></i>
                    <i class="fa fa-edit cursor" style="font-size:21px; cursor:pointer;" @click.stop.prevent="objUser = us; objUser.password = ''; objUser.passwordconfirm = ''; showModal('editUser')"></i>
                </td>                
            </tr>                                  
        </tbody>
    </table>
    <br>


                <!--                             -->
                <!-- MODALZÃO CRIAÇÃO DE USUÁRIO -->
                <!--                             -->
<b-modal no-close-on-backdrop size="md" ref="cadUser" hide-footer title="Cadastrar Usuário" modal-header-close>
<div class="modal-body">
    <form>
        <p :class="userExist?'alert alert-danger':'alert alert-success'" v-if="showMsg">{{msgUser}}</p>
    <div class="form-group row">
        <div class="form-group col-md-10">
        <label for="name">Nome </label>
            <input required type="text" class="form-control" id="name"  v-model="objUser.name">
        </div>
    </div>
    <div class="form-group row">
        <div class="form-group col-md-8">
        <label for="username">Nome de usuário</label>
            <input required type="text" class="form-control" id="username"  v-model="objUser.username">
        </div>
        <div class="form-group col-md-4">
            <br>
        <button class="btn btn-success" @click.stop.prevent="checkUser(objUser.username)"> 
            Validar nome 
        </button>
        </div>  
    </div>
    <div class="form-group row">
        <div class="form-group col-md-6">
        <label for="password">Senha</label>         
      <input required type="password" class="form-control" min="8" max="15" id="password" v-model="objUser.password" ref="ruleForm">
            <p v-if="objUser.password.length < 6" class="alert-danger" style="font-size:12px">A senha deve conter no mínimo 6 caractéres, uma letra e um número</p>            
        </div>
        <div class="form-group col-md-6">
        <label for="passwordconfirm">Confirmar senha</label>
            <input required type="password" class="form-control" min="8" max="15" id="passwordconfirm" v-model="objUser.passwordconfirm">
        </div>
    </div>
    <div class="form-group row">
        <div class="form-group col-md-8">
        <label for="desc">E-mail</label>
            <input required type="email" class="form-control" id="email" v-model="objUser.email">
        </div>
    </div>
    </form>
</div>
<!-- Botão que cria Usuário-->
<!--                    -->
<div class="modal-footer">
    <div class="btn-group" role="group">
        <button class="btn btn-success" :disabled="!objUser.username || !objUser.name || !objUser.password || !objUser.passwordconfirm || !objUser.email || userExist == true" @click="createUser(objUser);hideModal('cadUser');">
            <i  class="fa fa-check-square" aria-hidden="true"></i>
            Confirmar
        </button>
        <button @click.stop.prevent="objUser.username = ''; objUser.name = ''; objUser.password = ''; objUser.passwordconfirm = ''; objUser.email = ''" class="btn btn-primary pull-right">
            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
        </button> 
    </div>
</div>
</b-modal>


                            <!--                             -->
                            <!-- MODALZÃO EDITAR DE USUÁRIO  -->



                            <!--                             -->
                            <!-- MODALZÃO EDITAR DE GRUPO DE USUÁRIO  -->

<b-modal no-close-on-backdrop size="md" ref="editUser" hide-footer title="Editar Grupo de Usuário" modal-header-close>
<div class="modal-body">
    <form>
    <div class="form-group row">
    <div class="form-group col-md-6">
    <label for="nameedit">Nome </label>
        <input required type="text" class="form-control" id="nameedit"  v-model="objUser.name">
    </div>
    <div class="form-group col-md-6">
    <label for="usernameedit">Nome de usuário</label>
        <input required type="text" class="form-control" id="usernameedit"  v-model="objUser.username">
    </div>  
    </div>
    <div class="form-group row">
        <div class="form-group col-md-6">
        <label for="passwordedit">Senha</label>         
            <input required type="password" class="form-control" min="8" max="15" id="passwordedit" v-model="objUser.password" ref="ruleFormEdit">
            <p v-if="password.length < 6 && name.length > 0 && username.length > 0 " class="alert-danger" style="font-size:12px">A senha deve conter no mínimo 6 caractéres, uma letra e um número</p>
        </div>
        <div class="form-group col-md-6">
        <label for="passwordconfirm">Confirmar senha</label>
            <input required type="password" class="form-control"  min="8" max="15" id="passwordconfirm" v-model="objUser.passwordconfirm">
        </div>
    </div>
    <div class="form-group row">
        <div class="form-group col-md-8">
        <label for="desc">E-mail</label>
            <input required type="email" class="form-control" id="email" v-model="objUser.email">
        </div>
    </div>
    </form>
</div>
<!-- Botão que Edita o Usuário-->
<!--                    -->
<div class="modal-footer">
    <div class="btn-group" role="group">
        <button class="btn btn-success" :disabled="!objUser.username || !objUser.name || !objUser.password || !objUser.passwordconfirm || !objUser.email" @click="updateUser(objUser);hideModal('cadUser');">
            <i  class="fa fa-check-square" aria-hidden="true"></i>
            Confirmar
        </button>
        <button @click.stop.prevent="objUser.username = ''; objUser.name = ''; objUser.password = ''; objUser.passwordconfirm = ''; objUser.email = ''" class="btn btn-primary pull-right">
            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
        </button> 
    </div>
</div>
</b-modal>


<!-- MODAL PARA CONFIRMAR DELETE  -->
<b-modal  no-close-on-backdrop ref="deleteUser" title="Deseja realmente excluir o usuário ?" hide-footer>
<button class="btn btn-success" @click="deleteUser(objUser.userId);hideModal('deleteUser');">
    <i  class="fa fa-check-square" aria-hidden="true"></i>
    Confirmar
</button>
<button class="btn btn-danger" @click="hideModal('deleteUser');">
    <i  class="fa fa-times" aria-hidden="true"></i>
    Cancelar
</button>
</b-modal>
<!-- MODAL PARA CONFIRMAR EDIT  -->
<b-modal no-close-on-backdrop ref="editUserConfirm" title="Deseja realmente editar este usuário ?" hide-footer>
<button class="btn btn-success" @click="updateUser(objUser.userId);hideModal('editUserConfirm');">
    <i  class="fa fa-check-square" aria-hidden="true"></i>
    Confirmar
</button>
<button class="btn btn-danger" @click="hideModal('deleteUser');">
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

<script src="./js/user.js">
</script>

<style>
@import url("./css/user.css");
</style>
