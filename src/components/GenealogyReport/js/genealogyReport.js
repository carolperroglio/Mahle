'use strict'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import Datetime from 'vue-datetime'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import JsonExcel from 'vue-json-excel'
import { Stretch } from 'vue-loading-spinner'
import Vue from 'vue';
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import VeeValidate from 'vee-validate';
import { setTimeout } from 'timers';
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle';
import vBtn from 'bootstrap-vue/es/components/button/button';
import { bCardHeader } from 'bootstrap-vue/es/components/card/card-header';
import { bCard } from 'bootstrap-vue/es/components/card/card';
import { bCardFooter } from 'bootstrap-vue/es/components/card/card-footer';
import { bCardGroup } from 'bootstrap-vue/es/components/card/card-group';
import { bCardBody } from 'bootstrap-vue/es/components/card/card-body';
//import { Collapse } from 'bootstrap-vue/es/components';
import { Card } from 'bootstrap-vue/es/components';
import { Collapse } from 'bootstrap-vue/es/components';

Vue.use(Card);
Vue.use(Collapse);
es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}

export default {
    name: "GenealogyReport",
    data() {
        return {
            id: "",
            carregando: false,
            date: '',
            datef: '',
            config: {
                format: 'DD MM YYYY',
                useCurrent: false,
            },
            config2: {
                format: 'DD MM YYYY',
                useCurrent: false,
            },
            timeIni: {
                HH: "00",
                mm: "00"
            },
            timeFim: {
                HH: "23",
                mm: "59"
            },
            config : {
                headers: { 'Cache-Control': 'no-cache' }
            },
            REPORT_API: process.env.REPORT_API + '',
            RECIPE_API: process.env.RECIPE_API + '/api/recipes/v2?filters=recipeTypeId,1&filters=recipeCode,',
            URL_OP: process.env.OP_API+'/api/productionorders/v2?filters=productionOrderTypeId,1&filters=productionOrderNumber,',
            mensagem: '',
            mensagemSuc: '',
            orderField: '',
            fieldValue: '',
            fieldFilter: '',
            order: '',
            erro: '',
            genealogys: [],            
            inicio: '',
            fim:'',
            op:'',
            cod:'',
            prosFim: [],
            recipeCode:'',
            t:''
        }
    },
    computed: {},
    components: {        
        Stretch,
        'b-modal': bModal,
        'date-picker': datePicker,
        'vue-timepicker': VueTimepicker,
        'downloadExcel': JsonExcel,
        'b-btn': vBtn,
        'date': Datetime,
        'b-dropdown-item': bDropdownItem,
    },
    directives: {
        'b-modal': bModalDirective,
        VeeValidate,        
    },
    methods: {
        collapse(id) {
            this.$refs[id].collapse('show')
        },
        showModal() {            
            setTimeout(() => {
                this.$refs.myModalEdit.show()
            }, 200);
        },
        hideModal() {
            this.$refs.myModalRef.hide()
        },
        
        organizar(genealogy, campo, pos) {
            genealogy.sort(function(a, b) { console.log(a[campo]); return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;

        },        
        desorganizar(genealogy, campo, pos) {
            genealogy.sort(function(a, b) { return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },       

        verificaColapse(comp,id,mais, menos){                        
            if($(id).hasClass('show')){                   
                $(comp).removeClass(menos); 
                $(comp).addClass(mais);                                                
            }else{                
                $(comp).removeClass(mais); 
                $(comp).addClass(menos);
            }
        },

        getGenealogy(fieldFilter, op, cod, dateIni, dateFim){
            this.carregando =true;
            var dIni, dFim;
            if(fieldFilter != 'op'){
                dIni = ((new Date(dateIni).getTime() * 10000) + 621355968000000000) - (new Date(dateIni).getTimezoneOffset() * 600000000);
                dFim = ((new Date(dateFim).getTime() * 10000) + 621355968000000000) - (new Date(dateFim).getTimezoneOffset() * 600000000);
            }
            axios.get("http://localhost:5007/api/genealogy?fieldFilter="+fieldFilter+"&cod="+cod+"&startDate="+dIni+"&endDate="+dFim, this.config).then((response) => {                
                this.genealogys = response.data;                                
                this.carregando = false;
            }, (error) => {
                this.carregando = false; 
                this.erro = error               
                console.log("Erro");
                console.log(error);
            })
        },


        ticksToDate(dateTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            var dateFormatted = jsDate.getDate() + "/" +
                (jsDate.getMonth() + 1) + "/" +
                jsDate.getFullYear() + " " + jsDate.getHours() + ":" + jsDate.getMinutes();
            // var hours = jsDate.toString().slice(4, 21);
            return dateFormatted;
        },

        dateToTicks(dateTime) {
            var dateToTransform = dateTime.slice(3, 6) +
                dateTime.slice(0, 3) +
                dateTime.slice(6, 10) +
                dateTime.slice(10, 16);
            var date = new Date(dateToTransform);
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        }, 
        
        getResults(url, name, pros) {
            pros = [];
            if (name.length >= 3) {
                axios.get(url + name, this.config).then((response) => {
                    if(response.data.values)
                        response.data.values.forEach((pro) => {
                            pros.push(pro);
                        });
                    else
                        response.data.forEach((pro) => {
                            pros.push(pro);
                        });
                }, (error) => {
                    console.log(error);
                })
            }
            return pros;
        },
    },    
}