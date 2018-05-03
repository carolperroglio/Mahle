<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--       Barra de Associação       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod nav-item-gp col-md-12">
                <h1 class="title-page-gp"><b>Associação de Ferramenta</b></h1>
            </li>
            <li class="colmd2">
                <p></p>
            </li>
            <!-- <label for="">Nome da ferramenta:</label>
                <input @keyup="Tools=getTools(tool)" v-model="tool" placeholder="Ferramenta" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    <ul class="list-group">
                    <b-dropdown-item class="" v-if="notSelected" @click.stop.prevent="toolName = t.name;
                        toolId = t.id;
                        tool = t.name;
                        typeId = t.typeId;
                        notSelected = false;  
                        openSelectGroup()" v-for="(t,index) in Tools" v-bind:key="index">
                        <li class="list-group-item">{{t.name}}</li>
                    </b-dropdown-item>   -->                           
            </ul> 
        </div>  

        <div class="row container-tt">
            <div  v-for="(t,index) in tools" v-bind:key="index" id="constat">
                <div class="tileConfig">
                    <div>
                    <div class="col-md-12">
                    <h4 class="ls11" >
                        {{"Posição" + " " +  index}}
                    </h4>
                    <p v-if="t.id != ''">
                        Código: {{t.code}}
                    </p>
                    </div>
                    <div class="col-md-12 btn-view-pos">
                        <button class="btn btn-danger" v-if="t.currentThing != undefined" @click.stop.prevent="showModal('modalConfirmDissac');fSelected = t">
                            Dessassociar
                        </button>
                        <button class="btn btn-success" v-if="t.currentThing == undefined" @click.stop.prevent="showModal('modalAssociate')">
                            Associar
                        </button>
                    </div>
                    </div>
                </div>
        </div>
        </div>

        <!-- MODAL DE ASSOCIAÇÃO DE FERRAMENTAS-->
        <b-modal ref="modalAssociate" hide-footer title="Cadastrar Ordem de Produção de Tira" modal-header-close>
            <div class="modal-body">
            <div class="form-group row">
                <div class="form-group col-sm-10">
                <label for="ferramentas">Ferramentas</label>
                    <select class="form-control" aria-placeholder="tipo de ordem" v-model="fSelected">
                        <option value="" selected disabled>Selecione</option>
                        <option v-for="(t,index) in toolList" v-bind:value="t" v-bind:key="index">
                            {{ t.name }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- Botão que ASSOCIA A FERRAMENTA-->
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="!fSelected" @click.stop.prevent="AssociateTool(fSelected);">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="fSelected = ''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
        </div>
        </b-modal>

        <b-modal ref="modalConfirmDissac" hide-footer title="Dessassociar Ferramenta">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja dessassociat a Ferramenta ?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="DessassociateTool(fSelected);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>   
                        <button @click.stop.prevent="hideModal('modalConfirmDissac');" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                          
                        </button>                       
                    </div>
                </div>
            </div>
        </b-modal> 
         <!-- MODAL PARA EXIBIR ERRO  -->
        <b-modal ref="modalErro" title="Erro" hide-footer="">
            <p :class=" erro ? 'alert alert-danger':'alert alert-info'">{{msg}}</p>
        </b-modal>
    </div>  
</template>


<script>
export default {
  props: ["nothing"]
};
</script>
<script src="./js/associateTool.js">
export default {
  props: ["nothing"]
};
</script>
<style>
@import url("./css/associateTool.css");
</style>


