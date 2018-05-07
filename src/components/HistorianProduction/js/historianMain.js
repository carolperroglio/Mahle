import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import { Stretch } from 'vue-loading-spinner'

es6promisse.polyfill();

function paginacao(response, este) {
    este.pageAtual = este.startat / este.quantityPage;
    este.total = response.data.total;
    let fim = Math.ceil(este.total / este.quantityPage);
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
    name: "HistorianProduction",
    data() {
        return {
            config: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            },
            id: "",
            carregando: false,
            ordem: {},
            orderHistorian: [],
            orderHistorianAllProducts: [],
            cabecalhoSetas: [false, false, false, false, false],
            productionOrderId: '',
            consumo: false,
            fieldFilter: '',
            fieldValue: '',
            url: process.env.PROD_HIST_API,
            urlOP: process.env.OP_API,
            quantityPage: 100,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            msgErro: ""
        }
    },
    computed: {

    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        'b-badge': bBadge,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
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
        getResults() {
            this.carregando = true;
            this.orderHistorian = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            console.log(this.urlOP + '/api/productionorders');
            // 3 GETS SÃO FEITOS PARA FILTRAR E TRAZER AS OPS QUE ESTÃO ATIVAS, APROVADAS OU EM ANÁLISE
            // STATUS = WAITING APPROVAL
            axios.get(this.urlOP + '/api/productionorders/v2?&filters=currentStatus,waiting_approval' + '&startat=' + this.startat + '&quantity=' + this.quantityPage, config)
                .then((response) => {
                    console.log(response.data);
                    response.data.values.forEach((pro) => {
                        if (pro.currentThing) {
                            pro.thingName = pro.currentThing.thingName
                            this.orderHistorian.push(pro);
                        }
                    });
                    // STATUS = ACTIVE
                    axios.get(this.urlOP + '/api/productionorders/v2?&filters=currentStatus,active' + '&startat=' + this.startat + '&quantity=' + this.quantityPage, config)
                        .then((response) => {
                            console.log(response.data);

                            response.data.values.forEach((pro) => {
                                if (pro.currentThing) {
                                    pro.thingName = pro.currentThing.thingName
                                    this.orderHistorian.push(pro);
                                }
                            });
                            // STATUS = APPROVED
                            axios.get(this.urlOP + '/api/productionorders/v2?&filters=currentStatus,approved' + '&startat=' + this.startat + '&quantity=' + this.quantityPage, config)
                                .then((response) => {
                                    console.log(response.data);
                                    response.data.values.forEach((pro) => {
                                        if (pro.currentThing) {
                                            pro.thingName = pro.currentThing.thingName
                                            this.orderHistorian.push(pro);
                                        }
                                    });
                                    paginacao(response, this);
                                    this.carregando = false;
                                })
                        })
                }).catch((error) => {
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                    this.carregando = false;
                    console.log(error);
                })
        },

    },
    beforeMount: function() {
        this.getResults();
    }
};