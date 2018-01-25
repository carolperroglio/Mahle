import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import { setTimeout } from 'timers'
import bButton from 'bootstrap-vue/es/components/button/button'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import Vue from 'vue'
import VueTiles from 'vue-tiles'
import 'vue-tiles/dist/vue-tiles.css'
import { LinkTile, ContentSm, ContentMd, ContentLg } from 'vue-tiles'

es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    var num = este.pageAtual + 5 > fim ? fim : este.pageAtual + 5
    if (este.pageAtual > 11) {
        for (var i = este.pageAtual - 5; i < num; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < num; i++)
            este.pages[i] = i;
    }
}

export default {
    name: "Historian",
    data() {
        return {
            url: 'http://brsbap01:8010/api/Historian?',
            urlThing: 'http://brsbap01:8001/api/things',
            carregando: false,
            date:'',
            datef: '',
            config: {
            format: 'MM DD YYYY',
            useCurrent: false,
            },
            config2: {
                format: 'MM DD YYYY',
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
            quantityPage: 20,
            startat: 0,
            total: 0,
            history: [],
            pages: [],
            pageAtual: 0,
            orderField: '',
            order: '',
            ticksIni: '',
            ticksFim: '',
            fieldFilter: '',
            fieldValue: '',
            thingId: '',
            things: [],
            bottom: 'bottom',
            idstat: '',
            idstatcollpse: '',
            themeArr: ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'],
            selectedTheme: [],           
        }
    },
    components: {
        'b-button': bButton,
        'link-tile': LinkTile,
        'content-sm': ContentSm,
        'content-md': ContentMd,
        'content-lg': ContentLg,
        'b-collapse': bCollapse,
        'b-modal': bModal,
        'date-picker': datePicker,
        'vue-timepicker': VueTimepicker   
    },
    directives: {
        'b-toggle': vBToggle,
        'v-b-toggle': vBToggle,
        'b-modal': bModalDirective
    },
    methods: {
        getThings(){                                  
            axios.get(this.urlThing).then((response)=>{                                           
                this.things = response.data;
            },(error)=>{
                console.log(error);
            }) 
            },
        getHistory(){
            this.carregando = true;
            setTimeout(() => {
                var Ini = this.date.toString()+' '+this.timeIni.HH+':'+this.timeIni.mm;  
                var ticksI = this.dateToTicks(Ini);
                var Fim = this.date.toString()+' '+this.timeFim.HH+':'+this.timeFim.mm;
                var ticksF = this.dateToTicks(Fim);
                console.log('I: '+ticksI);
                console.log('dateI: '+ this.ticksToDate(ticksI));
                console.log('F: '+ticksF);
                console.log('dateF: '+ this.ticksToDate(ticksF));
                axios.get(this.url+'thingId='+this.thingId+'&startDate='+this.ticksI+'&endDate='+this.ticksF).then(response => {
                    this.history = response.data;
                    console.log(this.history);
                    this.carregando = false;
                }).catch(error => {
                    console.log(error);
                })
            }, 200);
        },
        ticksToDate(dateTicks){
            var epochTicks = 621355968000000000,
            ticksPerMillisecond = 10000,  
            jsTicks = 0,          
            jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            return jsDate;
            },
        dateToTicks(dateTime){
            var date = new Date(dateTime); 
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        },
        showModal() {
            setTimeout(() => {
                this.$refs.myModalEdit.show()
            }, 200);
        },
        hideModal() {
            this.$refs.myModalEdit.hide()
        }
        },
    beforeMount: function() {
        this.showModal();
        this.getThings();
    }
}