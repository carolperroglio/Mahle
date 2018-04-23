import Vue from 'vue'
import axios from '../../../.././node_modules/axios/index.js'
import es6promisse from '../../../.././node_modules/es6-promise/dist/es6-promise.min.js'
import {
    setTimeout
} from 'timers'
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
import logoMahle from './logomahle.jpeg'
import logo from './onyx.jpeg'

import {
    encode
} from 'punycode';
import {
    error
} from 'util';
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
export default {
    name: "Historian",
    data() {
        return {
            api: process.env.API_ADDRESS,
            url: process.env.THINGS_API,
            urlHist: process.env.HIST_BIGTABLE_API,
            urlReport: process.env.REPORT_API,
            urlGatRec: process.env.OP_API,
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
            thingId: '',
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
            opName:'',
            prosFim:[]
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
        getThings() {
            axios.get(this.url + '/api/things').then((response) => {
                this.things = response.data;
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

            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            axios.get(this.urlReport + "/api/ReportParameter/Date?thingId=" + this.thingId +
                '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {


                this.data = response.data;
                this.tags = response.data.tags;
                this.tags.forEach((T) => {
                    if (!this.groups.includes(T.group)) {
                        this.groups.push(T.group);
                    }
                })
                this.editGroup(this.groups[0]);
                this.newGroup = this.groups[0];
                this.carregando = false;
                this.created();
                this.hideModal();
            }).catch((error) => {

            });
        },
        getReportCode() {
            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            axios.get(this.urlReport + "/api/ReportParameter/RecipeCode/" + this.recipeCode + '?thingId' + this.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                this.data = response.data;
                this.tags = response.data.tags;
                this.tags.forEach((T) => {
                    if (!this.groups.includes(T.group)) {
                        this.groups.push(T.group);
                    }
                })
                this.editGroup(this.groups[0]);
                this.newGroup = this.groups[0];
                this.carregando = false;
                this.created();
                this.hideModal();
            }).catch((error) => {

            });
        },
        getReportOP() {
            this.carregando = true;

            var Ini = this.date.toString() + ' ' + this.timeIni.HH + ':' + this.timeIni.mm;
            var ticksI = this.dateToTicks(Ini);
            var Fim = this.datef.toString() + ' ' + this.timeFim.HH + ':' + this.timeFim.mm;
            var ticksF = this.dateToTicks(Fim);

            axios.get(this.urlReport + "/api/ReportParameter/ProductionOrder/" + this.OP + "?thingId=" + this.thingId + '&startDate=' + ticksI + '&endDate=' + ticksF).then((response) => {
                this.data = response.data;
                this.tags = response.data.tags;
                this.tags.forEach((T) => {
                    if (!this.groups.includes(T.group)) {
                        this.groups.push(T.group);
                    }
                })
                this.editGroup(this.groups[0]);
                this.newGroup = this.groups[0];
                this.carregando = false;
                this.created();
                this.hideModal();
            }).catch((error) => {

            });
        },
        toPdf() {
            // html2canvas(document.body).then(function(canvas) {
            //     document.body.appendChild(canvas);
            // });
            html2canvas(document.querySelector("#teste"), {
                x: $("#chartdiv").offset().left,
                y: $("#chartdiv").offset().top
            }).then(canvas => {
                console.log(document);
                var x = $("#chartdiv").offset().left;
                console.log(x);
                var y = $("#chartdiv").offset().top;
                console.log(y);
                // var x = $("#chartdiv").offset;
                var xy = $("#teste");
                // To PDF
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
                this.things.forEach((t) => {
                    if (this.thingId == t.thingId) {
                        this.thingNameCabeçalho = t.thingName;
                    }
                })
                console.log(this.PDFprovider);

                var doc = new jsPDF('p', 'pt');
                var img = new Image();
                var imgLogo = new Image();
                var grafico = new Image();
                //doc.readAsDataURL
                img.src = logo;
                imgLogo.src = logoMahle;
                grafico.src = canvas.toDataURL();

                console.log("img.src = " + img.src)
                console.log("imgLogo.src = " + imgLogo.src)
                    // var pageContent = function(data) {
                    // HEADER
                doc.setFontSize(20);

                // Screenshot do Gráfico e insere no PDF
                // doc.addImage(grafico, "PNG", 100, 510, 300, 1000);
                doc.addImage(img, "JPEG", 15, 15, 50, 30);

                // doc.addImage(grafico, "PNG", 510, 15, 60, 30);
                // IMAGEM LOGO DA MAHLE N ESTA SENDO ENCODED
                // doc.addImage(imgLogo, "JPEG", 510, 15, 60, 30);

                doc.text(35, 65, "Rastreamento " + this.thingNameCabeçalho + " Grupo " + this.group)
                    // doc.autoTable(columns, this.PDFprovider, 15, 65);
                doc.autoTable(columns, this.PDFprovider, {
                    // addPageContent: pageContent,
                    showHeader: 'everyPage',
                    margin: {
                        top: 80
                    }
                });
                // document.body.appendChild(canvas);

                doc.save("RastreamentoThing_" + this.thingNameCabeçalho + "_" + this.group + ".pdf");

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

        dateToTicks(dateTime) {
            var dateToTransform = dateTime.slice(3, 6) +
                dateTime.slice(0, 3) +
                dateTime.slice(6, 10) +
                dateTime.slice(10, 16);
            var date = new Date(dateToTransform);
            var ticks = ((date.getTime() * 10000) + 621355968000000000) - (date.getTimezoneOffset() * 600000000);
            return ticks;
        },
        separateDateAndHour(providerar) {
            var finalprovider = new Array();
            var copyprovider = new Array();
            copyprovider = JSON.parse(JSON.stringify(providerar));
            var objaux = new Object();
            // copyprovider = providerar.slice();
            copyprovider.forEach((obj) => {
                var dt = obj.category;
                var stringlength = dt.length;
                var date = obj.category = dt.substring(0, stringlength - 5);
                delete obj.category;
                obj.category = date;
                var hourformatted = dt.substring(stringlength - 5, stringlength);
                obj.Hora = hourformatted;
                objaux.category = obj.category;
                objaux.Hora = obj.Hora;
                for (var key in obj) {
                    objaux[key] = obj[key]
                }
                finalprovider.push(objaux);
            });

            this.providertable = finalprovider;
        },
        refreshGraph() {
            this.created();
        },

        editGroup(grupo) {
            cache: false;
            this.group = grupo;
            this.provider = [];
            console.log("console.log(this.provider);");
            console.log(this.provider);
            this.graphProvider = [];
            this.headers = [];
            this.providerAux = [];
            this.jsonfields = {};
            console.log(this.data);

            this.formatGraphData(this.data, this.group);
            var t = 0;
            var aux = [];
            // To Excel
            this.filename = "RastreamentoThing_" + this.thingNameCabeçalho + "_" + this.group + ".xls";
            /*
             *  JSON de criação das características do gráfico.
             */
            Object.keys(this.providertable[0]).forEach((n) => {
                if (n == "category") {
                    aux.push("Data");
                    this.jsonfields["Data"] = "category";
                } else {
                    aux.push(n);
                    this.jsonfields[n] = n;
                }
                console.log(aux[t]);
                t++;
            });
            this.headers = aux
            console.log(this.headers);
            console.log(this.jsonfields);
            this.refreshGraph();
        },


        formatGraphData(obj, group) {
            obj.tags.forEach((R) => {
                if (R.group == group) {
                    this.thingGroup = R.group;
                    this.thingId = obj.thingId;
                    this.things.forEach((t) => {
                        if (this.thingId == t.thingId) {
                            this.thingNameCabeçalho = t.thingName;
                        }
                    })
                    var dataObj2 = new Array();
                    var obj2 = new Object();

                    /**
                     * Criação do JSON de criação das características do gráfico.
                     * Cada linha terá um objeto com as características dentro do array
                     */
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

                    var i = 0;

                    console.log("R");
                    console.log(R);

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
                        console.log(dataObj);
                        this.providerAux.push(dataObj);

                        i++;
                    })

                    /**
                     * Adicionando a tag com a respectiva data ao array
                     */

                    dataObj2 = Object.assign(obj2);
                    console.log(dataObj2);
                    this.graphProvider.push(dataObj2);
                    console.log("this.graphProvider");
                    console.log(this.graphProvider);
                    console.log(this.providerAux);
                }
            });

            /**
             * Separar objetos por data, assim cada obj todas as tags com a mesma data
             */
            console.log("this.providerAux.groupBy('category')");
            console.log(this.providerAux.groupByProperties("category"));

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

        showModal() {
            setTimeout(() => {
                this.$refs.myModalEdit.show()
            }, 200);
        },

        hideModal() {
            this.$refs.myModalEdit.hide();
        },

        created() {
            window.AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "categoryField": "category",
                "autoMarginOffset": 40,
                "marginRight": 60,
                "marginTop": 60,
                "startDuration": 0,
                "borderColor": "#C67373",
                "fontSize": 13,
                "theme": "light",
                "categoryAxis": {
                    "autoRotateAngle": -90,
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
            if (name.length > 3){                  
                axios.get(url + name, this.config).then((response) => {                                        
                    response.data.values.forEach((pro) => {                        
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
        this.showModal();
        this.getThings();
        this.getOP();
        this.getRecipe();
        this.getchart();
    },

}