import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import { Stretch } from 'vue-loading-spinner'

es6promisse.polyfill();

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
        showModal() {
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
                this.$refs.myModalRef.show();
            }, 150);

        },
        hideModal() {
            this.$refs.myModalRef.hide();
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

            }, (r) => {
                this.mensagem = r.response.data;
                this.carregando = false;
            })
            this.pReceita = false;
            this.consumo = false;
        },
        changeJson(obj, type) {
            var array = this.orderHistorianAllProducts.products;
            if (this.orderHistorianAllProducts.products == undefined) {
                this.orderHistorianAllProducts.products = []
            }
            if (this.orderHistorianAllProducts.id != undefined) {
                if (type == "in") {
                    obj.rolo = "-";
                    obj.lote = obj.batch;
                    this.orderHistorianAllProducts.products.push(obj)
                } else if (type == "out") {
                    obj.lote = "-";
                    obj.rolo = obj.batch;
                    this.orderHistorianAllProducts.products.push(obj)
                }
            } else {
                if (type == "in") {
                    obj.rolo = "-";
                    obj.lote = obj.batch;
                    this.orderHistorianAllProducts.id = this.orderHistorian.id;
                    this.orderHistorianAllProducts.productionOrderId = this.orderHistorian.productionOrderId
                    this.orderHistorianAllProducts.order = this.orderHistorian.order
                    this.orderHistorianAllProducts.products.push(obj)
                } else if (type == "out") {
                    obj.rolo = obj.batch;
                    obj.lote = "-";
                    this.orderHistorianAllProducts.id = this.orderHistorian.id;
                    this.orderHistorianAllProducts.productionOrderId = this.orderHistorian.productionOrderId
                    this.orderHistorianAllProducts.order = this.orderHistorian.order
                    this.orderHistorianAllProducts.products.push(obj)
                }

            }
            this.allProducts = this.orderHistorianAllProducts.products
        },
        listar() {
            this.lista = true;
            this.carregando = true;
            axios.get(this.url + '/api/OrderHistorian/' + this.productionOrder.productionOrderId).then((response) => {

                console.log(response.data);
                this.orderHistorian = response.data;
                for (var i = 0; i < this.orderHistorian.productsInput.length; i++) {
                    this.orderHistorian.productsInput[i].hour = this.hourConvert(this.orderHistorian.productsInput[i].date);
                    this.orderHistorian.productsInput[i].date = this.dataConvert(this.orderHistorian.productsInput[i].date);
                    this.changeJson(this.orderHistorian.productsInput[i], "in");
                }
                for (var i = 0; i < this.orderHistorian.productsOutput.length; i++) {
                    this.rolo = parseInt(this.orderHistorian.productsOutput[i].batch) + 1;
                    this.orderHistorian.productsOutput[i].hour = this.hourConvert(this.orderHistorian.productsOutput[i].date);
                    this.orderHistorian.productsOutput[i].date = this.dataConvert(this.orderHistorian.productsOutput[i].date);
                    this.changeJson(this.orderHistorian.productsOutput[i], "out");
                }
                this.rolo += 1;

                this.carregando = false;
            }, (r) => {
                this.mensagem = 'Erro no server ' + r;
                this.carregando = false;
                this.orderHistorian = [];
            })

        },

        listaOp(p) {
            this.productionOrder.productionOrderNumber = p.productionOrderNumber;
            this.productionOrder.productionOrderId = p.productionOrderId;
            this.op = p.productionOrderNumber;
            console.log(p);
            this.productionOrdersRecipe = p.recipe;
            this.order = true;
            this.carregando = true;
            setTimeout(() => {
                this.listar();
            }, 1000);
        },

        getResults() {
            var id = this.$route.params.id;
            console.log(this.urlOP + '/api/productionorders');
            axios.get(this.urlOP + '/api/productionorders/' + id).then((response) => {
                this.productionOrder = response.data;
                console.log(response.data);
                this.listaOp(response.data);
                return response.data;
            }, (error) => {
                console.log(error);
            })
        },
        dataConvert(dataTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;

            jsTicks = (dataTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            var dateFormatted = jsDate.getDate() + "/" +
                (jsDate.getMonth() + 1) + "/" +
                jsDate.getFullYear();
            console.log(jsDate);

            return dateFormatted;
        },
        hourConvert(dataTicks) {
            var epochTicks = 621355968000000000,
                ticksPerMillisecond = 10000,
                jsTicks = 0,
                jsDate;

            jsTicks = (dataTicks - epochTicks) / ticksPerMillisecond;
            jsDate = new Date(jsTicks);
            var min = "";
            if (jsDate.getUTCMinutes() <= 9) {
                min = "0" + jsDate.getUTCMinutes();
            } else {
                min = jsDate.getUTCMinutes();
            }
            var dateFormatted = jsDate.getHours() + ":" +
                min;
            var teste = jsDate.getUTCMinutes();

            console.log(jsDate);

            return dateFormatted;
        }
    },
    beforeMount: function() {
        this.getResults();
        this.productionOrdersRecipe.recipeName = '';
        this.productionOrdersRecipe.recipeProduct.product.productName = '';
    }
};