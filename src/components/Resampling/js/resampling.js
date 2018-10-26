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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import logo from './onyx.jpeg'
import logoMahle from './loooogomahle.png'

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
            urlGatewayOP: ipReport + '/gateway/productionorder?fieldFilter=productionOrderNumber&fieldValue=',
            urlGatewayThings: ipReport + '/gateway/things',
            url: ipReport,
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
            prosFim: [],
            opName: '',
            headerName:'',
            json_fields: {
                'Data': 'dateI',
                'Hora': 'hour',
                'OPL': 'op',
                'N° da amostra': 'numberAnalysis',
                'Produto': 'productName',
                'Especificado(%)': 'op',
                'Resultado da Análise': 'op',
                'Resultado': 'status',
                'Correção':'correction',
                'Usuário': 'userName'
            },
            tableExcel: [],
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
            this.$refs[id].hide();
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
        changeStatusEnglishToPortuguese: function(value) {
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

            }},
        getHeaderToPdf() {
            var headers = [{
                    'title': 'Data',
                    'dataKey': 'dateI'
                },
                {
                    'title': 'Hora',
                    'dataKey': 'hour'
                },
                {
                    'title': 'OPL',
                    'dataKey': 'op'
                },
                {
                    'title': 'Nº da Amostra',
                    'dataKey': 'numberAnalysis'
                },
                {
                    'title': 'Produto',
                    'dataKey': 'productName'
                },
                {
                    'title': 'Especificado(%)',
                    'dataKey': 'especification'
                },
                {
                    'title': 'Resultado da Análise(%)',
                    'dataKey': 'resultAnalysis'
                },
                {
                    'title': 'Resultado',
                    'dataKey': 'status'
                },
                {
                    'title': 'Correção(Kg)',
                    'dataKey': 'correction'
                },
                {
                    'title': 'Usuário',
                    'dataKey': 'userName'
                },
            ];

            return headers;
        },
        // EXPORT TO PDF
        toPdf() {

            var thingName = this.tableData[0].op;
            // OBTEM OS NOMES DAS COLUNAS DA TABELA
            var columns = this.getHeaderToPdf();
            var tableValues = JSON.parse(JSON.stringify(this.tableData));


            var doc = new jsPDF('p', 'pt');
            var table = new Image();
            var img = new Image();
            var imgLogo = new Image();

            img.src = logo;
            imgLogo.src = logoMahle;

            // ADICIONA LOGO SISTEMA ONYX
            doc.addImage(img, "PNG", 10, 10, 50, 20);

            doc.setFontSize(20);
            doc.setFontSize(20);
            // ADICIONA LOGO MAHLE
            doc.addImage(imgLogo, "PNG", 510, 10, 60, 20); // ADICIONA TÍTULO                            
            doc.text(35, 65, "Relatório de Análise Química " + this.headerName)

            tableValues.forEach((obj)=>{
                obj.status = this.changeStatusEnglishToPortuguese(obj.status);
            });

            // ADICIONA TABELA
            doc.autoTable(columns, this.tableData, {
                // addPageContent: pageContent,
                showHeader: 'everyPage',
                margin: {
                    top: 100,
                    left: 10,
                    right: 20
                },
                styles:{
                //cellPadding: 20,
                        overflow: 'linebreak' 
                },
                columnStyles: {
                    dateI: {
                        columnWidth: 60,
                        //cellPadding: 20,
                        overflow: 'linebreak ' 
                    },
                    hour: {
                        columnWidth: 50,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    op: {
                        columnWidth: 50,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    numberAnalysis: {
                        columnWidth: 50,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    productName: {
                        columnWidth: 70,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    especification: {
                        columnWidth: 60,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    resultAnalysis: {
                        columnWidth: 60,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    status: {
                        columnWidth: 60,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    correction: {
                        columnWidth: 50,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },
                    userName: {
                        columnWidth: 60,
                        //cellPadding: 20,
                        overflow: 'linebreak'                        
                    },

                    // etc
                },
                halign: 'middle', // left, center, right
                valign: 'middle',
                tableWidth: 600
            });
            doc.save("Relatório de Reamostragem " + this.headerName + ".pdf");

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
        // CALL REPORT ENDPOINT TO FILL TABLE
        getReportDate() {
            this.providertable = [];

            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            // MUDAR PARA ENDPOINT DE REAMOSTRAGEM
            axios.get(this.url + "/api/ReportAnalisys/Date?startdate=" + ticksI + "&endDate=" + ticksF).then((response) => {
                console.log('Entrou no retorno do get report date')

                // convert ticks em datetime e seapra data e hora
                response.data.report.forEach((obj) => {
                    obj.dateI = this.ticksToDate(obj.date, false, false)
                    obj.hour = this.ticksToDate(obj.date, false, true)
                    obj.especification = obj.recipeMax + ' - ' + obj.recipeMin
                });
                this.tableData = response.data.report;
                console.log(this.tableData);
                var j=0;
                this.tableData.forEach((x)=>{
                    this.tableExcel[j++] = {
                        'Data': x.dateI,
                        'Hora': x.hour,
                        'OPL': x.op,
                        'N° da amostra': x.numberAnalysis,
                        'Produto': x.productName,
                        'Especificado(%)': x.especification,
                        'Resultado da Análise': x.resultAnalysis,
                        'Resultado': this.filterStatus(x.status),
                        'Correção':x.correction,
                        'Usuário': x.userName                        
                    }
                })
                
                this.hideModal('filterSearch');
                this.carregando = false;
                this.headerName = this.date + " - " + this.datef;

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
                } else {

                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = error.message;
                    this.showModal("modalInfo");
                }
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
            axios.get(this.url + "/api/ReportAnalisys/ProductionOrder/" + this.OP)
                .then((response) => {
                    console.log(response)
                    console.log('Entrou no retorno do get report op')
                    response.data.report.forEach((obj) => {
                        obj.dateI = this.ticksToDate(obj.date, false, false)
                        obj.hour = this.ticksToDate(obj.date, false, true)
                        obj.especification = obj.recipeMax + ' - ' + obj.recipeMin
                    });
                    this.tableData = response.data.report;
                    this.hideModal('filterSearch');
                    this.carregando = false;
                this.headerName = this.tableData[0].op;

                }).catch((error) => {
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
        filterStatus(value) {
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
        }
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
    },
}