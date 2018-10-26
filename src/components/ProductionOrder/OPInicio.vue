<template>
  <div>
        
        <!--                                 -->
        <!--      NAV INICIO DE OP           -->
        <!--                                 -->
         <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod nav-item-gp col-md-12">
                <h1 class="title-page-gp-s-campo"> <b>Inicio de Ordem de Produção</b> </h1>
            </li>
            <li class="col-md-12">
                <p></p>
            </li>
            </ul>
        </div>
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div> 
        <div class="col-md-6 offset-3 form-op">
        <div class="form-row">
            <div class="form-group col-md-8 offset-1">
                <label for="">Última OP Utilizada no Forno</label>
                <input autocomplete="off" @keyup="getOPResult(opNumber)" v-model="opNumber"  class="form-control" />
                <b-dropdown-item @click.stop.prevent="opNumber = op.productionOrderNumber;ops=[];opSelected=op" 
                v-for="(op,index) in ops" :key="index">{{ op.productionOrderNumber }}</b-dropdown-item>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-8 offset-1">
                <label for="">Carga Utilizada</label>
                <input type="text" class="form-control" v-model="cargaUtilizada" >
            </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-6 offset-3">
        <div class="btn-group pull-right" role="group">
            <button class="btn btn-success" :disabled="''" @click="sendLastAnalysis();">
                <i  class="fa fa-check-square" aria-hidden="true"></i>
                Confirmar
            </button>
            <button @click.stop.prevent="''" class="btn btn-primary">
                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
            </button> 
        </div>
        </div>
        </div>
        </div>
        <b-modal no-close-on-backdrop ref="modalInfo" title="" hide-footer="">
            <p :class="erro?'alert alert-danger':'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div> 
</template>

<script src="./js/opInicio.js">
</script>

<style>
@import url("./css/opInicio.css");
</style>
