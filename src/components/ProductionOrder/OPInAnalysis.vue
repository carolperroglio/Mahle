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
                    <h1 class="title-page-gp-s-campo"> <b>Ordens de Produção Em Análise</b> </h1>
                </li>
                <li class="col-md-12">
                    <p></p>
                </li>
            </ul>
        </div>
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div> 
        <h3 style="text-align:center"></h3>
        <p class="col-md-10" v-show="opInAnalysis.length == 0" v-if="!carregando">
            Sem Ordens de Produção para Análise
        </p>
        <table v-if="!carregando && opInAnalysis.length>0" class="table table-responsive w-100 mb-5 d-block d-md-table table-sm table-striped" id="tabela-op-analisys">
            <thead id="teste">
                <tr style="background-color: black; color: white;">
                    <th>OPL</th>
                    <th>Equipamento</th>
                    <th>Status</th>    
                    <th></th>                                               
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, index) in opInAnalysis" v-bind:key="index">
                    <td>{{o.productionOrderNumber}}</td>
                    <td>{{o.posicao}}</td>
                    <td>{{o.status | filterStatus}}</td>  
                    <td>
                        <button class="btn btn-primary" @click.stop.prevent="showModal('realizarAnalise'); idOP = o.productionOrderId;cobreqtd = '';cobre = {}; getProductsOP(o);" >Realizar Análise</button>   
                    </td>                  
                </tr>                                  
            </tbody>
        </table>    
        <div class="paginacao" v-show="total>0">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="getResults(startat-=20, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="getResults(startat=num*20, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+20<total">
                        <a class="page-link" href="#" @click.stop.prevent="getResults(startat+=20, quantityPage)">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <b-modal no-close-on-backdrop size="md" ref="realizarAnalise" id="realizarAnalise" hide-footer title="Realizar Análise">
            <div class="form-row">
                <div class="form-group col-md-5">
                    <select class="form-control" id="" disabled>
                        <!-- COLOCAR O ID FIXO DEPOIS -->
                        <option value="someid" selected>Cobre Fosforoso</option>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <input type="number" class="form-control" v-model="cobreqtd" placeholder="" />
                </div>
                <div class="form-group-col-md-2">
                    <button class="btn btn-success" @click.stop.prevent="addCobre(cobreqtd)" :disabled="cobreqtd.length == 0">
                        Adicionar Cobre
                    </button>                    
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-10">
                    <ul v-for="value in cobre" :key="value" class="list-group">
                        <li class="list-group-item">{{'Cobre Fosforoso: ' + value}} 
                            <i class="fa fa-remove pull-right" style="color:red" @click="removeCobre()"></i>
                        </li>
                    </ul>    
                </div>
            </div>
            <div>
                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label for="">Componente</label>
                    </div>
                    <div class="form-group col-md-5">
                        <label for="">Resultado da Análise(%)</label>
                    </div>
                </div>
                <div class="form-row" v-if="comp.type!='scrap' && comp.type != 'semi_finished'" v-for="comp in components" :key="comp.productId">
                    <div class="form-group col-md-5">
                        <input disabled v-model="comp.productName" class="form-control" id="dropdownMenuButton"/>
                    </div>
                    <div class="form-group col-md-5">
                        <input type="number" v-if="comp.type=='base_product'" disabled class="form-control" v-model="comp.value">
                        <input type="number" v-else class="form-control" v-model="comp.value" @keyup="blockConfirmButton();">                        
                    </div>                    
                </div>
            </div>               
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" @click="realizarAnálise();hideModal('realizarAnalise');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="components = []; comp = {};productName = ''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
            </div>
        </b-modal>
        <b-modal no-close-on-backdrop ref="modalErro" title="" hide-footer="">
            <p :class="erro?'alert alert-danger':'alert alert-success'">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/orderLigaWaitingApproval.js">
</script>
<style>
@import url('./css/opInAnalysis.css');
</style>
