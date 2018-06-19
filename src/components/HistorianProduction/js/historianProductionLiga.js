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
            allProducts: [],
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
            erro: false,
            url: process.env.PROD_HIST_API,
            urlOP: process.env.OP_API,
            urlAnalysis: process.env.ANALYSIS_API,
            urlParameters: process.env.LINE_PARAMETERS_API,
            msgErro: "",
            quantity: "",
            productionOrderId: "",
            prodRolo: "",
            unity: "",
            calculos: [],
            calculoOK: false,
            noRegister: '',
            lastAnalysis: [],
            cobreFosforoso: '',
            cargaUtilizadaForno: 0,
            prodChoose: '',
            cavaco: ''
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
                    this.orderPhaseProducts = this.productionOrdersRecipe.phases[0].phaseProducts;
                    this.lote = "OPL";
                }
            }, 100);

            setTimeout(() => {
                this.$refs[id].show();
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
        addCobre(cobreqtd) {
            this.cobre["cobreFosforoso"] = cobreqtd;
            this.cobre = Object.assign({}, this.cobre)
        },
        removeCobre() {
            this.cobre = {};
        },
        quantityToAddWhenUserCavaco() {

            var qtdTotalToBeAdded = 0.0;
            var newQtddToBeAdded = 0.0;
            var percentage = 0.0;
            var newValueToAdd = 0.0;
            var newCalc = JSON.parse(JSON.stringify(this.calculos));

            for (var x = 0; x < newCalc.length; x++) {
                qtdTotalToBeAdded += parseFloat(newCalc[x].value);
            }

            // subtrai do valor total que pode ser adicionado no forno, o valor que vai ser adicionado de cavaco
            newQtddToBeAdded = qtdTotalToBeAdded - parseFloat(this.cavaco);

            for (var y = 0; y < newCalc.length; y++) {
                newCalc[y].percentage = parseFloat(newCalc[y].value) / qtdTotalToBeAdded;
                newValueToAdd = newCalc[y].percentage * newQtddToBeAdded;
                newCalc[y].value = newValueToAdd.toFixed(2);
            }
            this.calculos = newCalc;
        },
        getAnalysis() {
            axios.get(this.urlAnalysis + '/api/ProductionOrderQuality/productionOrder/' + this.productionOrder.productionOrderId)
                .then((response) => {
                    //pega a última análise de todas anáises
                    if (response.data.analysis.length > 0) {
                        var posLastAnalysis = response.data.analysis.length - 1;
                        if (response.data.cobreFosforosoAtual != null) {
                            this.cobreFosforoso = response.data.cobreFosforosoAtual;
                        }
                        var lastAnalysis;
                        console.log("posLastAnalysis: " + posLastAnalysis)
                        lastAnalysis = response.data.analysis[posLastAnalysis];
                        console.log("lastAnalysis: " + lastAnalysis)
                        this.lastAnalysis = lastAnalysis;

                    }

                    this.calculos = response.data.calculateInitial;

                    this.calculoOK = true

                }).catch((error) => {
                    if (error.response.status == '404') {
                        this.erro = true;
                        this.msgErro = "O cálculo desta OP não foi realizado, vá a apontamentos e realize o cálculo. ";
                        this.showModal('modalErro');
                    } else {
                        this.erro = true;
                        this.msgErro = "Ocorreu um erro ao obter a última análise - " + error.message;
                        this.showModal('modalErro');
                    }
                })
        },
        //
        // MUDA O STATUS DA OPL PARA EM ANÁLISES - FEITA PELO SETOR DE ANÁLISE QUÍMICA
        changeStatusToWaitingAnalysis() {
            this.productionOrder.username = VueCookies.get('username');

            axios.put(this.urlOP + "/api/productionorders/statemanagement/id?productionOrderId=" + this.productionOrder.productionOrderId +
                    "&state=waiting_approval&username=" + this.productionOrder.username + "&quantForno=" + this.cargaUtilizadaForno)
                .then(response => {
                    this.erro = false;
                    this.msgErro = "OPL Em Análise !"
                    this.showModal('modalErro');
                }).catch((error) => {
                    this.erro = true;
                    this.msgErro = "Falha ao mandar OPL para análise: " + error.message;
                    this.showModal('modalErro');
                })
        },
        //EM CONSTRUÇÃO
        getCalculation() {
            axios.get(this.url + '/api/OrderHistorian/' + this.productionOrder.productionOrderId)
                .then((response) => {
                    this.calculos = response.data;
                    this.calculoOK = true;
                }).catch((error) => {
                    this.calculoOK = false;
                    this.erro = true;
                    this.msgErro = "" + error.message;
                    this.showModal('modalErro');
                })
        },
        cadastrarApont(ordem) {
            // MODELO JSON
            // {
            //     "type": "output",
            //     "productionOrderId": 1,
            //     "productId": 6,
            //     "quantity": 2.5,
            //     "batch": "lote",
            //     "unity": 5
            // }

            ordem.productionOrderId = this.productionOrder.productionOrderId;
            ordem.quantity = this.quantity;
            ordem.type = this.ordem.type;
            ordem.unity = this.unity;
            ordem.productId = this.prodRolo;
            this.productionOrder.username = VueCookies.get('username');
            ordem.username = VueCookies.get('username');

            if (this.ordem.type == "output") {
                ordem.batch = this.rolo;
            } else {
                ordem.batch = this.lote;
            }
            axios.post(this.url + '/api/producthistorian', ordem).then((response) => {
                // Se for necessário adicionar COBRE FOSFOROSO - SERÁ FEITO 2 POST - UM ESPECÍFICO PARA COBRE FOSFOROSO
                if (ordem.productId == '70') {
                    axios.post(this.urlParameters + '/api/WriteOrderLiga/AddCobre', this.productionOrder).then((response) => {
                        this.erro = false;
                        this.msgErro = 'Produto apontado com sucesso.';
                        this.productionOrderId = this.ordem.productionOrderId;
                        this.carregando = false;
                        this.pReceita = false;
                        this.pFase = false;
                        this.rolo++;
                        this.ordem = {};
                        console.log(response);
                        this.getResults();
                    })
                }

                this.erro = false;
                this.msgErro = 'Produto apontado com sucesso.';
                this.productionOrderId = this.ordem.productionOrderId;
                this.carregando = false;
                this.pReceita = false;
                this.pFase = false;
                this.rolo++;
                this.ordem = {};
                console.log(response);
                this.getResults();
            }).catch((error) => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro: " + error.message;
                this.showModal("modalErro");
                this.carregando = false;
            })
            this.pReceita = false;
            this.consumo = false;
        },
        changeJson(obj, type) {
            this.allProducts = [];
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
            }).catch((error) => {
                this.carregando = false;
                if (error.response.status == 404) {
                    this.noRegister = "Sem registros na tabela!"
                } else {
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalErro");
                }
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
            this.productionOrder = []
            var id = this.$route.params.id;
            console.log(this.urlOP + '/api/productionorders');
            axios.get(this.urlOP + '/api/productionorders/' + id).then((response) => {
                this.productionOrder = response.data;
                this.productionOrder.status = response.data.currentStatus;
                console.log(response.data);
                this.listaOp(response.data);
                // return response.data;
            }).catch((error) => {
                this.erro = true;
                this.msgErro = "Ocorreu um erro: " + error.message;
                this.showModal("modalErro");
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
            // Tira a diferença de timezone que é de 3 horas
            var timezone = jsDate.getTimezoneOffset() / 60;
            var hour = jsDate.setHours(jsDate.getHours() + timezone);
            var sec = "";
            hour = jsDate.getHours();

            if (jsDate.getUTCMinutes() <= 9) {
                min = "0" + jsDate.getUTCMinutes();
            } else {
                min = jsDate.getUTCMinutes();
            }


            if (jsDate.getSeconds() <= 9) {
                sec = "0" + jsDate.getSeconds();
            } else {
                sec = jsDate.getSeconds();
            }

            var dateFormatted = hour + ":" +
                min + ":" + sec;

            console.log(jsDate);

            return dateFormatted;
        }
    },
    beforeMount: function() {
        this.getResults();
        //this.productionOrdersRecipe.recipeName = '';
        //this.productionOrdersRecipe.recipeProduct.product.productName = '';
    }
};