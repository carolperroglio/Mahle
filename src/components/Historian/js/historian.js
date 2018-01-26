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
            selectedTheme: []
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
        addData () {
            this.dataset.push(this.dataentry)
            this.labels.push(this.datalabel)
            this.datalabel = ''
            this.dataentry = ''
          },
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
                var Fim = this.datef.toString()+' '+this.timeFim.HH+':'+this.timeFim.mm;
                var ticksF = this.dateToTicks(Fim);
                console.log('I: '+ticksI);
                console.log('F: '+ticksF);
                console.log(this.url+'thingId='+this.thingId+'&startDate='+ticksI+'&endDate='+ticksF);
                axios.get(this.url+'thingId='+this.thingId+'&startDate='+ticksI+'&endDate='+ticksF).then(response => {
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
            this.$refs.myModalEdit.hide();
            this.created();
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
                        "title": "graph 1",
                        "type": "smoothedLine",
                        "valueField": "set_ll"
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
                        "title": "graph 2",
                        "valueField": "set_l"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-3",
                        "title": "graph 3",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "valueField": "set_hh"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-4",
                        "title": "graph 4",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "valueField": "set_h"
                    },
                    {
                        "balloonColor": "#8EE8EB",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bullet": "round",
                        "bulletSize": 10,
                        "color": "#000000",
                        "id": "AmGraph-5",
                        "title": "graph 5",
                        "lineThickness": 3,
                        "type": "smoothedLine",
                        "valueField": "medicao"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": ""
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": [
                    {
                        "category": "category 1",
                        "set_ll": 8,
                        "set_l": "35",
                        "set_hh": 69,
                        "set_h": 16,
                        "medicao": 74
                    },
                    {
                        "category": "category 2",
                        "set_ll": 6,
                        "set_l": 52,
                        "set_hh": 69,
                        "set_h": 61,
                        "medicao": 13
                    },
                    {
                        "category": "category 3",
                        "set_ll": 2,
                        "set_l": 26,
                        "set_hh": 20,
                        "set_h": 22,
                        "medicao": 35
                    },
                    {
                        "category": "category 4",
                        "set_ll": 1,
                        "set_l": 10,
                        "set_hh": 7,
                        "set_h": 89,
                        "medicao": 16
                    },
                    {
                        "category": "category 5",
                        "set_ll": 2,
                        "set_l": 88,
                        "set_hh": 30,
                        "set_h": 87,
                        "medicao": 96
                    },
                    {
                        "category": "category 6",
                        "set_ll": 3,
                        "set_l": 18,
                        "set_hh": 26,
                        "set_h": 24,
                        "medicao": 3
                    },
                    {
                        "category": "category 7",
                        "set_ll": 6,
                        "set_l": 3,
                        "set_hh": 50,
                        "set_h": 52,
                        "medicao": 42
                    }
                ]
            }
            );
          }
        },
    beforeMount: function() {
        this.showModal();
        this.getThings();
    },

}