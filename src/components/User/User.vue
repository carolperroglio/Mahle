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
                    <button @click="showModal('cadUser');cleanVariableCreate()" type="button" class="btn btn-success btn-lg">
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
    <div class="cabecalho-table-po-user"  v-show="!carregando">
        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(userlist, 'name',0):organizar(userlist, 'name',0);" class="ls2-cabecalho-po-user col-md-2">
            <b><font class="cursor-class" color="#ffffff">Nome &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(userlist, 'email',1):organizar(userlist, 'email',1);" class="ls2-cabecalho-po-user col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                E-mail &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(userlist, 'username',2):organizar(userlist, 'username',2);" class="ls2-cabecalho-po-user col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Nome do Usuário &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(userlist, 'enabled',3):organizar(userlist, 'enabled',3);" class="ls2-cabecalho-po-user col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Ativo &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(userlist, 'userGroup',4):organizar(userlist, 'userGroup',4);" class="ls2-cabecalho-po-user col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Grupo do Usuário &nbsp;&nbsp;&nbsp;
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        
    </div>   
    <div class="table-margin-user"  v-show="!carregando">
    <div v-for="(u, index) in userlist" v-bind:key="index" :class="{cinza: index%2==0}">
        <label class="ls1-user col-md-2">
            {{u.name}}
        </label>
        <label class="ls1-user col-md-2">
            {{u.email}}
        </label>
        <label class="ls1-user col-md-2">
            {{u.username}}
        </label>
        <label class="ls1-user col-md-1" v-show="u.enabled">
            <i class="fa fa-check" aria-hidden="true"></i>
        </label>
        <label class="ls1-user col-md-2" v-if="u.userGroup != null">
            {{u.userGroup.name}}
        </label>
        <label class="ls1-user col-md-2" v-else>
            -
        </label>
        <label class="ls1-user col-md-1">
            <i class="fa fa-trash" style="font-size:21px; cursor:pointer;color:red" @click.stop.prevent="objUser = u;showModal('deleteUser')"></i>
            <i class="fa fa-edit cursor" style="font-size:21px; cursor:pointer;" @click.stop.prevent="objUser = u;objUser.password = '';showModal('editUser')"></i>
        </label>
    </div>
    </div>  
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
            <input required type="text" class="form-control" id="name"  placeholder="Ex: Mauricio" v-model="name">
        </div>
    </div>
    <div class="form-group row">
        <div class="form-group col-md-8">
        <label for="username">Nome de usuário</label>
            <input required type="text" class="form-control" id="username" placeholder="Ex: mauriciot" v-model="username">
        </div>
        <div class="form-group col-md-4">
            <br>
        <button class="btn btn-success" @click.stop.prevent="checkUser(username)"> 
            Validar nome 
        </button>
        </div>  
    </div>
    <div class="form-group row">
        <div class="form-group col-md-6">
        <label for="password">Senha</label>
         <!-- <vue-password v-model="user.password"
                    classes="input"
                    :user-inputs="[user.email]">
      </vue-password> -->
      <input required type="password" class="form-control" min="8" max="15" id="password" v-model="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" ref="ruleForm">
            <p v-if="password.length < 6 && name.length > 0 && username.length > 0 " class="alert-danger" style="font-size:12px">A senha deve conter no mínimo 8 caractéres, uma letra e um número</p>
            <!-- <input required type="password" class="form-control" min="8" max="15" id="password" v-model="password"> -->
            <!-- <p v-if="password.length < 6 && name.length > 0 && username.length > 0 " class="alert-danger" style="font-size:12px">A senha deve conter no mínimo 6 caractéres, uma letra e um número</p> -->
        </div>
        <div class="form-group col-md-6">
        <label for="passwordconfirm">Confirmar senha</label>
            <input required type="password" class="form-control"  min="8" max="15" id="passwordconfirm" v-model="passwordconfirm">
        </div>
    </div>
    <div class="form-group row">
        <div class="form-group col-md-8">
        <label for="desc">E-mail</label>
            <input required type="email" class="form-control" placeholder="Ex: mauriocio@empresa.com.br" id="email" v-model="email">
        </div>
    </div>
    </form>
</div>
<!-- Botão que cria Usuário-->
<!--                    -->
<div class="modal-footer">
    <div class="btn-group" role="group">
        <button class="btn btn-success" :disabled="username == ''|| name == ''|| password == ''|| passwordconfirm == ''
        || email == '' || userExist == true" @click="createUser();hideModal('cadUser');">
            <i  class="fa fa-check-square" aria-hidden="true"></i>
            Confirmar
        </button>
        <button @click.stop.prevent="username = ''; name = ''; password = ''; passwordconfirm = ''; email = ''" class="btn btn-primary pull-right">
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
        <input required type="text" class="form-control" id="nameedit"  placeholder="Ex: Mauricio" v-model="objUser.name">
    </div>
    <div class="form-group col-md-6">
    <label for="usernameedit">Nome de usuário</label>
        <input required type="text" class="form-control" id="usernameedit" placeholder="Ex: mauriciot" v-model="objUser.username">
    </div>  
    </div>
    <div class="form-group row">
        <div class="form-group col-md-6">
        <label for="passwordedit">Senha</label>
         <!-- <vue-password v-model="user.password"
                    classes="input"
                    :user-inputs="[user.email]">
      </vue-password> -->
            <input required type="password" class="form-control" min="8" max="15" id="passwordedit" v-model="objUser.password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" ref="ruleFormEdit">
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
            <input required type="email" class="form-control" placeholder="Ex: mauriocio@empresa.com.br" id="email" v-model="objUser.email">
        </div>
    </div>
    </form>
</div>
<!-- Botão que Edita o Usuário-->
<!--                    -->
<div class="modal-footer">
    <div class="btn-group" role="group">
        <button class="btn btn-success" :disabled="objUser.username == ''|| objUser.name == ''|| objUser.password == ''|| objUser.passwordconfirm == ''
        || objUser.email == ''" @click="updateUser(objUser.userId);hideModal('cadUser');">
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
