<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--       Barra de Associação       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        
         <div class="fixed-top nav-item-ass-tool">
         <h1 class="title-page-ass-tool"> 
         <b>Associação de Ferramenta</b></h1>
         <div class="form-row nav-ass-tool">
         <div class="form-group col-md-2">
            <label for="">Nome da Thing:</label>
                <input @keyup="Tools=getTools(tool)" v-model="tool" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                           <ul class="list-group">
                           <b-dropdown-item class="" v-if="notSelected" @click.stop.prevent="toolName = t.name;
                                                                              toolId = t.id;
                                                                              tool = t.name;
                                                                              typeId = t.typeId;
                                                                              notSelected = false;  
                                                                              openSelectGroup()" v-for="(t,index) in Tools" v-bind:key="index"><li class="list-group-item">{{t.name}}</li></b-dropdown-item>                              
                           </ul>
        </div>
        <div class="form-group col-md-2" v-if="group">
            <label for="inputPassword4">Tipo de Ferramenta:</label>
            <select class="form-control-outline-secondary form-control" v-model="groupId"  v-on:change="openSelectThings()">
                <option v-for="(g,index) in Groups" :value="g.thingGroupId" v-bind:key="index">{{ g.groupName }}</option>
            </select>  
        </div>
        <div class="form-group col-md-2" v-if="thing || groupId != ''">
            <label>Thing:</label> 
            <select class="form-control-outline-secondary form-control" v-model="thingId">
            <option v-for="(t,index) in Things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}</option>
            </select>
         </div>
         <div class="btn-group-sm btn-ajusted-center col-md-3" v-if="thing || groupId != ''">
            <button type="button" class="btn btn-success" @click.stop.prevent="getAssoc()">
                Associar
            </button>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#DisAssocModal">
                Desassociar
            </button>
         </div>
         </div>
        </div>


<!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--    Listagem de Associações      -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->

        <div class="ferAssoc col-11">   
             <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
            </div> 
            <div v-show="lista || Tool.length > 0"> 
                <!-- <div v-for="(t, index) in AllTools" v-bind:key="index">      -->
                <div class="card">
                    <div class="card-header card-header-ass-tool">
                        <b>Ferramentas Associadas a {{ Tool.currentThing.thingName }}</b>
                    </div>
                        <div class="card-body card-body-ass-tool">
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                
                            <div class="col-md-4">    
                            <label class="ls ">
                                <b><font color="#9BA6A5">Nome: </font></b></label>
                            <label class="ls">{{ Tool.name }}</label>
                            </div>
                        </div>
                </div>  
                <!-- </div>     -->
            </div>
            </div>
            </div>


</template>


<script src="./js/associateTool.js">
export default {
  props: ["nothing"]
};
</script>
<style>
@import url("./css/associateTool.css");
</style>
