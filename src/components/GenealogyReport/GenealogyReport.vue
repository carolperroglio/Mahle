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
                <br><br><br>
                <br><br><br>          
                <br><br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-10 offset-1">

                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <div class="row">
                            <div class="col-md-2">
                                <b>OP:</b> 213819819_Z 
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
                            <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" class="p-1" role="tab">

                                    <b-btn block href="#" v-b-toggle.accordion variant="secondary">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <b>OP:</b> 221212311_Z 
                                            </div>
                                            <!-- <div class="col-md-2">
                                                <b>OPL:</b> 213819818_Z 
                                            </div> -->
                                            <div class="col-md-2">
                                                <b>Receita Liga:</b> S-005 
                                            </div>
                                            <div class="col-md-3">
                                                <b>Data Inicio: </b> 25/06/2018 11:00
                                            </div>
                                            <div class="col-md-3">
                                                <b>Data Fim: </b> 25/06/2018 16:00
                                            </div>
                                        </div>
                                    </b-btn>
                                </b-card-header>
                            </b-card>
                            <div role="tablist">
                                <b-collapse id="accordion" visible accordion="my-accordion" role="tabpanel">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-btn block disabled variant="info"><b> Rolo de Entrada</b> Rolo de Aco - <b>Lote: </b>1231654231</b-btn>
                                    </b-card-header>
                                    <b-card no-body  class="mb-1">
                                        <b-card-header header-tag="header" class="p-1" role="tab">
                                            <b-btn block v-b-toggle.collapse1_inner variant="info">Rolo 1</b-btn>
                                        </b-card-header>
                                    </b-card>
                                    <b-collapse id=collapse1_inner class="mt-2">
                                        <b-card>
                                            <div class="row">
                                            <div class="col-md-12">
                                            <p class="text-center"><b>OPL:</b> 21231654_Z</p>

                                            </div>
                                            <div class="col md 4">
                                            <b><h5>Ferramentas</h5></b>
                                            <ul class="list-group">
                                            <li class="list-group-item">Ferramenta 1</li>
                                            <li class="list-group-item">Ferramenta 2</li>
                                            <li class="list-group-item">Ferramenta 3</li>
                                            </ul>
                                            </div>
                                            <div class="col md 6">
                                            <b><h5>Materiais</h5></b>
                                            <ul class="list-group">
                                            <li class="list-group-item">Cobre - 900kg - 158198165</li>
                                            <li class="list-group-item">Niquel - 100kg - 18156165</li>
                                            <li class="list-group-item">Estanho - 500kg - 5191981</li>
                                            </ul>
                                            </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                            <div class="col-md-12">
                                            <p class="text-center"><b>OPL:</b> 21231844_Z</p>

                                            </div>
                                            <div class="col md 4">
                                            <b><h5>Ferramentas</h5></b>
                                            <ul class="list-group">
                                            <li class="list-group-item">Ferramenta 1</li>
                                            <li class="list-group-item">Ferramenta 2</li>
                                            <li class="list-group-item">Ferramenta 3</li>
                                            </ul>
                                            </div>
                                            <div class="col md 6">
                                            <b><h5>Materiais</h5></b>
                                            <ul class="list-group">
                                            <li class="list-group-item">Cobre - 900kg - 158198165</li>
                                            <li class="list-group-item">Niquel - 100kg - 18156165</li>
                                            <li class="list-group-item">Estanho - 500kg - 5191981</li>
                                            </ul>
                                            </div>
                                            </div>
                                        </b-card>
                                    </b-collapse>
    
                                </b-collapse>
                            </div>
                                
                        </div>
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-btn block href="#" v-b-toggle.accordion2 variant="info">Rolo 2</b-btn>
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
                                <b-btn block href="#" v-b-toggle.accordion3 variant="info">Rolo 3</b-btn>
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
        <!--  DOOOOOOOOOOOOOOOIS -->
         <div class="col-md-12">

            <b-card-header header-tag="header" class="p-1" role="tab">
                <div class="row">
                <div class="col-md-2">
                    <b>OP:</b> 222134894_Z 
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
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion variant="secondary">
                <div class="row">
                <div class="col-md-2">
                    <b>OP:</b> 221218249_Z 
                </div>
                <!-- <div class="col-md-2">
                    <b>OPL:</b> 213819818_Z 
                </div> -->
                <div class="col-md-2">
                    <b>Receita Liga:</b> S-005 
                </div>
                <div class="col-md-3">
                    <b>Data Inicio: </b> 26/06/2018 11:00
                </div>
                <div class="col-md-3">
                    <b>Data Fim: </b> 26/06/2018 16:00
                </div>
                </div>
                </b-btn>
            </b-card-header>
        </b-card>
        <div role="tablist">
            <b-collapse id="accordion" visible accordion="my-accordion" role="tabpanel">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block disabled variant="info"><b> Rolo de Entrada</b> Rolo de Aco - <b>Lote: </b>1231654231</b-btn>
                </b-card-header>
                <b-card no-body  class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block v-b-toggle.collapse1_inner variant="info">Rolo 1</b-btn>
                    </b-card-header>
                    <b-collapse id=collapse1_inner class="mt-2">
                        <b-card>
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="text-center"><b>OPL:</b> 21231654_Z</p>

                                </div>
                                <div class="col md 4">
                                    <b><h5>Ferramentas</h5></b>
                                    <ul class="list-group">
                                        <li class="list-group-item">Ferramenta 1</li>
                                        <li class="list-group-item">Ferramenta 2</li>
                                        <li class="list-group-item">Ferramenta 3</li>
                                    </ul>
                                </div>
                                <div class="col md 6">
                                    <b><h5>Materiais</h5></b>
                                    <ul class="list-group">
                                        <li class="list-group-item">Cobre - 900kg - 158198165</li>
                                        <li class="list-group-item">Niquel - 100kg - 18156165</li>
                                        <li class="list-group-item">Estanho - 500kg - 5191981</li>
                                    </ul>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="text-center"><b>OPL:</b> 21231844_Z</p>
                                </div>
                                <div class="col md 4">
                                    <b><h5>Ferramentas</h5></b>
                                    <ul class="list-group">
                                        <li class="list-group-item">Ferramenta 1</li>
                                        <li class="list-group-item">Ferramenta 2</li>
                                        <li class="list-group-item">Ferramenta 3</li>
                                    </ul>
                                </div>
                                <div class="col md 6">
                                    <b><h5>Materiais</h5></b>
                                    <ul class="list-group">
                                        <li class="list-group-item">Cobre - 900kg - 158198165</li>
                                        <li class="list-group-item">Niquel - 100kg - 18156165</li>
                                        <li class="list-group-item">Estanho - 500kg - 5191981</li>
                                    </ul>
                                </div>
                            </div>
                        </b-card>
                    </b-collapse>
                </b-card> 
            </b-collapse>
        </div>    
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Rolo 2</b-btn>
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
        <b-btn block href="#" v-b-toggle.accordion3 variant="info">Rolo 3</b-btn>
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
