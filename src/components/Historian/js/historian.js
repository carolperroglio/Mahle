import Vue from 'vue'
window.Vue = Vue

import axios from '../../../.././node_modules/axios/index.js'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/fabric.js/fabric.min.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/FileSaver.js/FileSaver.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/pdfmake/pdfmake.min.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/pdfmake/vfs_fonts.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/libs/jszip/jszip.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/export.js')
require('../../../.././node_modules/amcharts3/amcharts/plugins/export/export.css')
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import {
    setTimeout
} from 'timers'
import bButton from 'bootstrap-vue/es/components/button/button'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import VueTiles from 'vue-tiles'
import JsonExcel from 'vue-json-excel'
import PrintJs from 'print-js'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dt from 'datatables.net';
require('../../../.././node_modules/vuejs-datatable');
var download = require('../../../.././node_modules/js-file-download');
import html2canvas from 'html2canvas';
import 'vue-tiles/dist/vue-tiles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import {
    LinkTile,
    ContentSm,
    ContentMd,
    ContentLg
} from 'vue-tiles'
import {
    array
} from 'bootstrap-vue/es/utils'
import {
    Stretch
} from 'vue-loading-spinner'
import logoMahle from './loooogomahle.png'
import logo from './onyx.jpeg'

import {
    encode
} from 'punycode';
import {
    error
} from 'util';
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

// import 'amcharts3/amcharts/plugins/export/libs/xlsx/xlsx.js	'
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
Array.prototype.groupByProperties = function(properties) {
    var arr = this;
    var groups = [];
    for (var i = 0, len = arr.length; i < len; i += 1) {
        var obj = arr[i];
        if (groups.length == 0) {
            groups.push([obj]);
        } else {
            var equalGroup = false;
            for (var a = 0, glen = groups.length; a < glen; a += 1) {
                var group = groups[a];
                var equal = true;
                var firstElement = group[0];
                if (firstElement[properties] !== obj[properties]) {
                    equal = false;
                }
                if (equal) {
                    equalGroup = group;
                }
            }
            if (equalGroup) {
                equalGroup.push(obj);
            } else {
                groups.push([obj]);
            }
        }
    }
    return groups;
};
var ipReport = process.env.REPORT_API;
var thingADDRESS = process.env.THINGS_API;

