import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import JsonExcel from 'vue-json-excel'
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers'

es6promisse.polyfill();

//faz a paginação
function paginacao(response, este) {
    este.pageAtual = este.startat / este.quantityPage;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / este.quantityPage);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}


// MUDAR PRA PORTA DO ENDPOINT DE RELATÓRIO DE REAMOSTRAGEM
var ipReport = process.env.REPORT_API;

export default {
    name: "Reamostragem",
    data() {
        return {
            urlGatewayOP: ipReport + '/gateway/productionorder?fieldFilter=productionOrderTypeId&fieldValue=2&fieldFilter=productionOrderNumber&fieldValue=',
            urlGatewayThings: ipReport + '/gateway/things',
            config: {
                headers: { 'Cache-Control': 'no-cache' }
            },
            cabecalhoSetas: [false, false, false, false, false],
            carregando: false,
            // to show response/error from server
            erro: '',
            msgErro: '',
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
            // infos para a paginação
            quantityPage: 100,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            // Armazena dados para preencher a tabela
            tableData: [],
            filterSelected: '',
            //
            prosFim: []
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
    directives: {
        'b-modal': bModalDirective,
    },
    methods: {
        showModal(id) {
            this.$refs[id].show();
        },
        hideModal(id) {
            this.$refs[id].show();
        },
        desorganizar(produtos, product, num) {

        },
        organizar(produtos, product, num) {

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

            if (containsHour == true) {
                dateFormatted = jsDate.getDate() + "/" +
                    (jsDate.getMonth() + 1) + "/" +
                    jsDate.getFullYear() + " " + hour + ":" + min;
            } else if (containsOnlyHour == true) {
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
        getThings() {
            axios.get(this.urlGatewayThings).then((response) => {
                this.things = response.data;
            }, (error) => {
                console.log(error);
            })
        },
        getMock() {
            this.tableData = {
                "report": [{
                        "date": 636614801923361089,
                        "op": "op0805",
                        "numberAnalysis": 1,
                        "productId": 21,
                        "productName": "Ferro",
                        "recipeMin": 0,
                        "recipeMax": 0.5,
                        "resultAnalysis": 15,
                        "correction": "0",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614801923361089,
                        "op": "op0805",
                        "numberAnalysis": 1,
                        "productId": 2,
                        "productName": "Estanho",
                        "recipeMin": 9.5,
                        "recipeMax": 11,
                        "resultAnalysis": 5,
                        "correction": "126.5",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614910904536185,
                        "op": "op0805",
                        "numberAnalysis": 2,
                        "productId": 21,
                        "productName": "Ferro",
                        "recipeMin": 0,
                        "recipeMax": 0.5,
                        "resultAnalysis": 0,
                        "correction": "5.5",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614910904536185,
                        "op": "op0805",
                        "numberAnalysis": 2,
                        "productId": 1,
                        "productName": "Chumbo",
                        "recipeMin": 9.5,
                        "recipeMax": 11,
                        "resultAnalysis": 10,
                        "correction": "5.5",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614910904536185,
                        "op": "op0805",
                        "numberAnalysis": 2,
                        "productId": 20,
                        "productName": "Níquel",
                        "recipeMin": 0,
                        "recipeMax": 0.5,
                        "resultAnalysis": 0,
                        "correction": "5.5",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614910904536185,
                        "op": "op0805",
                        "numberAnalysis": 2,
                        "productId": 22,
                        "productName": "Fósforo",
                        "recipeMin": 0,
                        "recipeMax": 0.1,
                        "resultAnalysis": 0,
                        "correction": "1.1",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614910904536185,
                        "op": "op0805",
                        "numberAnalysis": 2,
                        "productId": 23,
                        "productName": "Zinco",
                        "recipeMin": 0,
                        "recipeMax": 0.3,
                        "resultAnalysis": 0,
                        "correction": "3.3",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614910904536185,
                        "op": "op0805",
                        "numberAnalysis": 2,
                        "productId": 2,
                        "productName": "Estanho",
                        "recipeMin": 9.5,
                        "recipeMax": 11,
                        "resultAnalysis": 10,
                        "correction": "5.5",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614912466350805,
                        "op": "op0805",
                        "numberAnalysis": 3,
                        "productId": 2,
                        "productName": "Estanho",
                        "recipeMin": 9.5,
                        "recipeMax": 11,
                        "resultAnalysis": 0,
                        "correction": "225.5",
                        "status": "reproved",
                        "userName": null
                    },
                    {
                        "date": 636614923919786177,
                        "op": "op0805",
                        "numberAnalysis": 4,
                        "productId": 1,
                        "productName": "Chumbo",
                        "recipeMin": 9.5,
                        "recipeMax": 11,
                        "resultAnalysis": 10,
                        "correction": "0",
                        "status": "approved",
                        "userName": null
                    },
                    {
                        "date": 636614923919786177,
                        "op": "op0805",
                        "numberAnalysis": 4,
                        "productId": 21,
                        "productName": "Ferro",
                        "recipeMin": 0,
                        "recipeMax": 0.5,
                        "resultAnalysis": 0,
                        "correction": "0",
                        "status": "approved",
                        "userName": null
                    },
                    {
                        "date": 636614923919786177,
                        "op": "op0805",
                        "numberAnalysis": 4,
                        "productId": 2,
                        "productName": "Estanho",
                        "recipeMin": 9.5,
                        "recipeMax": 11,
                        "resultAnalysis": 10,
                        "correction": "0",
                        "status": "approved",
                        "userName": null
                    },
                    {
                        "date": 636614923919786177,
                        "op": "op0805",
                        "numberAnalysis": 4,
                        "productId": 20,
                        "productName": "Níquel",
                        "recipeMin": 0,
                        "recipeMax": 0.5,
                        "resultAnalysis": 0,
                        "correction": "0",
                        "status": "approved",
                        "userName": null
                    },
                    {
                        "date": 636614923919786177,
                        "op": "op0805",
                        "numberAnalysis": 4,
                        "productId": 22,
                        "productName": "Fósforo",
                        "recipeMin": 0,
                        "recipeMax": 0.1,
                        "resultAnalysis": 0,
                        "correction": "0",
                        "status": "approved",
                        "userName": null
                    },
                    {
                        "date": 636614923919786177,
                        "op": "op0805",
                        "numberAnalysis": 4,
                        "productId": 23,
                        "productName": "Zinco",
                        "recipeMin": 0,
                        "recipeMax": 0.3,
                        "resultAnalysis": 0,
                        "correction": "0",
                        "status": "approved",
                        "userName": null
                    }
                ]
            }
            this.tableData.report.forEach((obj) => {
                obj.date = this.ticksToDate(obj.date, false, false)
                obj.hour = this.ticksToDate(obj.date, false, true)
            });
            this.tableData = response.data.report;
            this.hideModal();
        },
        // CALL REPORT ENDPOINT TO FILL TABLE
        getReportDate() {
            this.providertable = [];

            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            // MUDAR PARA ENDPOINT DE REAMOSTRAGEM
            axios.get(this.urlReport + "/api/ReportParameter/Date?thingId=" + this.thingId +
                '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                console.log('Entrou no retorno do get report date')

                // convert ticks em datetime e seapra data e hora
                response.data.report.forEach((obj) => {
                    obj.date = this.ticksToDate(obj.date, false, false)
                    obj.hour = this.ticksToDate(obj.date, false, true)
                });
                this.tableData = response.data.report;
                this.hideModal();

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
                this.carregando = false;
                this.erro = true;
                this.msgErro = error.message;
                this.showModal("modalInfo");
            });
        },
        getReportOP() {
            this.providertable = [];
            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            // MUDAR PARA ENDPOINT DE REAMOSTRAGEM
            axios.get(this.urlReport + "/api/ReportParameter/ProductionOrder/" + this.OP + "?thingId=" + this.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF)
                .then((response) => {
                    comsole.log(reponse)
                    console.log('Entrou no retorno do get report op')
                    response.data.report.forEach((obj) => {
                        obj.date = this.ticksToDate(obj.date, false, false)
                        obj.hour = this.ticksToDate(obj.date, false, true)
                    });
                    this.tableData = response.data.report;
                    this.hideModal();
                    this.hideModal();
                }).catch((error) => {
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
                });
        },
    },
    filters: {
        filterStatus: function(value) {
            switch (value) {
                case 'created':
                    return "Criada"
                    break;
                case 'available':
                    return "Disponível"
                    break;
                case 'active':
                    return "Ativa"
                    break;
                case 'reproved':
                    return "Reprovada"
                    break;
                case 'ended':
                    return "Finalizada"
                    break;
                case 'waiting_approval':
                    return "Em Análise"
                    break;
                case 'approved':
                    return "Aprovada"
                    break;
                default:
                    break;

            }
        },
    },
    beforeMount() {
        this.getThings();
        this.getMock();
    },
}