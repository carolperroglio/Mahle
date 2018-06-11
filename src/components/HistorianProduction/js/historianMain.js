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
            urlAnalysis: process.env.ANALYSIS_API,
            quantityPage: 100,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            msgErro: "",
            erro: false,
            ops: [],
            opNumber: '',
            cargaUtilizada: '',
            opSelected: {},
            idOpAtual: ''
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
        getDisAssoc(idThing, idOP, op) {
            //Thing ID Mahle SBC =  1 : Linha única
            op.username = VueCookies.get('username');

            axios.put(this.urlOP + '/api/productionorders/AssociateProductionOrder/disassociate?thingId=' + idThing + '&productionOrderId=' + idOP, op)
                .then((response) => {
                    console.log("Desassociou !!!")
                }).catch((error) => {
                    console.log(error);
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao desassociar a OP: " + error.message;
                    this.showModal("modalErro");
                    console.log("OP Desassociação Falhou" + error.message)
                })
        },
        encerrarOP(op) {
            op.username = VueCookies.get('username');

            var id = op.productionOrderId;
            axios.put(this.urlOP + "/api/productionorders/statemanagement/id?productionOrderId=" + id + "&state=ended", op)
                .then(response => {
                    console.log("OP Desativada");

                    this.getDisAssoc(op.currentThing.thingId, id, op);

                    this.msgErro = "OP desativada!";
                    this.showModal("modalErro");
                    this.getResults();
                }).catch((error) => {
                    console.log(error);
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao desativar OP: " + error.message;
                    this.showModal("modalErro");
                    console.log("OP Desativada Falhou" + response.statusText)
                })
        },
        getOPResult() {
            this.ops = [];
            this.opSelected = {};
            console.log('opNumber: ' + this.opNumber)
            if (this.opNumber.length >= 3) {
                axios.get(this.urlOP + "/api/productionorders/v2?&filters=productionOrderTypeId,2&filters=productionOrderNumber," + this.opNumber)
                    .then((response) => {
                        this.ops = response.data.values;
                    }).catch((error) => {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = "Ocorreu um erro: " + error.message;
                        this.showModal("modalErro");
                    })
            }
        },
        sendCalculation(lastAnalysis) {
            console.log(lastAnalysis);
            axios.put(this.urlAnalysis + '/api/CalculeAnalysis?productionOrderId=' + this.idOpAtual + '&furnaceQuantity=' + this.cargaUtilizada, lastAnalysis)
                .then((response) => {
                    this.erro = false;
                    this.msgErro = "Cálculo realizado com sucesso! Clique em realizar apontamento para visualizar o cálculo";
                    this.showModal("modalErro");
                }).catch((error) => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao realizar o cálculo: " + error.message;
                    this.showModal("modalErro");
                })
        },
        getAnalysis(id, obj) {
            axios.get(this.urlAnalysis + '/api/ProductionOrderQuality/productionOrder/' + id)
                .then((response) => {
                    obj.showbutton = false;
                    var newobj = obj;
                    newobj.showbutton = true;
                    obj = Object.assign({}, newobj)
                    console.log(obj);
                    // return true;

                }).catch((error) => {
                    if (error.response.status != '404') {
                        this.erro = true;
                        this.msgErro = "Ocorreu um erro ao obter a última análise - " + error.message;
                        this.showModal('modalErro');
                    } else if (error.response.status == '404') {
                        var newobj = obj;
                        newobj.showbutton = true;
                        obj = Object.assign({}, newobj)
                        console.log(obj);
                        // return false;
                    }
                })
        },
        getLastAnalysis() {
            var lastAnalysis = {};
            var idLastOp = '';

            //verifica se o operador selecionou a ultima análise realizada - pois não é obrigatório selecionar
            if (this.opSelected.productionOrderId == undefined) {
                var idLastOp = '';
            } else {
                var idLastOp = this.opSelected.productionOrderId
            }

            //Obtem a última análise da OP selecionada pelo operador
            axios.get(this.urlAnalysis + '/api/ProductionOrderQuality/productionOrder/' + idLastOp)
                .then((response) => {
                    var posLastAnalysis = response.data.analysis.length - 1;
                    lastAnalysis = response.data.analysis[posLastAnalysis];

                    this.sendCalculation(lastAnalysis);

                }).catch((error) => {
                    if (error.response.status == '404') {
                        lastAnalysis.analysisId = 0;
                        lastAnalysis["comp"] = [];
                        this.sendCalculation(lastAnalysis);
                    } else {
                        this.carregando = false;
                        this.erro = true;
                        this.msgErro = "Ocorreu um erro ao buscar a última análise realizada: " + error.message;
                        this.showModal("modalErro");
                    }
                })
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
                    this.carregando = false;
                    this.carregando = true;
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
                            this.carregando = false;
                            this.carregando = true;
                            axios.get(this.urlOP + '/api/productionorders/v2?&filters=currentStatus,approved' + '&startat=' + this.startat + '&quantity=' + this.quantityPage, config)
                                .then((response) => {
                                    console.log(response.data);
                                    response.data.values.forEach((pro) => {
                                        if (pro.currentThing) {
                                            pro.thingName = pro.currentThing.thingName
                                            this.orderHistorian.push(pro);
                                        }
                                    });
                                    this.carregando = false;
                                    this.carregando = true;
                                    axios.get(this.urlOP + '/api/productionorders/v2?&filters=currentStatus,reproved' + '&startat=' + this.startat + '&quantity=' + this.quantityPage, config)
                                        .then((response) => {
                                            console.log(response.data);
                                            response.data.values.forEach((pro) => {
                                                if (pro.currentThing) {
                                                    pro.thingName = pro.currentThing.thingName
                                                    this.orderHistorian.push(pro);
                                                }
                                            });

                                            this.orderHistorian.forEach((obj) => {
                                                setTimeout(() => {
                                                    var value = false;
                                                    value = this.getAnalysis(obj.productionOrderId, obj);
                                                }, 500);

                                            })
                                            this.carregando = false;
                                        })
                                })
                        })
                    paginacao(response, this);
                }).catch((error) => {
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                    this.carregando = false;
                    console.log(error);
                })
        },

    },
    filters: {
        filterStatus: function(value) {
            switch (value) {
                case 'created':
                    return "Criada"
                    break;
                case 'available':
                    return "Disponível"
                    break;
                case 'active':
                    return "Ativa"
                    break;
                case 'reproved':
                    return "Reprovada"
                    break;
                case 'ended':
                    return "Finalizada"
                    break;
                case 'waiting_approval':
                    return "Em Análise"
                    break;
                case 'approved':
                    return "Aprovada"
                    break;
                default:
                    break;

            }
        },
    },
    beforeMount: function() {
        this.getResults();
    }
};