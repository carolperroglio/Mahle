<template>
<div>
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->
        <nav class="fixed-top nav-cinza">
            <ul class="nav d-flex">
                <li class="nav-item-hist nav-item-gp col-md-12">
                    <h1 class="title-page-gp col-md-10"><b>Relatório de Genealogia de Tira</b></h1>                                                        
                </li>
                <li class="nav-item-genealogy col-md-0">
                    <select class="form-control form-control-md" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="cod">Código da Tira</option>
                        <option value="date">Data</option> 
                        <option value="op">OP</option>                                               
                    </select>
                </li>    
                <li class="nav-item-genealogy form-group col-sm-0" v-show="fieldFilter=='cod'">
                    <label><b>Código da Tira </b></label>      
                </li>
               <li class="nav-item-genealogy col-sm-1" v-show="fieldFilter=='cod'">                                         
                    <input class="form-control" v-model="recipeCode" @keyup="prosFim=getResults(RECIPE_API,recipeCode, prosFim); cod=''" >                                                                                 
                    <div class="auto-complete">
                        <b-dropdown-item @click.stop.prevent="recipeCode=r.recipeCode;cod=r.recipeId;prosFim=[]" v-for="(r,index) in prosFim" :key="index">{{ r.recipeCode }}</b-dropdown-item>                                           
                    </div>
                </li> 
                <li class="nav-item-genealogy form-group col-sm-0" v-show="fieldFilter=='cod' || fieldFilter=='date'">
                    <label><b>Início </b></label>      
                </li>
               <li class="nav-item-genealogy col-sm-1"  v-show="fieldFilter=='cod' || fieldFilter=='date'">
                    <datetime type="datetime" input-class="form-control" v-model="inicio" format="yyyy-MM-dd HH:mm:ss"></datetime>     
                </li>              
                <br>     
                <li class="nav-item-genealogy form-group col-sm-0" v-show="fieldFilter=='cod' || fieldFilter=='date'">
                    <label><b>Fim </b></label>      
                </li>                
                <li class="nav-item-genealogy col-sm-1" v-show="fieldFilter=='cod' || fieldFilter=='date'">
                    <datetime type="datetime" input-class="form-control" v-model="fim" format="yyyy-MM-dd HH:mm:ss"></datetime>     
                </li>
                <li class="nav-item-genealogy col-sm-0" v-show="fieldFilter=='op'">
                    <label><b>OP </b></label> 
                </li>
                <li class="nav-item-genealogy col-sm-1" v-if="fieldFilter=='op'">
                    <input placeholder="Número da OP" class="form-control" v-model="opName" @keyup="prosFim=getResults(URL_OP,opName, prosFim); op=''" >                                                                                 
                    <div class="auto-complete">
                        <b-dropdown-item @click.stop.prevent="opName=o.productionOrderNumber;op=o.productionOrderId;prosFim=[]" v-for="(o,index) in prosFim" :key="index" style="cursor:pointer">{{ o.productionOrderNumber }}</b-dropdown-item>
                    </div>
                </li> 
                <li class="nav-item-genealogy col-sm-2">
                    <button class="btn btn-success" :disabled="!fieldFilter || (fieldFilter=='date' && !inicio && !fim) || (fieldFilter=='op' && !op) || (fieldFilter=='cod' && !inicio && !fim && !cod)" @click.stop.prevent="getGenealogy(fieldFilter, op, cod, inicio, fim)">
                        <i class="fa fa-check-square"></i> Confirmar
                    </button>
                </li>
                <li class="col-2 text-right">
                    <button type="button" class="btn btn-outline-danger" @click.prevent="toPdf()">
                        <i class="fa fa-file-pdf-o"></i> Exportar para PDF
                    </button>
                </li>
            </ul>
        </nav>

        <div id="load-genealogy" class="text-center" v-show="carregando">
            <h1 >Gerando Relatório !</h1>
            <p >por favor aguarde</p>
            <stretch class="" background="#4d4d4d"></stretch>                
        </div>
        <div class="row row-conteudo" v-show="!carregando">            
            <div class="col-md-12">                
                <div class="row" v-for="(genealogy,index) in genealogys" v-bind:key="index">                    
                    
                    <!--                 -->
                    <!-- Inicio loop ops -->
                    <!--                 -->                    
                    <div class="col-md-10 offset-1">
                        <b-card-header header-tag="header">
                            <div class="row">
                                <div class="col-md-3">
                                    <b>OP:</b> {{genealogy.orderId}}
                                </div>
                                <div class="col-md-3">
                                    <b>Data Inicio: </b> {{ticksToDate(genealogy.startDate)}}
                                </div>
                                <div class="col-md-3">
                                    <b>Data Fim: </b> {{ticksToDate(genealogy.endDate)}}
                                </div>
                                <div class="col-md-2" v-if="genealogy.outputRolos.length">
                                    <i class="cursor-class fa fa-expand" :id="'iconOutput'+genealogy.orderId" aria-hidden="true" @click="verificaColapse('#iconOutput'+genealogy.orderId,'#roloOutput'+(genealogy.orderId),'fa-expand','fa-compress')" v-b-toggle="'roloOutput'+(genealogy.orderId)"></i>
                                </div>
                            </div>
                        </b-card-header>

                        <!--                         -->
                        <!-- Inicio loop rolos saida -->
                        <!--                         -->
                        <b-collapse :id="'roloOutput'+(genealogy.orderId)">
                            <div class="row">
                                <div class="col-md-1" v-for="(outputRolo,indexOutput) in genealogy.outputRolos" :key="indexOutput">                                                                                                                         
                                    <b-btn  @click="verificaColapse('#icon'+genealogy.orderId+indexOutput,'#rolo'+(genealogy.orderId+indexOutput),'fa-plus','fa-minus')"  v-b-toggle="'rolo'+(genealogy.orderId+indexOutput)" variant="info">
                                        Rolo {{indexOutput+1}}
                                        <i class="fa fa-plus" :id="'icon'+genealogy.orderId+indexOutput" aria-hidden="true" style="font-size:15px;"></i>
                                    </b-btn>                                                                                                                                                                                                                                                               
                                </div>                                
                                <div class="col-md-1">                                       
                                    <b-btn @click="verificaColapse('#iconTool'+index+genealogy.orderId,'#tool'+(index+''+genealogy.orderId),'fa-plus','fa-minus')" v-b-toggle="'tool'+index+''+genealogy.orderId">Ferramentas <i class="cursor-class fa fa-plus" :id="'iconTool'+index+genealogy.orderId" aria-hidden="true" style="font-size:15px;"></i></b-btn>                                    
                                </div> 
                            </div>
                            <br>
                            <div class="col-md-12" v-for="(outputRolo,indexOutput) in genealogy.outputRolos" :key="indexOutput">                                        
                                <b-collapse :id="'rolo'+(genealogy.orderId+indexOutput)" class="row">                                                                                                                                                                                                                                                                                                                                                                                                       
                                    <div class="row"> 
                                        <div class="col-md-4">
                                            <b-btn class="col-md-5" @click="verificaColapse('#iconMateria'+index+''+indexOutput,'#materia'+(index+''+indexOutput),'fa-plus','fa-minus')" v-b-toggle="'materia'+index+''+indexOutput">Materia Prima <i class="cursor-class fa fa-plus" :id="'iconMateria'+index+''+indexOutput" aria-hidden="true" style="font-size:15px;"></i></b-btn>
                                        </div>                                           
                                    </div> 
                                    <b-collapse :id="'materia'+index+''+indexOutput">
                                        <div v-for="(m, indexMateria) in outputRolo.ordersLiga" :key="indexMateria">
                                        <div class="col-md-6">
                                            <b>OPL:</b> {{m.order}}
                                        </div>  
                                        <table class="table table-hover">                                            
                                            <thead>
                                                <tr>
                                                    <th>Elemento</th>
                                                    <th>Quantidade</th>
                                                    <th>Lote</th>
                                                    <th>Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(p, indexProduto) in m.productsInput" :key="indexProduto">
                                                    <td>{{p.product}}</td><td>{{p.quantity}}</td><td>{{p.batch}}</td><td>{{ticksToDate(p.date)}}</td>
                                                </tr>                                                
                                            </tbody>    
                                        </table> 
                                        </div>
                                    </b-collapse>                                                                                                      
                                    
                                    <div class="row"> 
                                        <div class="col-md-4">                                       
                                            <b-btn class="col-md-5" @click="verificaColapse('#iconAco'+index+''+indexOutput,'#aco'+index+''+indexOutput,'fa-plus','fa-minus')" v-b-toggle="'aco'+index+''+indexOutput">Aço <i class="cursor-class fa fa-plus" :id="'iconAco'+index+''+indexOutput" aria-hidden="true" style="font-size:15px;"></i></b-btn>                                    
                                        </div>
                                    </div>
                                    <b-collapse :id="'aco'+index+''+indexOutput">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>N° do rolo</th>
                                                    <th>Quantidade</th>
                                                    <th>Lote</th>
                                                    <th>Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(a, indexAco) in outputRolo.rolosInput" :key="indexAco">
                                                    <td>{{a.numeroRolo}}</td><td>{{a.qtd}}</td><td>{{a.lote}}</td><td>{{ticksToDate(a.data)}}</td>
                                                </tr>                                                
                                            </tbody>    
                                        </table>
                                    </b-collapse>                                                                                                                    
                                </b-collapse>                                 
                            </div>        
                            <b-collapse :id="'tool'+index+''+genealogy.orderId">                                                                                           
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Rastreamento</th>
                                            <th>Uso</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(t, indexTool) in genealogy.tools" :key="indexTool">
                                            <td>{{t.typeName}}</td><td>{{t.serialNumber}}</td><td>{{t.vidaUtil}}</td><td>{{ticksToDate(t.data)}}</td>
                                        </tr>                                                
                                    </tbody>    
                                </table>
                            </b-collapse>                                                                              
                        </b-collapse>         
                    </div>
                </div>
            </div>                
        </div>     
    <br>
    <!--                       -->
    <!--                       -->
    <!--        Modal          -->
    <!--         Erro          -->
    <!--                       -->
    <!--                       -->
    <!--                       -->
    <b-modal no-close-on-backdrop ref="modalErro" size="md" title="Erro" hide-footer="">
        <p class="alert alert-danger">Ocorreu um erro: {{erro}}</p>
    </b-modal>
</div>
        
</template>

<script src="./js/genealogyReport.js">
</script>

<style>
@import url("./css/genealogyReport.css");
</style>
