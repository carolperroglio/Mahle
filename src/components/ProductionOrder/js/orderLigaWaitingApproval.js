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
    name: "OPInAnalysis",
    data() {
        return {
            config: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            },
            id: "",
            idOP: '',
            carregando: false,
            erro: false,
            opInAnalysis: [],
            cabecalhoSetas: [false, false, false, false, false],
            fieldFilter: '',
            fieldValue: '',
            productId: '',
            productName: '',
            urlOP: process.env.OP_API,
            urlProd: process.env.RECIPE_API,
            urlAnalysis: process.env.ANALYSIS_API,
            quantityPage: 100,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            msgErro: "",
            components: [],
            comp: {},
            products: [],
            prod: {}
        }
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
            this.components = [];
            this.comp = {};
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
            this.opInAnalysis = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            axios.get(this.urlAnalysis + '/api/ProductionOrderQuality/status/waiting').then((response) => {
                console.log(response.data);
                this.opInAnalysis = response.data.values;

                paginacao(response, this);
                this.carregando = false;

            }).catch((error) => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro ao buscar a OP" + error.message;
                this.showModal("modalErro");
                this.carregando = false;
                console.log(error);
            })
        },
        addComponente(comp) {
            var newObj = {};
            newObj = JSON.parse(JSON.stringify(comp));
            console.log(newObj)
            this.components.push(newObj);
        },
        realizarAnálise() {
            var components = this.components;
            var objComp = {};
            objComp["comp"] = components;
            axios.post(this.urlAnalysis + '/api/ProductionOrderQuality/Analysis/' + this.idOP, objComp).then((response) => {
                this.erro = true;
                this.msgErro = "Análise Realizada com Sucesso"
                this.showModal("modalErro");
                this.carregando = false;
                console.log(response.data);

            }).catch((error) => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro ao realizar a análise: " + error.message;
                this.showModal("modalErro");
                this.carregando = false;
                console.log(error);
            })
        },
        getProducts(name) {
            if (name.length > 3) {
                axios.get(this.urlProd + '/api/products?&fieldFilter=productName&fieldValue=' + name).then((response) => {
                    console.log(response.data);
                    this.products = response.data.values;

                }).catch((error) => {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao buscar o produto" + error.message;
                    this.showModal("modalErro");
                    this.carregando = false;
                    console.log(error);
                })
            }
        },
    },
    filters: {
        filterStatus: function(value) {
            switch (value) {
                case 'waiting':
                    return "Em Análise"
                    break;
                default:
                    break;

            }
        },
    },
    beforeMount: function() {
        this.getResults();
    }
}