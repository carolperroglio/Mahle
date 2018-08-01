
<template >
    <div>
        
        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Barra de botões de cadastro     -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
         <div class="fixed-top nav-cinza">
            <ul class="nav d-flex align-items-center">
            <li class="nav-prod nav-item-gp col-md-12">
                <h1 class="title-page-gp"> <b>Cadastrar Ferramentas/Insumos</b> </h1>
            </li>
                <li class="nav-item-tool col-md-2">
                    <select class="form-control form-control-lg" v-model="fieldFilter">
                        <option value="" selected disabled="disabled">Buscar por:</option>
                        <option value="name">Nome</option>
                        <option value="description">Descrição</option>
                        <option value="serialNumber">Número serial</option>
                        <option value="code">Código</option>
                        <option value="lifeCycle">Vida Útil</option>
                        <!-- <option value="currentLife">Ciclo de vida atual</option> -->
                        <option value="unitOfMeasurement">Unidade de Medida</option>
                        <!-- <option value="typeName">Tipo</option> -->
                        <option value="status">Status</option>
                    </select>
                </li>    
                <li class="nav-item-tool col-md-2">
                    <input type="text" id="valor" v-model="fieldValue" class="form-control form-control-lg" placeholder="Ex: Faca">                              
                </li> 
                <li class="nav-item-tool col-md-6">        
                <form class="form-inline my-3">
                    <div class="col-md-auto">      
                        <button type="button" class="btn btn-primary btn-lg" @click.stop.prevent="listar()">
                            <i class="fa fa-search"></i> Buscar
                        </button>
                    </div>
                    <!-- Button trigger modal -->
                    <div class="col-md-3">
                    <button type="button" class="btn btn-success btn-lg" @click.stop.prevent="showModal('modalCadTool');cleanVariables()">
                            <i class="fa fa-plus"></i> Cadastrar Ferramentas/Insumos
                    </button>
                </div>
                </form>
                </li> 
            </ul>
        </div>
             
            <!--                            -->
            <!--                            -->
            <!--                            -->
            <!--   Listagem de ferramentas  -->
            <!--                            -->
            <!--                            -->
            <!--                            -->
        <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
        </div> 
        <div class="cabecalho-table-tc" v-show="!carregando">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(ferramentas, 'name',0):organizar(ferramentas, 'name',0);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">Nome 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(ferramentas, 'description',1):organizar(ferramentas, 'description',1);" class="ls2-cabecalho-tc col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Descrição 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(ferramentas, 'serialNumber',2):organizar(ferramentas, 'serialNumber',2);" class="ls2-cabecalho-tc col-md-2">
                <b><font class="cursor-class" color="#ffffff">
                    Número Serial
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(ferramentas, 'code',3):organizar(ferramentas, 'code',3);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Código 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(ferramentas, 'lifeCycle',4):organizar(ferramentas, 'lifeCycle',4);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Vida Útil 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                </font></b>
            </label>
                <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(ferramentas, 'currentLife',8):organizar(ferramentas, 'currentLife',8);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Vida Atual 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[8]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[8]==true" aria-hidden="true"></i>
                </font></b>
            </label>   
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(ferramentas, 'unitOfMeasurement',5):organizar(ferramentas, 'unitOfMeasurement',5);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Unidade de Medida 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(ferramentas, 'typeName',6):organizar(ferramentas, 'typeName',6);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Tipo 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i>
                </font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[7]==false?desorganizar(ferramentas, 'status',7):organizar(ferramentas, 'status',7);" class="ls2-cabecalho-tc col-md-1">
                <b><font class="cursor-class" color="#ffffff">
                    Status 
                    <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[7]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[7]==true" aria-hidden="true"></i>
                </font></b>
            </label>               
        </div>
        <div class="margin-table-tc" style="margin-bottom: 5%;">
            <div v-for="(f, indexF) in ferramentas" :key="indexF" :class="{cinza: indexF%2==0}">
                <label class="ls ls30 col-md-1">
                    {{f.name}}</label>
                <label class="ls ls30 col-md-2">
                    {{f.description}}</label>
                <label class="ls ls30 col-md-2">
                    {{f.serialNumber}}</label>
                <label class="ls ls30 col-md-1">
                    {{f.code}}</label>
                <label class="ls ls30 col-md-1">
                    {{f.lifeCycle}}</label>
                <label class="ls ls30 col-md-1">
                    {{f.currentLife}}
                </label>
                <label class="ls ls30 col-md-1">
                    {{f.unitOfMeasurement}}</label>
                <label class="ls ls30 col-md-1">
                    {{f.typeName}}</label>
                <label class="ls ls30 col-md-1">
                    {{f.status}}</label>
                <label class="ls ls30" style="max-width:6%;flex:6%">
                    <i class="fa fa-edit" style="font-size:22px; cursor:pointer" @click.stop.prevent="itemClicado(f)"></i>
                </label>
            </div>
        </div>
        <div class="paginacao fixed-bottom" v-show="pages.length>1">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="listar(startat-=20, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index2) in pages" v-bind:key="index2">
                        <a class="page-link" href="#" @click.stop.prevent="listar(startat=num*20, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+20<total">
                        <a class="page-link" href="#" @click.stop.prevent="listar(startat+=20, quantityPage)">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>
                

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!--     Cadastro de Ferramentas     -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->
        
        <b-modal no-close-on-backdrop ref="modalCadTool" hide-footer title="Cadastrar Ferramentas/Insumos">
            <form>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label>
                    <b>Nome </b>
                </label>
                <input type="text" placeholder="Ex: Facas de Guilhotina " v-model="ferramenta.name" id="nome" class="form-control">
                </div>
                <div class="form-group col-md-6">
                <label>
                    <b>Descrição </b>
                </label>
                <input type="text" id="desc" class="form-control" v-model="ferramenta.description" placeholder="Ex: Ferramenta usada na Guilhotina">
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label>
                    <b>Número Serial </b>
                </label>
                <input type="text" id="sernum" class="form-control" v-model="ferramenta.serialNumber" placeholder="Ex:124856648">
                </div>
                <div class="form-group col-md-6">
                    <label>
                        <b>Código: </b>
                    </label>
                    <input type="text" id="code" class="form-control" v-model="ferramenta.code" placeholder="Ex:código">
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label>
                    <b>Tipo </b>
                </label>
                    <select class="form-control" v-model="tooltypeSelected" @change="getToolType(tooltypeSelected)">
                    <option v-for="(tipo, indexOp) in tipos" :value="tipo" v-bind:key="indexOp" 
                    >{{ tipo.name }}</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                <label>
                    <b>Status </b>
                </label>
                <select class="form-control" v-model="ferramenta.status">
                    <option value="available">Disponível</option>
                    <option value="in_use">Em uso</option>
                    <option value="in_maintenance">Em manutenção</option>
                    <option value="not_available">Indisponível</option>
                    <option value="inactive">Inativo</option>
                </select>
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-4">
                <label>
                    <b>Vida Útil </b>
                </label>
                <input disabled class="form-control" type="text" :value="ferramenta.lifeCycle = tooltypeSelected.lifeCycle" placeholder="Ex: 100" id="lifec">
                </div>
                <div class="form-group col-md-5">
                <label>
                    <b>Unidade de Medida </b>
                </label>
                <input disabled class="form-control" type="text" :value="ferramenta.unitOfMeasurement = tooltypeSelected.unitOfMeasurement">
                </div>
                </div>
                <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="!ferramenta.unitOfMeasurement || !ferramenta.lifeCycle || !ferramenta.name 
                    || !ferramenta.code || !ferramenta.serialNumber || !ferramenta.description || !ferramenta.status || !tooltypeSelected" @click.stop.prevent="cadastrar(ferramenta);hideModal('modalCadTool');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                   <button @click.stop.prevent="ferramenta={}" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
                </div>
            </form>
        </b-modal>    
            <!--                            -->
            <!--                            -->
            <!--                            -->
            <!--      Editar Ferramentas    -->
            <!--                            -->
            <!--                            -->
            <!--                            -->

        <b-modal no-close-on-backdrop ref="myModalRef" hide-footer title="Editar Ferramentas">
            <form>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label>
                    <b>Nome:</b>
                </label>
                <input type="text" placeholder="Ex: Facas de Guilhotina " v-model="ferramentaEdit.name" id="nome" class="form-control">
                </div>
                <div class="form-group col-md-6">
                <label>
                    <b>Descrição: </b>
                </label>
                <input type="text" id="desc" class="form-control" v-model="ferramentaEdit.description" placeholder="">
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label>
                    <b>Número Serial: </b>
                </label>
                <input type="text" id="sernum" class="form-control" v-model="ferramentaEdit.serialNumber" placeholder="Ex: 124856648">
                </div>
                <div class="form-group col-md-4">
                <label>
                    <b>Código: </b>
                </label>
                <input type="text" id="code" class="form-control" v-model="ferramentaEdit.code" placeholder="Ex: 4565">
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-4">
                <label>
                    <b>Vida Útil: </b>
                </label>
                <input class="form-control" type="text" v-model="ferramentaEdit.lifeCycle" placeholder="Ex: 100" id="lifec" disabled>
                </div>
                <div class="form-group col-md-5">
                <label>
                    <b>Unidade de Medida: </b>
                </label> {{ferramenta.unitOfMeasurement}}
                <input type="text" id="unitMeas" v-model="ferramentaEdit.unitOfMeasurement" class="form-control" placeholder="Ex: minutos" disabled>                              
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label>
                    <b>Tipo: </b>
                </label>
                <input type="text" id="unitMeas" v-model="ferramentaEdit.typeName" class="form-control" placeholder="Ex: minutos" disabled>                              
                </div>
                <div class="form-group col-md-6">
                <label>
                    <b>Status: </b>
                </label>
                <input type="text" id="unitMeas" v-model="ferramentaEdit.status" class="form-control" placeholder="Ex: minutos" disabled>                              
                </div>
                </div>

                <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" :disabled="!ferramenta.unitOfMeasurement || !ferramenta.lifeCycle || !ferramenta.name 
                    || !ferramenta.code || !ferramenta.serialNumber || !ferramenta.description || !ferramenta.status || !ferramenta.typeId" @click.stop.prevent="editar(ferramenta);hideModal('modalCadTool');">
                        <i  class="fa fa-check-square" aria-hidden="true"></i>
                        Confirmar
                    </button>
                    <button @click.stop.prevent="ferramenta.name = '';ferramentaEdit.serialNumber = '';ferramentaEdit.code = '';ferramentaEdit.serialNumber = '';ferramentaEdit.description = ''" class="btn btn-primary pull-right">
                        <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                          
                    </button> 
                </div>
                </div>
            </form>
        </b-modal>
            <br>
            <!-- MODAL PARA EXIBIR ERRO  -->
            <b-modal no-close-on-backdrop ref="modalErro" title="" hide-footer="">
                <p :class="erro ? 'alert alert-danger':'alert alert-info'">{{msg}}</p>
            </b-modal>
        </div>
</template>
<script src="./js/toolcreate.js">
</script>
<style>
@import url('./css/toolcreate.css');
</style>
