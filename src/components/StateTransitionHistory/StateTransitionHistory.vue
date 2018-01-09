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
                                                                              tool = t.name" v-for="(t,index) in Tools">{{t.name}}</a>                            
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


