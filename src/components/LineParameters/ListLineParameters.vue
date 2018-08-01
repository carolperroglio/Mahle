<template>
    <div>               

            
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!-- Busca de Produtos     -->
        <!--                       -->
        <!--                       -->        
        <div class="fixed-top nav-cinza"> 
            <ul class="nav d-flex">
                <li class="nav-item-prameters col-md-12">
                    <h1 class="title-page-gp"><b>Parâmetros de Linha</b></h1>
                </li>                   
                
              
                <li class="nav-item-prameters">
                    <button type="button" class="btn btn-success btn-lg" @click.stop.prevent="parameter={};thing={};tagGroup='';showModal('modalCreateParameter')"><i class="fa fa-plus" aria-hidden="true" ></i> Cadastrar Parâmetro</button>
                </li>
            </ul>
        </div>                     
        <div id="load-parameters" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>                                                                          
        

        

        <div class="cabecalho-table-parameters"  v-show="!carregando && parametros.length>0">
            <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(parametros, 'parametro',0):organizar(parametros, 'parametro',0);" class="ls2 item-cabecalho-table-parameters-sm">
                <b><font class="cursor-class" color="#ffffff">Parâmetro
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
                </font></b>
            </label>                    
            <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(parametros, 'vn',1):organizar(parametros, 'vn',1);" class="ls2 item-cabecalho-table-parameters-sm">
                <b><font class="cursor-class" color="#ffffff">
                    <p class="">Valor Nominal
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
                </p></font></b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(parametros, 'unidade',2):organizar(parametros, 'unidade',2);" class="ls2 item-cabecalho-table-parameters-sm">
                <b><font class="cursor-class" color="#ffffff">
                    <p class="">Unidade
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
                </p></font></b>
            </label>  
            <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(parametros, 'lie',3):organizar(parametros, 'lie',3);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    LIE <p class="font-size">Limite inferior de Especificação
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
                </p></font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(parametros, 'lic',4):organizar(parametros, 'lic',4);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    LIC <p class="font-size">Limite inferior Controle
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
                </p></font></b>
            </label> 
            <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(parametros, 'lsc',5):organizar(parametros, 'lsc',5);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    LSC <p class="font-size">Limite superior Controle
                        <i class="fa fa-sort-desc" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                        <i class="fa fa-sort-asc" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
                    </p></font>
                </b>
            </label>
            <label @click.stop.prevent="cabecalhoSetas[6]==false?desorganizar(parametros, 'lse',6):organizar(parametros, 'lse',6);" class="ls2 item-cabecalho-table-parameters">
                <b><font class="cursor-class" color="#ffffff">
                    LSE <p class="font-size">Limite superior Especifico
                    <i class="fa fa-sort-desc" v-if="cabecalhoSetas[6]==false" aria-hidden="true"></i>
                    <i class="fa fa-sort-asc" v-if="cabecalhoSetas[6]==true" aria-hidden="true"></i>
                </p></font></b>
            </label>                              
        </div>

        <!--                       -->
        <!--                       -->
        <!--                       -->
        <!--   Listagem de fase    -->
        <!--                       -->
        <!--                       -->
        <!--                       -->
        <div class="margin-table-parameters" v-show="!carregando && parametros.length>0">         
            <div v-for="(pro, index) in parametros" :class="{cinza: index%2==0}" :key="index">                     
                <label class="ls2 item-cabecalho-table-parameters-sm">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.tagGroup}}
                </label>                    
                <label class="ls2 item-cabecalho-table-parameters-sm">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.value}}
                </label>
                <label class="ls2 item-cabecalho-table-parameters-sm">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.unit}}
                </label>
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.lie}}
                </label>   
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.lic}}
                </label>            
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.lsc}}
                </label>
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"></font></b>
                    {{pro.lse}}
                </label> 
                <label class="ls2 item-cabecalho-table-parameters">
                    <b><font color="#9BA6A5"></font></b>
                    <i class= "fa fa-trash-o" style="font-size:21px; cursor:pointer; color:red;" @click.stop.prevent="deleteParameter=pro;showModal('modalRemoveParameter');"></i>&nbsp;&nbsp;&nbsp;                     
                    <i class="fa fa-edit" style="font-size:21px; cursor:pointer" @click.stop.prevent="parametro=JSON.parse(JSON.stringify(pro));parametro.equip=buscaEquip(parametro.thingGroupId); showModal('modalEditarParameter')"></i>
                </label>                                                                                                       
            </div>                                                                                                       
        </div>      
            
        <div class="paginacao" v-show="total>0">
            <nav aria-label="">
                <ul class="pagination justify-content-center">
                    <li v-show="startat>0" class="page-item">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=quantityPage, quantityPage)">Anterior</a>
                    </li>
                    <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*quantityPage, quantityPage)">{{num+1}}</a>
                    </li>
                    <li class="page-item" v-show="pages.length>1 && startat+20<total">
                        <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=quantityPage, quantityPage)">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>


        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Remove         -->
        <!--       Parametro       -->
        <!--                       -->
        <!--                       -->                 
        <b-modal no-close-on-backdrop ref="modalRemoveParameter" hide-footer title="Remover Parâmetro">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja remover o Parametro !?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="deleteParametro(deleteParameter);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModal('modalRemoveParameter')" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar   
                        </button>                      
                    </div>
                </div>
            </div>
        </b-modal>
        

        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Menu de navegação de produtos   -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->     
        <b-modal no-close-on-backdrop ref="modalEditarParameter" hide-footer title="Editar Parâmetro">                    
            <form>
                <div>                    
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>
                                <b>Equipamento </b>
                            </label>
                            <input class="fm form-control mr-sm-2" v-model="parametro.equip" type="text" disabled placeholder="Ex: 1010144">                                                        
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Parâmetro </b>
                            </label>
                            <input class="fm form-control mr-sm-2" v-model="parametro.tagGroup" type="text" disabled placeholder="Ex: 1010144">                                                        
                        </div>                        
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>Valor Nominal</b>
                            </label>
                            <input class="fm form-control mr-sm-2" v-model="parametro.value" type="text" placeholder="Ex: 1010144">
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>Unidade </b>
                            </label>
                            <br><br>
                            <input type="text" class="fm form-control mr-sm-2" v-model="parametro.unit" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIE </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lie" placeholder="Ex: 941120000000">
                            <br>
                        </div>  
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIC </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lic" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSC </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lsc" placeholder="Ex: 941120000000">
                            <br>
                        </div> 
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSE </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lse" placeholder="Ex: 941120000000">
                            <br>
                        </div>       
                    </div>   
                    <div class="modal-footer">                            
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="showModal('modalEditarConfirm');" class="btn btn-success pull-right" :disabled="!validaParametro(parametro)">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>  
                            <button @click.stop.prevent="parametro.lse='';parametro.lsc='';parametro.lse='';parametro.lic='';parametro.lie='';parametro.unit='';parametro.value='';" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                           
                            </button>                      
                        </div>                        
                    </div>
                </div>
            </form>
        </b-modal> 

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Editar         -->
        <!--       Parametro       -->
        <!--                       -->
        <!--                       -->                 
        <b-modal no-close-on-backdrop ref="modalEditarConfirm" hide-footer title="Editar Parâmetro">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja editar o Parametro !?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="putParameter(parametro)" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModal('modalRemoveParameter')" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar   
                        </button>                      
                    </div>
                </div>
            </div>
        </b-modal>
        


        <!--                                 -->
        <!--                                 -->
        <!--                                 -->
        <!-- Menu de navegação de parametros -->
        <!--                                 -->
        <!--                                 -->
        <!--               Modal             -->     
        <b-modal no-close-on-backdrop ref="modalCreateParameter" hide-footer title="Cadastrar Parâmetro">                    
            <form>
                <div>                    
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>
                                <b>Equipamento </b>
                            </label>
                            <select class="fm form-control mr-sm-2" v-model="thing">
                                <option v-for="(fer,index) in things" :value="fer" :key="index">{{fer.groupName}}</option>                                
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Parâmetro </b>
                            </label>
                            <select class="fm form-control mr-sm-2" v-model="tagGroup">
                                <option v-for="(groups,index) in thing.possibleTagGroups" v-if="validaTag(groups,index,parametros)" :key="index">{{groups}}</option>                                
                            </select>
                        </div>                        
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>Valor Nominal</b>
                            </label>
                            <input class="fm form-control mr-sm-2" type="text" v-model="parameter.value" placeholder="Ex: 1010144">
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>Unidade </b>
                            </label>
                            <br><br>
                            <input type="text" v-model="parameter.unit"  class="fm form-control mr-sm-2" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIE </b>
                            </label>
                            <input type="text" v-model="parameter.lie" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>  
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIC </b>
                            </label>
                            <input type="text" v-model="parameter.lic" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSC </b>
                            </label>
                            <input type="text" v-model="parameter.lsc" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div> 
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSE </b>
                            </label>
                            <input type="text" v-model="parameter.lse" class="form-control form-control-sm" placeholder="Ex: 941120000000">
                            <br>
                        </div>       
                    </div>   
                    <div class="modal-footer">                            
                        <div class="btn-group" role="group">
                            <button @click.stop.prevent="showModal('modalCreateConfirm')" class="btn btn-success pull-right" :disabled="!validaParametro(parameter) || tagGroup=='' || tagGroup==undefined">
                                <i  class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                            </button>  
                            <button @click.stop.prevent="parameter.lse='';parameter.lsc='';parameter.lse='';parameter.lic='';parameter.lie='';parameter.unit='';parameter.value='';tagGroup='';thing={}" class="btn btn-primary pull-right">
                                <i class="fa fa-eraser" aria-hidden="true"></i> Limpar                           
                            </button>                      
                        </div>                        
                    </div>
                </div>
            </form>
        </b-modal> 

        <!--                       -->
        <!--                       -->
        <!--        Modal          -->
        <!--        Create         -->
        <!--       Parametro       -->
        <!--                       -->
        <!--                       -->                 
        <b-modal no-close-on-backdrop ref="modalCreateConfirm" hide-footer title="Cadastrar Parâmetro">            
            <div class="modal-body">
                <i class="fa fa-times" aria-hidden="true" style="font-size:23px; color:red;"></i> <b>Tem certeza que deseja cadastrar o Parametro !?</b>
            </div>    
            <div class="modal-footer">
                <div>
                    <div class="btn-group" role="group">
                        <button @click.stop.prevent="createParameter(parameter, thing, tagGroup);" class="btn btn-success">
                            <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
                        </button>
                        <button @click.stop.prevent="hideModal('modalRemoveParameter')" class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i> Cancelar   
                        </button>                      
                    </div>
                </div>
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
            <p class="alert alert-danger">Ocorreu um erro: {{error}}</p>
        </b-modal>

    </div>
</template>



<script src="./js/listlineParameters.js">
</script>
<style>
@import url("./css/listlineparameters.css");
</style> 