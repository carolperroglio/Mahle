<template>
  <div>
        <nav class="fixed-top nav-status">
            <h1 class="title-page-status"><b>Visualização de Status de MES</b></h1>
            <ul class="nav d-flex align-items-center">
                 <li class="nav-item-stat">
                </li>
            </ul>
        </nav>
        <div class="row conteudo-status">
              <div class="container-fluid">
                    <div class="status col-md-12">
                           <div class="card-header card-header-stat">
                                <b></b>
                            </div>
                            <div class="card-body card-s">
                                <label class="ls ls22">
                                    <b>Nome: </b> 
                                </label>
                                <label class="ls ls22">
                                    <b>Descrição: </b>
                                </label>
                                <label class="ls ls22">
                                    <b>Status: </b>
                                </label>
                                <button type="button" class="btn btn-outline-primary btn-sm btn-sm">
                                Editar
                                </button>
                            </div>
                    </div>
            </div>
            </div>
        
  </div>
</template>

<script src="./js/status.js">
</script>

<style>
@import url("./css/status.css");
</style>
