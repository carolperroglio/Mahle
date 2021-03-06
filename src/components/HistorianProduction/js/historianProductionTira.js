import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip';
import { Stretch } from 'vue-loading-spinner'
import { setTimeout } from 'timers';
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
            orderHistorianAllProducts: {},
            cabecalhoSetas: [false, false, false, false, false, false],
            productionOrderId: '',
            consumo: false,
            rolo: "",
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
            teste: [],
            msgErro: "",
            titleheader: "",
            listOP: [],
            quantity: "",
            productionOrderId: "",
            prodRolo: "",
            unity: "",
            roloSaida: "",
            roloSaidaID: "",
            loteAco: "",
            codeAco: "",
            loteLiga: "",
            noop: true,
            noRegister: ''

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
        'b-modal': bModalDirective,
        'b-tooltip': vBTooltip
    },
    methods: {
        showModal(id) {
            this.ordem.quantity = "";
            this.ordem.productId = "";
            this.ordem.productionOrderId = "";
            this.titleheader = "Registrar Liga"

            if (this.orderHistorian.length > 0) {
                if (this.orderHistorian.productsOutput.length != 0) {
                    this.ordem.type = "output";
                }
            }

            if (this.ordem.type === "output") {
                this.pReceita = true;
                this.consumo = false;
                this.pFase = false;
                console.log(this.productionOrdersRecipe);
                console.log(this.productionOrder);
                // if (this.productionOrdersRecipe.recipeProduct != undefined) {
                this.ordem.productId = 34; //this.productionOrdersRecipe.recipeProduct.product.productId;
                this.ordem.productName = 'novo';//this.productionOrdersRecipe.recipeProduct.product.productName;
                // }
                this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                // if (this.orderHistorian.productsOutput != undefined) {
                //     this.rolo = this.orderHistorian.productsOutput.length + 1;
                // } else {
                //     this.rolo = 1;
                // }
                this.titleheader = "Registrar Matéria-Prima"
            } else if (this.ordem.type === "input") {
                this.consumo = true;
                this.pReceita = false;
                this.pFase = true;
                this.ordem.productionOrderId = this.productionOrder.productionOrderId;
                // this.orderPhaseProducts = this.productionOrdersRecipe.phases[0];
                this.lote = "OF";
                this.titleheader = "Registrar Aço"
            }

            this.$refs[id].show();

        },
        hideModal(id) {
            this.$refs[id].hide();
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
        cleanVariables() {
            this.quantity = "";
            this.productionOrderId = "";
            // this.prodRolo = "";
            this.unity = "";
            // this.roloSaida = "";
            // this.roloSaidaID = "";
            this.loteAco = "";
            this.codeAco = "";
            this.loteLiga = "";
        },
        cadastrarApont(ordem, type) {
            // MODELO JSON
            // {
            //     "type": "output",
            //     "productionOrderId": 1,
            //     "productId": 6,
            //     "quantity": 2.5,
            //     "batch": "lote"
            // }
            ordem.productType = type;
            if (ordem.productType == 'aco') {
                ordem.productId = 47;
                ordem.code = this.codeAco;
                ordem.batch = this.loteAco; 
            } else if(ordem.productType == 'saida'){
                ordem.batch = this.rolo;                
                ordem.productId = this.roloSaidaID;                
            } else {
                ordem.code = this.productionOrderId.productionOrderId; 
                ordem.productId = this.productionOrderId.recipe.recipeProduct.product.productId;
                ordem.batch = this.loteLiga;
            }
            
            ordem.productionOrderId = this.productionOrder.productionOrderId;
            ordem.quantity = this.quantity;
            ordem.type = this.ordem.type;
            ordem.unity = this.unity;
            ordem.username = VueCookies.get('username');
                                                                                   
            var teste = ordem;
            console.log(ordem);
            setTimeout(() => {
                axios.post(this.url + '/api/producthistorian', ordem).then((response) => {
                    this.mensagemSuc = 'Produto apontado com sucesso.';
                    this.productionOrderId = this.ordem.productionOrderId;
                    this.carregando = false;
                    this.pReceita = false;
                    this.pFase = false;
                    // this.rolo++;
                    
                    if(ordem.productType=='saida'){
                        axios.get("http://10.35.255.22:8013/api/interlevel?tag=Numero_ROLO").then((response)=>{
                            var t = response.data.value;
                            ++t;                    
                            axios.post("http://10.35.255.22:8013/api/interlevel", {address: "Numero_ROLO",value: t,workstation: "Linha"}).then();
                        });
                    }
                    this.ordem = {};
                    console.log(ordem);
                    this.hideModal('cadAco');
                    this.hideModal('cadLiga');
                    this.hideModal('cadRoloSaida');
                    this.getResults();
                    this.cleanVariables();
                }).catch((error) => {
                    if(error.response)
                        this.msgErro = error.response.data;
                    else
                        this.msgErro = "Erro desconhecido. Verifique se as configurações da OP estão corretas";
                    this.showModal("modalErro");
                    this.carregando = false;                    
                })
                this.pReceita = false;
                this.consumo = false;
            }, 1000);
        },

        changeJson(obj, type) {
            this.teste = [];

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

            this.teste = this.orderHistorianAllProducts.products


        },

        listar() {
            this.orderHistorianAllProducts = [];
            this.lista = true;
            this.carregando = true;
            
            axios.get(this.url + '/api/OrderHistorian/' + this.productionOrder.productionOrderId).then((response) => {
                
                console.log(response.data);
                this.orderHistorian = response.data;

                if (this.orderHistorian.productsOutput.length > 0) {
                    this.rolo = this.orderHistorian.productsOutput.length + 1;
                } else if (this.orderHistorian.productsOutput.length == 0) {
                    this.rolo = 1;
                }
                for (var i = 0; i < this.orderHistorian.productsInput.length; i++) {
                    this.orderHistorian.productsInput[i].hour = this.hourConvert(this.orderHistorian.productsInput[i].date);
                    this.orderHistorian.productsInput[i].date = this.dataConvert(this.orderHistorian.productsInput[i].date);
                    this.changeJson(this.orderHistorian.productsInput[i], "in");
                }
                for (var i = 0; i < this.orderHistorian.productsOutput.length; i++) {
                    this.orderHistorian.productsOutput[i].hour = this.hourConvert(this.orderHistorian.productsOutput[i].date);
                    this.orderHistorian.productsOutput[i].date = this.dataConvert(this.orderHistorian.productsOutput[i].date);
                    this.changeJson(this.orderHistorian.productsOutput[i], "out");
                }
                // this.rolo += 1;
                console.log(this.orderHistorianAllProducts);
                this.carregando = false;                                                
            }).catch((error) => {
                if (error.response.status == 404) {
                    this.noRegister = "Sem registros na tabela!"
                } else {
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalErro");
                }
                this.carregando = false;
            })
            this.getOP();
            console.log("Listinha");
        },
        getResults(id) {
            var id = this.$route.params.id;
            console.log(this.urlOP + '/api/productionorders');
            axios.get(this.urlOP + '/api/productionorders/' + id).then((response) => {
                this.productionOrder = response.data;
                // console.log(this.productionOrder.recipe.phases[0]);

                for (var x = 0; x < this.productionOrder.recipe.phases.length; x++) {
                    if (this.productionOrder.recipe.phases[x].phaseId != 46) {
                        if (this.productionOrder.recipe.phases[x].phaseProducts != undefined) {
                            for (var i = 0; i < this.productionOrder.recipe.phases[x].phaseProducts.length; i++) {
                                if (this.productionOrder.recipe.phases[x].phaseProducts[i].product.productId == "47") {
                                    this.prodRolo = this.productionOrder.recipe.phases[x].phaseProducts[i].product.productName;
                                }
                            }
                        }
                    }
                }
                if (this.productionOrder.recipe.recipeProduct != undefined) {
                    this.roloSaida = this.productionOrder.recipe.recipeProduct.product.productName;
                    this.roloSaidaID = this.productionOrder.recipe.recipeProduct.product.productId;
                }
                console.log(response.data);
                this.listaOp(response.data);
                // return response.data;
                console.log(this.OPs);                
            }).catch((error) => {
                this.msgErro = "Ocorreu um erro: " + error.message;
                this.showModal("modalErro");
                this.carregando = false;
            })
        },
        listaOp(p) {
            // var id = this.$route.params.id;
            // var p = this.getResults(id);
            this.productionOrder.productionOrderNumber = p.productionOrderNumber;
            this.productionOrder.productionOrderId = p.productionOrderId;
            this.op = p.productionOrderNumber;
            // listaOp(p);
            // productionOrderRecipe = p.recipe
            console.log(p);
            this.productionOrdersRecipe = p.recipe;
            this.order = true;
            this.carregando = true;
            //setTimeout(() => {
                this.listar();
            //}, 1000);
            
        },

        getOP() {
            this.listOP = [];
            
            axios.get(this.urlOP + "/api/productionorders/v2?&filters=currentStatus,approved&filters=productionOrderTypeId,2", this.config)
                .then((response) => {
                    var listinha = response.data.values;
                    listinha.forEach(ops => {                        
                        console.log(ops);
                        this.productionOrder.recipe.phases.forEach(pha => {
                            var prodligaid = ops.recipe.recipeProduct.product.productId;
                            if (pha.phaseId != 46) {
                                pha.phaseProducts.forEach(pro => {
                                    if(pro.product.productId == prodligaid)
                                        this.listOP.push(ops);
                                })
                            }
                        })
                    })
                    console.log("Listinha2");
                    console.log(this.listaOp);        
                }).catch((error) => {
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalErro");
                    this.carregando = false;
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
            var sec = "";
            // Tira a diferença de timezone que é de 3 horas
            var timezone = jsDate.getTimezoneOffset() / 60;
            var hour = jsDate.setHours(jsDate.getHours() + timezone);
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
        // this.getResults();
        this.getResults();    
            
    }
};