<template>
    <div>
        <div class="fixed-top nav-history-alarm">
            <h1 class="title-page-history-alarm"><b>Histórico de Alarmes</b></h1>
            <ul class="nav d-flex align-items-center">
                <li class="nav-item nav-item-hist-alarm">
                    <button type="button" class="btn btn-success btn-sm btn-sm" @click.stop.prevent="showModal">Filtrar de Busca</button>
                </li>
            </ul>
        </div>

        <div class="col-lg-11">
            <div id="chartdiv" style="width: 100%; height: 400px;"></div>
        </div>
        <div class="h-alarm col">
            <div id="load" v-show="carregando">
            <stretch background="#4d4d4d"></stretch>
            </div> 
            <div class="col offset-lg-3 no-ha-msg">
                <label class="ls ls2">
                    <b>
                    <font color="#9BA6A5"> 
                    {{msg}}</font></b>
                </label>&nbsp;&nbsp;&nbsp;
            </div>
            <div v-for="(h, index) in alarms" v-bind:key="index">
                <div class="card-header card-header-alarm">
                    <b></b>
                </div>
                <div class="card-body">
                
                    <label class="ls ls2">
                        <b>
                            <font color="#9BA6A5">Estação </font>
                        </b>{{h.thingName}}
                    </label>&nbsp;&nbsp;&nbsp;
                    <label class="ls ls2">
                        <b>
                            <font color="#9BA6A5">Tipo de Alerta </font>
                        </b>{{h.alarmName}}
                    </label>&nbsp;&nbsp;&nbsp;
                    <label class="ls ls2">
                        <b>
                            <font color="#9BA6A5">Descrição </font>
                        </b>{{h.alarmDescription}}
                    </label>&nbsp;&nbsp;&nbsp;
                    <label class="ls ls2">
                        <b>
                            <font color="#9BA6A5">Data inicial </font>
                        </b>{{h.iniDate}}
                    </label>&nbsp;&nbsp;&nbsp;
                </div>
            </div>
            <div class="paginacao" v-show="total>0">
                <nav aria-label="">
                    <ul class="pagination justify-content-center">
                        <li v-show="startat>0" class="page-item">
                            <a class="page-link" href="#" @click.stop.prevent="buscar(startat-=20, quantityPage)">Previous</a>
                        </li>
                        <li class="page-item" v-bind:class="{active:num==pageAtual}" v-for="(num, index) in pages" v-bind:key="index">
                            <a class="page-link" href="#" @click.stop.prevent="buscar(startat=num*20, quantityPage)">{{num+1}}</a>
                        </li>
                        <li class="page-item" v-show="pages.length>1 && startat+20<total">
                            <a class="page-link" href="#" @click.stop.prevent="buscar(startat+=20, quantityPage)">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <br>
        <b-modal ref="myModalEdit" hide-footer title="Filtrar Busca">
            <div class="modal-body">
                
            <label><b>Estação </b></label>  
            <div class="form-row">
                <div class="form-group col-md-9">
                <select class="form-control" v-model="thingId">    
                    <option v-for="(t,index) in things" :value="t.thingId" v-bind:key="index">{{ t.thingName }}
                    </option>
                </select>
                </div>
            </div>
            <br>
                <label><b>Início </b></label>  
            <div class="form-row">
                <div class="form-group col-md-4">
                    <date-picker v-model="date" :config="config"></date-picker>
                </div>
                <div class="form-group col-md-3">
                    <vue-timepicker format="HH:mm" v-model="timeIni"></vue-timepicker>
                </div>
            </div>
            <br>
            <label><b>Fim </b></label>  
            <div class="form-row">
                <div class="form-group col-md-4">
                    <date-picker v-model="datef" :config="config2"></date-picker>
                </div>
                <div class="form-group col-md-3">
                    <vue-timepicker format="HH:mm" v-model="timeFim"></vue-timepicker>
                </div>
            </div>
            </div>
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button class="btn btn-success" @click.stop.prevent="getAlarmHistory()">
                        <i class="fa fa-check"></i>
                    </button>
                    <!-- <button class="btn btn-danger">
                        <i class="fa fa-remove" @click.stop.prevent="hideModal()"></i>
                    </button> -->
                </div>
            </div>
        </b-modal>
  </div>
</template>
<script src="./js/historianalarm.js">
</script>
<style>
@import url("./css/historianalarm.css");
</style>