export default {
    name: "Historian",
    data() {
        return {
            api: process.env.API_ADDRESS,
            url: thingADDRESS + '/api/things',
            urlHist: process.env.HIST_BIGTABLE_API,
            urlParams: process.env.REPORT_PARAMS,
            urlReport: ipReport,
            urlGatRec: process.env.OP_API,
            urlGatewayOP: ipReport + '/gateway/productionorder?fieldFilter=productionOrderNumber&fieldValue=',
            urlGatewayRecipe: ipReport + '/gateway/recipe?fieldFilter=recipeCode&fieldValue=',
            carregando: false,
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
            quantityPage: 20,
            startat: 0,
            total: 0,
            history: [],
            pages: [],
            pageAtual: 0,
            newGroup: '',
            orderField: '',
            order: '',
            ticksIni: '',
            ticksFim: '',
            fieldFilter: '',
            fieldValue: '',
            thingT: {},
            thingGroup: '',
            thingName: '',
            filename: '',
            thingNameCabeçalho: '',
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
            recipeCode: "",
            OP: "",
            filterSelected: "",
            opList: [],
            recipeList: [],
            providertable: [],
            opName: '',
            prosFim: [],
            erro: '',
            OPgeral: {},            
            msgErro: '',
            cabecalhoSetas: [false, false, false, false, false, false, false],
            chart: {},
            grafico: '',
            active: false,                
            filter: '',      
            table_rows: [
                //...
                {
                    "id": 1,
                    "user": {
                        "username": "dprice0",
                        "first_name": "Daniel",
                        "last_name": "Price",
                        "email": "dprice0@blogs.com"
                    },
                    "address": "3 Toban Park",
                    "city": "Pocatello",
                    "state": "Idaho"
                },
                {
                    "id": 1,
                    "user": {
                        "username": "dprice0",
                        "first_name": "Daniel",
                        "last_name": "Price",
                        "email": "dprice0@blogs.com"
                    },
                    "address": "3 Toban Park",
                    "city": "Pocatello",
                    "state": "Idaho"
                },
                {
                    "id": 1,
                    "user": {
                        "username": "teste",
                        "first_name": "Daniel",
                        "last_name": "Price",
                        "email": "dprice0@blogs.com"
                    },
                    "address": "3 Toban Park",
                    "city": "Pocatello",
                    "state": "Idaho"
                },
                {
                    "id": 1,
                    "user": {
                        "username": "cabeca",
                        "first_name": "Daniel",
                        "last_name": "Price",
                        "email": "dprice0@blogs.com"
                    },
                    "address": "3 Toban Park",
                    "city": "teste",
                    "state": "Idaho"
                },
                {
                    "id": 1,
                    "user": {
                        "username": "dprice0",
                        "first_name": "Daniel",
                        "last_name": "Price",
                        "email": "dprice0@blogs.com"
                    },
                    "address": "3 Toban Park",
                    "city": "Pocatello",
                    "state": "Idaho"
                }
                //...
            ]
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
        'b-dropdown-item': bDropdownItem,
        
        Stretch
    },
    directives: {
        'b-toggle': vBToggle,
        'v-b-toggle': vBToggle,
        'b-modal': bModalDirective,
        'scroll':{
            inserted: function (el, binding) {
                let f = function (evt) {
                    if (binding.value(evt, el)) {
                        window.removeEventListener('scroll', f);
                    }
                }
                window.addEventListener('scroll', f);
            }
        }
    },
    methods: {
        showModal(id) {
            setTimeout(() => {
                this.$refs[id].show();
            }, 500);
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
        getThingName(t) {
            this.thingName = t.thingName;
        },

        addData() {
            this.dataset.push(this.dataentry)
            this.labels.push(this.datalabel)
            this.datalabel = ''
            this.dataentry = ''
        },
        getThings() {
            //console.log('getThings')
            axios.get(this.url).then((response) => {
                this.things = response.data;
                this.things=this.things.sort(function(a,b) {
                    return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
                });
                console.log(this.things);
            }, (error) => {
                console.log(error);
            })            
        },        
        getOP() {
            axios.get(this.urlReport + "/gateway/productionorders").then((response) => {
                this.opList = response.data;
            }).catch((error) => {

            })
        },
        getRecipe() {
            axios.get(this.urlGatRec + "/gateway/recipes").then((response) => {
                this.recipeList = response.data;
            }).catch((error) => {

            })
        },
        getReportDate() {
            this.providertable = [];
            this.groups = [];            
            this.carregando = true;
            this.hideModal('myModalEdit');
            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            axios.get(this.urlReport + "/api/ReportParameter/Date?thingId=" + this.thingT.thingId +
                '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                // if (response.data.length > 0) {
                //console.log('Entrou no retorno do get report date')
                this.data = response.data;
                this.tags = response.data.tags;
                this.tags.forEach((T) => {
                    if (!this.groups.includes(T.group)) {
                        this.groups.push(T.group);
                    }
                })
                setTimeout(() => {
                    this.editGroup(this.groups[0]);
                    this.newGroup = this.groups[0];                    
                    this.carregando = false;
                    this.created();
                    this.thingNameCabeçalho = this.thingT.thingName;
                    
                }, 1000);
                // }
            }).catch((error) => {
                this.hideModal('myModalEdit');
                if (error.response != undefined && error.response.status == '404') {
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
            });
            
        },
        getReportCode() {
            this.providertable = [];
            this.groups = [];

            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            axios.get(this.urlReport + "/api/ReportParameter/RecipeCode/" + this.recipeCode + '?thingId' + this.thingT.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                //console.log('Entrou no retorno do get report code')

                this.data = response.data;
                this.tags = response.data.tags;
                this.tags.forEach((T) => {
                    if (!this.groups.includes(T.group)) {
                        this.groups.push(T.group);
                    }
                })
                setTimeout(() => {
                    this.editGroup(this.groups[0]);
                    this.newGroup = this.groups[0];
                    this.carregando = false;                    
                    this.created();
                    this.thingNameCabeçalho = this.thingT.thingName;
                    this.hideModal('myModalEdit');
                }, 1000);

            }).catch((error) => {
                this.carregando = false;
                this.hideModal('myModalEdit');
                if (error.response != undefined && error.response.status == '404') {
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
            });
        },

        getDatesOP(id){
            this.datas = {};
            axios.get(this.urlGatRec + "/api/ProductionOrdersHistStates?ProductionOrderId="+id).then((response)=>{
                response.data.forEach((estado)=>{
                    if(estado.state == 'active')
                        this.datas.inicio = estado.date;                    
                    else if(estado.state == 'ended')
                        this.datas.fim = estado.date;
                });
                if(!this.datas.fim)
                    this.datas.fim = ((new Date().getTime() * 10000) + 621355968000000000) - (new Date().getTimezoneOffset() * 600000000);
            }).catch((error) => {
                
            });
        },
        toExcel(providertable,thingNameCabeçalho, thingGroup){
            thingNameCabeçalho = thingNameCabeçalho==undefined?'todos':thingNameCabeçalho;
            thingGroup = thingGroup==undefined?'todos':thingGroup
            axios.post(this.urlParams + '/api/historian?tipo=excel&equipamento='+thingNameCabeçalho+'&grupo='+thingGroup, providertable, {responseType: 'arraybuffer'}).then((response) => {                        
                const url = window.URL.createObjectURL(new Blob([response.data],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}));                        
                download(response.data,'relatoriodeparametros.xls');                        
                this.carregando = false;
            }).catch((error) => {                                              
                this.carregando = false;                    
                this.erro = true;
                this.msgErro = "Erro ao baixar relatório\nMenssagem : ";
                this.msgErro += error.message;
                this.showModal("modalInfo");
            }); 
        },
        getReportOP() {
            this.providertable = [];
            this.carregando = true;
            this.groups = [];
            axios.get(this.urlGatRec + "/api/ProductionOrdersHistStates?ProductionOrderId="+this.OP)
                .then((response)=>{                
                    var datas = {};
                    response.data.forEach((estado)=>{
                        if(estado.state == 'active')
                            datas.inicio = estado.date;                    
                        else if(estado.state == 'ended')
                            datas.fim = estado.date;
                    });
                    if(!datas.fim)
                        datas.fim = ((new Date().getTime() * 10000) + 621355968000000000) - (new Date().getTimezoneOffset() * 600000000);
                    axios.get(this.urlReport + "/api/ReportParameter/ProductionOrder/" + this.OP + "?thingId=" + this.thingT.thingId + '&startDate=' + datas.inicio + '&endDate=' + datas.fim)
                        .then((response) => {
                            if (response.data.tags.length > 0) {
                                this.data = response.data;
                                this.tags = response.data.tags;
                                this.tags.forEach((T) => {
                                    if (!this.groups.includes(T.group)) {
                                        this.groups.push(T.group);
                                    }
                                })
                                setTimeout(() => {
                                    this.editGroup(this.groups[0]);
                                    this.newGroup = this.groups[0];
                                    this.carregando = false;
                                    this.created();
                                    this.thingNameCabeçalho = this.thingT.thingName;
                                    this.hideModal('myModalEdit');
                                }, 1000);
                            } else {
                                this.carregando = false;
                                this.erro = true;
                                this.msgErro = "Sem dados no período selecionado";
                                this.showModal("modalInfo");
                            }

                        }).catch((error) => {
                            this.hideModal('myModalEdit');
                            if (error.response != undefined && error.response.status == '404') {
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
                        });
                    }).catch((error) => {
                
                    });
        },
        
        getReportGeral(){
            this.carregando = true;                  
            this.hideModal("myModalGeral");
            axios.get(this.urlGatRec + "/api/ProductionOrdersHistStates?ProductionOrderId="+this.OPgeral)
                .then((response)=>{                                    
                    var datas = {};
                    response.data.forEach((estado)=>{
                        if(estado.state == 'active')
                            datas.inicio = estado.date;                    
                        else if(estado.state == 'ended')
                            datas.fim = estado.date;
                    });
                    if(!datas.fim)
                        datas.fim = ((new Date().getTime() * 10000) + 621355968000000000) - (new Date().getTimezoneOffset() * 600000000);
                                    
                    axios.get(this.urlParams + '/api/reportparameter?startdate='+datas.inicio+'&enddate='+datas.fim, {responseType: 'arraybuffer'}).then((response) => {                        
                        const url = window.URL.createObjectURL(new Blob([response.data],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}));                        
                        download(response.data,'relatoriogeral.xls');                        
                        this.carregando = false;
                    }).catch((error) => {                                              
                        this.carregando = false;                    
                        this.erro = true;
                        this.msgErro = "Erro ao baixar relatório\nMenssagem : ";
                        this.msgErro += error.message;
                        this.showModal("modalInfo");
                    });                     
            }).catch((error) => {
                this.hideModal("myModalGeral");
                this.carregando = false; 
                this.erro = true;
                this.msgErro = "Erro ao buscar informações da OP\nMenssagem : ";
                this.msgErro += error.message;
                this.showModal("modalInfo");
            });
            
        },


        toPdf() {

            var headersss = this.headers;
            var PDFprovider = this.providertable;
            var thingNameCabecalho = this.thingNameCabeçalho + ' Grupo: ' + this.thingGroup;
            

            this.chart["export"].capture({}, function() {
                this.grafico = new Image();
                // var header = $('cabecalho-table');


                this.toPNG({}, function(data) {
                    this.grafico.src = data;
                    console.log("Export");

                    var doc = new jsPDF('l', 'pt');
                    var img = new Image();
                    var imgLogo = new Image();
                    img.src = logo;
                    imgLogo.src = logoMahle;


                    doc.setFontSize(20);
                    doc.addImage(img, "PNG", 10, 10, 80, 20);
                    doc.addImage(imgLogo, "JPG", 510, 10, 80, 20);
                    doc.text(35, 65, thingNameCabecalho)
                    doc.addImage(this.grafico, "PNG", 10, 100, 800, 400);
                    var columns = [];
                    var title = "title";
                    var dataKey = "dataKey";
                    headersss.forEach(e => {
                        if (e != 'category' && e != ":") {

                            var obj = new Object;
                            obj[title] = e;
                            obj[dataKey] = e;
                            columns.push(obj);
                        }
                    })
                    doc.autoTable([],[]);
                    doc.addPage();
                    console.log(columns);
                    doc.autoTable(columns, PDFprovider, {
                        // addPageContent: pageContent,
                        showHeader: 'everyPage',
                        margin: {
                            //top: 530,
                            left: 11,
                            right: 100
                        },
                        halign: 'middle', // left, center, right
                        valign: 'middle',
                        columnWidth: 30,
                        tableWidth: 810
                    });

                    // doc.addImage(table, "PNG", 20, 550, 600, 200);

                    doc.save("RastreamentoThing_" + thingNameCabecalho + ".pdf");
                });
            });
        },

        ticksToDate(dateTicks) {
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

            var dateFormatted = jsDate.getDate() + "/" +
                (jsDate.getMonth() + 1) + "/" +
                jsDate.getFullYear() + " " + hour + ":" + min;
            // var hours = jsDate.toString().slice(4, 21);
            return dateFormatted;
        },
        screenshoot() {
            window.print();
        },

        dateToTicks(dateTime) {
            console.log(dateTime);
            var dateToTransform = dateTime.slice(3, 6) +
                dateTime.slice(0, 3) +
                dateTime.slice(6, 10) +
                dateTime.slice(10, 16);
            var date = new Date(dateToTransform);
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        },
        separateDateAndHour(providerar) {
            // array que será atribuido a tabela
            var finalprovider = new Array();
            console.log("NewOBJNewOBJ");
            console.log(providerar);
            // cópia do array que será usada para alterar as keys
            var copyprovider = new Array();
            copyprovider = JSON.parse(JSON.stringify(providerar));

            var objaux = new Object();
            // copyprovider = providerar.slice();
            copyprovider.forEach((obj) => {
                // elimina a referencia do objeto para não alterar o principal
                var newObj = JSON.parse(JSON.stringify(obj));
                // pega o valor da data
                var dt = newObj.category;
                // armazena o tamanho da string da data + hora
                var stringlength = dt.length;
                // armazena apenas dia/mes/ano
                var date = newObj.category = dt.substring(0, stringlength - 5);
                //deleta category(Data) referente ao gráfico - e armazena só /dia/mes/ano (GRÁFICO)
                delete newObj.category;
                newObj.category = date;
                // armazena hora e minutos
                var hourformatted = dt.substring(stringlength - 5, stringlength);
                //
                newObj.Hora = hourformatted;
                // novo objeto é populado com Data e Hora
                objaux.Data = date;
                objaux.Hora = hourformatted;

                for (var key in newObj) {
                    var newkey = '';
                    switch (key) {
                        // case 'Data':
                        //     newkey = "data"
                        //     break;
                        // case 'Hora':
                        //     newkey = "hora"
                        //     break;
                        case 'category':
                            newkey = "Data"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'Valor Medição':
                            newkey = "VM"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LIE Limite superior de especific':
                            newkey = 'LSE'
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LSE Limite superior de especificação':
                            newkey = "LSE"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LSE Limite superior de especific':
                            newkey = "LSC"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LSC Limite superior de controle':
                            newkey = "LSC"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LIC Limite inferior de controle':
                            newkey = "LIC"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LIE Limite inferior de especific':
                            newkey = "LIE"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'LIE Limite inferior de especificação':
                            newkey = "LIE"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'ordem':
                            newkey = "ordem"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'rolo':
                            newkey = "rolo"
                            objaux[newkey] = newObj[key]
                            break;
                        case 'codTira':
                            newkey = "codTira"
                            objaux[newkey] = newObj[key]
                            break;
                    }

                }
                console.log("console.log(this.provider);");
                console.log("console.log(this.provider);");
                finalprovider.push(objaux);
                console.log(finalprovider);
                objaux = {}
            });

            this.providertable = finalprovider;

        },
        refreshGraph() {
            this.created();
        },

        handleScroll(){
            if (window.scrollY > 530) {                
                this.active=true;      
            }          
            else
                this.active=false;     
        },

        editGroup(grupo) {
            cache: false;
            this.group = grupo;
            this.provider = [];

            //console.log(this.providertable[0]);
            this.graphProvider = [];
            this.headers = [];
            this.providerAux = [];
            this.jsonfields = {};
            //console.log(this.data);

            this.formatGraphData(this.data, this.group);
            var t = 0;
            var aux = [];

            // To Excel
            setTimeout(() => {

                this.filename = "RastreamentoThing_" + this.thingNameCabeçalho + "_" + this.group + ".xls";
                /*
                 *  JSON de criação das características do gráfico.
                 */
                Object.keys(this.providertable[0]).forEach((n) => {
                    if (n == "category") {
                        // aux.push("Data");
                        this.jsonfields["Data"] = "category";
                    } else {
                        aux.push(n);
                        this.jsonfields[n] = n;
                    }
                    //console.log(aux[t]);
                    t++;
                });                
                this.headers = aux
                console.log(this.headers);
                console.log("JsonFields = " + this.jsonfields);
                this.refreshGraph();
            }, 1500);

        },


        formatGraphData(obj, group) {
            obj.tags.forEach((R) => {
                if (R.group == group || R.group == 'Linha') {
                    if(R.group != 'Linha'){
                        this.thingGroup = R.group;
                        this.thingT.thingId = obj.thingId;
                        this.things.forEach((t) => {
                            if (this.thingT.thingId == t.thingId &&  R.group != 'Linha') {
                                this.thingNameCabecalho = t.thingName;
                            }
                        })
                    }


                    var dataObj2 = new Array();
                    var obj2 = new Object();

                    if(R.name != 'ordem' && R.name != 'rolo' && R.name != 'codTira'){
                        /**
                         * Criação do JSON de criação das características do gráfico.
                         * Cada linha terá um objeto com as características dentro do array
                         */
                        obj2["path"] = "dist/amcharts/";
                        obj2["balloonColor"] = "#808080";
                        obj2["balloonText"] = "[[title]] em [[category]]:[[value]]";
                        obj2["color"] = "#000000";
                        obj2["lineThickness"] = 3;
                        obj2["type"] = "smoothedLine";
                        obj2["title"] = R.name;
                        obj2["valueField"] = R.name;
                        obj2["bulletColor"] = R.color;
                        obj2["fillColors"] = R.color;
                        obj2["legendColor"] = R.color;
                        obj2["lineColor"] = R.color;
                    }

                    var i = 0;

                    //console.log("R");
                    //.log(R);

                    R.timestamp.map(e => {
                        /**
                         * Criando o campo categoria do JSON do gráfico
                         * E adicionando a data á ele
                         * Para que cada ponto do eixo X seja uma data diferente
                         */
                        var dataObj = new Array();
                        var category = "category";
                        var tagname = R.name;

                        var obj = new Object();

                        obj[category] = this.ticksToDate(e);
                        obj[tagname] = R.value[i];

                        dataObj = Object.assign(obj);
                        console.log("Testinho");
                        console.log(dataObj);
                        this.providerAux.push(dataObj);

                        i++;
                    })

                    /**
                     * Adicionando a tag com a respectiva data ao array
                     */

                    dataObj2 = Object.assign(obj2);

                    if(R.name != 'ordem' && R.name != 'rolo' && R.name != 'codTira'){
                      this.graphProvider.push(dataObj2);
                    }
                    // console.log("this.graphProvider");
                    // console.log(this.graphProvider);
                    // console.log(this.providerAux);
              }
            });

            /**
             * Separar objetos por data, assim cada obj todas as tags com a mesma data
             */
            //console.log("this.providerAux.groupBy('category')");
            //console.log(this.providerAux.groupByProperties("category"));

            var groupArray = this.providerAux.groupByProperties("category");


            var newproviderAux = new Array();
            var dataObj3 = new Object();
            var copyprovider = new Array();

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

                copyprovider.push(dataObj3);
                newproviderAux.push(dataObj3);
                console.log(newproviderAux);
                this.provider = newproviderAux;

            });


            this.separateDateAndHour(copyprovider);

        },


        created() {
            // console.log('Entrou no created que chama o makeChart()')
            // console.log(this.graphProvider);
            // console.log(this.provider);

            this.chart = window.AmCharts.makeChart("chartrast", {
                "type": "serial",
                "categoryField": "category",
                "addClassNames": true,
                "autoMarginOffset": 40,
                "marginRight": 60,
                "marginTop": 60,
                "startDuration": 0,
                "borderColor": "#C67373",
                "fontSize": 16,
                "theme": "light",
                "libs": {
                    "autoLoad": false
                },
                "categoryAxis": {
                    "autoRotateAngle": -45,
                    "autoRotateCount": 0,
                    "gridPosition": "start",
                    "titleFontSize": 0,
                    "titleRotation": 3
                },
                "valueScrollbar": {
                    "enabled": true,
                    "offset": 4,
                    "tabIndex": 6
                },
                "chartScrollbar": {
                    "enabled": true
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
                "export": {
                    "enabled": true
                },
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": this.provider
            });

        },
        getResults(url, name, pros) {
            pros = [];
            if (name.length >= 3) {
                axios.get(url + name, this.config).then((response) => {
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
    /*****************/
    /*               */
    /*               */
    /*Busca Produtos */
    /*               */
    /*               */
    /*****************/

    beforeMount: function() {
        //this.showModal('myModalEdit');
        this.getThings();        
    },

}
