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
                     <label><b>Nome da ferramenta: </b></label>     
                     <div class="dropdown">   
                            <input @keyup="Tools=getTools(tool)" v-model="tool" placeholder="Ferramenta" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="toolName = t.name;
                                                                              toolId = t.id;
                                                                              tool = t.name" v-for="(t,index) in Tools">{{t.name}}</a>                            
                            </div>                            
                        </div>
                    
                </li>
                <li class="nav-item col-sm-1.5">  
                     <label><b>Data início: </b></label> 
                     <input type="text" required v-model="dataIni"  placeholder="datetime" class="form-control form-control-sm">
                </li>
                <li class="nav-item col-sm-1.5"> 
                    <label><b>Data fim: </b></label>  
                    <input type="text" required v-model="dataFim"  placeholder="datetime" class="form-control form-control-sm">
                </li>
                <li class="nav-item col-sm-1.5" v-if="dataIni != '' && dataFim != ''"> 
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


