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
                <li class="col-md-4 mb-1">             
                    <button type="button" class="btn btn-primary" @click.prevent="showModal('myModalEdit')">Filtrar Busca</button>                      
                </li>
                
                <li class="mr-1">               
                    <button type="button" class="btn btn-danger" :disabled="!genealogys || genealogys.length==0" @click.prevent="toPdfAutoTable()">
                        <i class="fa fa-file-pdf-o"></i> Exportar para PDF
                    </button>  
                    <button type="button" class="btn btn-success" :disabled="!genealogys || genealogys.length==0" @click.prevent="exportExcel('members.xlsx')">
                        <i class="fa fa-file-pdf-o"></i> Exportar para Excel
                    </button>
                
                </li>
            </ul>
        </nav>

        <div id="load-genealogy" class="text-center" v-show="carregando">
            <h1 >Gerando Relatório !</h1>
            <p >por favor aguarde</p>
            <stretch class="" background="#4d4d4d"></stretch>                
        </div>
        <div id="load-genealogy" class="text-center" v-show="!carregando && genealogys!=null && genealogys.length==0">
            <h1 >Nenhum registro encontrado !</h1>                        
        </div>
        
        <div class="row row-conteudo" id="row-conteudo" v-show="!carregando">                            
            <div class="col-md-10 offset-1">                
                <div class="card" v-for="(genealogy,index) in genealogys" v-bind:key="index">                    
                    <!--                 -->
                    <!-- Inicio loop ops -->
                    <!--                 -->                    
                    <!-- <div class=" col-md-12"> -->
                    <div class="card-header">  
                        <nav id="navbar-exemplo2" class="navbar row navbar-light bg-light">
                            <div class="col-md-0"><b>OP: </b>{{genealogy.productionOrderNumber}}</div>
                            <div class="col-md-3"><b>Data Inicio: </b> {{ticksToDate(genealogy.startDate)}}</div>
                            <div class="col-md-3"><b>Data Fim: </b>{{ticksToDate(genealogy.endDate)}}</div>
                            <div class="col-md-4 row"><b>Código da tira : &nbsp;</b><router-link class="link-decoration" :to="{ name: 'Tira',params: { id: genealogy.recipeid }}"><span class="text-primary cursor-class">{{genealogy.recipeCode}}</span></router-link></div>
                            <div class="col-md-0">
                                <i class="cursor-class nav-link fa fa-expand" :id="'iconOutput'+genealogy.orderId" aria-hidden="true" @click="verificaColapse('#iconOutput'+genealogy.orderId,'#roloOutput'+(genealogy.orderId),'fa-expand','fa-compress')" v-b-toggle="'roloOutput'+genealogy.orderId"></i>
                            </div>                            
                        </nav>                                       
                    </div>

                    <!--                         -->
                    <!-- Inicio loop rolos saida -->
                    <!--                         -->
                    <b-collapse class="card-body row" :id="'roloOutput'+(genealogy.orderId)">
                        <div class="row col-md-12 legenda" >
                            <div class="col-md-0" v-for="(outputRolo,indexOutput) in genealogy.outputRolls" :key="indexOutput">                                                                                                                         
                                <b-btn class="btn btn-primary" aria-expanded="false" v-b-toggle="'rolo'+(genealogy.orderId+indexOutput)" variant="info"> <!--  @click="verificaColapse('#icon'+genealogy.orderId+indexOutput,'#rolo'+(genealogy.orderId+indexOutput),'fa-plus','fa-minus')"-->
                                    Rolo {{indexOutput+1}}
                                    <i class="fa fa-plus" :id="'icon'+genealogy.orderId+indexOutput" aria-hidden="true" style="font-size:14px;"></i>
                                </b-btn>                                                                                                                                                                                                                                                                                               
                            </div>                                                            
                        </div>
                        <br>
                        <div class="col-md-12" v-for="(outputRolo,indexOutput) in genealogy.outputRolls" :key="indexOutput" aria-labelledby="headingOne" >                                        
                            <b-collapse :id="'rolo'+(genealogy.orderId+indexOutput)" accordion="my-accordion" class="row">                                                                                                                                                                                                                                                                                                                                                                                                       
                                <div class="row"> 
                                    <div class="col-md-4">
                                        <b-btn class="col-md-5" @click="verificaColapse('#iconMateria'+index+''+indexOutput,'#materia'+(index+''+indexOutput),'fa-plus','fa-minus')" v-b-toggle="'materia'+index+''+indexOutput">Materia Prima <i class="cursor-class fa fa-plus" :id="'iconMateria'+index+''+indexOutput" aria-hidden="true" style="font-size:15px;"></i></b-btn>
                                    </div>   
                                     <div class="col-md-4 offset-0">                                       
                                        <b-btn class="col-md-5" @click="verificaColapse('#iconAco'+index+''+indexOutput,'#aco'+index+''+indexOutput,'fa-plus','fa-minus')" v-b-toggle="'aco'+index+''+indexOutput">Aço <i class="cursor-class fa fa-plus" :id="'iconAco'+index+''+indexOutput" aria-hidden="true" style="font-size:15px;"></i></b-btn>                                    
                                    </div> 
                                    <div class="col-md-1">                                       
                                        <b-btn @click="verificaColapse('#iconTool'+index+genealogy.orderId,'#tool'+(index+''+genealogy.orderId),'fa-plus','fa-minus')" v-b-toggle="'tool'+index+''+genealogy.orderId">Ferramentas <i class="cursor-class fa fa-plus" :id="'iconTool'+index+genealogy.orderId" aria-hidden="true" style="font-size:15px;"></i></b-btn>                                    
                                    </div>                                       
                                </div> 
                                <b-collapse :id="'materia'+index+''+indexOutput">
                                    <div v-for="(m, indexMateria) in outputRolo.ligas" :key="indexMateria"><br>
                                        <div class="col-md-6">
                                            <b>OPL:</b> {{m.orderNumber}}
                                        </div>  
                                        <table class="table table-hover">                                            
                                            <thead>
                                                <tr>
                                                    <th>Elemento</th>
                                                    <th>Quantidade</th>
                                                    <th>Lote</th>
                                                    <th>Data/Hora</th>
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
                                                             
                                <b-collapse :id="'aco'+index+''+indexOutput">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>N° do rolo</th>
                                                <th>Quantidade</th>
                                                <th>OF</th>
                                                <th>Data/Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(a, indexAco) in outputRolo.inputRolls" :key="indexAco">
                                                <td>{{indexAco+1}}</td><td>{{a.quantity}}</td><td>{{a.batch}}</td><td>{{ticksToDate(a.startDate)}}</td>
                                            </tr>                                                
                                        </tbody>    
                                    </table>
                                </b-collapse> 
                                <b-collapse :id="'tool'+index+''+genealogy.orderId">                                                                                           
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Rastreamento</th>
                                                <th>Uso</th>
                                                <th>Data/Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(t, indexTool) in outputRolo.tools" :key="indexTool">
                                                <td>{{t.typeName}}</td><td>{{t.serialNumber}}</td><td>{{t.vidaUtil}}</td><td>{{ticksToDate(outputRolo.startDate)}}</td>
                                            </tr>                                                
                                        </tbody>    
                                    </table>
                                </b-collapse>                                                                                                                    
                            </b-collapse>                                 
                        </div>        
                                                                                                    
                    </b-collapse>         
                <!-- </div> -->
                </div>
            </div>                
        </div>     
    <br>

    <b-modal ref="myModalEdit" no-close-on-backdrop hide-footer title="Filtrar Busca">
        <div class="modal-body">
            <div class="row">                
                <div class="col-8">
                    <label><b>Filtrar Por </b></label>   
                    <select class="custom-select form-control form-control-lg" @change="cod='';op='';opName='';inicio='';fim='';recipeCode=''" v-model="fieldFilter">                        
                        <option value="" selected disabled>Campo para busca</option>
                        <option value="cod">Código da Tira</option>
                        <option value="date">Data</option> 
                        <option value="op">OP</option>                                               
                    </select>
                </div>                        
                <div class="col-12" v-show="fieldFilter=='cod'">
                    <label for="tira"><b>Código da Tira </b></label>                                  
                    <input id="tira" class="form-control form-control-lg" v-model="recipeCode" @keyup="prosFim=getResults(RECIPE_API,recipeCode, prosFim); cod=''" >                                                                                 
                    <div class="auto-complete" v-show="prosFim.length>0">
                        <b-dropdown-item @click.stop.prevent="recipeCode=r.recipeCode;cod=r.recipeId;prosFim=[]" v-for="(r,index) in prosFim" :key="index">{{ r.recipeCode }}</b-dropdown-item>                                           
                    </div>
                </div>
                <div class="col-12" v-show="fieldFilter=='op'">
                    <label><b>OP </b></label>                         
                    <input class="form-control form-control-lg" v-model="opName" @keyup="prosFim=getResults(URL_OP,opName, prosFim); op=''" >                                                                                 
                    <div class="auto-complete">
                        <b-dropdown-item @click.stop.prevent="opName=o.productionOrderNumber;op=o.productionOrderId;prosFim=[]" v-for="(o,index) in prosFim" :key="index" style="cursor:pointer">{{ o.productionOrderNumber }}</b-dropdown-item>
                    </div>
                </div>
                <div class="col-6" v-show="fieldFilter=='cod' || fieldFilter=='date'">
                    <label><b>Início  </b></label>                              
                    <datetime type="datetime" input-class="form-control form-control-lg" v-model="inicio" format="yyyy-MM-dd HH:mm:ss"></datetime>                         
                </div>
                <div class="col-6" v-show="fieldFilter=='cod' || fieldFilter=='date'">
                    <label><b>Fim </b></label>                  
                    <datetime type="datetime" input-class="form-control form-control-lg" v-model="fim" format="yyyy-MM-dd HH:mm:ss"></datetime>                 
                </div>                            
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary btn-sm" :disabled="!fieldFilter || (fieldFilter=='date' && !inicio && !fim) || (fieldFilter=='op' && !op) || (fieldFilter=='cod' && !inicio && !fim && !cod)" @click.stop.prevent="getGenealogy(fieldFilter, op, cod, inicio, fim)">
                <i class="fa fa-search"></i> Buscar
            </button>        
        </div>
    </b-modal>

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
