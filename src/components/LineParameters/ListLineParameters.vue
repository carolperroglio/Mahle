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
                
              
                <!-- <li class="nav-item-prameters">
                    <button type="button" class="btn btn-success btn-lg" @click.stop.prevent="parameter={};thing={};tagGroup='';showModal('modalCreateParameter')"><i class="fa fa-plus" aria-hidden="true" ></i> Cadastrar Parâmetro</button>
                </li> -->
            </ul>
        </div>                     
        <div id="load-parameters" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>                
        </div>                                                                          
        

        <table v-if="!carregando && parametros.length>0" class="table table-responsive w-100 d-block d-md-table table-sm table-striped mb-5" id="tabela-parametros-linha">
            <thead id="teste">
                <tr style="background-color: black; color: white;">
                    <th>Parâmetro</th>
                    <th>Valor Nominal</th>
                    <th>Unidade</th>
                    <th>LIE</th>
                    <th>LIC</th>
                    <th>LSC</th> 
                    <th>LSE</th> 
                    <th></th>                  
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pro, index) in parametros" v-bind:key="index">
                    <td>{{pro.tagGroup}}</td>
                    <td>{{pro.value}}</td>
                    <td>{{pro.unit}}</td>
                    <td>{{pro.lie}}</td>  
                    <td>{{pro.lic}}</td>
                    <td>{{pro.lsc}}</td>  
                    <td>{{pro.lse}}</td>
                    <td>
                        <b><font color="#9BA6A5"></font></b>
                        <i class= "fa fa-trash-o" style="font-size:20px; cursor:pointer; color:red;" @click.stop.prevent="deleteParameter=pro;showModal('modalRemoveParameter');"></i>                    
                        <i class="fa fa-edit" style="font-size:20px; cursor:pointer" @click.stop.prevent="parametro=JSON.parse(JSON.stringify(pro));parametro.equip=buscaEquip(parametro.thingGroupId); showModal('modalEditarParameter')"></i>
                    </td>                
                </tr>                                  
            </tbody>
        </table>    
      
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
                            <input class="fm form-control mr-sm-2" v-model="parametro.equip" type="text" disabled>                                                        
                        </div>
                        <div class="form-group col-md-6">
                            <label>
                                <b>Parâmetro </b>
                            </label>
                            <input class="fm form-control mr-sm-2" v-model="parametro.tagGroup" type="text" disabled>                                                        
                        </div>                        
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>Valor <br>Nominal</b>
                            </label>
                            <input class="fm form-control mr-sm-2" v-model="parametro.value" type="text">                                                  
                        </div>
                        <div class="form-group col-md-2">
                            <label>
                                <b>Unidade </b><br>
                            </label>
                            <br><br>
                            <input type="text" class="fm form-control mr-sm-2" v-model="parametro.unit" >
                            <br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIE </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lie" >
                            <br>
                        </div>  
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIC </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lic" >
                            <br>
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSC </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lsc" >
                            <br>
                        </div> 
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSE </b>
                            </label>
                            <input type="text" class="form-control form-control-sm" v-model="parametro.lse" >
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
                            <input class="fm form-control mr-sm-2" type="text" v-model="parameter.value" >
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>Unidade </b>
                            </label>
                            <br><br>
                            <input type="text" v-model="parameter.unit"  class="fm form-control mr-sm-2" >
                            <br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIE </b>
                            </label>
                            <input type="text" v-model="parameter.lie" class="form-control form-control-sm">
                            <br>
                        </div>  
                        <div class="form-group col-md-3">
                            <label>
                                <b>LIC </b>
                            </label>
                            <input type="text" v-model="parameter.lic" class="form-control form-control-sm">
                            <br>
                        </div>
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSC </b>
                            </label>
                            <input type="text" v-model="parameter.lsc" class="form-control form-control-sm">
                            <br>
                        </div> 
                        <div class="form-group col-md-3">
                            <label>
                                <b>LSE </b>
                            </label>
                            <input type="text" v-model="parameter.lse" class="form-control form-control-sm">
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

<script src="./js/listlineParameters.js"></script>
<style>@import url("./css/listlineparameters.css");</style> 