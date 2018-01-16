<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <nav class="fixed-top nav-recipe">
            <li class="title-recipe">
                Ferramentas em uso
            </li>
        </nav>

<!--                         -->
<!--                         -->
<!--        Fases            --> 
<!--                         -->
      
        <div class="" style="">
            <div class="tools">
                <div class="progress" v-show="carregando">
                    <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                </div>
                    </div>
                        <div class="table table-striped">
                            <div v-for="(t,index) in tools" v-bind:key="index">
                                <div class="">
                            <div class="card-header card-header8">
                                <b><font color="#262626">{{t.name}}</font></b></label>&nbsp;&nbsp;&nbsp;
                                </div>
                            <div class="card-body">
                                 <label class="ls">
                                <b><font color="#9BA6A5">Nome: </font></b>{{t.name}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{t.description}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Serial: </font></b>{{t.serialNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Code: </font></b>{{t.code}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Life Cycle: </font></b>{{t.lifeCycle}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Vida Útil Atual: </font></b>{{t.currentLife}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">UM: </font></b>{{t.unitOfMeasurement}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{t.typeName}}</label>&nbsp;&nbsp;&nbsp;
                            </label>
                            </div>
                        </div>   
                        </div>
                         <div class="paginacao-phase" v-show="total>0">
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
                </div>
            </div>
        </div>
</template>



<script src="./js/inusetools.js">
</script>
<style>
@import url("./css/inusetools.css");
</style> 