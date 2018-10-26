import axios from 'axios'
import es6promisse from 'es6-promise'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { Stretch } from 'vue-loading-spinner'
import { read } from 'fs';
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

// Endereço IP do Servidor com as APIs
var ipServerRecipe = process.env.RECIPE_API;
var ipServer = process.env.OP_API;

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
            url: ipServer,
            recipeArray: [],
            opArray: [],
            opArrarKeep: [],
            opTypeArray: [],
            paramArray: [],
            recipeObj: {},
            productArray: [],
            opInAnalysis: [],
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
            cabecalhoSetas: [false, false, false, false, false, false, false],
            objetooo: "",
            phase: {},
            parameters: {},
            parametros: [],
            vetNomes: [],
            idLinha: "1",
            opSelectedParams: "",
            decriptionLiga: "Liga",
            urlGateway: ipServer + '/gateway/thinggroups/',
            equipaments: [],
            idAllowed: "",
            canAdd: false,
            msgErro: "",
            erro: false,
            status : {
                approved : 'Aprovada',
                ended : 'Finalizada',
                created : 'Criada',
                reproved : 'Reprovada',
                loading : 'Aguardando Aprovação',
                waiting_approval : 'Aguardando Aprovação',
                available : 'Disponível'
            }
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
        
        /*****************/
        /*               */
        /*Busca OP       */
        /*               */
        /*****************/
        getResults(url, name) {
            // this.carregando = true;
            this.canAdd = false;
            var array = [];
            if (name.length < 3) { return; }
            axios.get(url + "/api/recipes/v2?filters=recipeCode," + name + ",&filters=recipeTypeId,2").then((response) => {
                response.data.values.forEach((pro) => {
                    array.push(pro);
                    this.canAdd = true;
                });
                // this.carregando = false;
            }).catch((error) => {
                console.log(error);
                this.erro = true;
                this.msgErro = "Ocorreu um erro: " + error.message;
                this.showModal("modalInfo");
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
            // setTimeout(() => {
            axios.get(this.urlOp + "/v2?&filters=productionOrderTypeId,2" + "&filters=" + this.fieldFilter + "," + this.fieldValue + "&startat=" + this.startat + "&quantity=" + this.quantityPage, config)
                .then((response) => {
                    this.opArray.values = [];
                    for (var x = 0; x < response.data.values.length; x++) {
                        console.log(response.data.values[x])
                        if (response.data.values[x].currentThing != undefined) {
                            response.data.values[x].thingName = response.data.values[x].currentThing.thingName
                            response.data.values[x].recipeName = response.data.values[x].recipe.recipeName
                            response.data.values[x].recipeCode = response.data.values[x].recipe.recipeCode
                            this.opArray.values.push(response.data.values[x]);
                        } else {
                            response.data.values[x].recipeName = response.data.values[x].recipe.recipeName
                            response.data.values[x].recipeCode = response.data.values[x].recipe.recipeCode
                            this.opArray.values.push(response.data.values[x]);
                        }
                    }
                    this.opArrarKeep = this.opArray.values;
                    response.data.values = this.opArray.values;
                    response.data.total = this.opArray.values.length;
                    paginacao(response, this);
                    console.log(this.opArray);
                    this.carregando = false;
                }).catch((error) => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalInfo");
                    // }, 1000);
                })
            console.log(this.opArray);
        },
        getThings() {
            this.carregando = true;
            //ID Grupo do forno de fusao: 11
            axios.get(this.urlGateway + "11").then((response) => {
                this.equipaments.push(response.data.things[0]);
                axios.get(this.urlGateway + "23").then((response) => {
                    this.equipaments.push(response.data.things[0]);
                    this.carregando = false;
                })
            }).catch((error) => {
                this.carregando = false;
                this.erro = true;
                this.msgErro = "Ocorreu um erro: " + error.message;
                this.showModal("modalInfo");
            })
        },
        getGatewayRecipe: function(obj) {
            this.opSelectedParams = {};
            var id = obj.recipe.recipeId;
            this.opSelectedParams = obj;


            for (var i = 0; i < this.opSelectedParams.recipe.phases.length; i++)
                if (this.opSelectedParams.recipe.phases[i].phaseId != 46)
                    if (this.opSelectedParams.recipe.phases[i].phaseProducts.length > 0) {
                        this.phase = this.opSelectedParams.recipe.phases[i];
                        this.getParametros(this.phase);
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
        getParametros: function(obj) {
            this.parametros = [];
            this.parametros = obj.phaseProducts;
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
                .catch(error => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalInfo");
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
                .catch(error => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalInfo");

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
                .catch(error => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalInfo");
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
                .catch(error => {
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro: " + error.message;
                    this.showModal("modalInfo");

                })
        },
        getOPTypeToAssoc(idOP) {

            //Get on OP of Type: Liga - ID: 2 
            // axios.get(this.url + "/api/productionordertypes/2").then((response) => {
            //     //IDS from group allowed to associate to Op Type Tira
            //     var thingGroupId = response.data.thingGroupIds[0];

            //     //IDS of Things allowed to associate to Op of Type Tira
            //     axios.get(this.urlGateway + thingGroupId).then((response) => {
            //ID choose in View
            this.idAllowed;
            this.getAssoc(idOP, this.idAllowed);

            //     })
            // }).catch((error) => {
            //     console.log(error);
            //     this.carregando = false;
            //     this.erro = true;
            //     this.msgErro = "Ocorreu um erro: " + error.message;
            //     this.showModal("modalInfo");
            // })
        },
        getAssoc(idOP, idallowed) {
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/productionorders/AssociateProductionOrder/associate?thingId=' + idallowed + '&productionOrderId=' + idOP).then((response) => {
                console.log(this.url + '/api/productionorders/AssociateProductionOrder/associate?thingId=' + idallowed + '&productionOrderId=' + idOP);
                console.log(response.data);

            }).catch((error) => {
                console.log(error);
                this.carregando = false;
                this.erro = true;
                this.msgErro = "Ocorreu um erro ao associar: " + error.message;
                this.showModal("modalInfo");
            })

        },
        getDisAssoc(idThing, idOP, op) {
            //Thing ID Mahle SBC =  1 : Linha única
            this.mensagemSuc = '';
            this.mensagem = '';
            axios.put(this.url + '/api/productionorders/AssociateProductionOrder/disassociate?thingId=' + idThing + '&productionOrderId=' + idOP, op)
                .then((response) => {
                    if (op.currentStatus == "active" && op.typeDescription == "Liga") {
                        //Desativar OP anterior
                        this.desativarOP(idOP, op);
                    }
                    console.log(response.data);
                    this.mensagemSuc = 'Ordem desassociada com sucesso.';
                }).catch((error) => {
                    console.log(error);
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao desassociar: " + error.message;
                    this.showModal("modalInfo");
                })
        },
        desativarOP(id, op) {
            op.username = VueCookies.get('username');

            axios.put(this.url + "/api/productionorders/statemanagement/id?productionOrderId=" + id + "&state=ended&username=" + op.username)
                .then(response => {
                    console.log("OP Desativada" + response.statusText)
                }).catch((error) => {
                    console.log(error);
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao desativar OP: " + error.message;
                    this.showModal("modalInfo");
                    console.log("OP Desativada Falhou" + response.statusText)
                })

        },
        createOp: function(data) {
            // adiciona propriedades necessárias na op que são mandatory
            data.recipe = this.recipeObj;
            console.log(this.recipeObj);
            data.productionOrderTypeId = 2;
            data.typeDescription = "Liga";
            data.currentstatus = "created";
            data.username = VueCookies.get('username');
            data.recipe.recipeProduct.measurementUnit = "kg";
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
                    axios.put(this.url + "/api/productionorders/statemanagement/id?productionOrderId=" + id + "&state=active&username=" + data.username).then(response => {

                        // Desassociar OP anterior, a linha
                        for (var i = 0; i < this.opArray.values.length; i++) {
                            if (this.opArray.values[i].currentThingId != undefined) {
                                var currentID = this.opArray.values[i].currentThingId
                                var OPId = this.opArray.values[i].productionOrderId;
                                var obj = this.opArray.values[i];
                                if (currentID == this.idAllowed) {
                                    this.getDisAssoc(currentID, OPId, obj);

                                }
                            }
                        }
                        //Associar OP criada a linha
                        this.getOPTypeToAssoc(id);
                        // this.getAssoc(id);

                        setTimeout(() => {
                            this.carregando = false;
                            this.erro = false;
                            this.msgErro = "OP criada com sucesso";
                            this.showModal("modalInfo");
                            this.buscar();
                        }, 1250)

                    })
                }).catch((error) => {
                    console.log(error);
                    this.carregando = false;
                    this.erro = true;
                    this.msgErro = "Ocorreu um erro ao criar a OP: " + error.message;
                    this.showModal("modalInfo");
                })
            }, 400)
        },
        //           //
        //  END CRUD //
        //           //
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
        // this.getOpInAnalysis();
    },
};