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
    name: "HistorianProduction",
    data() {
        return {
            config: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            },
            id: "",
            carregando: false,
            ordens: [],
            ordem: {},
            productionOrder: {},
            ProductionOrders: [],
            productionOrdersRecipe: {},
            orderPhaseProducts: [],
            phaseProducts: [],
            orderHistorian: [],
            orderHistorianAllProducts: [],
            allProducts: {},
            cabecalhoSetas: [false, false, false, false, false],
            productionOrderId: '',
            consumo: false,
            rolo: 1,
            lote: 0,
            OPs: [],
            op: '',
            mensagem: '',
            mensagemSuc: '',
            fieldFilter: '',
            fieldValue: '',
            phaseIndex: '',
            btndisable: false,
            pReceita: false,
            sel: true,
            order: false,
            pFase: false,
            lista: false,
            url: process.env.PROD_HIST_API,
            urlOP: process.env.OP_API,
            quantityPage: 20,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
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
            this.mensagem = '';
            this.mensagemSuc = '';
            setTimeout(() => {
                if (this.ordem.type === "output") {
                    this.pReceita = true;
                    this.consumo = false;
                    this.pFase = false;
                    console.log(this.productionOrdersRecipe);
                    console.log(this.productionOrder);
                    this.ordem.productId = this.productionOrdersRecipe.recipeProduct.product.productId;
                    this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                    this.ordem.productName = this.productionOrdersRecipe.recipeProduct.product.productName;
                    this.rolo = this.orderHistorian.productsOutput.length + 1;
                } else {
                    this.consumo = true;
                    this.pReceita = false;
                    this.pFase = true;
                    this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                    this.orderPhaseProducts = this.productionOrdersRecipe.phases[0];
                    this.lote = "OPL";
                }
            }, 100);

            setTimeout(() => {
                if (id == "myModalRef") {
                    this.$refs.myModalRef.show();
                } else if (id == "modalErro") {
                    this.$refs.modalErro.show();
                }
            }, 150);

        },
        hideModal(id) {
            if (id == "myModalRef") {
                this.$refs.myModalRef.hide();
            } else if (id == "modalErro") {
                this.$refs.modalErro.hide();
            }
            this.pReceita = false;
            this.consumo = false;
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
        cadastrarApont(ordem) {

            this.mensagem = '';
            this.mensagemSuc = '';
            console.log(ordem);
            console.log(this.url + '/api/producthistorian');
            if (this.ordem.type == "output") {
                ordem.batch = this.rolo;
            } else {
                ordem.batch = this.lote;
            }
            confirm("Confirma apontamento?");
            axios.post(this.url + '/api/producthistorian', ordem).then((response) => {
                this.mensagemSuc = 'Produto apontado com sucesso.';
                this.productionOrderId = this.ordem.productionOrderId;
                this.carregando = false;
                this.pReceita = false;
                this.pFase = false;
                this.rolo++;
                this.ordem = {};
                console.log(response);

            }).catch((error) => {
                this.msgErro = error.message;
                this.showModal("modalErro");
                this.mensagem = r.response.data;
                this.carregando = false;
            })
            this.pReceita = false;
            this.consumo = false;
        },
        changeJson(obj) {
            if (this.orderHistorianAllProducts.products == undefined) {
                this.orderHistorianAllProducts.products = []
            }
            if (this.orderHistorianAllProducts.id != undefined) {
                this.orderHistorianAllProducts.products.push(obj)
            } else {
                this.orderHistorianAllProducts.id = this.orderHistorian.id;
                this.orderHistorianAllProducts.productionOrderId = this.orderHistorian.productionOrderId
                this.orderHistorianAllProducts.order = this.orderHistorian.order
                this.orderHistorianAllProducts.products.push(obj)
            }
            this.allProducts = this.orderHistorianAllProducts.products
        },
        listar() {
            this.lista = true;
            this.carregando = true;
            axios.get(this.url + '/api/OrderHistorian/' + this.productionOrder.productionOrderId).then((response) => {
                this.orderHistorian = response.data.values;
            }).catch((error) => {
                this.msgErro = error.message;
                this.showModal("modalErro");
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
                this.orderHistorian = [];
            })

        },

        listaOp(p) {
            console.log(p);
            this.productionOrdersRecipe = p.recipe;
            this.order = true;
            this.carregando = true;
            setTimeout(() => {
                this.listar();
            }, 1000);
        },
        getResults() {
            this.carregando = true;
            this.orderHistorian = [];
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            console.log(this.urlOP + '/api/productionorders');
            axios.get(this.urlOP + '/api/productionorders/v2?&filters=currentStatus,active' + '&startat=' + this.startat + '&quantity=' + this.quantityPage, config).then((response) => {
                console.log(response.data);
                response.data.values.forEach((pro) => {
                    if (pro.currentThing && pro.currentStatus == "active") {
                        pro.thingName = pro.currentThing.thingName
                        this.orderHistorian.push(pro);
                    }
                });

                paginacao(response, this);
                this.carregando = false;

                console.log(this.OPs);
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
        this.productionOrdersRecipe.recipeName = '';
        this.productionOrdersRecipe.recipeProduct.product.productName = '';
    }
};