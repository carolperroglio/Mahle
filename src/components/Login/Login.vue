<template>
  <div>
      <div id="load-login" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div> 
      <div class="login col-md-4 offset-4" v-show="!carregando">
        <div class="card-header" style="border-bottom: none;">
            <h4>Entrar no Sistema</h4>
        </div>
        <div class="card-body">
        <div class="form-row">
        <div class="form-group col-md-12">
        <label for="name">Nome do Usuário</label>
        <input type="text" class="form-control" placeholder="Ex: mauricios" v-model="username">
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-12">
        <label for="name">Senha</label>
        <input type="password" class="form-control" placeholder="" v-model="password">
        </div>
        </div>
        <div class="form-row">
            <button class="btn btn-success btn-block" @click.stop.prevent="login()">
                Entrar
            </button>
        </div>
    </div>
    </div>
<!-- MODAL PARA EXIBIR ERRO  no-close-on-backdrop  -->
<b-modal ref="modaInfo" title="Mensagem" hide-footer>
    <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
</b-modal>
  </div>
</template>

<script src="./js/login.js">
</script>

<style>
@import url('./css/login.css');
</style>
