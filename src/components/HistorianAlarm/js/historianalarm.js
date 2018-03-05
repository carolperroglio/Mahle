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
            jsonfields: {}
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
                this.data = response.data;
                this.tags = response.data.tags;
                this.tags.forEach((T) => {
                    if (!this.groups.includes(T.group)) {
                        this.groups.push(T.group);
                    }
                })
                console.log(this.data);

            }, (error) => {
                console.log(error);
            })

            console.log(this.groups);
            this.carregando = false;
            this.created();
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