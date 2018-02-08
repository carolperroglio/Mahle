import Vue from 'vue'
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
import VueTiles from 'vue-tiles'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'vue-tiles/dist/vue-tiles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import { LinkTile, ContentSm, ContentMd, ContentLg } from 'vue-tiles'
import { array } from 'bootstrap-vue/es/utils';
import { Stretch } from 'vue-loading-spinner'

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
            url: process.env.THINGS_API,
            urlHist: 'http://brsbap01:8010',
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
            obj: {},
            ticksIni: '',
            ticksFim: '',
            fieldFilter: '',
            fieldValue: '',
            thingId: '',
            things: [],
            bottom: 'bottom',
            idstat: '',
            idstatcollpse: '',
            selectedTheme: [],
            provider: []
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
        'vue-timepicker': VueTimepicker,
        Stretch
    },
    directives: {
        'b-toggle': vBToggle,
        'v-b-toggle': vBToggle,
        'b-modal': bModalDirective
    },
    methods: {
        addData () {
            this.dataset.push(this.dataentry)
            this.labels.push(this.datalabel)
            this.datalabel = ''
            this.dataentry = ''
          },
        getThings(){                                  
            axios.get(this.url+'/api/things').then((response)=>{                                           
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
                var Fim = this.datef.toString()+' '+this.timeFim.HH+':'+this.timeFim.mm;
                var ticksF = this.dateToTicks(Fim);
                console.log('I: '+ticksI);
                console.log('F: '+ticksF);
                console.log(this.urlHist+'/api/Historian?'+'thingId='+this.thingId+'&startDate='+ticksI+'&endDate='+ticksF);
                axios.get(this.urlHist+'/api/Historian?'+'thingId='+this.thingId+'&startDate='+ticksI+'&endDate='+ticksF).then(response => {
                    
                    response.data.forEach((R) => {
                            var dataObj = new Object();
                            var tag = R.tag;
                            this.obj["category"] = this.ticksToDate(R.date);
                            this.obj[tag] = R.value;
                            dataObj = Object.assign(this.obj);
                            console.log(dataObj);
                            this.provider.push(dataObj);
                    });
                    console.log(this.provider);

                }).catch(error => {
                    console.log(error);
                });
            }, 200);
            setTimeout(() => {
                this.carregando = false;
                this.created();
            }, 300);            
        },
        ticksToDate(dateTicks){
            var epochTicks = 621355968000000000,
            ticksPerMillisecond = 10000,  
            jsTicks = 0,          
            jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            var hours = jsDate.toString().slice(4,21);
            return hours;
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
            this.$refs.myModalEdit.hide();
        },
        created() {
            window.AmCharts.makeChart("chartdiv",
            {
                "type": "serial",
                "categoryField": "category",
                "autoMarginOffset": 40,
                "marginRight": 60,
                "marginTop": 60,
                "startDuration": 1,
                "borderColor": "#C67373",
                "fontSize": 13,
                "theme": "light",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "columnWidth": 0.58,
                        "fixedColumnWidth": -7,
                        "fontSize": -4,
                        "id": "AmGraph-1",
                        "lineAlpha": 1,
                        "lineThickness": 3,
                        "tabIndex": -3,
                        "title": "setpLL_ET-1002_read",
                        "type": "smoothedLine",
                        "valueField": "setpLL_ET-1002_read"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-2",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "title": "setpL_ET-1002_read",
                        "valueField": "setpL_ET-1002_read"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-3",
                        "title": "setpHH_ET-1002_read",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "valueField": "setpHH_ET-1002_read"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-4",
                        "title": "setpH_ET-1002_read",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "valueField": "setpH_ET-1002_read"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-5",
                        "title": "medicao_ET-1002_read",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "valueField": "medicao_ET-1002_read"
                    }
                ],
                "guides": [],
                "legend": {
                    "enabled": true
                },
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": ""
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": this.provider
            }
            );
          }
        },
    beforeMount: function() {
        this.showModal();
        this.getThings();
    },

}