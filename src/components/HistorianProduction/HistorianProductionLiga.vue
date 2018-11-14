<template >
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
            <h1 class="title-page-gp-s-campo" id="exButton1"><b> Apontamentos de Ordem de Produção de Liga (OPL)</b> </h1>
            </li>               
            </ul>
        </div>

        <div id="order" v-show="order" class="row d-flex justify-content-center apontados">            
            <div class="col-11">
                <div class="card">
                    <div class="card-header">                        
                        <b><label><b><font color="#9BA6A5">Nº da OP: </font></b>{{productionOrder.productionOrderNumber}}</label></b>
                        <!-- <label><b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>                                                             -->
                    </div>
                    <div v-show="lista">
                        <div class="card">
                            <div class="card-header">
                                <b>Materiais Apontados</b>
                                <div class="pull-right">                                 
                                    <button type="button" class="btn btn-success"  @click.stop.prevent="ordem.quantity =='';getAnalysis();showModal('myModalRef'); ordem.type='input'">
                                        <i aria-hidden="true" class="fa fa-plus"></i> Registrar Matéria-Prima
                                    </button>                                
                                    <button v-if="productionOrder.status == 'approved'" type="button" class="btn btn-danger" @click.stop.prevent="getAnalysis();showModal('lastAnalysis'); ordem.type='input'">
                                        <i aria-hidden="true" class="fa fa-eye"></i> Exibir Última Análise
                                    </button>
                                    <button v-else type="button" class="btn btn-danger"  v-show="productionOrder.status == 'reproved'" @click.stop.prevent="getAnalysis();showModal('correction'); ordem.type='input'">
                                        <i aria-hidden="true" class="fa fa-eye"></i> Correção
                                    </button>
                                    <button type="button" class="btn btn-primary"  @click.stop.prevent="changeStatusToWaitingAnalysis()" v-if="productionOrder.status == 'active' || productionOrder.status == 'reproved'">
                                        <i class="fa fa-flask" aria-hidden="true"></i> Liberar para Análise
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="col-md-10" v-show="allProducts.length == 0 && !carregando">
                                    {{noRegister}}
                                </p>
                                <div id="load2" v-show="carregando">
                                    <stretch background="#4d4d4d"></stretch>
                                </div> 
                                <table v-if="!carregando && allProducts.length > 0" class="table table-sm table-responsive w-100 d-block d-md-table table-striped" style="text-align:center" id="tabela">
                                    <thead id="teste">
                                        <tr style="background-color: black; color: white;">
                                            <th>Material</th>
                                            <th>Quantidade</th>
                                            <th>Lote/OPL</th>
                                            <th>Data</th>
                                            <th>Hora</th>
                                            <th>Nome</th>                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(o, index) in allProducts" v-bind:key="index">
                                            <td>{{o.product}}</td>
                                            <td>{{o.quantity}}</td>
                                            <td>{{o.lote}}</td>
                                            <td>{{o.date}}</td>  
                                            <td>{{o.hour}}</td>
                                            <td>{{o.username != undefined?o.username:''}}</td>                  
                                        </tr>                                  
                                    </tbody>
                                </table>                                                          
                            </div>                                                   
                        </div>
                    </div>
                </div>                        
            </div>
        </div>        

         <!-- 
            CORREÇÃO - É EXIBIDA SE A OP FOI REPROVADA
          -->
        <b-modal no-close-on-backdrop size="md" ref="correction" hide-footer title="Correção">
            <form>
                <div v-show="lastAnalysis.messages">
                    <table class="table table-responsive w-100 d-block d-md-table table-sm table-striped" style="text-align:center" id="tabela">
                        <thead id="teste">
                            <tr style="background-color: black; color: white;">
                                <th>Material</th>
                                <th>Quantidade necessária a ser adicionada no forno(Kg)</th>                                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l, index) in lastAnalysis.messages" v-bind:key="index">
                                <td>{{l.key}}</td>
                                <td>{{l.value}}</td>                                                
                            </tr>                                  
                        </tbody>
                    </table>  
                    <div v-if="cobreFosforoso!= null">                        
                        <label class=""><b>Cobre Fosforoso:</b> {{cobreFosforoso}}</label>
                    </div>                                        
                </div>
            </form>
         </b-modal>

         <!-- 
            LAST ANALYSYS - É EXIBIDA SE A OP FOI APROVADA
          -->
         <b-modal no-close-on-backdrop size="sm" ref="lastAnalysis" hide-footer title="Última Análise">
            <form>
                <table v-if="calculoOK" class="table table-responsive w-100 d-block d-md-table table-sm table-striped" style="text-align:center" id="tabela">
                    <thead id="teste">
                        <tr style="background-color: black; color: white;">
                            <th>Material</th>
                            <th>Resultado(%)</th>                                                
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(l, index) in lastAnalysis.comp" v-bind:key="index">
                            <td>{{l.productName}}</td>
                            <td>{{l.value}}</td>                                                
                        </tr>                                  
                    </tbody>
                </table>   
                <div v-if="cobreFosforoso!= null">                        
                    <label class=""><b>Cobre Fosforoso:</b> {{cobreFosforoso}}</label>
                </div>             
            </form>
         </b-modal>
        <!--                                 -->
        <!--   Cadastro de orderHistorian    -->
        <!--               Modal             -->
        <b-modal no-close-on-backdrop ref="myModalRef" hide-footer title="Registrar Matéria-Prima">
            <div v-show="!carregandoAnalysis && calculos.length>0">
                <table class="table table-responsive w-100 d-block d-md-table table-sm table-striped" style="text-align:center" id="tabela">
                    <thead id="teste">
                        <tr style="background-color: black; color: white;">
                            <th>Material</th>
                            <th>Quantidade necessária a ser adicionada no forno(Kg)</th>                                                
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(c, index) in calculos" v-bind:key="index">
                            <td>{{c.key}}</td>
                            <td>{{c.value}}</td>                                                
                        </tr>                                  
                    </tbody>
                </table>  
                <div v-if="cobreFosforoso!= null">                        
                    <label class=""><b>Cobre Fosforoso:</b> {{cobreFosforoso}}</label>
                </div>                                 
            </div>
            <div v-show="carregandoAnalysis" class="row">                        
                <stretch class="col-md-12" background="#4d4d4d"></stretch>
            </div>                 
            <br/><br/>
            <form>
                <div>                    
                    <div class="form-row" >
                        <div class="form-group col-md-6">
                            <label><b>Escolha o produto: </b></label>
                            <select class="form-control form-control-sm" v-model="prodChoose" @change="prodRolo = ''">
                                <option v-if="productionOrder.currentStatus == 'approved'" value="cobre"> Cobre Fosforoso</option>
                                <option value="prodRecipe">Matéria prima da liga</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6" v-if="prodChoose == 'cobre'">
                            <label>Material</label>
                            <select class="form-control form-control-sm" v-model="prodRolo">
                                <option value="70">Cobre Fosforoso</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6" v-else>
                            <label>
                                <b>Materiais </b>
                            </label>
                            <select class="form-control form-control-sm" v-model="prodRolo">
                                <option v-if="p.phaseProductType != 'contaminent' && p.phaseProductType != 'semi_finished'" v-for="(p,index) in orderPhaseProducts" :value="p.product.productId" v-bind:key="index">{{ p.product.productName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                    
                        <div class="form-group col-md-3">
                            <label>
                                <b>Quantidade </b>
                            </label>
                            <input type="number" required v-model="quantity" class="form-control form-control-sm">
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>Unidade </b>
                            </label>
                            <input type="text" required :value="unity ='kg'"  class="form-control form-control-sm">
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Lote </b>
                            </label>
                            <input type="text" required v-model="lote" class="form-control form-control-sm">
                        </div>                        
                    </div>                   
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" :disabled="!quantity ||prodRolo == ''||lote ==''|| unity ==''" @click.stop.prevent="cadastrarApont(ordem);hideModal('myModalRef')">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="quantity =''; lote = ''; unity = ''" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button> 
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>

         <b-modal no-close-on-backdrop ref="modalErro" title="" hide-footer="">
            <p :class="erro? 'alert alert-danger':'alert alert-info'">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianProductionLiga.js">
</script>
<style>
@import url('./css/historianproductionLiga.css');
</style>
