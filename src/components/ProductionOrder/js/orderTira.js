import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { read } from 'fs';
import { setTimeout } from 'timers';

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

// Endereço IP do Servidor com as APIs
var ipServerRecipe = process.env.RECIPE_API;
var ipServer = process.env.OP_API;
var ipthing = process.env.THINGS_API;

export default {
    name: 'ProductionOrder',
    data() {
        return {
            opId: '',
            urlRecipeSearch: ipServerRecipe,
            urlRecipe: ipServerRecipe + '/api/recipes/',
            urlOpType: ipServer + '/api/productionordertypes/',
            urlPhases: ipServerRecipe + '/api/phases/',
            urlOp: ipServer + '/api/productionorders',
            urlGatewayRecipe: ipServer + '/gateway/recipes/',
            url: process.env.OP_API,
            urlThingGroup: ipthing + '/api/thinggroups/',
            urlGateway: ipServer + '/gateway/thinggroups/',
            recipeArray: [],
            opArray: [],
            opArrarKeep: [],
            opTypeArray: [],
            paramArray: [],
            recipeObj: {},
            productArray: [],
            recipeSelected: '',
            errors: [],
            opDesc: '',
            opSelected: '',
            phaseSelected: '',
            productionOrderObj: {},
            recipeAdded: '',
            carregando: false,
            quantityPage: 100,
            startat: 0,
            total: 0,
            pages: [],
            pageAtual: 0,
            showProd: false,
            showParam: false,
            idProd: '',
            show: false,
            opCreated: false,
            orderField: '',
            order: '',
            fieldFilter: '',
            fieldValue: '',
            id: '',
            recipeName: '',
            cabecalhoSetas: [false, false, false, false, false],
            objetooo: "",
            phase: {},
            parametersteste: {},
            parametrosteste: [],
            vetNomesteste: [],
            idLinha: "1",
            opSelectedParams: "",
            descriptionTira: "Tira",
            canAdd: false,
            msgErro: ""

        }
    },
    components: {
        'b-dropdown': bDropdown,
        'b-dropdown-item': bDropdownItem,
        'b-modal': bModal,
        Stretch
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        showModal(id) {
            if (id == "visualizarParams") {
                this.$refs.visualizarParams.show();
            } else if (id == "modalCadOP") {
                this.$refs.modalCadOP.show();
            } else if (id == "modalErro") {
                this.$refs.modalErro.show();
                this.$refs.visualizarParams.hide();
                this.$refs.modalCadOP.hide();
            }
        },
        hideModal(id) {
            if (id == "visualizarParams") {
                this.$refs.visualizarParams.hide();
            } else if (id == "modalCadOP") {
                this.$refs.modalCadOP.hide();
            } else if (id == "modalErro") {
                this.$refs.modalErro.hide();
            }
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
        /*****************/
        /*               */
        /*Busca OP       */
        /*               */
        /*****************/
        getResults(url, name) {
            this.canAdd = false;
            var array = [];
            if (name.length < 3) { return; }
            axios.get(url + "/api/recipes/v2?filters=recipeCode," + name + ",&filters=recipeTypeId,1", this.config).then((response) => {
                response.data.values.forEach((pro) => {
                    array.push(pro);
                    this.canAdd = true;
                });
            }).catch((error) => {
                this.carregando = false;
                this.msgErro = error.message;
                this.showModal("modalErro");
            })
            return array;
        },
        // Make a request for a user with a given ID
        buscar() {
            this.error = [];
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.opArray = [];
            console.log(this.order, this.orderField)
                // setTimeout(() => {
                // api/ProductionOrders/v2?filters=productionOrderTypeId,2&filters=currentStatus,reproved
            axios.get(this.urlOp + "/v2?&filters=productionOrderTypeId,1" + "&filters=" + this.fieldFilter + "," + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                    this.opArray.values = [];
                    response.data.values.forEach((obj) => {
                        if (obj.typeDescription == "Tira" && obj.currentThing) {
                            obj.recipeName = obj.recipe.recipeName
                            obj.recipeCode = obj.recipe.recipeCode
                            this.opArray.values.push(obj);
                        } else {
                            obj.recipeName = obj.recipe.recipeName
                            obj.recipeCode = obj.recipe.recipeCode
                            this.opArray.values.push(obj);
                        }
                    })
                    this.opArrarKeep = this.opArray.values;
                    response.data.values = this.opArray.values;
                    paginacao(response, this);
                    console.log(this.opArray);
                    this.carregando = false;

                }).catch((error) => {
                    this.carregando = false;
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                })
                // }, 1000);

            console.log(this.opArray);
        },
        getGatewayRecipe: function(obj) {

            var id = obj.recipe.recipeId;
            this.opSelectedParams = obj;

            for (var count = 0; count < this.opSelectedParams.recipe.phases.length; count++)
                if (this.opSelectedParams.recipe.phases[count].phaseId != 46)
                    if (this.opSelectedParams.recipe.phases[count].phaseParameters.length > 0) {
                        this.phase = this.opSelectedParams.recipe.phases[count];
                        console.log("phase");
                        console.log(this.phase);
                        this.getParametros();
                        this.recipeCadastrada = true;
                        this.carregando = false;
                        this.editarActivate = true;
                        switch (obj.currentStatus) {
                            case 'created':
                                return obj.status = "Criado"
                                break;
                            case 'available':
                                return obj.status = "Disponível"
                                break;
                            case 'active':
                                return obj.status = "Ativo"
                                break;
                            case 'reproved':
                                return obj.status = "Reprovado"
                                break;
                            case 'ended':
                                return obj.status = "Finalizado"
                                break;
                            default:
                                break;

                        }
                    } else {
                        console.log("Receita sem Parameters");
                    }
        },
        getParametros: function() {
            console.log("GETPARAMETROS() - BEEN CALLEEEEEEED !!! -------------------------")
            this.parametrosteste = [];
            this.parametersteste = [];

            var j = 0;
            console.log("this.phase.phaseParameters.length");
            console.log(this.phase.phaseParameters.length);
            for (var i = 0; i < this.phase.phaseParameters.length; i++) {
                if (this.phase.phaseParameters[i].tag.tagGroup != undefined) {
                    if (this.parametersteste[this.phase.phaseParameters[i].tag.tagGroup] != undefined) {
                        this.parametersteste[this.phase.phaseParameters[i].tag.tagGroup].push(this.phase.phaseParameters[i]);
                    } else {
                        this.vetNomesteste[j++] = this.phase.phaseParameters[i].tag.tagGroup;
                        this.parametersteste[this.phase.phaseParameters[i].tag.tagGroup] = [];
                        this.parametersteste[this.phase.phaseParameters[i].tag.tagGroup].push(this.phase.phaseParameters[i]);
                    }
                }
            }
            j = 0;
            console.log("this.vetNomesteste.length");
            console.log(this.vetNomesteste.length);
            for (var xi = 0; xi < this.vetNomesteste.length; xi++) {
                this.parametrosteste[xi] = {};
                console.log("this.parametersteste[this.vetNomesteste[xi]].length");
                console.log(this.parametersteste[this.vetNomesteste[xi]].length);
                for (var j2 = 0; j2 < this.parametersteste[this.vetNomesteste[xi]].length; j2++) {
                    if (this.parametersteste[this.vetNomesteste[xi]][j2].tag.tagDescription == 'vn') {
                        this.parametrosteste[xi].vn = this.parametersteste[this.vetNomesteste[xi]][j2].setupValue;
                    } else if (this.parametersteste[this.vetNomesteste[xi]][j2].tag.tagDescription == 'lie') {
                        this.parametrosteste[xi].lie = this.parametersteste[this.vetNomesteste[xi]][j2].setupValue;
                    } else if (this.parametersteste[this.vetNomesteste[xi]][j2].tag.tagDescription == 'lic') {
                        this.parametrosteste[xi].lic = this.parametersteste[this.vetNomesteste[xi]][j2].setupValue;
                    } else if (this.parametersteste[this.vetNomesteste[xi]][j2].tag.tagDescription == 'lsc') {
                        this.parametrosteste[xi].lsc = this.parametersteste[this.vetNomesteste[xi]][j2].setupValue;
                    } else if (this.parametersteste[this.vetNomesteste[xi]][j2].tag.tagDescription == 'lse') {
                        this.parametrosteste[xi].lse = this.parametersteste[this.vetNomesteste[xi]][j2].setupValue;
                    } else if (this.parametersteste[this.vetNomesteste[xi]][j2].tag.tagDescription == 'unidade') {
                        this.parametrosteste[xi].unidade = this.parametersteste[this.vetNomesteste[xi]][j2].setupValue;
                    }
                    console.log("this.parametersteste[this.vetNomesteste[xi]]");
                    console.log(this.parametersteste[this.vetNomesteste[xi]]);
                }
            }
            console.log("this.vetNomesteste.length");
            console.log(this.vetNomesteste.length);
            for (var xy = 0; xy < this.vetNomesteste.length; xy++) {
                this.parametrosteste[xy].parametro = this.parametersteste[this.vetNomesteste[xy]][0].tag.tagGroup;
                console.log("this.parametrosteste[xy].parametro = this.parametersteste[this.vetNomesteste[xy]][0].tag.tagGroup");
                console.log(this.parametrosteste[xy].parametro = this.parametersteste[this.vetNomesteste[xy]][0].tag.tagGroup);
            }
            setTimeout(() => {
                this.showModal('visualizarParams');
                console.log("parametrosteste");
                console.log(this.parametrosteste);
                console.log("GETPARAMETROS() - BEEN ENDEEEEEEEEEEEEEED !!! -------------------------")

            }, 1000);
        },

        getRecipes: function() {
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.carregando = true;
            axios.get(this.urlRecipe, config).then(response => {
                    this.recipeArray = response.data;
                    for (var i = 0; i < this.recipeArray.length; i++)
                        console.log(this.recipeArray[i]);
                    console.log("RecipeArray");
                    console.log(this.recipeArray);
                    this.carregando = false;
                })
                .catch((error) => {
                    this.carregando = false;
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                })

        },
        getId: function(index) {
            this.idProd = 'verProdutosLista-' + index
            console.log(this.idProd);
            return this.idProd;
        },
        getIdPhase: function(index) {
            this.idProd = 'verPhaseList-' + index
            console.log(this.idProd);
            return this.idProd;
        },
        getOpType: function() {
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.carregando = true;

            axios.get(this.urlOpType, config).then(response => {
                    this.opTypeArray = response.data;
                    console.log("this.opTypeArray");
                    console.log(this.opTypeArray);
                    this.carregando = false;
                })
                .catch((error) => {
                    this.carregando = false;
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                })
        },
        getRecipeGateway: function(id) {
            this.carregando = true;
            console.log(this.urlGatewayRecipe + id);
            axios.get(this.urlGatewayRecipe + id).then(response => {
                    this.recipeObj = response.data;
                    console.log('Receita Escolhida!!!!!!')
                    console.log(this.recipeObj);
                    this.carregando = false;
                })
                .catch((error) => {
                    this.carregando = false;
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                })
        },
        addRecipe: function(recipe, id) {
            // debugger;
            this.recipeAdded = recipe;
            // inicializa phases para que não de erro no v-if de verificação
            console.log("recipe");
            console.log(recipe);
            this.recipeObj.phases = '';
            this.getRecipeGateway(id);
        },
        seeProduct: function(index) {
            debugger;
            // getRecipeGateway(index);
            this.productArray = this.recipeObj.phases[index].phaseProducts;
        },
        seeParam(index) {
            this.paramArray = this.recipeObj.phases[index].phaseParameters;
        },
        //      //
        // CRUD //
        //      //
        getOp: function() {
            //productionOrderObj.recipe.recipeName = "";
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            // ativa barra de load na tela
            this.carregando = true;
            axios.get(this.urlOp, config).then(response => {
                    // JSON responses are automatically parsed.
                    this.opArray = response.data;
                    for (var x = 0; x < this.opArray.length; x++) {
                        if (this.opArray[x].recipe.recipeProduct == undefined) {
                            this.opArray[x].hasProd = false;
                        } else {
                            this.opArray[x].hasProd = true;
                        }
                    }
                    console.log(response);
                    this.carregando = false;
                })
                .catch((error) => {
                    this.carregando = false;
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                })
        },
        getOPTypeToAssoc(idOP) {
            //Get on OP of Type: Tira - ID: 1 
            axios.get(this.url + "/api/productionordertypes/1").then((response) => {
                //IDS from group allowed to associate to Op Type Tira
                var thingGroupId = response.data.thingGroupIds[0];

                //IDS of Things allowed to associate to Op of Type Tira
                axios.get(this.urlGateway + thingGroupId).then((response) => {
                    var idAllowed = response.data.things[0];
                    this.getAssoc(idOP, idAllowed.thingId);

                })
            }).catch((error) => {
                this.carregando = false;
                this.msgErro = error.message;
                this.showModal("modalErro");
            })
        },
        getAssoc(idOP, idallowed) {
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/productionorders/AssociateProductionOrder/associate?thingId=' + idallowed + '&productionOrderId=' + idOP).then((response) => {
                console.log(this.url + '/api/productionorders/AssociateProductionOrder/associate?thingId=' + this.idLinha + '&productionOrderId=' + this.OPId);
                console.log(response.data);

                this.buscar();

            }).catch((error) => {
                this.msgErro = error.message;
                this.showModal("modalErro");
                this.carregando = false;
            })

        },
        getDisAssoc(idThing, idOP, op) {
            //Thing ID Mahle SBC =  1 : Linha única
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/productionorders/AssociateProductionOrder/disassociate?thingId=' + idThing + '&productionOrderId=' + idOP, op)
                .then((response) => {
                    if (op.currentStatus == "active" && op.typeDescription == "Tira") {
                        //Desativar OP anterior
                        this.desativarOP(op.productionOrderId);
                    }
                    console.log(response.data);
                    this.mensagemSuc = 'Ordem desassociada com sucesso.';
                }).catch((error) => {
                    this.carregando = false;
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                })
        },
        desativarOP(id) {
            axios.put(this.url + "/api/productionorders/statemanagement/id?productionOrderId=" + id + "&state=ended")
                .then(response => {
                    console.log("OP Desativada" + response.statusText)
                }).catch((error) => {
                    this.msgErro = error.message;
                    this.showModal("modalErro");
                    console.log("OP Desativada Falhou" + response.statusText)
                })

        },
        createOp: function(data) {
                this.opArrarKeep = [];
                // adiciona propriedades necessárias na op que são mandatory
                data.recipe = this.recipeObj;
                console.log(this.recipeObj);
                data.productionOrderTypeId = "1";
                data.typeDescription = "Tira";
                data.currentstatus = "created";
                this.objetooo = data;
                console.log('OP sendo criada!!!!!!!!');
                // Criando OP
                setTimeout(() => {
                    axios.post(this.urlOp, data).then(response => {
                            //this.opArray = response.data;
                            this.opCreated = true;
                            data.currentstatus = "active";

                            //Ativando OP
                            var id = response.data.productionOrderId;
                            axios.put(this.url + "/api/productionorders/statemanagement/id?productionOrderId=" + id + "&state=active").then(response => {

                                // Desassociar OP anterior, a linha
                                for (var i = 0; i < this.opArray.values.length; i++) {
                                    var OPId = this.opArray.values[i].productionOrderId;
                                    var obj = this.opArray.values[i];
                                    var currentID = this.opArray.values[i].currentThingId;

                                    if (this.opArray.values[i].currentThingId != undefined) {
                                        this.getDisAssoc(currentID, OPId, obj);
                                        // A DESATIVAÇÃO DA OP FOI COLOCADA DENTRO DO getDisAssoc , APENAS APÓS DESASSOCIAR ELA DESATIVA A OP
                                        // if (obj.currentStatus == "active" && obj.typeDescription == "Tira") {
                                        //     //Desativar OP anterior
                                        //     this.desativarOP(obj.productionOrderId);
                                        // }
                                    }

                                }
                                //Associar OP criada a linha
                                this.getOPTypeToAssoc(id);

                            })
                        })
                        .catch((error) => {
                            this.carregando = false;
                            this.msgErro = error.message;
                            this.showModal("modalErro");
                        })
                }, 400)
            }
            //           //
            //  END CRUD //
            //           //
    },
    filters: {
        filterStatus: function(value) {
            switch (value) {
                case 'created':
                    return "Criado"
                    break;
                case 'available':
                    return "Disponível"
                    break;
                case 'active':
                    return "Ativo"
                    break;
                case 'reproved':
                    return "Reprovado"
                    break;
                case 'ended':
                    return "Finalizado"
                    break;
                default:
                    break;

            }
        },
    },

    computed: {
        filterStatus: function(value) {
            switch (value) {
                case 'created':
                    return "Criado"
                    break;
                case 'available':
                    return "Disponível"
                    break;
                case 'active':
                    return "Ativo"
                    break;
                case 'reproved':
                    return "Reprovado"
                    break;
                default:
                    break;

            }
        },
        filterDesc: function(value) {
            for (var count = 0; count < this.opTypeArray.length; count++) {
                if (this.opTypeArray[count].productionOrderTypeId == this.opSelected) {
                    this.opDesc = this.opTypeArray[count].typeDescription;
                }
            }
            console.log('desc' + this.opDesc);
            return this.opDesc
        }
    },
    beforeMount: function() {
        this.buscar();
    },
};