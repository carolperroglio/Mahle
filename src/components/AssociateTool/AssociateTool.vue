<template>
    <div>
            
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--      Barra de busca de OP       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
         <div class="fixed-top nav-OP">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item">
                    <label class="fm mr-sm-2"><b>Nome da ferramenta: </b></label>   
                    
                     <div class="dropdown">   
                            <input @keyup="Tools=getTools(tool)" v-model="tool" placeholder="Ferramenta" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="toolName = t.name;
                                                                              toolId = t.id;
                                                                              tool = t.name;
                                                                              openSelectThings()" v-for="(t,index) in Tools">{{t.name}}</a>                            
                            </div>                            
                        </div>
                    
                </li>
                <li class="nav-item"  v-if="thing">
                    <label>
                        <b>Grupo de Things: </b>
                    </label>   
                    <select class="form-control-outline-secondary form-control" v-model="thingId">
                    <option v-for="(t,index) in Things" :value="t.thingId">{{ t.thingName }}</option>
                    </select>    
                </li>
                <li class="nav-item"  v-if="thing">
                    <button type="button" class="btn btn-outline-success btn-sm" @click.stop.prevent="assocTool()">
                        Associar Ferramenta
                    </button>
                </li>
            </ul>
        </div>

            <div v-show="lista" class="tools">           
                <div class="card">
                    <div class="card-header">
                        <b>Ferramenta Associada</b>
                    </div>
                        <div class="card-body">
                            <div v-for="(a, index) in AssocTool">
                            <label class="ls2">
                                <b><font color="#9BA6A5">Nome: </font></b>{{a.name}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{a.description}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Serial: </font></b>{{a.serialNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Code: </font></b>{{a.code}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Life Cycle: </font></b>{{a.lifeCycle}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Vida Útil Atual: </font></b>{{a.currentLife}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">UM: </font></b>{{a.unitOfMeasurement}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{a.typeName}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">status: </font></b>{{a.status}}</label>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    <div class="card-header">
                        <b>Thing Associada</b>
                    </div>
                        <div class="card-body">
                            <div v-for="(a, index) in AssocTool.currentThing" v-bind:key="index">
                        <label class="ls2">
                            <b><font color="#9BA6A5">Código: </font></b>{{a.thingCode}}</label>&nbsp;&nbsp;&nbsp;
                        <label class="ls">
                            <b><font color="#9BA6A5">Nome: </font></b>{{a.thingName}}</label>&nbsp;&nbsp;&nbsp;
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


