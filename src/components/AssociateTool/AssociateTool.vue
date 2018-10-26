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
                <li class="offset-10">
                    <div class="">
                        <router-link :to="{name: 'ToolTypeAssoc'}" class="btn offset-6 btn-primary"><i class="fa fa-arrow-left"></i> Voltar</router-link>
                    </div>
                </li>                   
            </ul> 
        </div>  
        
        <div class="row mb-5 mx-4" style="margin-top :14rem;">                
            <div class="col-md-2" v-for="(t, index) in tools" :key="t.position">
                <div class="card mx-2 my-2" style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">         
                    <div class="card-header text-center">
                        <h4 :id="index + 1" >
                            {{"Posição" + " " }} {{index+1}}
                        </h4>               
                    </div>
                    <div class="card-body">                                                        
                        <p :id="index + 1">                            
                            {{t.tool.currentThing != undefined?'Código: '+t.tool.code:'Sem ferramenta'}}
                        </p>                                                                                    
                        <button class="btn btn-block" :class="[t.tool.currentThing != undefined? 'btn-danger': 'btn-success']" @click.stop.prevent="t.tool.currentThing != undefined?showModal('modalConfirmDissac'):showModal('modalAssociate');t.tool.currentThing != undefined?fSelected = t.tool:pos = t.tool.pos">
                            {{t.tool.currentThing != undefined?'Desassociar': 'Associar'}}
                        </button>                        
                    </div>
                </div>
            </div>
        </div>                            
        

        <!-- MODAL DE ASSOCIAÇÃO DE FERRAMENTAS-->
        <b-modal ref="modalAssociate" no-close-on-backdrop hide-footer title="Associar Ferramenta" modal-header-close>
            <div class="modal-body">
            <div class="form-group row">
                <div class="form-group col-sm-10">
                <label for="ferramentas">Ferramentas</label>
                    <select class="form-control" v-model="fSelected">
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

        <b-modal ref="modalConfirmDissac" no-close-on-backdrop hide-footer title="Desassociar Ferramenta">            
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


