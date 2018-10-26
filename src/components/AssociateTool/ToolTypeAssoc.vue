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
        <div class="row ml-1" style="margin-top: 14rem; margin-bottom: 4rem;">                
            <div class="card mx-3 my-3"  style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);"> 
                <div class="card-header">
                    <h4 class="ls11" style="font-weight:bold">Desbobinadores</h4>
                </div>
                <div class="card-body row">                    
                    <div v-for="(tt, index) in desbobinador[0]" v-bind:key="index" class="card">                                                                                            
                        <div class="card-body" style="text-align:center;">   
                            {{tt.name}}                                                    
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                                       
                    </div>                
                </div>
            </div>
                    
            <div class="card mx-3 my-3" style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);"> 
                <div class="card-header">                   
                    <h4 class="ls11" style="font-weight:bold">Formadora de Canal</h4>                    
                </div>
                <div class="card-body row">                    
                    <div v-for="(tt, index) in formadoraDeCanal[0]" v-bind:key="index" class="card">                                                                                            
                        <div class="card-body" style="text-align:center;">                          
                            {{tt.name}}                          
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                                       
                    </div>                
                </div>
            </div>

            <div class="card mx-3 my-3"  style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">
                <div class="card-header">
                    <h4 class="ls11" style="font-weight:bold">
                        Forno de Bronze
                    </h4>
                </div>
                <div class="card-body row">
                    <div v-for="(tt, index) in fornoDeBronze[0]" v-bind:key="index" class="card">                                        
                        
                        <div class="card-body" style="text-align:center;">
                            {{tt.name}}
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="card mx-3 my-3"  style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">
                <div class="card-header" >
                    <h4 class="ls11" style="font-weight:bold">Forno de Fusão</h4>
                </div>
                <div class="card-body row">
                    <div v-for="(tt, index) in fusao[0]" v-bind:key="index" class="card">                                                                    
                        <div class="card-body" style="text-align:center;">
                            {{tt.name}}
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="card mx-3 my-3"  style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">            
                <div class="card-header" >
                    <h4 class="ls11" style="font-weight:bold">Resfriamento</h4>
                </div>
                <div class="card-body row">
                    <div v-for="(tt, index) in resfriamento[0]" v-bind:key="index" class="card">                                                                
                        <div class="card-body " style="text-align:center;">
                            {{tt.name}}
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="card mx-3 my-3"  style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">
                <div class="card-header" >
                    <h4 class="ls11" style="font-weight:bold">Fresa de Desbaste</h4>
                </div>
                <div class="card-body row">
                    <div v-for="(tt, index) in fresaDeDesbaste[0]" v-bind:key="index" class="card">                                                                
                        <div class="card-body" style="text-align:center;">
                            {{tt.name}}
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="card mx-3 my-3" style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">            
                <div class="card-header" >
                    <h4 class="ls11" style="font-weight:bold">Tesoura</h4>
                </div>
                <div class="card-body row">
                    <div v-for="(tt, index) in tesoura[0]" v-bind:key="index" class="card">                                                                
                        <div class="card-body" style="text-align:center;">
                            {{tt.name}}                            
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="card mx-3 my-3"  style="box-shadow: 8px 8px 8px rgba(0,0,0,0.5);">            
                <div class="card-header" >
                    <h4 class="ls11" style="font-weight:bold">Tracionador</h4>
                </div>
                <div class="card-body row">
                    <div v-for="(tt, index) in tracionador[0]" v-bind:key="index" class="card">                                                                
                        <div class="card-body" style="text-align:center;">
                            {{tt.name}}                            
                            <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                                Visualizar Posições
                            </router-link>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="container-tt">
            <div v-for="(tt, index) in toolType" v-bind:key="index" id="tilett">
                <div class="tileConfig">
                    <div class="col-md-12">
                    <h4 class="ls11">
                        {{tt.name}}
                    </h4>
                    </div>
                    <div class="btn-view-pos">
                        <router-link :to="{name: 'AssociateTool', params:{id:tt.toolTypeId}}" class="btn btn-success btn-block">
                            Visualizar Posições
                        </router-link>
                    </div>
                </div>
            </div>
        </div> -->
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


