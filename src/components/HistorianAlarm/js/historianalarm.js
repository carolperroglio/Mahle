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
import JsonExcel from 'vue-json-excel'
import PrintJs from 'print-js'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'vue-tiles/dist/vue-tiles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import { LinkTile, ContentSm, ContentMd, ContentLg } from 'vue-tiles'
import { array } from 'bootstrap-vue/es/utils'
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
            urlHist: process.env.HIST_ALARM_API,
            carregando: false,
            date: '',
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
            alarms: [],
            pages: [],
            pageAtual: 0,
            newGroup: '',
            orderField: '',
            order: '',
            ticksIni: '',
            ticksFim: '',
            fieldFilter: '',
            fieldValue: '',
            thingId: '',
            thingGroup: '',
            thingName: '',
            filename: '',
            things: [],
            tags: [],
            bottom: 'bottom',
            idstat: '',
            idstatcollpse: '',
            selectedTheme: [],
            group: '',
            groups: [],
            graphProvider: [],
            providerAux: [],
            provider: [],
            PDFprovider: [],
            data: [],
            headers: [],
            jsonfields: {},
            msg: ''
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
        'downloadExcel': JsonExcel,
        Stretch
    },
    directives: {
        'b-toggle': vBToggle,
        'v-b-toggle': vBToggle,
        'b-modal': bModalDirective
    },
    methods: {
        getThingName(t) {
            this.thingName = t.thingName;
        },

        addData() {
            this.dataset.push(this.dataentry)
            this.labels.push(this.datalabel)
            this.datalabel = ''
            this.dataentry = ''
        },
        ticksToDate(dateTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;
            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            var hours = jsDate.toString().slice(4, 21);
            return hours;
        },

        dateToTicks(dateTime) {
            var date = new Date(dateTime);
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        },
        getThings() {
            axios.get(this.url + '/api/things').then((response) => {
                this.things = response.data;
            }, (error) => {
                console.log(error);
            })
        },
        getAlarmHistory() {
            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            console.log(this.urlHist + '/api/historianAlarm?thingId=' + this.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF);

            axios.get(this.urlHist + '/api/historianAlarm?thingId=' + this.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                this.msg = "";
                this.alarms = response.data.values;
                console.log(this.alarms);
                var alarmLength = this.alarms.length;
                this.alarms.forEach((alarm) => {
                    for (var count = 0; count < this.things.length; count++) {
                        if (alarm.thingId == this.things[count].thingId) {
                            alarm.thingName = this.things[count].thingName;
                        }
                    }
                    alarm.iniDate = this.ticksToDate(alarm.startDate);
                })
                this.formatGraphData(this.alarms);
            }, (error) => {
                if (error.response.status == 404) {
                    this.alarms = [];
                    this.msg = "Não possui alarme atribuido a thing selecionada neste periodo"
                    console.log(error);
                }
                console.log(error);
            })
            console.log(this.alarms);
            this.carregando = false;
            // this.created();
            this.hideModal();
        },
        toPdf() {
            //To PDF
            var columns = [];
            var title = "title";
            var dataKey = "dataKey";
            this.headers.forEach(e => {
                var obj = new Object;
                obj[title] = e;
                obj[dataKey] = e;
                columns.push(obj);
            })
            console.log(columns);
            this.PDFprovider = this.provider;
            this.PDFprovider.forEach(p => {
                p.Data = p.category;
                delete p.category;
            });

            console.log(this.PDFprovider);
            var doc = new jsPDF('p', 'pt');
            doc.text(35, 17, "Rastreamento Thing " + this.thingId + " Grupo " + this.group)
            doc.autoTable(columns, this.PDFprovider, 15, 65);
            doc.save("RastreamentoThing_" + this.thingId + "_" + this.group + ".pdf");
        },

        /*
            CRIA O GRÁFICO
        */
        formatGraphData(alarms) {
            alarms.forEach((alarm) => {
                //if (R.group == group) {
                var dataObj2 = new Array();
                var obj2 = new Object();

                /**
                 * Criação do JSON de criação das características do gráfico.
                 * Cada linha terá um objeto com as características dentro do array
                 */
                obj2["balloonColor"] = "#808080";
                obj2["balloonText"] = "[[title]] em [[category]]:[[value]]";
                obj2["bullet"] = "round";
                obj2["bulletSize"] = 10;
                obj2["color"] = "#000000";
                obj2["lineThickness"] = 3;
                obj2["type"] = "smoothedLine";
                obj2["title"] = alarm.alarmName;
                obj2["valueField"] = alarm.alarmName;

                var i = 0;

                console.log("R");
                console.log(alarm);


                /**
                 * Criando o campo categoria do JSON do gráfico
                 * E adicionando a data á ele
                 * Para que cada ponto do eixo X seja uma data diferente
                 */
                var dataObj = new Array();

                var category = "category";
                var tagname = alarm.alarmName;

                var obj = new Object();

                obj[category] = this.ticksToDate(alarm.startDate);
                obj[tagname] = alarm.alarmName;

                dataObj = Object.assign(obj);
                console.log(dataObj);
                this.providerAux.push(dataObj);

                i++;

                /**
                 * Adicionando a tag com a respectiva data ao array
                 */

                dataObj2 = Object.assign(obj2);
                console.log(dataObj2);
                this.graphProvider.push(dataObj2);

                console.log("this.graphProvider");
                console.log(this.graphProvider);
                console.log(this.providerAux);
                //}
            });

            /**
             * Separar objetos por data, assim cada obj todas as tags com a mesma data
             */
            console.log("this.providerAux.groupBy('category')");
            console.log(this.providerAux.groupByProperties("category"));

            var groupArray = this.providerAux.groupByProperties("category");


            var newproviderAux = new Array();
            var dataObj3 = new Object();

            groupArray.forEach((Group) => {
                var category = "category";
                var obj3 = new Object();
                obj3[category] = Group[0].category;
                Group.forEach((Tag) => {
                    var keys = Object.keys(Tag);
                    var val = Object.values(Tag);
                    obj3[keys[1]] = val[1];
                    dataObj3 = Object.assign(obj3);
                });

                newproviderAux.push(dataObj3);
                console.log(newproviderAux);
                this.provider = newproviderAux;

            });

        },
        created() {
            window.AmCharts.makeChart("chartdiv", {
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
                "graphs": this.graphProvider,
                "guides": [],
                "legend": {
                    "enabled": true
                },
                "valueAxes": [{
                    "id": "ValueAxis-1",
                    "title": ""
                }],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": this.provider
            });
        },
        showModal() {
            setTimeout(() => {
                this.$refs.myModalEdit.show()
            }, 200);
        },

        hideModal() {
            this.$refs.myModalEdit.hide();
        },
    },
    beforeMount: function() {
        this.showModal();
        this.getThings();
    },
}