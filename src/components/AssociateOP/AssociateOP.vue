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
            <h1 class="title-page-assop"> 
                <b>Associação de OP</b>
            </h1>
            <ul class="nav d-flex align-items-center">
                <li class="nav-item nav-item-assop col-sm-1.5">
                    <b>&nbsp&nbsp&nbsp Número da Ordem:</b>
                        <input @keyup="OPs=getOPs(numOP)" v-model="numOP" placeholder="Número" class="btn btn-outline-secondary dropdown-toggle btn-sm" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <b-dropdown-item class="dropdown-item" v-if="notSelected" @click.stop.prevent="OPId = o.productionOrderId;
                                numOP = o.productionOrderNumber;
                                typeId = o.productionOrderTypeId;
                                notSelected = false;
                                openSelectGroup(o)" v-for="(o,index) in OPs" v-bind:key="index">{{o.productionOrderNumber}}
                            </b-dropdown-item>
                </li>                                                          
                <li class="nav-item nav-item-assop col-sm-1.5" v-if="group">                                                                                                              
                    <b>&nbsp&nbsp Grupo:</b>
                        <select class="form-control-outline-secondary form-control-sm" v-model="groupId"  v-on:change="openSelectThings()">
                            <option v-for="(g,index) in Groups" :value="g.thingGroupId" v-bind:key="index">{{ g.groupName }}
                            </option>
                        </select> 
                </li>   
                <li class="nav-item nav-item-assop col-sm-2"  v-if="thing || groupId != ''"> 
                    <b>Thing:</b>
                        <select class="form-control-outline-secondary form-control-sm" v-model="thingId">    
                            <option v-for="(t,index) in Things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}
                            </option>
                        </select>
                </li>   
                <li class="nav-item nav-item-assop"  v-if="thing || groupId != ''">  
                    <div v-if="assoc">
                        <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="getAssoc()">
                            Associar OP   
                        </button>
                    </div>
                    <div  v-if="disassoc">
                        <button type="button" class="btn btn-danger btn-sm" @click.stop.prevent="getDisAssoc()">
                            Desassociar OP
                        </button>
                    </div>
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
        <div class="OPAssoc col-11">
            <div class="progress" v-show="carregando">
                            <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        </div>
                            </div>    

             <div> 
                 <div v-show="listaOPs"> 
                 <div v-for="(op, index) in ProductionOrders" v-bind:key="index">   
                <div class="card">
                    <div class="card-header card-header-ass-op">
                        <b>Ordem de Produção {{op.productionOrderNumber}}</b>
                    </div>
                        <div class="card-body card-body-ass-op">
                           <label class="ls ls3">
                                <b><font color="#9BA6A5">Status: </font></b>{{op.currentStatus}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{op.quantity}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{op.typeDescription}}</label>&nbsp;&nbsp;&nbsp;
                            <div class="btn-group">
                            <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="openSelectGroup(op)" v-on:click="assoc=true">
                                Associar OP   
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" @click.stop.prevent="openSelectGroup(op)" v-on:click="disassoc=true">
                                Desassociar OP
                            </button>
                            </div> 
                        </div>
                </div>  
                 </div> 
             </div>   
            </div>
            
            <div v-show="lista || OP.length > 0">      
                <div class="card">
                    <div class="card-header card-header-ass-op">
                        <b>Ordem de Produção {{OP.productionOrderNumber}}</b>
                    </div>
                        <div class="card-body card-body-ass-op">
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Status: </font></b>{{OP.currentStatus}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{OP.quantity}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{OP.typeDescription}}</label>&nbsp;&nbsp;&nbsp;

                        </div>
                </div>      
            </div>
            <br>
             <div v-show="lista2" class="card">
                    <div class="card-header card-header-ass-op">
                        <b>Thing Associada</b>
                    </div>
                    <div class="card-body card-body-ass-op">
                        <label class="ls ls3">
                            <b><font color="#9BA6A5">Código: </font></b></label>
                        <label class="ls ls3">{{Thing.thingCode}}</label>
                        <br>
                        <label class="ls ls3">
                            <b><font color="#9BA6A5">Nome: </font></b></label>
                        <label class="ls ls3">{{Thing.thingName}}</label>
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
<script src="./js/associateOP.js">
</script>
<style>
@import url("./css/associateOP.css");
</style>


