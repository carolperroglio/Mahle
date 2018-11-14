<template>
  <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--      Barra de busca de OP       -->
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
         <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod nav-item-gp col-md-12">
                <h1 class="title-page-gp-s-campo"> <b>Apontamentos de Ordens de Produção</b> </h1>
            </li>
            <li class="col-md-12">
                <p></p>
            </li>
            </ul>
        </div>
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div> 



        <!--                       -->
        <!--                       -->
        <!--        Table          -->
        <!--       Registros       -->
        <!--         OP            -->
        <!--                       -->
        <!--                       -->
        <table v-if="!carregando && orderHistorian.length>0" class="table table-responsive w-100 d-block d-md-table table-striped apontamentos mb-5" id="tabela">
            <thead id="teste">
                <tr style="background-color: black; color: white;">
                    <th>OP</th>
                    <th>Estação</th>
                    <th>Status</th>
                    <th>Tipo de Ordem</th>
                    <th></th>
                    <th></th>                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, index) in orderHistorian" v-bind:key="index">
                    <td>{{o.productionOrderNumber}}</td>
                    <td>{{o.thingName}}</td>
                    <td>{{o.currentStatus | filterStatus}}</td>
                    <td>{{o.typeDescription}}</td>  
                    <td>
                        <router-link v-if="o.typeDescription == 'Liga' && o.showbutton==false"  class="btn  btn-info" :to="{ name: 'HistorianProductionLiga', params: { id: o.productionOrderId }}">Realizar Apontamento</router-link>
                        <router-link v-if="o.typeDescription == 'Tira'" class="btn  btn-info"  :to="{ name: 'HistorianProductionTira', params:{id: o.productionOrderId}}">Realizar Apontamento</router-link>
                    </td>
                    <td>
                        <button v-if="o.typeDescription == 'Liga'" v-show="o.currentStatus == 'active' && o.showbutton" class="btn  btn-warning" @click="showModal('inicioOP'); idOpAtual = o.productionOrderId">Realizar Cálculo</button>                        
                        <button v-if="o.currentStatus == 'approved' || o.currentStatus == 'dumping' || o.typeDescription == 'Tira'" class="btn  btn-danger" @click="temp=o;title=(o.typeDescription=='Tira'?'OP':'OPL');showModal('modalEncerraOp')">Encerrar OP</button>
                    </td>                  
                </tr>                                  
            </tbody>
        </table>       
        

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--       Encerra         -->
        <!--         OP           -->
        <!--                       -->
        <!--                       -->
        <b-modal no-close-on-backdrop ref="inicioOP" title="Realizar Cálculo" hide-footer>
            <div class="form-row">
                <div class="form-group col-md-10 offset-1">
                    <label for="">Última OPL Utilizada no Forno</label>
                    <input autocomplete="off" @keyup="getOPResult(opNumber)" v-model="opNumber"  class="form-control"/>
                    <b-dropdown-item @click.stop.prevent="opNumber = op.productionOrderNumber; ops=[]; opSelected=op" v-for="(op,index) in ops" :key="index">{{ op.productionOrderNumber }}</b-dropdown-item>
                </div>
            </div>
            <div class="form-row" v-if="opSelected.productionOrderNumber">
                <div class="form-group col-md-10 offset-1">
                    <label for="">Carga Utilizada</label>
                    <input type="text" class="form-control" v-model="cargaUtilizada">
                </div>
            </div>
            <div class="modal-footer row">
                <div class="pull-left">
                    <input type="checkbox" v-model="cr" value="true" id="scale"/> 
                    <label for="scale">Para OPL sem pé de banho clique aqui</label>
                </div>
                <div class="btn-group pull-right" role="group">                    
                    <button class="btn  btn-success"  :disabled="opSelected.productionOrderNumber==null && cr==false" @click.stop.prevent="getLastAnalysis(opSelected);(opSelected.productionOrderNumber!=null)?aponta(opSelected, cargaUtilizada):'';">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="''" class="btn  btn-primary">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
        </b-modal>


        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--       Encerra         -->
        <!--         OP            -->
        <!--                       -->
        <!--                       -->
        <b-modal no-close-on-backdrop ref="modalEncerraOp" hide-footer :title="'Encerrar '+title">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja encerrar a {{title}}?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="temp.typeDescription=='Tira'?encerrarOPTira(temp):encerrarOP(temp);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>  
                        <button @click.stop.prevent="hideModal('modalEncerraOp')" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar                            
                        </button>                       
                    </div>
                </div>
            </div>
         </b-modal>
        
        <b-modal ref="modalErro" no-close-on-backdrop title="" hide-footer="">
            <p :class="erro? 'alert alert-danger':'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianMain.js">
</script>
<style>
@import url('./css/historianMain.css');
</style>
