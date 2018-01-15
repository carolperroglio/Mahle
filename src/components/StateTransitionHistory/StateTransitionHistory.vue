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
                <h1 class="title-page"> Históricos</h1>
                <li class="nav-item col-sm-1.5">  
                     <div class="col">    
                         <label><b>Nome da ferramenta: </b></label> 
                     <div class="dropdown">   
                            <input @keyup="Tools=getTools(tool)" v-model="tool" placeholder="Ferramenta" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="toolName = t.name;
                                                                              toolId = t.id;
                                                                              tool = t.name" v-for="(t,index) in Tools" v-bind:key="index">{{t.name}}</a>                            
                            </div>                            
                        </div>
                     </div>                    
                </li>
                <li class="nav-item col-sm-1.5">  
                    <label><b>Início: </b></label>  
                    <div class="row">
                        <div class="col-md-6">
                            <date-picker v-model="date" :config="config"></date-picker>
                        </div>
                        <div class="col-md-3">
                            <vue-timepicker format="HH:mm" v-model="timeIni"></vue-timepicker>
                        </div>
                    </div>
                </li>

                <li class="nav-item col-sm-1.5">  
                    <label><b>Fim: </b></label>  
                    <div class="row">
                        <div class="col-md-6">
                            <date-picker v-model="datef" :config="config"></date-picker>
                        </div>
                        <div class="col-md-3">
                            <vue-timepicker format="HH:mm" v-model="timeFim"></vue-timepicker>
                        </div>
                    </div>
                </li>
                                
                <li class="nav-item col-sm-1.5" v-if="date && datef != ''"> 
                    <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="getHistory()">
                        Buscar histórico
                    </button>
                </li>
            </ul>
        </div>
    <div v-show="lista">
        <div class="card">
            <div class="card-header">
                <b>Produtos de entrada</b>
            </div>
            <div class="card-body">
                <label class="ls">
                   <b><font color="#9BA6A5">Justificativa: </font></b>{{history.justificationNeeded}}</label>&nbsp;
                <label class="ls">
                   <b><font color="#9BA6A5">Justificativa: </font></b>{{history.justification}}</label>&nbsp;
                <label class="ls">
                   <b><font color="#9BA6A5">Estado anterior: </font></b>{{history.previousState}}</label>&nbsp;
                <label class="ls2">
                   <b><font color="#9BA6A5">Ciclo de vida anterior: </font></b>{{history.previoustLife}}</label>&nbsp;
                <label class="ls2">
                   <b><font color="#9BA6A5">Data: </font></b>{{history.timeStampTicks}}</label>&nbsp;
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
<script src="./js/history.js">
</script>
<style>
@import url("./css/history.css");
</style>


