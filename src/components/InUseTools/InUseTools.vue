<template>
    <div>
        <!--                                 -->
        <!--                                 -->
        <!--Redireciona p/página de cad nova -->
        <!--                                 -->
        <!--                                 -->
        <nav class="fixed-top nav-InUseTools">
            <li class="title-InUseTools">
                <b>Ferramentas em uso</b>
            </li>
        </nav>

<!--                         -->
<!--                         -->
<!--        Fases            --> 
<!--                         -->
      
        <div class="" style="">
            <div class="InUseTools">
                <div id="load" v-show="carregando">
                <stretch background="#4d4d4d"></stretch>
                </div> 
                    </div>
                        <div class="table table-striped">
                            <div v-for="(t,index) in tools" v-bind:key="index">
                                <div class="">
                            <div class="card-header card-header8">
                                <b><font color="#262626">{{t.name}}</font></b>&nbsp;&nbsp;&nbsp;
                                </div>
                            <div class="card-body">
                                 <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Nome: </font></b>{{t.name}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Descrição: </font></b>{{t.description}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Número Serial: </font></b>{{t.serialNumber}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Código: </font></b>{{t.code}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Vida Útil: </font></b>{{t.lifeCycle}}</label>&nbsp;&nbsp;&nbsp;
                            <!-- <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Vida Útil Atual: </font></b>{{t.currentLife}}</label>&nbsp;&nbsp;&nbsp; -->
                            <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Unidade de Medida: </font></b>{{t.unitOfMeasurement}}</label>&nbsp;&nbsp;&nbsp;
                            <label class="ls lsinuse">
                                <b><font color="#9BA6A5">Tipo: </font></b>{{t.typeName}}</label>&nbsp;&nbsp;&nbsp;
                            </div>
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
                </div>
            </div>
</template>



<script src="./js/inusetools.js">
</script>
<style>
@import url("./css/inusetools.css");
</style> 