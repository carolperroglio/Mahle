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
            </ul> 
        </div>  

        <div class="row container-tt">
            <div v-for="(tt, index) in toolType" v-bind:key="index" id="tilett" class="">
                <div class="tileConfig">
                    <div class="col-md-12">
                    <h4 class="ls11">
                        {{tt.name}}
                    </h4>
                    </div>
                    <div class="col-md-12 btn-view-pos">
                        <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
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


