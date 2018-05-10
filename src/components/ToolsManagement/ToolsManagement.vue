<template>
<div>
    <div class="fixed-top nav-cinza">
        <ul class="nav d-flex align-items-center">
        <li class="nav-prod nav-item-gp col-md-12">
            <h1 class="title-page-gp-s-campo"> <b>Gerenciamento de Ferramentas </b></h1>
        </li>
        <li class="col-md-12">
            <p></p>
        </li>
        </ul>
    </div>
    <div id="load" v-show="carregando">
    <stretch background="#4d4d4d"></stretch>
    </div> 
    <div class="cabecalho-table-tm" v-show="!carregando">
        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(ferramentas, 'name',0):organizar(ferramentas, 'name',0);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">Nome 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(ferramentas, 'description',1):organizar(ferramentas, 'description',1);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Descrição 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(ferramentas, 'serialNumber',2):organizar(ferramentas, 'serialNumber',2);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Número Serial
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(ferramentas, 'status',3):organizar(ferramentas, 'status',3);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Status
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
    </div>
    <div class="table-margin-tm"> 
    <div v-for="(t,index) in tools" :key="index" :class="{cinza: index%2==0}">
        <label class="ls20 col-md-2">
            {{t.name}}
        </label>
        <label class="ls20 col-md-2">
            {{t.description}}
        </label>
        <label class="ls20 col-md-2">
            {{t.serialNumber}}
        </label>
        <label class="ls20 col-md-2">
            {{t.status | StatusName}}
        </label>
        <label class="ls20 col-md-2" style="margin-top:0.2%">
        <button type="button" class="btn btn-success btn-sm"  @click="catchToolToChange(t)">
            Alterar Status da Ferramenta
        </button>
        </label>
        <label for="" class="ls20 col-md-1">
            <i class="fa fa-eye" style="font-size:20px;cursor:pointer" @click="getToolHistory(t.toolId);showModal('viewHistory')"></i>
        </label>
    </div>
    </div>
    <b-modal size="lg" ref="viewHistory" hide-footer title="Histórico de Mudança de Status">
        <div class="cabecalho-table-modal">
        <label @click.stop.prevent="cabecalhoSetas[0]==false?desorganizar(toolsHistory, 'name',0):organizar(toolsHistory, 'name',0);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">Nome 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[0]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[1]==false?desorganizar(toolsHistory, 'description',1):organizar(toolsHistory, 'description',1);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Descrição 
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[1]==true" aria-hidden="true"></i>
            </font></b>
        </label>
        <label @click.stop.prevent="cabecalhoSetas[2]==false?desorganizar(toolsHistory, 'previousState',2):organizar(toolsHistory, 'previousState',2);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Status Anterior
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[2]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
        <label @click.stop.prevent="cabecalhoSetas[3]==false?desorganizar(toolsHistory, 'nextState',3):organizar(toolsHistory, 'nextState',3);" class="ls2-cabecalho-tm col-md-2">
            <b><font class="cursor-class" color="#ffffff">
                Status Posterior
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[3]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
        <label @click.stop.prevent="cabecalhoSetas[4]==false?desorganizar(toolsHistory, 'previoustLife',4):organizar(toolsHistory, 'previoustLife',3);" class="ls2-cabecalho-tm col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Vida Útil
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[4]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
        <label @click.stop.prevent="cabecalhoSetas[5]==false?desorganizar(toolsHistory, 'timeStampTicks',5):organizar(toolsHistory, 'timeStampTicks',3);" class="ls2-cabecalho-tm col-md-1">
            <b><font class="cursor-class" color="#ffffff">
                Data
                <i class="fa fa-sort-desc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==false" aria-hidden="true"></i>
                <i class="fa fa-sort-asc pull-right" style="font-size:21px;" v-if="cabecalhoSetas[5]==true" aria-hidden="true"></i>
            </font></b>
        </label> 
    </div>
    <div class="table-margin-tm"> 
    <div v-for="(t,index) in toolsHistory" :key="index" :class="{cinza: index%2==0}">
        <label class="ls20 col-md-2">
            {{t.name}}
        </label>
        <label class="ls20 col-md-2">
            {{t.description}}
        </label>
        <label class="ls20 col-md-1">
            {{t.previousState | StatusName}}
        </label>
        <label class="ls20 col-md-1">
            {{t.nextState | StatusName}}
        </label>
        <label class="ls20 col-md-1">
            {{t.previoustLife}}
        </label>
        <label class="ls20 col-md-1">
            {{t.timeStampTicks}}
        </label>
    </div>
    </div>
    </b-modal>    

    <!-- Modal   ALTERAR STATUS DA FERRAMENTA-->
        <b-modal ref="modalGerT" hide-footer title="Alterar Status da Ferramenta">
        <div class="modal-body">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="" >Status</label>
                    <input type="text" disabled class="form-control" v-model="tool.status">
                </div>
                <!-- {{ tool }} -->
                </div>
                <div class="form-row">
                <label for="">Status Disponíveis</label>
                <div class="col-md-12">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-success btn-sm" 
                        @click.prevent="changeStatus(tool, 'available' )" v-if="buttons.available">
                        Disponibilizar
                        </button> 
                        <button type="button" class="btn btn-outline-secondary btn-sm" 
                        @click.prevent="changeStatus(tool, 'not_available' )" v-if="buttons.not_available">
                        Indisponibilizar
                        </button> 
                        <button type="button" class="btn btn-outline-warning btn-sm" 
                        @click.prevent="changeStatus(tool, 'in_use')" v-show="buttons.in_use">
                        Em uso
                        </button> 
                        <button type="button" class="btn btn-outline-danger btn-sm" 
                        @click.prevent="changeStatus(tool, 'in_maintenance')" v-if="buttons.in_maintenance">
                        Em Manutenção
                        </button> 
                        <button type="button" class="btn btn-secondary btn-sm" 
                        @click.prevent="changeStatus(tool,'inactive')" v-if="buttons.inactive">
                        Inativar
                        </button>
                    </div>
                </div>
                </div>
            <div class="form-row" v-show="needJustification">
                <label for="">Motivo</label>
                <textarea  type="textarea" class="form-control" v-model="obj.text" placeholder="Escreva o motivo da mudança de status"/>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-success" @click="updateStatus(tool)">
                <i class="fa fa-check-square" aria-hidden="true"></i> Confirmar
            </button>   
        </div>
    </b-modal>
    <!-- MODAL PARA EXIBIR ERRO  -->
    <b-modal ref="modalInfo" title="Mensagem" hide-footer>
    <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
    </b-modal>
</div>
</template>

<script src="./js/toolsmanagement.js">
</script>

<style>
@import url("./css/toolsmanagement.css");
</style>
