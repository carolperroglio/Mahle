import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import JsonExcel from 'vue-json-excel'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/fabric.js/fabric.min.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/FileSaver.js/FileSaver.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/pdfmake/pdfmake.min.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/pdfmake/vfs_fonts.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/jszip/jszip.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/export.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/export.css')
import {
    Stretch
} from 'vue-loading-spinner'
import {
    setTimeout
} from 'timers'
import logo from './onyx.jpeg'
import logoMahle from './loooogomahle.png'

es6promisse.polyfill();
var ipServerRecipe = process.env.RECIPE_API;
var ipServerOP = process.env.OP_API;
var ipServerThing = process.env.THINGS_API;


//TROCAR PRA PORTA IP DO ENDPOINT DE RELATÓRIOS DE ALARMES
var ipReport = process.env.REPORT_API;

export default {
    name: "Alarms",
    data() {
        return {
            urlGatewayThings: ipReport + '/gateway/things',
            urlGatewayOP: ipReport + '/gateway/productionorder?fieldFilter=productionOrderNumber&fieldValue=',
            url: ipReport,
            configCache: {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            },
            URL_OP: process.env.OP_API + '/api/productionorders/v2?filters=productionOrderTypeId,1&filters=productionOrderNumber,',
            cabecalhoSetas: [false, false, false, false, false],
            carregando: false,
            erro: '',
            produtos: '',
            produto: '',
            jSONReport: {},
            graphs: [],
            dataProvider: [],
            groups: [],
            // to show server response
            msgErro: '',
            erro: false,
            // config and variables to use in timepicker and datepicker
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
            // Armazena dados para preencher a tabela
            tableAlarms: [],
            filterSelected: '',
            thingId: '',
            things: [],
            prosFim: [],
            opName: '',
            groupselected: '',
            OP: '',
            thingNameInTable: '',
            // to download to excel
            jsonfields: { Data: 'category', Alto: 'alto', Baixo: 'baixo', Muitoalto: 'muito alto', Muitobaixo: 'muito alto', Offline: 'offline' },
            // to usenin export to PDF
            chart: ''
        }
    },
    components: {
        'date-picker': datePicker,
        'vue-timepicker': VueTimepicker,
        'downloadExcel': JsonExcel,
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    methods: {
        showModal(id) {
            this.$refs[id].show();
        },
        hideModal(id) {
            this.$refs[id].hide();
        },
        organizar(hp, campo, pos) {
            hp.sort(function(a, b) {
                return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;
        },
        desorganizar(hp, campo, pos) {
            hp.sort(function(a, b) {
                return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0);
            });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        /*
            TICKS CONVERTER
        */
        ticksToDate(dateTicks, containsHour, containsOnlyHour) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;

            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;

            jsDate = new Date(jsTicks);
            var timezone = jsDate.getTimezoneOffset() / 60;
            var hour = jsDate.setHours(jsDate.getHours() + timezone);
            hour = jsDate.getHours();
            var min = "";

            if (jsDate.getMinutes() < 10) {
                min = "0" + jsDate.getMinutes();
            } else {
                min = jsDate.getMinutes();
            }

            var dateFormatted;

            if (containsHour) {
                dateFormatted = jsDate.getDate() + "/" +
                    (jsDate.getMonth() + 1) + "/" +
                    jsDate.getFullYear() + " " + hour + ":" + min;
            } else if (containsOnlyHour) {
                dateFormatted = " " + hour + ":" + min;
            } else {
                dateFormatted = jsDate.getDate() + "/" +
                    (jsDate.getMonth() + 1) + "/" +
                    jsDate.getFullYear();
            }

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
        // SEARCH BASED ON NAME
        getResults(url, name, pros) {
            pros = [];
            if (name.length >= 3) {
                axios.get(url + name, this.configCache).then((response) => {
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
        //SET THE COLUMN HEADER
        getHeaderToPdf() {
            var headers = [{
                    'title': 'Parâmetro',
                    'dataKey': 'type'
                },
                {
                    'title': 'Equipamento',
                    'dataKey': 'thingName'
                },
                {
                    'title': 'Tipo',
                    'dataKey': 'groupTag'
                },
                {
                    'title': 'Data',
                    'dataKey': 'dateIni'
                },
                {
                    'title': 'Hora Inicio',
                    'dataKey': 'hourIni'
                },
                {
                    'title': 'Hora Fim',
                    'dataKey': 'dateEnd'
                },
                {
                    'title': 'ordem',
                    'dataKey': 'ordem'
                },
                {
                    'title': 'rolo',
                    'dataKey': 'rolo'
                },
                {
                    'title': 'codTira',
                    'dataKey': 'codTira'
                },
            ];

            return headers;
        },
        // EXPORT TO PDF
        toPdf() {

            var PDFprovider = this.tableAlarms;
            var thingName = this.thingNameInTable;
            // OBTEM OS NOMES DAS COLUNAS DA TABELA
            var columns = this.getHeaderToPdf();

            setTimeout(() => {

                this.chart["export"].capture({}, function() {
                    this.grafico = new Image();
                    // var header = $('cabecalho-table');


                    this.toPNG({}, function(data) {
                        this.grafico.src = data;
                        console.log("Export");

                        var doc = new jsPDF('p', 'pt');
                        var img = new Image();
                        var imgLogo = new Image();
                        img.src = logo;
                        imgLogo.src = logoMahle;

                        // ADICIONA LOGO MAHLE
                        doc.addImage(imgLogo, "PNG", 510, 10, 60, 20);
                        doc.setFontSize(20);
                        // ADICIONA LOGO SISTEMA ONYX
                        doc.addImage(img, "PNG", 10, 10, 50, 20);

                        // ADICIONA TÍTULO                            
                        doc.text(35, 65, "Relatório de Alarmes " + thingName)
                            // ADICIONA GRÁFICO                            
                        doc.addImage(this.grafico, "PNG", 10, 100, 550, 300);

                        // ADICIONA TABELA
                        doc.autoTable(columns, PDFprovider, {
                            // addPageContent: pageContent,
                            showHeader: 'everyPage',
                            styles:{
                                overflow: 'linebreak' 
                            },
                            margin: {
                                top: 480,
                                left: 10,
                                right: 20
                            },
                            halign: 'middle', // left, center, right
                            valign: 'middle',
                            columnWidth: 20,
                            tableWidth: 600
                        });

                        // doc.addImage(table, "PNG", 20, 550, 600, 200);

                        doc.save("Relatório de Alarmes " + thingName + ".pdf");
                    });
                });
            }, 1500);
        },
        //
        getThings() {
            axios.get(this.urlGatewayThings).then((response) => {
                this.things = response.data;
            }, (error) => {
                console.log(error);
            })
        },
        getThingNameById() {
            this.things.forEach(t => {
                if (t.thingId == this.thingId) {
                    this.thingNameInTable = t.thingName;
                }
            });
            console.log(this.thingNameInTable);
            axios.get(this.urlGatewayThings + '/' + this.thingId, this.configCache).then((response) => {                
                this.thingNameInTable = response.data.thingName;
            }, (error) => {
                console.log(error);
            })
        },
        getReportByDate() {
            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            axios.get(this.url + '/api/alarmreport?thingId=' + this.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                this.jSONReport = response.data;
                console.log("Teste");
                console.log("Teste");
                console.log("Teste");

                console.log(this.jSONReport);
                this.getThingNameById();
                this.hideModal('filterSearch');
                this.editGroup();

            }).catch((error) => {
                if (error.response != undefined) {
                    if (error.response.status == '404' || error.response.status == '400') {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = "Sem dados no período selecionado";
                        this.showModal("modalInfo");
                    } else {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = error.message;
                        this.showModal("modalInfo");
                    }
                }
            })
        },
        getReportByOP() {
            axios.get(this.url + '/api/alarmreport?thingId=' + this.thingId + '&opId=' + this.OP).then((response) => {
                this.jSONReport = response.data;
                this.getThingNameById();
                this.hideModal('filterSearch');
                this.editGroup();
            }).catch((error) => {
                if (error.response != undefined) {
                    if (error.response.status == '404') {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = "Sem dados no período selecionado";
                        this.showModal("modalInfo");
                    } else {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = error.message;
                        this.showModal("modalInfo");
                    }
                }
            })
        },
        getTable(groupselected) {
            var objTable = {};
            this.tableAlarms = [];
            console.log(this.jSONReport);
            this.jSONReport.table.forEach(obj => {
                if (groupselected == obj.groupTag) {
                    for (var x = 0; x < obj.data.length; x++) {
                        for (var key in obj.data[x]) {
                            objTable["thingId"] = obj.thingId;
                            objTable["groupTag"] = obj.groupTag;
                            objTable["thingName"] = this.thingNameInTable;

                            if (key == 'dateIni') {
                                objTable[key] = this.ticksToDate(obj.data[x][key], false, false);
                                objTable["hourIni"] = this.ticksToDate(obj.data[x][key], false, true);
                            } else if (key == 'dateEnd') {
                                objTable[key] = this.ticksToDate(obj.data[x][key], false, true);
                            } else {
                                objTable[key] = obj.data[x][key];
                            }
                        }                                   
                        console.log(this.tableAlarms);
                        this.tableAlarms.push(objTable);
                        objTable = {};
                    }
                }
            });
            // this.tableAlarms = this.jSONReport.table;
        },
        editGroup() {
            //LIMPA O JSON PARA TIRAR OS GRUPOS DA PESQUISA ANTERIOR
            this.groups = [];
            // pega todos os grupos existentes
            for (var x = 0; x < this.jSONReport.graphs.length; x++) {
                this.groups.push(this.jSONReport.graphs[x].groupTag);
            }
            

            this.makeGraph(this.groups);
        },

        makeGraph(groupselected) {
            //LIMPA O JSON PARA TIRAR OS GRUPOS DA PESQUISA ANTERIOR
            this.graphs = []

            var obj2 = {};
            var obj = this.jSONReport.graphs[0];
            for (var key in obj.data[0]) {
                if (key != 'category') {
                    obj2["balloonColor"] = "#808080";
                    obj2["balloonText"] = "[[title]] em [[category]]:[[value]]";
                    obj2["fillAlphas"] = 1;
                    obj2["type"] = "column";
                    obj2["title"] = key; // offline, muito alto, alto, baixo, muito baixo
                    obj2["valueField"] = key; // offline, muito alto, alto, baixo, muito baixo

                    this.graphs.push(obj2)
                    obj2 = {}
                }
            }
            console.log('this.graphs');
            console.log(this.graphs);
            if (this.groupselected.length == 0) {
                groupselected = this.groups[0]
            }
            this.makeDataProvider(groupselected);
        },

        makeDataProvider(groupselected) {
            var objProvider = {};
            this.dataProvider = [];

            this.jSONReport.graphs.forEach(obj => {
                if (groupselected == obj.groupTag) {
                    for (var x = 0; x < obj.data.length; x++) {
                        for (var key in obj.data[x]) {
                            if (key == 'category') {
                                objProvider[key] = this.ticksToDate(obj.data[x][key], false, false);
                            } else {
                                objProvider[key] = obj.data[x][key];
                            }
                        }
                        this.dataProvider.push(objProvider);
                        objProvider = {};
                    }
                }
            });

            console.log("this.dataProvider")
            console.log(this.dataProvider)
            this.getTable(groupselected);
            this.atualizaGraf();
        },

        atualizaGraf() {

            this.chart = window.AmCharts.makeChart("chartAlarm", {
                "path": "dist/amcharts/",
                "libs": {
                    "autoLoad": false
                },
                "type": "serial",
                "categoryField": "category",
                "chartCursor": {},
                "graphs": this.graphs,
                "guides": [],
                "valueScrollbar": {
                    "enabled": true,
                    "offset": 4,
                    "tabIndex": 6
                },
                "chartScrollbar": {
                    "enabled": true
                },
                "categoryAxis": {
                    "autoRotateAngle": -20,
                    "autoRotateCount": 0,
                    "gridPosition": "start",
                    "titleFontSize": 0,
                    "titleRotation": 3
                },
                "legend": {
                    "enabled": true
                },
                "valueAxes": [{
                    "id": "ValueAxis-1",
                    "title": ""
                }],
                "export": {
                    "enabled": true
                },
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": this.dataProvider
            });
        }
    },
    beforeMount() {
        this.getThings();
        // this.getReport();
    },
}