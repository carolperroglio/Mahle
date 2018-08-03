<template>
<div>
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->
        <nav class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
                <li class="nav-item-hist nav-item-gp col-md-12">
                <h1 class="title-page-gp"><b>Relatório de Genealogia de Tira</b></h1>
                </li>
                <li class="nav-item-hist nav-item-gp col-md-1">
                <button type="button" class="btn btn-info"  @click.prevent="OP='';showModal('myModalEdit')">
                    Filtrar Busca
                </button>
                </li>
                <li class="nav-item-hist nav-item-gp col-md-2 col-lg-2">
            <button type="button" class="btn btn-danger pull-left" @click.prevent="toPdf()">
               <i class="fa fa-file-pdf-o"></i> Exportar para PDF
            </button>
            </li>
            </ul>
        </nav>

          <!-- <div class="fixed-top nav-cinza">                                   
              <ul class="nav d-flex">
                  <li class="nav-item nav-item-genealogy col-sm-1.5 ">
                      <h3 class="title-page-gp"><b>Relatório de Genealogia de Liga</b></h3>
                  </li>                  
              </ul> -->


            <!-- <div class="fundo-branco">
            <div class="container col-md-6">
                    <br>
                    <div class="row">
                        <label><b>Início: </b></label>
                        <div class="col-md-3">
                            <date-picker class="form-control form-control-sm" v-model="date" :config="config" ></date-picker>
                        </div>
                        <label><b>Fim: </b></label>  
                        <div class="col-md-3">
                            <date-picker class="form-control form-control-sm" v-model="datef" :config="config2"></date-picker>
                        </div>
                        <div class="col-md-3">
                        <select class="form-control form-control-sm" aria-placeholder="Escolha o campo \/" v-model="fieldFilter">                        
                            <option v-for="(op,index) in ops" :value="op.productionOrderTypeId" v-bind:key="index" >{{op.productionOrderNumber}}</option>
                        </select>    
                        </div>
                    </div>                    
            </div>                         
            </div> -->
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="row">
            <div class="col-md-12">
                
                <div class="row">
                    <div class="col-md-10 offset-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <div class="row">
                            <div class="col-md-2">
                                <b>OP:</b> Tira000
                            </div>
                            <div class="col-md-4">
                                <b>Data Inicio: </b> 25/06/2018 11:00
                            </div>
                            <div class="col-md-4">
                                <b>Data Fim: </b> 25/06/2018 16:00
                            </div>
                            </div>
                        </b-card-header>
                        <div role="tablist">                            
                            <div role="tablist">
                                <b-collapse id="accordion" visible accordion="my-accordion" role="tabpanel">                                    
                                    <b-card no-body  class="mb-1">
                                        <b-card-header header-tag="header" class="p-1" role="tab">
                                            <b-btn block v-b-toggle.collapse1_inner variant="info">Rolo 1</b-btn>
                                        </b-card-header>
                                    </b-card>                                    
                
                                    <b-collapse id=collapse1_inner class="mt-2">
                                        <b-card>                                            
                                            <br>
                                            <div class="row">     
                                                <div class="col-md-12"> 
                                                    <b> Materia Prima</b>
                                                </div>                                                                                                                                             
                                                <div class="col-md-6">    
                                                    <b>OPL:</b> 21231844_Z
                                                </div>
                                               
                                                <div class="col-md-6">                                     
                                                    <b>Ferramentas</b>
                                                </div>
                                                <div class="col-md-6">                                            
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
                                                            <tr>
                                                                <td>Cobre</td><td>900kg</td><td>158198165</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Niquel</td><td>100kg</td><td>18156165</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Estanho</td><td>500kg</td><td>5191981</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                        </tbody>    
                                                    </table>
                                                </div>
                                                
                                                <div class="col-md-6">                                                                                           
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
                                                            <tr>
                                                                <td>Cobre</td><td>900kg</td><td>158198165</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Niquel</td><td>100kg</td><td>18156165</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Estanho</td><td>500kg</td><td>5191981</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                        </tbody>    
                                                    </table>
                                                </div>
                                                <div class="col-md-12">                                     
                                                    <p class="text text-center"><b>Rolos de entrada</b></p>
                                                </div>
                                                <div class="col-md-12">
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
                                                            <tr>
                                                                <td>Cobre</td><td>900kg</td><td>158198165</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Niquel</td><td>100kg</td><td>18156165</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Estanho</td><td>500kg</td><td>5191981</td><td>25/06/2018 11:00</td>
                                                            </tr>
                                                        </tbody>    
                                                    </table>
                                                </div>     
                                            </div>
                                        </b-card>                                        
                                    </b-collapse>                                                                    
                                </b-collapse>
                            </div>                                
                        </div>
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-btn block  variant="info">Rolo 2</b-btn>
                            </b-card-header>
                            <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <p class="card-text">
                                        {{ text }}
                                    </p>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-btn block href="#"  variant="info">Rolo 3</b-btn>
                            </b-card-header>
                            <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                <p class="card-text">
                                    {{ text }}
                                </p>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        
                        
                    </div>
                </div>
            </div>                
        </div>
  <br>
  <br>
  <br>
  <br>
  <br>  
        </div>
        
</template>

<script src="./js/genealogyReport.js">
</script>

<style>
@import url("./css/genealogyReport.css");
</style>
