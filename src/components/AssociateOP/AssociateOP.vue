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
                 <h1 class="title-page"> <b>Associação de OP</b></h1>
                   
                <li class="nav-item col-sm-1.5">  
                     <label><b>Número da Ordem: </b></label>     
                     <div class="dropdown">   
                            <input @keyup="OPs=getOPs(numOP)" v-model="numOP" placeholder="Número" class="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" @click.stop.prevent="OPId = o.productionOrderId;
                                                                              numOP = o.productionOrderNumber;
                                                                              typeId = o.productionOrderTypeId;
                                                                              openSelectGroup()" v-for="(o,index) in OPs">{{o.productionOrderNumber}}</a>                            
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
                    <select class="form-control-outline-secondary form-control" v-model="thingId">
                        <option v-for="(t,index) in Things" :value="t.thingId">{{ t.thingName }} : {{t.thingId}}</option>
                    </select>    
                </li>
                <li class="nav-item col-sm-1.5"  v-if="thing || groupId != ''">
                    <button type="button" class="btn btn-success btn-sm" @click.stop.prevent="getAssoc()">
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
            <div v-show="lista || OP.length > 0">      
                <div class="card">
                    <div class="card-header">
                        <b>Ferramenta Associada</b>
                    </div>
                        <div class="card-body">
                            <div class="alert alert-danger form-control" v-show="mensagem!=''" role="alert">{{mensagem}}</div>
                            <div class="alert alert-success form-control" v-show="mensagemSuc!=''" role="alert">{{mensagemSuc}}</div>
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Status: </font></b>{{OP.currentStatus}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Production Order no: </font></b>{{OP.productionOrderNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Quantidade: </font></b>{{OP.quantity}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls ls3">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{OP.typeDescription}}</label>&nbsp;&nbsp;&nbsp;

                        </div>
                </div>      
            </div>
            <br>
             <div v-show="lista2" class="card">
                    <div class="card-header">
                        <b>Thing Associada</b>
                    </div>
                    <div class="card-body">
                        <label class="ls">
                            <b><font color="#9BA6A5">Código: </font></b></label>
                        <label class="ls">{{Thing.thingCode}}</label>
                        <br>
                        <label class="ls">
                            <b><font color="#9BA6A5">Nome: </font></b></label>
                        <label class="ls">{{Thing.thingName}}</label>
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


