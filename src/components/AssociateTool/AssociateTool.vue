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

        <div class="container-assoc">
            <div  v-for="(t,index) in tools" :key="t.position"  id="constat">
                <div class="tileConfigAssTool">
                    <div>
                    <div class="col-md-12">
                    <h4 class="ls11" :id="index + 1" >
                        {{"Posição" + " " }} {{index+1}}
                    </h4>
                    <!-- <h4 class="ls11" :id="index + 1" v-else>
                        {{"Posição" + " " }} {{index + 1}}
                    </h4> -->
                    <p :id="index + 1" v-if="t.tool.currentThing != undefined">
                    <!-- <p :id="index + 1" v-if="t.id != ''"> -->
                        Código: {{t.tool.code}}
                    </p>
                    </div>
                    <div class="btn-view-pos">
                        <button class="btn btn-danger btn-block" v-if="t.tool.currentThing != undefined" @click.stop.prevent="showModal('modalConfirmDissac');fSelected = t.tool">
                            Dessassociar
                        </button>
                        <button class="btn btn-success btn-block" v-if="t.tool.currentThing == undefined" @click.stop.prevent="showModal('modalAssociate'); pos = t.tool.pos">
                            Associar
                        </button>
                    </div>
                    </div>
                </div>
        </div>
        </div>
        <br>
        <div class="row container-fluid">
            <router-link :to="{name: 'ToolTypeAssoc'}" class="btn btn-info"><i class="fa fa-arrow-left"></i> Voltar</router-link>
        </div>

        <!-- MODAL DE ASSOCIAÇÃO DE FERRAMENTAS-->
        <b-modal ref="modalAssociate" no-close-on-backdrop hide-footer title="Associar Ferramenta" modal-header-close>
            <div class="modal-body">
            <div class="form-group row">
                <div class="form-group col-sm-10">
                <label for="ferramentas">Ferramentas</label>
                    <select class="form-control" aria-placeholder="tipo de ordem" v-model="fSelected">
                        <option value="" selected disabled  v-show="toolList.length > 0">Selecione</option>
                        <option v-for="(t,index) in toolList" v-bind:value="t" v-bind:key="index" v-if="toolList.length > 0">
                            {{ t.name }}
                        </option>
                        <option  v-if="toolList.length == 0" disabled>Não há ferramentas disponíveis</option>
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

        <b-modal ref="modalConfirmDissac" no-close-on-backdrop hide-footer title="Dessassociar Ferramenta">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja desassociar a Ferramenta ?</b>
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
        <b-modal ref="modalErro" no-close-on-backdrop title="" hide-footer="">
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


