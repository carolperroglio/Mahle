<template>
  <div>
        <!-- <nav class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod nav-item-gp col-md-12">
            <h1 class="title-page-gp-s-campo"><b>Visualização de Status de MES</b></h1>
            </li>
            </ul>
        </nav> -->
        <div class="row conteudo-status">
            <div class="container-fluid">
                <div class="status">
                    <div class=" col-md-11" style="margin-bottom:5%;">
                        <div class="card">
                            <div class="card-header">
                                Painel de Alarmes
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        Dentro dos limites de controle: <i class="fa fa-square" style="color:#90EE90" aria-hidden="true"></i>
                                    </div>                                     
                                    <div class="col-md-3">
                                        Fora dos limites de controle: <i class="fa fa-square" style="color:#f5fc28" aria-hidden="true"></i>  
                                    </div> 
                                    <div class="col-md-3">
                                        Fora dos limites de especificação: <i class="fa fa-square" style="color:#ed0404" aria-hidden="true"></i>
                                    </div> 
                                    <div class="col-md-3">
                                        Offline: <i class="fa fa-square" style="color:#b2b7b2" aria-hidden="true"></i>
                                    </div>                                     
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div v-for="(s, index) in status" v-bind:key="index" id="constat" class="">
                            <div :style="getClass(s)">
                                <h4 class="ls ls22" >
                                    {{s.thingName}}
                                </h4>
                                <div>
                                    <label v-if="s.hasRedAlert == true">
                                        <b>Parâmetro:</b>
                                        <span v-for="(a, index) in s.alarms" v-bind:key="index" v-if="a.priority == 2">
                                            {{a.alarmName}}, 
                                        </span>
                                    </label>
                                    <label v-else-if="s.hasLowAlert == true">
                                        <b>Parâmetro:</b>
                                        <span v-for="(a, index) in s.alarms" v-bind:key="index"  v-if="a.priority == 1">
                                            {{a.alarmName}}, 
                                        </span>
                                    </label>
                                                                
                                    <br>
                                </div>
                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-columns">
                        <div v-for="(s, index) in status" v-bind:key="index" class="card mx-3 my-3" style="box-shadow: 10px 10px 10px rgba(0,0,0,0.5);" :style="getClass(s)">                            
                            <div class="card-header">
                                <h4 class="ls ls22" >
                                    {{s.thingName}}
                                </h4>
                            </div>
                           
                            <div class="card-body">                                                                                                
                                <label v-if="s.hasRedAlert == true">
                                    <b>Parâmetro:</b>
                                    <span v-for="(a, index) in s.alarms" v-bind:key="index" v-if="a.priority == 2">
                                        {{a.alarmName}}, 
                                    </span>
                                </label>
                                <label v-else-if="s.hasLowAlert == true">
                                    <b>Parâmetro:</b>
                                    <span v-for="(a, index) in s.alarms" v-bind:key="index"  v-if="a.priority == 1">
                                        {{a.alarmName}}, 
                                    </span>
                                </label>                                                                                        
                                <label v-else>                                 
                                </label>
                            </div>                            
                        </div>                        
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./js/status.js">
</script>

<style>
@import url("./css/status.css");
</style>
