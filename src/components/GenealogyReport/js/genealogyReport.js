'use strict'
import axios from 'axios'
import es6promisse from 'es6-promise'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import datePicker from 'vue-bootstrap-datetimepicker'
import VueTimepicker from 'vue2-timepicker'
import JsonExcel from 'vue-json-excel'
import { Stretch } from 'vue-loading-spinner'
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { setTimeout } from 'timers';

es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / 20;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / 20);
    if (este.pageAtual > 11) {
        for (var i = this.pageAtual - 5; i < este.pageAtual + 5 > fim ? este.pageAtual + 5 : fim; i++)
            este.pages[i] = i;
    } else {
        for (var i = 0; i < fim; i++)
            este.pages[i] = i;
    }
}

export default {
    name: "GenerateProducts",
    data() {
        return {
            id: "",
            carregando: false,
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
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
            cabecalhoSetas: [false, false, false, false],
            pageAtual: 0,
            gReports: [],
            gReport: {},
            urlOP: process.env.PROD_HIST_API + '/gateway/productionorders',
            mensagem: '',
            mensagemSuc: '',
            orderField: '',
            fieldValue: '',
            fieldFilter: '',
            order: '',
            errors: [],
            ops: []

        }
    },
    computed: {},
    components: {
        'b-modal': bModal,
        Stretch,
        'date-picker': datePicker,
        'vue-timepicker': VueTimepicker,
        'downloadExcel': JsonExcel,
    },
    directives: {
        'b-modal': bModalDirective,
        VeeValidate
    },
    methods: {
        showModal() {
            this.mensagemSuc = '';
            this.gReport = {};
            this.errors = [];
            this.$refs.myModalRef.show()
        },
        hideModal() {
            this.$refs.myModalRef.hide()
        },
        showModal2(gReport) {
            this.errors = [];
            this.gReport = gReport;
            this.$refs.myModalRef.show()
        },
        organizar(genealogy, campo, pos) {
            genealogy.sort(function(a, b) { console.log(a[campo]); return (a[campo] > b[campo]) ? 1 : ((b[campo] > a[campo]) ? -1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = false;

        },
        desorganizar(genealogy, campo, pos) {
            genealogy.sort(function(a, b) { return (a[campo] > b[campo]) ? -1 : ((b[campo] > a[campo]) ? 1 : 0); });
            for (var i = 0; i < this.cabecalhoSetas.length; i++)
                if (i == pos)
                    this.cabecalhoSetas[i] = true;
                else
                    this.cabecalhoSetas[i] = false;
        },
        getOP() {
            axios.get(this.urlOP).then((response) => {
                var array = response.data;
                array.forEach(obj => {
                    if (obj.typeDescription == "Liga") {
                        this.ops.push(obj);
                    }

                });
            }, (error) => {
                console.log(error);
            })
        },
        ticksToDate(dateTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;

            jsTicks = (dateTicks - epochTicks) / ticksPerMillisecond;

            jsDate = new Date(jsTicks);

            var dateFormatted = jsDate.getDate() + "/" +
                (jsDate.getMonth() + 1) + "/" +
                jsDate.getFullYear() + " " + jsDate.getHours() + ":" + jsDate.getMinutes();
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
    },
    beforeMount() {
        this.getOP();
    }
}