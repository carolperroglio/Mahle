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
                    <h1 class="title-page-gp-s-campo" id="exButton1"><b> Apontamentos de Ordem de Produção de Tira</b> </h1>
                </li>               
            </ul>
        </div>
        <!-- <div id="order" v-show="order" style="display: none"> -->
        <div id="order" class="d-flex justify-content-center apontados">            
            <div class="col-11">
                <div class="card">
                    <div class="card-header card-header-hp">                        
                        <b><label class="ls">
                            <b><font color="#9BA6A5">OP: </font></b>{{productionOrder.productionOrderNumber}}</label>
                        <!-- <label class="ls"> -->
                            <!-- <b><font color="#9BA6A5">Id da OP: </font></b>{{productionOrder.productionOrderId}}</label>                        -->
                        </b>                     
                    </div>
                    
                    <div class="card">
                        <div class="card-header">                                    
                            <b>Materiais Consumidos e Apontados</b>                                
                            <div class="pull-right">
                                <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = '';lote = ''; unity='';loteAco='';codeAco = ''; showModal('cadAco'); ordem.type = 'input'">
                                    <i aria-hidden="true" class="fa fa-plus"></i> Registrar Aço
                                </button>
                                <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = '';productionOrderId=''; unity='';loteLiga=''; showModal('cadLiga'); ordem.type = 'input'">
                                    <i aria-hidden="true" class="fa fa-plus"></i> Registrar Liga
                                </button>
                                <button type="button" class="btn btn-success" @click.stop.prevent="quantity = ''; ordem.productId = ''; ordem.productName = ''; unity=''; showModal('cadRoloSaida');pReceita = true; ordem.type = 'output'">
                                    <i aria-hidden="true" class="fa fa-plus"></i> Registrar Rolo de Saída
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="fundo-branco-ap-tira">
                                <p class="col-md-10" v-show="teste.length == 0">
                                    {{noRegister}}
                                </p>
                                <div id="load2" v-show="carregando">
                                    <stretch background="#4d4d4d"></stretch>
                                </div> 
                                <table v-if="!carregando && teste.length > 0" class="table w-100 d-block d-md-table table-responsive table-sm table-striped" style="text-align:center" id="tabela">
                                    <thead id="teste">
                                        <tr style="background-color: black; color: white;">
                                            <th>Material</th>
                                            <th>OF/OP/OPL</th>
                                            <th>Rolo</th>
                                            <th>Quantidade</th>
                                            <th>Data</th>
                                            <th>Hora</th> 
                                            <th>Código</th>   
                                            <th>Nome</th>                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(o, index) in teste" v-bind:key="index">
                                            <td>{{o.product=='aco'?'Aço': o.product}}</td>
                                            <td>{{o.productType=='saida'?productionOrder.productionOrderNumber:o.lote}}</td>
                                            <td>{{o.rolo}}</td>
                                            <td>{{o.quantity}}</td>  
                                            <td>{{o.date}}</td>
                                            <td>{{o.hour}}</td>  
                                            <td>{{o.productType=='saida'?productionOrder.recipe.recipeCode:o.code}}</td>
                                            <td >{{o.username != undefined?o.username:''}}</td>               
                                        </tr>                                  
                                    </tbody>
                                </table>                                       
                            </div>
                        </div>
                    </div>                    
                </div>                    
            </div>
         </div>

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--   Cadastro de Rolo de Aço       -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
        <b-modal no-close-on-backdrop ref="cadAco" hide-footer title="Registrar Aço" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Rolo de Aço: </b>
                    </label>
                    <input type="text" id="prodReceita" required  :value="prodRolo=='aco'?'Aço':prodRolo" class="form-control form-control-sm" disabled>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required :value="unity = 'kg'" class="form-control form-control-sm">
                    </div>
                    </div>
                <div class="form-row">
                    <div class="form-group col-md-5">
                    <label>
                        <b>OF: </b>
                    </label>
                    <input type="text"  v-model="loteAco" class="form-control form-control-sm">
                    </div>
                     <div class="form-group col-md-5">
                    <label>
                        <b>Código: </b>
                    </label>
                    <input type="text"  v-model="codeAco" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btn-group" role="group">
                        <button class="btn btn-success" :disabled=" quantity=='' || loteAco=='' || codeAco=='' || unity==''" @click.stop.prevent="ordem.type = 'input';cadastrarApont(ordem, 'aco');">
                            <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="quantity = ''; loteAco = ''; codeAco = ''; unity = ''" class="btn btn-primary pull-right">
                            <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                        </button>
                    </div>                    
                </div>
                </div>
            </form>
         </b-modal>

        <!-- MODAL CADASTRAR LIGA -->
        <!--                      -->
        <b-modal no-close-on-backdrop ref="cadLiga" hide-footer title="Registrar Liga" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Liga: </b>
                    </label>
                    <input disabled type="text"  class="form-control form-control-sm" v-b-tooltip.hover title="NÃO HÁ OPS ATIVAS PARA A OP DE TIRA DESEJADA" placeholder="NÃO HÁ OPS DE LIGA PARA ESSA TIRA" v-show="listOP.lengt==0">
                    <select class="form-control form-control-sm" required v-model="productionOrderId" :change="loteLiga=productionOrderId.productionOrderNumber" v-if="listOP.length>0">                        
                        <option v-for="(p,index) in listOP" :value="p" v-bind:key="index" >{{ p.productionOrderNumber }}</option>
                    </select>
                    <!-- <input type="text" id="prodReceita" placeholder="nome" required v-model="ordem.productName" class="form-control form-control-sm" disabled> -->
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required :value="unity = 'kg'"  class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-5">
                        <label>
                        <b>OPL: </b>
                        </label>
                        <input type="text" :disabled="true" required v-model="loteLiga" class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" :disabled=" quantity=='' || productionOrderId=='' || unity == ''" @click.stop.prevent="ordem.type = 'input';codeAco=productionOrderId.productionOrderId;cadastrarApont(ordem, 'liga');">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="quantity = ''; quantity = ''; unity = '';productionOrderId=''" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>

        <!-- MODAL CADASTRAR ROLO DE SAÍDA -->
        <b-modal no-close-on-backdrop ref="cadRoloSaida" hide-footer title="Registrar Rolo de Saída" modal-header-close>
            <form>
                <div>
                    <div class="form-row">
                    <div class="form-group col-md-6">    
                    <label>
                        <b>Rolo de Saída: </b>
                    </label>
                    <input type="text" id="prodReceita" required v-model="roloSaida" class="form-control form-control-sm" disabled>
                    </div>
                    <div class="form-group col-md-3">
                    <label>
                        <b>Quantidade: </b>
                    </label>
                    <input type="number" required v-model="quantity" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-2">
                    <label>
                        <b>Unidade: </b>
                    </label>
                    <input type="text" required :value="unity = 'kg'"  class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-3">
                    <label>
                        <b>Nº do Rolo: </b>
                    </label>
                    <input type="text" required v-model="rolo" disabled class="form-control form-control-sm">
                    </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group">
                            <button class="btn btn-success" v-show="pReceita" @click.stop.prevent="ordem.type = 'output';cadastrarApont(ordem, 'saida');">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>
                            <button @click.stop.prevent="quantity = ''; unity = '';" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                            </button>
                        </div>
                    </div>
                </div>
            </form>
         </b-modal>
        <!-- MODAL ERRO -->
          <b-modal ref="modalErro" no-close-on-backdrop title="" hide-footer="">
            <p class="alert alert-danger">{{msgErro}}</p>
        </b-modal>
    </div>
</template>
<script src="./js/historianProductionTira.js">
</script>
<style>
@import url('./css/historianproductionTira.css');
</style>
