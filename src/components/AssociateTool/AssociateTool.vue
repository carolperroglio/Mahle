<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--       Barra de Associação       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        
         <div class="fixed-top nav-OP">
            <ul class="nav d-flex align-items-center">
                 <h1 class="title-page"> Associação de Ferramenta</h1>
                   
                <li class="nav-item col-sm-1.5">  
                     <label><b>Nome da ferramenta: </b></label>     
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
                <li class="nav-item col-sm-1.5"  v-if="group"> 
                    <label>
                        <b>Grupo: </b>
                    </label>  
                    <select class="form-control-outline-secondary form-control" v-model="groupId"  v-on:change="openSelectThings()">
                    <option v-for="(g,index) in Groups" :value="g.thingGroupId">{{ g.groupName }}</option>
                    </select>    
                </li>
                <li class="nav-item col-sm-1.5"  v-if="thing || groupId != ''">
                       <label>
                        <b>Thing: </b>
                    </label> 
                    <select class="form-control-outline-secondary form-control" v-model="thingId" v-on:change="getAssoc()">
                    <option v-for="(t,index) in Things" :value="t.thingId">{{ t.thingName }}</option>
                    </select>    
                </li>
                <li class="nav-item col-sm-1.5"  v-if="thing || groupId != ''">
                    <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="assocTool()">
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
            <div v-show="lista || AssocTool.length > 0">      
                <div class="card">
                    <div class="card-header">
                        <b>Ferramenta Associada</b>
                    </div>
                        <div class="card-body">
                            <label class="ls">
                                <b><font color="#9BA6A5">Nome: </font></b></label>
                            <label class="ls">{{ AssocTool.name }}</label>
                            <br>
                            <label class="ls">
                                <b><font color="#9BA6A5">No Serial: </font></b></label>
                            <label class="ls">{{ AssocTool.serialNumber }}</label>                          
                            <br>
                            <label class="ls">
                                <b><font color="#9BA6A5">Status: </font></b></label>
                            <label class="ls">{{ AssocTool.status }}</label>
                            <br>
                            <label class="ls">
                                <b><font color="#9BA6A5">Tipo: </font></b></label>
                            <label class="ls">{{ AssocTool.typeName }}</label>
                            <br>
                            <label class="ls">
                                <b><font color="#9BA6A5">Unidade de Medida: </font></b></label>
                            <label class="ls">{{ AssocTool.unitOfMeasurement }}</label>
                            <br>
                            <label class="ls">
                                <b><font color="#9BA6A5">Vida Atual: </font></b></label>
                            <label class="ls">{{ AssocTool.currentLife }}</label>
                        </div>
                    <div class="card-header">
                        <b>Thing Associada</b>
                    </div>
                    <div class="card-body">
                        <label class="ls">
                            <b><font color="#9BA6A5">Código: </font></b></label>
                        <label class="ls">{{AssocThing.thingCode}}</label>
                        <br>
                        <label class="ls">
                            <b><font color="#9BA6A5">Nome: </font></b></label>
                        <label class="ls">{{AssocThing.thingName}}</label>
                    </div>
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


