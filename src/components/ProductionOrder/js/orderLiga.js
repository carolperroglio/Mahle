import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { read } from 'fs';

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

// Endereço IP do Servidor com as APIs
var ipServerRecipe = process.env.RECIPE_API;
var ipServer = process.env.OP_API;

export default {
    name: 'ProductionOrder',
    data() {
        return {
            opId: '',
            urlRecipeSearch: ipServerRecipe + '/api/recipes?fieldFilter=recipeName&fieldValue=',
            urlRecipe: ipServerRecipe + '/api/recipes/',
            urlOpType: ipServer + '/api/productionordertypes/',
            urlPhases: ipServerRecipe + '/api/phases/',
            urlOp: ipServer + '/api/productionorders',
            urlGatewayRecipe: ipServer + '/gateway/recipes/',
            url: process.env.OP_API,
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
            quantityPage: 20,
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
            cabecalhoSetas: [false, false, false, false, false, false],
            objetooo: "",
            phase: {},
            parameters: {},
            parametros: [],
            vetNomes: [],
            idLinha: "1",
            opSelectedParams: "",
            decriptionLiga: "Liga",
            urlGateway: process.env.TOOLS_API + '/gateway/thinggroups/',
            equipaments: [],
            idAllowed: ""

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
            }
        },
        hideModal(id) {
            if (id == "visualizarParams") {
                this.$refs.visualizarParams.hide();
            } else if (id == "modalCadOP") {
                this.$refs.modalCadOP.hide();
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
            var array = [];
            if (name.length < 3) { return; }
            axios.get(url + name, this.config).then((response) => {
                response.data.values.forEach((pro) => {
                    array.push(pro);
                });
            }, (error) => {
                console.log(error);
            })
            return array;
        },
        // Make a request for a user with a given ID
        buscar() {
            this.decriptionLiga = "Liga"
            this.error = [];
            this.carregando = true;
            var config = {
                headers: { 'Cache-Control': 'no-cache' }
            };
            this.opArray = [];
            console.log(this.order, this.orderField)
                // setTimeout(() => {
            axios.get(this.urlOp + "?orderField=" + this.orderField + "&order=" + this.order + "&fieldFilter=" + this.fieldFilter + "&fieldValue=" + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config).then((response) => {
                    this.opArray.values = [];
                    response.data.values.forEach((obj) => {
                        if (obj.typeDescription == "Liga") {
                            this.opArray.values.push(obj);
                        }
                    })
                    this.opArrarKeep = this.opArray.values;
                    response.data.values = this.opArray.values;
                    response.data.total = this.opArray.values.length;
                    paginacao(response, this);
                    console.log(this.opArray);
                    this.carregando = false;
                }, (error) => {
                    this.mensagem = 'Erro no server ao buscar ' + error;
                    this.carregando = false;
                })
                // }, 1000);

            console.log(this.opArray);
        },
        getThings() {
            //ID Grupo do forno de fusao: 11
            axios.get(this.urlGateway + "11").then((response) => {
                this.equipaments = response.data.things;
            }).catch((e) => {

            })
        },
        getGatewayRecipe: function(obj) {
            var id = obj.recipe.recipeId;
            this.opSelectedParams = obj;

            if (id != 0) {
                this.carregando = true;
                console.log(this.urlGatewayRecipe + id);
                setTimeout(() => {
                    axios.get(this.urlGatewayRecipe + id).then(response => {
                        this.recipe = response.data;
                        for (var i = 0; i < this.recipe.phases.length; i++)
                            if (this.recipe.phases[i].phaseId != 46)
                                this.phase = this.recipe.phases[i];
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
                            default:
                                break;

                        }
                    }).catch(error => {
                        console.log(error);
                        this.carregando = false;
                    })
                }, 300);
            }
        },
        getParametros: function() {
            this.parametros = [];
            // for(var x = 0; this.recipe.phases[0].phaseProducts.length; x++){
            this.parametros = this.recipe.phases[0].phaseProducts;
            // }
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
                .catch(e => {
                    this.errors.push(e)
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
                .catch(e => {
                    this.errors.push(e)
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
                .catch(e => {
                    this.errors.push(e)
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
                .catch(e => {
                    this.errors.push(e)
                })
        },
        getOPTypeToAssoc(idOP) {
            //Get on OP of Type: Tira - ID: 1 
            axios.get(this.url + "/api/productionordertypes/1").then((response) => {
                //IDS from group allowed to associate to Op Type Tira
                var thingGroupId = response.data.thingGroupIds[0];

                //IDS of Things allowed to associate to Op of Type Tira
                axios.get(this.urlGateway + thingGroupId).then((response) => {
                    //ID choose in View
                    this.idAllowed;
                    this.getAssoc(idOP, this.idAllowed);

                })
            }).catch((e) => {
                console.log(e);
            })
        },
        getAssoc(idOP, idallowed) {
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/productionorders/AssociateProductionOrder/associate?thingId=' + idallowed + '&productionOrderId=' + idOP).then((response) => {
                console.log(this.url + '/api/productionorders/AssociateProductionOrder/associate?thingId=' + this.idLinha + '&productionOrderId=' + this.OPId);
                console.log(response.data);

            }, (r) => {
                this.mensagem = r.response.data;
                this.carregando = false;
            })

        },
        getDisAssoc(idThing, idOP, op) {
            //Thing ID Mahle SBC =  1 : Linha única
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/productionorders/AssociateProductionOrder/disassociate?thingId=' + idThing + '&productionOrderId=' + idOP, op)
                .then((response) => {
                    console.log(response.data);
                    this.mensagemSuc = 'Ordem desassociada com sucesso.';
                }, (r) => {
                    this.mensagem = r.response.data;
                    this.carregando = false;
                })
        },
        createOp: function(data) {
                // adiciona propriedades necessárias na op que são mandatory
                data.recipe = this.recipeObj;
                console.log(this.recipeObj);
                data.productionOrderTypeId = 2;
                data.typeDescription = "Liga";
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

                                // Dessassociar OP anterior, a linha
                                for (var i = 0; i < this.opArray.values.length; i++) {
                                    if (this.opArray.values[i].currentThingId != undefined) {
                                        var currentID = this.opArray.values[i].currentThingId
                                        var OPId = this.opArray.values[i].productionOrderId;
                                        var obj = this.opArray.values[i];
                                        this.getDisAssoc(currentID, OPId, obj);
                                    }

                                }
                                //Associar OP criada a linha
                                this.getOPTypeToAssoc(id);
                                // this.getAssoc(id);

                            })
                        })
                        .catch(e => {
                            this.errors.push(e)
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
                default:
                    break;

            }
        },
    },
    computed: {
        // filterDesc: function(value) {
        //     for (var count = 0; count < this.opTypeArray.length; count++) {
        //         if (this.opTypeArray[count].productionOrderTypeId == this.opSelected) {
        //             this.opDesc = this.opTypeArray[count].typeDescription;
        //         }
        //     }
        //     console.log('desc' + this.opDesc);
        //     return this.opDesc
        // }
    },
    beforeMount: function() {
        this.buscar();
        this.getThings();
    },
};