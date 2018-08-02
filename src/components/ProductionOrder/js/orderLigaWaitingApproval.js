import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import { Stretch } from 'vue-loading-spinner'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
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
            opSelected: {},
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
            prod: {},
            cobre: {},
            cobreqtd: '',
            blockConfirm: true
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
        blockConfirmButton() {
            this.blockConfirm = false
            var qtdPorcentagem = 0;

            for (var x = 0; x < this.components.length; x++) {
                if (this.components[x].value.length == 0) {
                    this.blockConfirm = true
                }
                qtdPorcentagem = qtdPorcentagem + parseFloat(this.components[x].value);
                console.log(qtdPorcentagem);
            }

            if (qtdPorcentagem < 99.8) {
                this.blockConfirm = true;
            }

        },
        getProductsOP(op) {
            axios.get(this.urlAnalysis + "/gateway/productionorder/" + this.idOP).then((response) => {
                op = response.data;
                var comp = {};
                for (var x = 0; x < op.recipe.phases[0].phaseProducts.length; x++) {
                    if (op.recipe.phases[0].phaseProducts[x].product.productId != 70) {
                        comp.type = op.recipe.phases[0].phaseProducts[x].phaseProductType;
                        comp.productId = op.recipe.phases[0].phaseProducts[x].product.productId;
                        comp.productName = op.recipe.phases[0].phaseProducts[x].product.productName;
                        comp.value = '';
                        this.addComponente(comp);
                    }
                }
                console.log(this.components)
            })
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
        addCobre(cobreqtd) {
            this.cobre["cobreFosforoso"] = cobreqtd;
            this.cobre = Object.assign({}, this.cobre)
        },
        removeCobre() {
            this.cobre = {};
        },
        realizarAnálise() {
            var components = this.components;
            var objComp = {};

            if (this.cobre.cobreFosforoso != undefined) {
                objComp = this.cobre
            }

            objComp.username = VueCookies.get('username');

            objComp["comp"] = components;

            axios.post(this.urlAnalysis + '/api/ProductionOrderQuality/Analysis/ProductionOrder/' + this.idOP, objComp).then((response) => {
                this.erro = false;
                switch (response.data.status) {
                    case 'reproved':
                        this.erro = true;
                        response.data.status = 'Reprovada'
                        break;
                    case 'approved':
                        this.erro = false;
                        response.data.status = 'Aprovada'
                        break;
                }
                this.msgErro = "Análise Realizada com Sucesso. A análise foi: " + response.data.status;
                this.showModal("modalErro");
                this.carregando = false;
                console.log(response.data);
                this.getResults();

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