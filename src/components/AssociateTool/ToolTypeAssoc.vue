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
            <div v-for="(tt, index) in toolType" v-bind:key="index" id="constat" class="">
                <div class="tileConfig">
                    <div class="col-md-12">
                    <h4 class="ls11">
                        {{tt.name}}
                    </h4>
                    </div>
                    <div class="col-md-12 btn-view-pos">
                        <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success">
                            Visualizar Posições
                        </router-link>
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
<script src="./js/toolTypeAssoc.js">
export default {
  props: ["nothing"]
};
</script>
<style>
@import url("./css/toolTypeAssoc.css");
</style>


