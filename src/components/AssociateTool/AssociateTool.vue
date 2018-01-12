<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--       Barra de Associação       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        
         <div class="fixed-top nav-ass-tool">
            <ul class="nav d-flex align-items-center">
                 <h1 class="title-page-ass-tool"> <b>Associação de Ferramenta</b></h1>
                   
                <li class="nav-item-ass-tool col-sm-1.5">  
                     <label><br><b>Nome da ferramenta: </b></label>     
                     <div class="dropdown">   
                            <input @keyup="Tools=getTools(tool)" v-model="tool" placeholder="Ferramenta" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="toolName = t.name;
                                                                              toolId = t.id;
                                                                              tool = t.name;
                                                                              typeId = t.typeId;
                                                                              openSelectGroup()" v-for="(t,index) in Tools">{{t.name}}</a>                            
                            </div>                            
                        </div>
                    
                </li>
                <li class="nav-item-ass-tool  col-sm-1.5"  v-if="group"> 
                    <label>
                        <b>Grupo: </b>
                    </label>  
                    <select class="form-control-outline-secondary form-control" v-model="groupId"  v-on:change="openSelectThings()">
                    <option v-for="(g,index) in Groups" :value="g.thingGroupId" v-bind:key="index">{{ g.groupName }}</option>
                    </select>    
                </li>
                <li class="nav-item-ass-tool  col-sm-1.5"  v-if="thing || groupId != ''">
                       <label>
                        <b>Thing: </b>
                    </label> 
                    <select class="form-control-outline-secondary form-control" v-model="thingId">
                    <option v-for="(t,index) in Things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}</option>
                    </select>    
                </li>
                <li class="nav-item-ass-tool  col-sm-1.5"  v-if="thing || groupId != ''">
                    <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="getAssoc()">
                        Associar Ferramenta
                    </button>
                </li>
            </ul>
        </div>

            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--    Listagem de Associações      -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->

        <div class="ferAssoc col-11">   
            <div class="progress" v-show="carregando">
                            <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        </div>
                            </div>
            <div v-show="lista || Tool.length > 0">      
                <div class="card">
                    <div class="card-header card-header-ass-tool">
                        <b>Ferramenta Associada</b>
                    </div>
                        <div class="card-body card-body-ass-tool">
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                                
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Nome: </font></b></label>
                            <label class="ls">{{ Tool.name }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">No Serial: </font></b></label>
                            <label class="ls">{{ Tool.serialNumber }}</label>                          
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Status: </font></b></label>
                            <label class="ls">{{ Tool.status }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Tipo: </font></b></label>
                            <label class="ls">{{ Tool.typeName }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Unidade de Medida: </font></b></label>
                            <label class="ls">{{ Tool.unitOfMeasurement }}</label>
                            <br>
                            <label class="ls ls11">
                                <b><font color="#9BA6A5">Vida Atual: </font></b></label>
                            <label class="ls ls11">{{ Tool.currentLife }}</label>
                        </div>
                </div>      
            </div>
            <br>
             <div v-show="lista2" class="card">
                    <div class="card-header">
                        <b>Thing Associada</b>
                    </div>
                    <div class="card-body card-body-ass-tool">
                        <label class="ls">
                            <b><font color="#9BA6A5">Código: </font></b></label>
                        <label class="ls">{{Thing.thingCode}}</label>
                        <br>
                        <label class="ls">
                            <b><font color="#9BA6A5">Nome: </font></b></label>
                        <label class="ls">{{Thing.thingName}}</label>
                    </div>
                    </div>
        </div>
    </div>  
</template>


<script>
export default {
props: ["nothing"]
};
</script>
<script src="./js/associateTool.js">
</script>
<style>
@import url("./css/associateTool.css");
</style>


